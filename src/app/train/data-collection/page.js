'use client'
import { useRef, useState, useEffect } from "react";
import { HandLandmarker, FilesetResolver, DrawingUtils, PoseLandmarker, DrawingOptions } from '@mediapipe/tasks-vision'
import videoStyles from '@/styles/main.module.css'
import * as tf from '@tensorflow/tfjs';
import { setupWebcamVideo } from '@/utils/cameraUtils'
import { createLandmarker, processData } from '@/utils/mediapipeUtils'
import styles from '@/styles/train.module.css'
import { notifications } from '@mantine/notifications'
import { TextInput, Group, Button, Autocomplete } from '@mantine/core';

const TrainPage = () => {
    // useState declarations
    const [mediaStream, setMediaStream] = useState(null);
    const [detectStart, setDetectStart] = useState(false)
    const [results, setResults] = useState({})
    const [label, setLabel] = useState("")
    // const [tempData, setTempData] = useState([])

    // reference declarations
    const videoRef = useRef(null);
    const canvasRef = useRef(null)
    /**
     * @type {HandLandmarker}
     */
    var handLandmarker = useRef(null)
    /**
     * @type {PoseLandmarker}
     */
    var poseLandmarker = useRef(null)

    //urls
    const modelUrl = 'localstorage://model'

    // medaipipe declarations
    const runningMode = "VIDEO";

    //model storage
    /**
     * @type {tf.GraphModel}
     */
    var model = null

    var detectInterval

    useEffect(() => {
        setupWebcamVideo(mediaStream, setMediaStream, videoRef);
        createLandmarker(runningMode).then(([handLandmarkerOpt, poseLandmarkerOpt]) => {
            handLandmarker.current = handLandmarkerOpt
            poseLandmarker.current = poseLandmarkerOpt
            console.log(handLandmarker.current, poseLandmarker.current)
        });
        tf.loadGraphModel(modelUrl).then(modelOpt => {
            model = modelOpt
            console.log('model updated')
        });
    }, [mediaStream]);

    const detect = async () => {
        if (!handLandmarker.current) return
        if (!poseLandmarker.current) return
        try {
            console.log("In detect")

            const canvasContext = canvasRef.current.getContext('2d')
            canvasContext.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

            const handLandmarkResult = handLandmarker.current.detectForVideo(videoRef.current, performance.now())
            const poseLandmarkResult = poseLandmarker.current.detectForVideo(videoRef.current, performance.now())

            const dw = new DrawingUtils(canvasContext)
            if (handLandmarkResult.landmarks) {
                for (const landmarks of handLandmarkResult.landmarks) {
                    dw.drawLandmarks(landmarks)
                }
            }
            if (poseLandmarkResult.landmarks) {
                for (const landmarks of poseLandmarkResult.landmarks) {
                    dw.drawLandmarks(landmarks)
                }
            }
            const [finalData, gotData] = processData(poseLandmarkResult, handLandmarkResult)
            if (gotData) {
                if (finalData.length != 225) {
                    console.warn("ERROR in length")
                    return
                }
                console.log(results, label, finalData.length)
                results[label].push(finalData)
                setResults(results)
            }
        } catch (e) {
            console.warn(e)
            return
        }
    }

    const startDetect = () => {
        const d = true
        console.log("In START", d)
        setDetectStart(d)
        const detectFunc = detect()
        console.log(detectFunc, d)
        const int = setInterval(detect, 100)
        console.log(int)
        detectInterval = int
    }

    const stopDetect = () => {
        console.log(results)
        const d = false
        console.log("In STOP detect", d)
        setDetectStart(d)
        notifications.show({
            message: `Data regarding ${label} is captured`,
            withCloseButton: true,
            title: "Data captured",
            color: "green",

        })
        setLabel("")
        console.log(detectInterval)
        clearInterval(detectInterval)
        detectInterval = null
    }

    const detectHandler = () => {
        if (!label) {
            notifications.show({
                message: "Label cannot be empty",
                withCloseButton: true,
                title: "Error",
                color: "red",

            })
            return
        }
        if (!results[label]) {
            results[label] = []
        }
        console.log(results)
        startDetect()
        setTimeout(stopDetect, 10 * 1000);
    }

    const showResults = () => {
        console.log(results,)
    }

    const saveData = () => {
        localStorage.setItem('trainData', JSON.stringify(results))
        console.log("SAVED")
        notifications.show({
            message: "Your data is saved",
            withCloseButton: true,
            title: "Data Saved",
            color: "green",

        })
        return
    }

    const clearMemoryData = () => {
        setResults({})
        notifications.show({
            message: "Cleared Data from Memory",
            withCloseButton: true,
            title: "Data cleared",
            color: "yellow",

        })
    }

    const clearDiskData = () => {
        localStorage.removeItem('trainData')
        notifications.show({
            message: "Cleared Data from Disk",
            withCloseButton: true,
            title: "Data cleared",
            color: "yellow",

        })
    }
    return (
        <>
            <h1 onClick={showResults} className={styles.title}>Collect data to train your model</h1>
            <p>Train your own model to recognise your personalized signs. Training your own model will also result in better recognition of your body style.</p>
            <p>NOTE: - You must record &lsquo; control&rsquo; sign to make the model work.&lsquo;control&rsquo; sign is just standing still or not showing any sign.</p>
            <p>After clicking on start capturing, it will stop after 10seconds. If you want to capture more data, click the button again with the same label name.</p>
            <p>You need to save the data before proceeding to model train page</p>
            <Group justify="space-around" p={"md"}>
                <Autocomplete
                    label="Sign Name"
                    placeholder="Enter the sign name"
                    data={Object.keys(results)}
                    value={label}
                    onChange={setLabel}
                />
                <Button onClick={detectHandler} variant="filled" radius={"md"}>{detectStart ? "Capturing" : "Start Capturing"}</Button>
                <Button onClick={saveData} variant="filled" radius={"md"}>Save Data</Button>
            </Group>
            <Group justify="center" p={"md"}>
                <Button onClick={clearMemoryData}>Clear Data (from Momory)</Button>
                <Button onClick={clearDiskData}>Clear Data (from Disk)</Button>
            </Group>
            <div className={styles.outputDiv}>
                <div className={videoStyles.videoPlayer}>
                    <video className="h-full w-full mx-auto" ref={videoRef} autoPlay muted />
                    <canvas ref={canvasRef}></canvas>
                </div>
                <div>
                    <h2 className={styles.capturedTitle}>Captured Data Points(s)</h2>
                    <div>
                        {Object.keys(results).map((val, index) => {
                            return <p key={val + index}>{val}:{results[val].length}</p>
                        })}
                    </div>
                </div>
            </div>

        </>
    );
}

export default TrainPage
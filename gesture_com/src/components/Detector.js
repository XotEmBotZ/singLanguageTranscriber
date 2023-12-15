'use client'
import { useRef, useState, useEffect } from "react";
import { HandLandmarker, FilesetResolver, DrawingUtils, PoseLandmarker, DrawingOptions, PoseLandmarkerResult } from '@mediapipe/tasks-vision'
import { Camera } from '@mediapipe/camera_utils'
import styles from '@/styles/main.module.css'
import * as tf from '@tensorflow/tfjs';
import { setupWebcamVideo } from '@/utils/cameraUtils'
import { createLandmarker, processData } from '@/utils/mediapipeUtils'

export default function Detector() {
  // useState declarations
  const [mediaStream, setMediaStream] = useState(null);
  const [detectStart, setDetectStart] = useState(true)
  const [cameraObj, setCameraObj] = useState(null)
  const [prediction, setPrediction] = useState("")
  const [sentence, setSentence] = useState([])

  // reference declarations
  const videoRef = useRef(null);
  const canvasRef = useRef(null)

  //urls
  const modelUrl = 'localstorage://model'

  // medaipipe declarations
  const runningMode = "VIDEO";

  //model storage
  /**
   * @type {React.MutableRefObject<tf.GraphModel>}
   */
  let model = useRef(null)
  /**
   * @type {HandLandmarker}
   */
  let handLandmarker = null
  /**
   * @type {PoseLandmarker}
   */
  let poseLandmarker = null

  /**
   * @type {React.MutableRefObject<tf.GraphModel>}
   */
  const lables = useRef(['control', 'yes', 'no', 'thankYou', 'hello', 'iLoveYou', 'peace', 'please',])

  const detect = async () => {
    if (!handLandmarker) return
    if (!poseLandmarker) return
    try {
      console.log("In detect")

      const canvasContext = canvasRef.current.getContext('2d')
      canvasContext.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

      const handLandmarkResult = handLandmarker.detectForVideo(videoRef.current, performance.now())
      const poseLandmarkResult = poseLandmarker.detectForVideo(videoRef.current, performance.now())

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
      if (gotData && model.current) {
        const index = tf.tidy(() => {
          const resTensor = tf.tensor2d([finalData])
          const res = model.current.predict(resTensor)
          return (res.flatten().argMax().dataSync()[0])
        })
        setPrediction(lables.current[index])
        if (sentence.length > 5) {
          sentence.shift()
        }
        sentence.push(lables.current[index])
        setSentence(sentence)
        console.log(sentence)
      }
    } catch (e) {
      console.warn(e)
      // console.warn(handLandmarkResult)
      // console.warn(poseLandmarkResult)
      return
    }
  }

  useEffect(() => {
    setupWebcamVideo(mediaStream, setMediaStream, videoRef);
    createLandmarker(runningMode).then(([handLandmarkerOpt, poseLandmarkerOpt]) => {
      handLandmarker = handLandmarkerOpt
      poseLandmarker = poseLandmarkerOpt
    });
    if (localStorage.getItem("customLabel")) {
      console.log("Start loading custom model")
      tf.loadLayersModel("localstorage://customModel").then(modelOpt => {
        console.log("Custom model loaded")
        model.current = modelOpt
        lables.current = JSON.parse(localStorage.getItem("customLabel"))
      })
    } else {
      tf.loadGraphModel(modelUrl).then(modelOpt => {
        console.log('default model loaded')
        model.current = modelOpt
      });
    }
    const cam = new Camera(videoRef.current, {
      height: videoRef.current.videoHeight,
      width: videoRef.current.videoWidth,
      onFrame: detect
    })
    if (detectStart) cam.start()
    setCameraObj(cam)
  }, [mediaStream]);

  const toggleDetect = () => {
    const d = !detectStart
    if (d) cameraObj.start()
    if (!d) cameraObj.stop()
    setDetectStart(d)
  }
  return (
    <>
      <h1>{prediction}</h1>
      <div className={styles.videoPlayer}>
        <video className="h-full w-full mx-auto" ref={videoRef} autoPlay muted />
        <canvas ref={canvasRef}></canvas>
      </div>
      <button onClick={toggleDetect}>Detect Toggle</button>
    </>
  );
}

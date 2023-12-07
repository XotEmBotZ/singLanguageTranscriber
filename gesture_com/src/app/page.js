'use client'
import { useRef, useState, useEffect } from "react";
import { HandLandmarker, FilesetResolver, DrawingUtils, PoseLandmarker, DrawingOptions } from '@mediapipe/tasks-vision'
import { Camera } from '@mediapipe/camera_utils'
import styles from '@/styles/main.module.css'


export default function Home() {
  // useState declarations
  const [mediaStream, setMediaStream] = useState(null);
  const [detectStart, setDetectStart] = useState(true)
  const [cameraObj, setCameraObj] = useState(null)

  // reference declarations
  const videoRef = useRef(null);
  const canvasRef = useRef(null)

  // medaipipe declarations
  const runningMode = "VIDEO";
  /**
   * @type {HandLandmarker}
   */
  let handLandmarker = null
  /**
   * @type {PoseLandmarker}
   */
  let poseLandmarker = null

  // dump data declarations
  let temp = []
  for (let index = 0; index < 33; index++) {
    temp.push(0)
    temp.push(0)
    temp.push(0)
  }
  const dumpPoseLandmark = temp
  temp = []
  for (let index = 0; index < 21; index++) {
    temp.push(0)
    temp.push(0)
    temp.push(0)
  }
  const dumpHandLandmark = temp

  const createLandmarker = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );
    const hm = await HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task`,
        delegate: "GPU"
      }
    });
    hm.setOptions({
      runningMode: runningMode,
      numHands: 2,
    })
    handLandmarker = hm
    const pm = await PoseLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/latest/pose_landmarker_full.task`,
        delegate: "GPU"
      }
    });
    pm.setOptions({
      runningMode: runningMode,
      numPoses: 1,
    })
    poseLandmarker = pm
  };

  async function setupMediaStream() {
    try {
      const ms = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false
      });
      setMediaStream(ms);
    } catch (e) {
      alert("Camera is disabled");
      throw e;
    }
  }

  async function setupWebcamVideo() {
    if (!mediaStream) {
      await setupMediaStream();
    } else {
      const videoCurr = videoRef.current;
      if (!videoCurr) return;
      const video = videoCurr;
      if (!video.srcObject) {
        video.srcObject = mediaStream;
      }
    }
    console.log("Working here")
  }

  const processData = (poseLandmarkResult, handLandmarkResult) => {
    let poseData = dumpPoseLandmark
    if (poseLandmarkResult.landmarks.length > 0) {
      let temp = []
      for (let index = 0; index < poseLandmarkResult.landmarks[0].length; index++) {
        const element = poseLandmarkResult.landmarks[0][index];
        temp.push(element.x)
        temp.push(element.y)
        temp.push(element.z)
      }
      poseData = temp
    }

    let leftHandData = dumpHandLandmark
    let rightHandData = dumpHandLandmark
    if (handLandmarkResult.handedness.length > 0) {
      let lTemp = []
      let rTemp = []
      for (let index = 0; index < handLandmarkResult.handedness.length; index++) {
        const element = handLandmarkResult.handedness[index][0];
        const landmarkElement = handLandmarkResult.landmarks[index]
        if (element.categoryName === "Left") {
          for (let index = 0; index < landmarkElement.length; index++) {
            const helement = landmarkElement[index];
            lTemp.push(helement.x)
            lTemp.push(helement.y)
            lTemp.push(helement.z)
          }
        } else if (element.categoryName === "Right") {
          for (let index = 0; index < landmarkElement.length; index++) {
            const helement = landmarkElement[index];
            rTemp.push(helement.x)
            rTemp.push(helement.y)
            rTemp.push(helement.z)
          }
        }
      }
      if (lTemp.length) {
        leftHandData = lTemp
      }
      if (rTemp.length) {
        rightHandData = rTemp
      }
    }

    return [].concat(poseData, leftHandData, rightHandData)
  }

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
      const finalData = processData(poseLandmarkResult, handLandmarkResult)
      console.log(finalData)
    } catch (e) {
      console.log(e)
      return
    }
  }

  useEffect(() => {
    setupWebcamVideo();
    createLandmarker();
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
      <div className={styles.videoPlayer}>
        <video className="h-full w-full mx-auto" ref={videoRef} autoPlay muted />
        <canvas ref={canvasRef}></canvas>
      </div>
      <button onClick={toggleDetect}>Detect Toggle</button>
    </>
  );
}

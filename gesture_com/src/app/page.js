'use client'
import { useRef, useState, useEffect } from "react";
import { HandLandmarker, HandLandmarkerOptions, FilesetResolver, DrawingUtils, camera, PoseLandmarker } from '@mediapipe/tasks-vision'
import { Camera } from '@mediapipe/camera_utils'

export default function Home() {
  const [mediaStream, setMediaStream] = useState(null);
  const [detectStart, setDetectStart] = useState(true)
  const [cameraObj, setCameraObj] = useState(null)

  const videoRef = useRef(null);
  const canvasRef = useRef(null)

  const runningMode = "VIDEO";
  /**
   * @type {HandLandmarker}
   */
  let handLandmarker = null
  /**
   * @type {PoseLandmarker}
   */
  let poseLandmarker = null
  let lastTimestamp = 0

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

  const detect = async () => {
    if (!handLandmarker) return
    if (!poseLandmarker) return
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
    <div className="w-full h-full relative z-0">
      <video className="h-full w-full mx-auto" ref={videoRef} autoPlay muted />
      <button onClick={toggleDetect}>Detect Toggle</button>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

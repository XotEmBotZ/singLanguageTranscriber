import { useRef, useState, useEffect } from "react";
import { HandLandmarker, FilesetResolver, DrawingUtils, PoseLandmarker, DrawingOptions } from '@mediapipe/tasks-vision'
import { Camera } from '@mediapipe/camera_utils'
import styles from '@/styles/main.module.css'
import * as tf from '@tensorflow/tfjs';
import { setupWebcamVideo } from '@/utils/cameraUtils'


// dump data declarations
let temp = []
for (let index = 0; index < 32; index++) {
    temp.push(0)
    temp.push(0)
    temp.push(0)
}
const dumpPoseLandmark = temp
temp = []
for (let index = 0; index < 20; index++) {
    temp.push(0)
    temp.push(0)
    temp.push(0)
}
const dumpHandLandmark = temp


export const createLandmarker = async (runningMode) => {
    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    // HandLandmarker Setup
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
    let handLandmarker = hm
    //PoseLandmarker Setup
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
    let poseLandmarker = pm

    return [handLandmarker, poseLandmarker]
};

export const processData = (poseLandmarkResult, handLandmarkResult) => {
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
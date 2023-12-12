'use client'
import React, { useEffect, useRef, useState } from 'react'
import * as tf from '@tensorflow/tfjs';
import { notifications } from '@mantine/notifications'
import styles from "@/styles/train.module.css"

const ModelTrain = () => {
    //usestate declaration
    const [dataComplaint, setDataComplaint] = useState(false)

    //Ref declaration
    const trainDataObj = useRef({})
    const inputShape = useRef(0)
    const labels = useRef([])
    const prepairedDataX = useRef(null)
    const prepairedDataY = useRef(null)

    const prepData = async () => {
        let tempDataX = []
        let tempDataY = []
        labels.current = Object.keys(trainDataObj.current)
        labels.current.forEach((label, index) => {
            const element = trainDataObj.current[label]
            tempDataX.push(...element)
            tempDataY.push(...new Array(element.length).fill(index))
        })
        prepairedDataX.current = tf.tensor2d(tempDataX)
        prepairedDataY.current = tf.tensor1d(tempDataY)
        prepairedDataY.current.print()
        prepairedDataX.current.print()
    }

    useEffect(() => {
        if (Object.keys(localStorage.getItem('trainData')).length) {
            trainDataObj.current = JSON.parse(localStorage.getItem('trainData'))
        }
        if (Object.keys(trainDataObj.current).includes('control')) {
            setDataComplaint(true)
            inputShape.current = trainDataObj.current[Object.keys(trainDataObj.current)[0]][0].length
            prepData()
        }
        // console.log(trainDataObj.current[Object.keys(trainDataObj.current)[0]][0].length)
    }, [])
    return (<>

        <h1 className={styles.title}>Collect data to train your model</h1>
        {Object.keys(trainDataObj.current).length ? <p>You have collected data in <span>{Object.keys(trainDataObj.current).join(", ")}</span>. Your custom model will only be able to detect this symbols</p> : "Loading"}
        {dataComplaint ? <></> : <p>Your data collection dosent have 'control' which is required to train the model</p>}
        <div>
            <h3>Collected data</h3>
            {Object.keys(trainDataObj.current).map((val, index) => {
                return <p key={val + index}>{val}:{trainDataObj.current[val].length}</p>
            })}
            <h3>Model confuguration (Advance)</h3>
            <p>Input shape = {inputShape.current}</p>
            <p>Output shape = {Object.keys(trainDataObj.current).length}</p>
        </div>
        <div className={styles.inputDiv}>
            <button>Train Data</button>
        </div>
        <div className={styles.outputDiv}>

            <div>
                <h2 className={styles.capturedTitle}>Captured Data Points(s)</h2>
                <div>
                </div>
            </div>
        </div>

    </>)
}

export default ModelTrain
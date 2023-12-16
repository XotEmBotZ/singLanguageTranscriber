'use client'
import React, { useEffect, useRef, useState } from 'react'
import * as tf from '@tensorflow/tfjs';
import { notifications } from '@mantine/notifications'
import styles from "@/styles/train.module.css"

const ModelTrain = () => {
    //usestate declaration
    const [dataComplaint, setDataComplaint] = useState(false)
    const [trainTestSplit, setTrainTestSplit] = useState(0.7)
    const [modelStatts, setModelStatts] = useState({})

    //Ref declaration
    const trainDataObj = useRef({})
    const inputShape = useRef(0)
    const labels = useRef([])
    /**
     * @type {React.MutableRefObject<tf.Tensor2D>}
     */
    const prepairedDataX = useRef(null)
    /**
     * @type {React.MutableRefObject<tf.Tensor1D>}
     */
    const prepairedDataY = useRef(null)
    /**
     * @type {React.MutableRefObject<tf.Sequential>}
     */
    const model = useRef(null)

    const createLables = (length, index) => {
        let arr = new Array(length).fill(0)
        arr[index] = 1
        return arr
    }

    const prepData = () => {
        let tempDataX = []
        let tempDataY = []
        labels.current = Object.keys(trainDataObj.current).sort()
        labels.current.forEach((label, index) => {
            const element = trainDataObj.current[label]
            tempDataX.push(...element)
            tempDataY.push(...new Array(element.length).fill(createLables(labels.current.length, index)))
        })
        prepairedDataX.current = tf.tensor2d(tempDataX)
        prepairedDataY.current = tf.tensor2d(tempDataY)
        console.log(prepairedDataX.current.shape)
        console.log(prepairedDataY.current.shape)
    }

    useEffect(() => {
        if (Object.keys(localStorage.getItem('trainData')).length) {
            trainDataObj.current = JSON.parse(localStorage.getItem('trainData'))
        }
        if (Object.keys(trainDataObj.current).includes('control')) {
            setDataComplaint(true)
            inputShape.current = trainDataObj.current[Object.keys(trainDataObj.current)[0]][0].length
        }
        // console.log(trainDataObj.current[Object.keys(trainDataObj.current)[0]][0].length)
    }, [])

    const trainCallback = (epochs, logs) => {
        setModelStatts(logs)
    }

    const saveModel = () => {
        model.current.save("localstorage://customModel")
        localStorage.setItem("customLabel", JSON.stringify(labels.current))
        notifications.show({
            message: "Your custom model is saved.",
            withCloseButton: true,
            title: "Model Saved",
            color: "green",

        })
        return
    }
    const trainData = async () => {
        prepData()
        console.log(prepairedDataX.current.bufferSync())
        console.log(prepairedDataY.current.bufferSync())
        model.current = new tf.Sequential()
        model.current.add(tf.layers.dense({ units: 256, activation: 'relu', inputShape: inputShape.current }))
        model.current.add(tf.layers.dense({ units: 128, activation: "relu" }))
        model.current.add(tf.layers.dense({ units: 64, activation: "relu" }))
        model.current.add(tf.layers.dense({ units: 32, activation: "relu" }))
        model.current.add(tf.layers.dense({ units: Object.keys(trainDataObj.current).length, activation: "softmax" }))
        model.current.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy', metrics: ['categoricalAccuracy'] })
        model.current.summary()
        console.log(model.current.fit(prepairedDataX.current, prepairedDataY.current, { epochs: 200, validationSplit: 0.2, verbose: 2, callbacks: { onEpochEnd: trainCallback, onTrainEnd: saveModel } }))

    }
    return (<>

        <h1 className={styles.title}>Collect data to train your model</h1>
        {Object.keys(trainDataObj.current).length ? <p>You have collected data in <span>{Object.keys(trainDataObj.current).join(", ")}</span>. Your custom model will only be able to detect this symbols</p> : "Loading"}
        {dataComplaint ? <></> : <p> Your data collection dosent have &lsquo;control&rsquo; which is required to train the model</p>}
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
            <label htmlFor="trainTestSplit">
                <span>Train Test Split: {parseInt(trainTestSplit * 100)}%</span>
                <input type="range" name="trainTestSplit" id="trainTestSplit" value={trainTestSplit} min={0} max={1} step={0.01} onChange={e => setTrainTestSplit(e.target.value)} />
            </label>
            <button onClick={trainData}>Train Data</button>
        </div>
        <div className={styles.outputDiv}>

            <div>
                <h2 className={styles.capturedTitle}>Model Statistics</h2>
                <div>
                    <p>Validation Loss:{(modelStatts.val_loss * 100).toFixed(5)}%</p>
                    <p>Loss:{(modelStatts.loss * 100).toFixed(5)}%</p>
                    <p>Validation Accuracy:{(modelStatts.val_categoricalAccuracy * 100).toFixed(5)}%</p>
                    <p>Accuracy:{(modelStatts.categoricalAccuracy * 100).toFixed(5)}%</p>
                </div>
            </div>
        </div>

    </>)
}

export default ModelTrain
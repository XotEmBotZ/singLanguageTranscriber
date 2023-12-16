'use client'
import React, { useEffect } from 'react'
import * as tf from '@tensorflow/tfjs';
import Detector from '@/components/Detector';

const Detect = () => {

    //Constants
    const modelUrl = '/modelv2_web/model.json'
    //Effects
    useEffect(() => {
        //Load model to localstorage
        if (localStorage.getItem('model') === null) {
            tf.loadGraphModel(modelUrl).then(modelOpt => {
                modelOpt.save('localstorage://model')
                console.log('Model saved to localstorage')
            });
        }
    }, [])
    return (
        <>
            <h1>Detect Signs</h1>
            <Detector></Detector>
        </>
    )
}

export default Detect
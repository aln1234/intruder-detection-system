"use client"


import React, { useRef, useState, useEffect } from "react";
import Webcam from 'react-webcam'
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import { drawRect } from "@/utils/utils";
import Image from 'next/image'

const Detection = () => {

    const webcamRef = useRef(null)
    const canvasRef = useRef(null)
    const [webcamOn, setWebcamOn] = useState(false)
    const [prediction, setPrediction] = useState("Unknown")
    const [screenShot, setScreenShot] = useState("")

    //run Webcam

    const handleWebcam = () => {

        setWebcamOn(!webcamOn)
        runCoco()
    }

    // Main function to run model

    const runCoco = async () => {
        const net = await cocossd.load()

        //loop and detect hands
        setInterval(() => {
            detect(net)

        }, 10)
    }


    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };



    //Detect model
    const detect = async (net) => {
        //Check data is available
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current
            !== null &&
            webcamRef.current.video.readyState === 4
        ) {
            //get video properties
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            //set videowidth
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            //Make predictions
            const obj = await net.detect(video)
            setPrediction(obj)
            //draw mesh
            const ctx = canvasRef.current.getContext("2d")
            drawRect(obj, ctx)


            //if person capture photo of person


            if (obj[0]?.class === "person") {
                setTimeout(() => {
                    console.log("Time out is called")
                    const imageSrc = webcamRef?.current.getScreenshot();
                    setScreenShot(imageSrc)
                }, 100)


            }
        }
    }
    console.log(screenShot)
    return (
        <section className="flex flex-col items-center" >
            <button onClick={handleWebcam} className="text-md font-bold bg-red-400 rounded-full px-4 py-4 text-white cursor">
                {!webcamOn ? "Start Webcam" : "Stop Webcam"}</button>

            <div >
                {webcamOn && (<div>
                    <h1 className="text-2xl font-bold capitalize">{prediction[0]?.class}</h1>
                    < Webcam
                        ref={webcamRef}
                        muted={true}
                        videoConstraints={videoConstraints}
                        screenshotFormat="image/jpeg"
                        style={{
                            position: "absolute",
                            marginLeft: "auto",
                            marginRight: "auto",
                            left: 0,
                            right: 0,
                            zindex: 9,
                            width: 600,
                            height: 450,
                        }}
                    />
                    <canvas
                        ref={canvasRef}
                        style={{
                            position: "absolute",
                            marginLeft: "auto",
                            marginRight: "auto",
                            left: 0,
                            right: 0,
                            textAlign: "center",
                            zindex: 8,
                            width: 640,
                            height: 480,
                        }}
                    />


                </div>


                )}
            </div>
            {screenShot && !webcamOn && (
                <div className="flex flex-col items-center gap-4">
                    <h1> There is a intruder in the frame</h1>
                    <Image src={screenShot} alt="captured photo" width={400} height={400} />

                </div>)}

        </section>
    )
}

export default Detection
"use client"

import Webcam from 'react-webcam'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';

function RecordAnssection() {

    const [useranswer,setuseranswer]=useState("");
    const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });
useEffect(()=>{
results.map((result)=>(
    setuseranswer(prevAns=>result?.transcript)
))
},[results])


    return (
        <div className='flex items-center justify-center flex-col'>
            <div className='flex flex-col justify-center bg-secondary rounded-lg p-5 mt-20'>
                <Webcam
                    mirrored={true}
                    style={
                        {
                            height: 300,
                            width: "100%",
                            zIndex: 10
                        }
                    } />
            </div>
            <Button variant="outline" className="my-10"
            onClick={isRecording?stopSpeechToText:startSpeechToText}
            >
                {isRecording?<h2 className='text-red-700 flex gap-2'><Mic/>Stop Recording.</h2>:
                'Record Answer'}</Button>
        <Button onClick={()=>console.log(useranswer)}>show user answer</Button>
        </div>
    )
}

export default RecordAnssection
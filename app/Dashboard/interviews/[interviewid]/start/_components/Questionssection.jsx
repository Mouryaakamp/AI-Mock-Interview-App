import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

function Questionssection({ Mockinterviewquestions, activequestionindex }) {
    const textospeach=(text)=>{
if('speechSynthesis' in window){
    const speech=new SpeechSynthesisUtterance(text)
    window.speechSynthesis.speak(speech)
}
else{
    alert("sorry your browser do not support text to speech")
}
    }
    
    
    return (
        <div className='p-5 border rounded-lg my-10'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {Mockinterviewquestions && Mockinterviewquestions.map((question, index) => (
                    <h2
                        key={index}
                        className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer
      ${activequestionindex === index ? 'bg-blue-800 text-white' : 'bg-secondary'}`}
                    >
                        Question#{index + 1}
                    </h2>
                ))}

            </div>
            <h2 className='my-5 text-md md:text-lg'>{Mockinterviewquestions[activequestionindex]?.question}</h2>
<Volume2 className='cursor-pointer' onClick={()=>textospeach(Mockinterviewquestions[activequestionindex]?.question)}/>

            <div className='border rounded-lg p-5 bg-blue-200 mt-20'>
                <h2 className='flex gap-2 items-center text-blue-800'>
                    <Lightbulb />
                    <strong>Note</strong>
                </h2>
                <h2 className='text-sm text-blue-800'>{process.env.NEXT_PUBLIC_INFO}</h2>
            </div>

        </div>
    )
}

export default Questionssection
import React, { useState, useEffect } from 'react'
import './timer.css'
import { useGlobal } from '../../context/globalState'

function Timer() {
    const { minute, val, second, setIsActive, isActive, stopTimer, answer, handleAnswerChange, n, success, setSuccess, counter } = useGlobal()
    const [mainScore, setMainscore] = useState(0)

    useEffect(() => {
        if (localStorage.getItem('score')) {
            setMainscore(localStorage.getItem('score'))
        }
    }, [localStorage.getItem('score'), n])

    useEffect(() => {
        if (mainScore < counter) {
            setSuccess("Success")
        }
    }, [mainScore, success])

    return (
        <div className='mainContainer'>
            <div className="container">
                <div className='char-container'>
                    <h1 className='char'>
                        {!success && val}
                        {success && success}
                    </h1>
                </div>
                <div className="time">
                    <span>Time: </span>
                    <span className="minute">{minute}</span>
                    <span>:</span>
                    <span className="second">{second}</span>
                </div>

                <button onClick={() => setIsActive(!isActive)} className="button start"> {isActive ? "Pause Game" : "Start Game"}</button>

                <div className='scorebox'>
                    MY Best Time : {`${mainScore ? mainScore : 'not yet pls play game'}`}
                </div>
                <div className="buttons">
                    <div className='input-container'>
                        <input placeholder='Type here' className='char-input' type="text" value={answer} onKeyPress={handleAnswerChange} />
                    </div>

                    <div className='reset-container'>
                        <button onClick={stopTimer} className="reset">Reset</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Timer

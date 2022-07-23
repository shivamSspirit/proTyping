import React, { useState, useEffect, useContext } from "react";

const GlobalContext = React.createContext('TimeContext');

const GlobalProvider = ({ children }) => {

    const maingenerator = () => {
        const alphabet = "abcdefghijklmnopqrstuvwxyz"
        return alphabet[Math.floor(Math.random() * alphabet.length)]
    }


    const [second, setSecond] = useState('00');
    const [minute, setMinute] = useState('00');
    const [isActive, setIsActive] = useState(false);
    const [counter, setCounter] = useState(0);
    const [showSuccess,setShowSucces] = useState('')

    const [n, setN] = useState(20)
    const [val, setVal] = useState(maingenerator())
    const [answer, setAnswer] = useState('')
    const [useranswer, setuserAnswer] = useState([])

    console.log('useranser',useranswer)


   
    useEffect(() => {
        if (isActive)
            if (n > 0) {
                if (val.toLowerCase() === answer.toLowerCase()) {
                   
                    setTimeout(() => {
                        setN(n => n - 1);
                        setuserAnswer([...useranswer, answer?.toLowerCase()])
                        const val = maingenerator();
                        setVal(val.toLowerCase())
                    }, 0)
                }
            }
    }, [n, ,val, answer, isActive, useranswer])

    useEffect(() => {
        if (val !== answer) {
            setCounter(counter => counter + 0.5)
        }
    }, [answer])

    useEffect(() => {
        if (n === 0) {
            setShowSucces('success')
            stopTimer();
            console.log('timescore', counter)
        }
    }, [n])

    function handleAnswerChange(e) {
        setAnswer(e.key)
    }


    useEffect(() => {
        let intervalId;

        if (isActive) {
            intervalId = setInterval(() => {
                const secondCounter = counter % 60;
                const minuteCounter = Math.floor(counter / 60);

                const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter;
                const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter;

                setSecond(computedSecond);
                setMinute(computedMinute);

                setCounter(counter => counter + 1);
            }, 1000)
        }

        return () => clearInterval(intervalId);
    }, [isActive, counter])


    function stopTimer() {
        setIsActive(false);
        setCounter(0);
        setSecond('00');
        setMinute('00');
        setAnswer('');
        setVal('');
        setN(20);
    }



    const contextValue = {
        minute, second, setIsActive, isActive, stopTimer, answer, val, handleAnswerChange,showSuccess,counter
    }
    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider

export const useGlobal = () => useContext(GlobalContext)






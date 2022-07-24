import React, { useState, useEffect, useContext } from "react";

const GlobalContext = React.createContext('TimeContext');

const GlobalProvider = ({ children }) => {
    // generate single char
    const maingenerator = () => {
        const alphabet = "abcdefghijklmnopqrstuvwxyz"
        return alphabet[Math.floor(Math.random() * alphabet.length)]
    }
    // second && minute counter state
    const [second, setSecond] = useState('00');
    const [minute, setMinute] = useState('00');
    //  when app starts
    const [isActive, setIsActive] = useState(false);
    const [counter, setCounter] = useState(0);
    // char iteration
    const [n, setN] = useState(20)
    // get value from function generateor
    const [val, setVal] = useState(maingenerator())
    // typed char from user
    const [answer, setAnswer] = useState('')
    // all right answers of user in one game
    const [useranswer, setuserAnswer] = useState([])

    // for success or beaten
    const [success, setSuccess] = useState('')



    // effect for moving forward when user enter right char
    useEffect(() => {
        if (isActive)
            if (n > 0) {
                if (val.toLowerCase() === answer.toLowerCase()) {

                    setTimeout(() => {
                        setN(n => n - 1);
                        setuserAnswer([...useranswer, answer?.toLowerCase()])
                        const val = maingenerator();
                        setVal(val.toLowerCase())
                    }, 94)
                }
            }
    }, [n, val, answer, isActive, useranswer])


    // effect for single time penelty
    useEffect(() => {
        if (val !== answer) {
            setCounter(counter => counter + 0.5)
        }
    }, [answer, isActive])



    // effect for persisting score
    useEffect(() => {
        if (n === 0) {
            if (localStorage.getItem("score")) {
                if (counter < localStorage.getItem("score")) {
                    localStorage.setItem("score", counter);
                }
            } else {
                localStorage.setItem("score", counter)
            }
        }
    }, [n])

    function handleAnswerChange(e) {
        setAnswer(e.key)
    }

    // effect for timer
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


    // reset everythings

    function stopTimer() {
        setIsActive(false);
        setCounter(0);
        setSecond('00');
        setMinute('00');
        setAnswer('');
        setVal('');
        setN(20);
        setSuccess('')
    }

    const contextValue = {
        minute, second, setIsActive, isActive, stopTimer, answer, val, handleAnswerChange, counter, stopTimer, success, setSuccess
    }
    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider

export const useGlobal = () => useContext(GlobalContext)






import React, { useState, useEffect } from 'react';


const App: React.FC = () => {
const [activeStream, setActiveStream] = useState(false)
const [aqiMock, setAqiMock] = useState(0)
const [streamMsg, setStreamMsg] = useState("")

const generateRandomNumber = (interval: number) => {
    if(interval >= 0){
    const randomNo = Math.random() * 400
    console.log(randomNo)
    setAqiMock(randomNo)
    setTimeout(() => generateRandomNumber(interval - 1), 1000)
    }
    else {
      setStreamMsg("Stream stopping...")
      setTimeout(() => {
        setActiveStream(false)},
        3000)
    }
}

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    setStreamMsg('Stream is running...  (' + aqiMock +')');
  }, [aqiMock])
  return (
    <div>
      <h1>Pollution mock service</h1>
      {activeStream && <h3>{streamMsg}</h3>}
      <button onClick={() => {
        setActiveStream(true);
        generateRandomNumber(10)}}>Start stream</button>
      <button onClick={() => setActiveStream(false)}>Stop stream</button>
    </div>
  )
}
export default App;

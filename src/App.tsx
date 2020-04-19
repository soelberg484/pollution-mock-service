import React, { useState, useEffect } from 'react';


const App: React.FC = () => {
const [activeStream, setActiveStream] = useState(false)
const [aqiMock, setAqiMock] = useState(0)
const [streamMsg, setStreamMsg] = useState("")
const url = "http://localhost:8081/visualIndicator"

const generateRandomNumber = (interval: number) => {
    if(interval >= 0){
    setAqiMock(Math.random() * 400)
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        aqi: Math.random() * 400,
      }),
    });
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

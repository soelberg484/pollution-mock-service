import React, { useState, useEffect } from 'react';



interface AqiData {
  id: number
  longtude: number
  latitude: number
  datetime: string
  aqiLvl: number
}


const App: React.FC = () => {
  const [activeStream, setActiveStream] = useState(false)
  const [aqiMock, setAqiMock] = useState<AqiData>({ id: 0, longtude: 0, latitude: 0, datetime: "", aqiLvl: 0 })
  const [streamMsg, setStreamMsg] = useState(<></>)
  const url = "http://localhost:8081/pollutionDataInput"

  const generateRandomDate = (interval: number) => {
    if (interval >= 0) {
      const data: AqiData = {
        id: generateRandomId(),
        longtude: generateRandomLongtude(),
        latitude: generateRandomLatitude(),
        datetime: new Date().toLocaleString(),
        aqiLvl: generateRandomPollutionLvl()
      }
      setAqiMock(data);

      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: data.id,
          longitude: data.longtude,
          latitude: data.latitude,
          datetime: data.datetime,
          aqi: data.aqiLvl,
          eventType: "aqi"
        }),
      });
      setTimeout(() => generateRandomDate(interval - 1), 1000)
    }
    else {
      setStreamMsg(<h3>Stream stopping...</h3>)
      setTimeout(() => { setActiveStream(false)}, 3000)
    }
  }

  const generateRandomPollutionLvl = () => {
    const random = Math.random() * 400
    return random
  }

  const generateRandomLongtude = () => {
    const random = Math.random() * 360 - 180
    return random
  }

  const generateRandomLatitude = () => {
    const random = Math.random() * 180 - 90
    return random
  }

  const generateRandomId = () => {
    const random = Math.floor(Math.random() * 101);
    return random
  }

  useEffect(() => {
    // Update the document title using the browser API
    setStreamMsg(<>
      <h3>Stream is running...</h3>
      <h4>Visual indicator: {aqiMock.id} </h4>
      <h4>Cordinates: Longtude: {aqiMock.longtude} , Latitude: {aqiMock.latitude}</h4>
      <h4>Datetime: {aqiMock.datetime}</h4>
      <h4>Aqi level: {aqiMock.aqiLvl}</h4> </>);
  }, [aqiMock])
  

  return (
    <div>
      <h1>Pollution mock service</h1>
      {activeStream && streamMsg}
      <button onClick={() => {
        setActiveStream(true);
        generateRandomDate(10)
      }}>Start stream</button>
    </div>
  )
}
export default App;

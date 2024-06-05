import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { RiCelsiusFill } from "react-icons/ri";

function App() {
  const API_KEY = "62d6b151558b4e96c9011a4be8b14084";
  const [city, setCity] = useState("");
  const [info, setInfo] = useState({});
  const [isActive, setIsActive] = useState(false);
  const handleChange = (e) => {
    setCity(e.target.value)

  }

  const handleClick = async () => {
    const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=tr&appid=${API_KEY}&units=metric`
    console.log( BASE_URL);
    await axios(BASE_URL).then(async data => {
      await setInfo(data.data)
    }).catch(err => console.log("Hatanız : ", err));
    setIsActive(true);
  }



  return (
    <div>
      <h1>Hava Durumu Uygulaması</h1>
      <div className="form">
        <input value={city} className="inputText" type="text" placeholder="Şehri Giriniz" onChange={handleChange} />
      </div>
      <div className="btnDiv">
        <button type='submit' onClick={handleClick} className="btn">Verileri Getir</button>
      </div>
      {
        isActive ? <div className="info">
          <p id="havaDurumu">Hava Durumu</p>
          <p id="sehir">{info.name} ,{info.sys.country} </p>
          <div className="genelDeger">
            <p id="sicaklik">{info.main.temp} </p><RiCelsiusFill className="fa-c" />
          </div>
          <p className='description'>{info.weather[0].description}</p>

          <div className="his">
            <p id="hissedilen">Hissedilen : {info.main.feels_like}</p><RiCelsiusFill className="fa-circle" />
          </div>

        </div> : null
      }
    </div >
  )
}

export default App

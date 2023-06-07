import {useEffect, useState} from "react";
import './AplicacionClima.css'
import  cloud from './img/amcharts_weather_icons_1.0.0/static/cloudy.svg'
import  moon from './img/amcharts_weather_icons_1.0.0/static/night.svg'
import  night from './img/amcharts_weather_icons_1.0.0/static/cloudy-night-3.svg'
import  wind from './img/amcharts_weather_icons_1.0.0/static/rainy-1.svg'
import  rain from './img/amcharts_weather_icons_1.0.0/static/rainy-6.svg'
import  cloudy from './img/amcharts_weather_icons_1.0.0/static/cloudy-day-3.svg'
import  sun from './img/amcharts_weather_icons_1.0.0/static/day.svg'
import { BsFillDropletFill} from "react-icons/bs";
import {FaTemperatureHigh, FaTemperatureLow, } from "react-icons/fa";
import {SelectLocation} from "./SelecLocation";


export function AplicacionClima() {
    const [recibido, setRecibido] = useState(false);
    const [datos, setDatos] = useState(null);
    const [URL, setURL] = useState('Bella%20Union%20Artigas%20Uruguay');


    useEffect(() => {


        const iconos = {
            'wind': wind,
            'rain': rain,
            'clear-night': moon,
            'partly-cloudy-night': night,
            'partly-cloudy-day': cloudy,
            'cloudy': cloud,
            'clear-day': sun,
        }
     
try {
    
            async function APICall() {
                const APIKEY = 'GZTNXEAF42TTNC9ELYNP62LCP';
                let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${URL}?unitGroup=metric&include=alerts%2Cdays%2Chours%2Ccurrent&key=${APIKEY}&contentType=json`);
                let json = await response.json();
                const IconSelect = (type) => iconos[type];
                const iconoSeleccionado = IconSelect(json.currentConditions.icon);
                setDatos({
                    Localizacion: json.resolvedAddress,
                    Fecha: json.days[0].datetime,
                    Hora: json.currentConditions.datetime,
                    Temperatura: json.currentConditions.feelslike,
                    TempMax: json.days[0].tempmax,
                    Humedad: json.currentConditions.humidity,
                    TempMin: json.days[0].tempmin,
                    Icono: iconoSeleccionado,
                    Desc: json.days[0].description,
                });
                setRecibido(true);
            }
            
} catch (error) {
    
}

        APICall();

    }, [URL]);

    if (!recibido) {
        return <h3>CARGANDO..</h3>;
    }

    return (

        <main>
            <div className={'background'}></div>
            <SelectLocation recibirURL={setURL}/>
                <article>
                    <h2 className={'desc'}>{datos.Desc}</h2>

                    <section className="temp-sec">

                        <div className="img-container">
                            <img src={datos.Icono} alt="icono" className={'iconito'}/>
                        </div>
                        <div className="temp">
                            <p>{datos.Temperatura}°</p>

                            <h6>{datos.Localizacion}</h6></div>
                    </section>
                    <div className="temp-vars">

                        <section className="max-temp">
                            <span><FaTemperatureHigh/></span>
                            <p>{datos.TempMax}°</p>

                        </section>
                        <section className="humedad">
                            <span><BsFillDropletFill/></span>
                            <p>{datos.Humedad}%</p>
                        </section>
                        <section className="min-temp">
                            <span><FaTemperatureLow/></span>
                            <p>{datos.TempMin}°</p>
                        </section>
                        <div className="fecha-contenedor"><h1>{datos.Fecha} / {datos.Hora}</h1></div>
                    </div>
                </article>
        </main>
    );
}


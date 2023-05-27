import {useEffect, useState} from "react";
import './AplicacionClima.css'
import  cloud from './img/amcharts_weather_icons_1.0.0/static/cloudy.svg'
import  moon from './img/amcharts_weather_icons_1.0.0/static/night.svg'
import  night from './img/amcharts_weather_icons_1.0.0/static/cloudy-night-3.svg'
import  wind from './img/amcharts_weather_icons_1.0.0/static/rainy-1.svg'
import  rain from './img/amcharts_weather_icons_1.0.0/static/rainy-6.svg'
import  cloudy from './img/amcharts_weather_icons_1.0.0/static/cloudy-day-3.svg'
import  sun from './img/amcharts_weather_icons_1.0.0/static/day.svg'
import bg from './img/wallpaperbetter.com_3840x2160 (2).jpg'
import { BsFillDropletFill} from "react-icons/bs";
import {FaTemperatureHigh, FaTemperatureLow, } from "react-icons/fa";


export function AplicacionClima() {
    const [recibido, setRecibido] = useState(false);
    const [datos, setDatos] = useState(null);

    const iconos = {
        'wind': wind,
        'rain': rain,
        'clear-night': moon,
        'partly-cloudy-night': night,
        'partly-cloudy-day': cloudy,
        'cloudy': cloud,
        'clear-day': sun,
    }
    async function APICall() {
        const APIKEY = 'GZTNXEAF42TTNC9ELYNP62LCP';
        let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Bella%20union%20artigas%20uruguay?unitGroup=metric&key=${APIKEY}&contentType=json`);
        let json = await response.json();
        const IconSelect = (type) => iconos[type];
        const iconoSeleccionado = IconSelect(json.days[0].icon);
        setDatos({
            Localizacion: json.resolvedAddress,
            Fecha: json.days[0].datetime,
            Temperatura: json.days[0].temp,
            TempMax: json.days[0].tempmax,
            Humedad: json.days[0].humidity,
            TempMin: json.days[0].tempmin,
            Icono: iconoSeleccionado,
            Desc: json.days[0].description,
        });


        setRecibido(true);
    }

    useEffect(() => {
        APICall();

    }, []);

    if (!recibido) {
        return <h3>Cargando...</h3>;
    }

    return (
        <main>
            <div className={'background'}></div>
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
                        <div className="fecha-contenedor"><h1>{datos.Fecha}</h1></div>
                    </div>
                </article>
        </main>
    );
}
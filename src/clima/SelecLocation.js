import React from "react";
import {useState} from "react";
import "./SelecLocation.css"

export function SelectLocation (props){

    const [texto, SetTexto] = useState('')
    const [URL,setURL] = useState('Bella%20union%20Artigas%20uruguay')

    const HandleChange = event => {
        SetTexto(event.target.value)
    }
    const ClickEvent = () =>{
       setURL(encodeURIComponent(texto))
    }
    return (
        <nav>
            <form>
                <input
                    type={"text"}
                    id={'input'}
                    name={'input'}
                    value={texto}
                    placeholder={'Ingrese la localizacion deseada'}
                    onChange={HandleChange}
                />
                <button onClick={ClickEvent}
                        type={"button"}
                >Buscar</button>
                {props.recibirLlamado(URL)}
            </form>
        </nav>
    )
}
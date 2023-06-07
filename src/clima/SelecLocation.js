import React from "react";
import {useState} from "react";
import "./SelecLocation.css"
import {AiOutlineSearch, AiOutlineMenu, AiOutlineCloseCircle} from "react-icons/ai";

export function SelectLocation ({recibirURL}){

    const [texto, SetTexto] = useState('');
    const [state, setState] = useState(false);

    const HandleChange = event => {
        SetTexto(event.target.value)
    }
    const ClickEvent = (e) =>{
        e.preventDefault()
        recibirURL(encodeURIComponent(texto));
    }

    const CambiarEstado = (e) =>{
        e.preventDefault();
        setState(prevState => !prevState);
    }
    return (
        <div className={'Padre'}>
            <button
                className={'Open'}
                onClick={CambiarEstado}

            >{(state) ? <AiOutlineCloseCircle/>:  <AiOutlineMenu/>}</button>

            <nav className={(state) ? 'visible' : 'hidden'}>
                <div className={'MainContainer'}>
                    <div className={'Container'}>
                        <form>
                            <div>   <input
                                type={"text"}
                                id={'input'}
                                name={'input'}
                                value={texto}
                                placeholder={'Ingrese una localizacion'}
                                onChange={HandleChange}
                                onkeypress={ClickEvent}
                            />
                                <button onClick={ClickEvent}
                                        type={"button"}
                                ><AiOutlineSearch/></button></div>
                        </form>
                    </div>
                </div>
            </nav>
        </div>

    )
}

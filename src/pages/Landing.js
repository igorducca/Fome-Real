import React from 'react';
import { Link } from 'react-router-dom'

import '../stylesheet/pages/landing.css'
import '../stylesheet/global.css'

import pngIcon from '../assets/fome-real-png.png'
import bike from '../assets/sapiens-bike.svg'
import loading from '../assets/loading.gif'

import { FaSearch } from 'react-icons/fa'

import $ from 'jquery'

import axios from 'axios'

export default function Landing() {

    function comidaInputClick() {

        document.getElementById("loadingGIF").hidden = false;

        document.getElementById("bodyMainContent").style.marginTop = "15px"

        axios.get("https://fomereal-server.herokuapp.com/comidas/tipos/list")
        .then(resp => {
            const data = resp.data

            data.forEach(dataE => {

                document.getElementById("fountFoodType").hidden = false;

                var str = `<a href="/pedir?cmd=${dataE.tipo}" id="liGen${dataE.tipo}"> <li>${dataE.tipo}</li> </a>`

                $("#foodTypeGener").append(str)
            })
        })

        document.getElementById("loadingGIF").hidden = true;
    }

    return (
        <div> 
            <div className="landingHeader">
                <header>
                    <div className="centered">
                        <div className="headerLogo">
                            <img src={pngIcon} />
                        </div>
                    </div>

                    <div className="centered">
                        <h1>Nunca foi tão fácil pedir comida em <strong>Lagoa Real</strong></h1>
                    </div>

                    <div className="centered">
                        <form>
                            <div className="searchFoodInput">
                                <FaSearch size={32} color={'red'}/>
                                <input placeholder="Tá afim de pedir alguma coisa?" name="cmd" id="searchComidaInput" onClick={comidaInputClick}/>
                            </div>

                            <div className="centered">
                                <div className="fountFoodType" id="fountFoodType" hidden>
                                    <ul id="foodTypeGener">
                                    </ul>

                                    <div className="centered">
                                        <a href="/pedir"><h2>Ver mais opções</h2></a>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="centered">
                        <img src={loading} style={{marginTop:"15px", height:"200px", width:"200px"}} id="loadingGIF" hidden/>
                    </div>

                </header>
            </div>

            <div className="bodyMainContent" id="bodyMainContent">
                <div className="centered">
                    <h1 id="introText">Você tem um restaurante e quer entrar na nossa plataforma?</h1>
                </div>

                <div className="enterImageWrapper">
                    <div className="centered">
                        <img src={bike} />
                    </div>

                    <div className="centered">
                        <h1>Pode guardar sua bike</h1>
                    </div>

                    <div className="centered">
                        <h1>Agora você vai conseguir clientes deitado</h1>
                    </div>

                    <div className="centered">
                        <Link to="/criar">
                            <button id="createRestaurantPointButton">Adicionar minha loja</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
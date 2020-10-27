import React, { useState, useEffect } from 'react'
import { useLocation, useHistory, Link } from 'react-router-dom'
import $ from 'jquery'

import "../stylesheet/pages/page.pedir.css"
import Sidebar from "../components/sidebar"
import axios from 'axios'

export default function Pedir() {

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    
    const { goBack } = useHistory()

    let query = useQuery();

    var produto = query.get("cmd");

    useEffect(() => {
        if(!query.get("cmd")) {
            axios.get("https://fomereal-server.herokuapp.com/comercios/list")
            .then(resp => {
                var data = resp.data

                var target = "#mainGeneratedContent"
    
                data.forEach(storeBox => {
                    var str = ` <div id="generatedBox"> <div id="generatedBoxTitle"> <div id="centeredBoxComponent"> <h1>${storeBox.nome_da_loja}</h1> </div> </div> <div id="generatedBoxContent"> <div id="centeredBoxComponent"> <a href="/lojas/${storeBox.nome_da_loja}"> <img src="${storeBox.imagem}" id="generatedBoxImage"/> </a> </div><div id="centeredBoxComponent"> <h2>Loja de: ${storeBox.nome_do_dono}</h2></div> </div> </div>`
                    
                    $(target).append(str)
                })
            })
        }
        if(query.get("cmd")) {

            document.getElementById("headerProdutoTitle").innerText = `Então hoje é dia de ${produto}, né?`
            document.getElementById("productNameIndicator").innerText = `Todas essas lojas aqui vendem ${produto}, escolha uma e faça seu pedido!`

            axios.get("https://fomereal-server.herokuapp.com/comidas/get/tipo/" + produto)
            .then(resp => {
                var data = resp.data

                if(data != null) {
                    if(data.length = 1) {

                        var target = "#mainGeneratedContent"

                        var str = ` <div id="generatedBox"> <div id="generatedBoxTitle"> <div id="centeredBoxComponent"> <h1>${data.nome_da_loja}</h1> </div> </div> <div id="generatedBoxContent"> <div id="centeredBoxComponent"> <a href="/lojas/${data.nome_da_loja}"> <img src="${data.imagem}" id="generatedBoxImage"/> </a> </div><div id="centeredBoxComponent"> <h2>Loja de: ${data.nome_do_dono}</h2></div> </div> </div>`
                            
                        $(target).append(str)
                    }
                    else if (data.length >= 1) {
                        data.forEach(storeBox => {
                            var str = ` <div id="generatedBox"> <div id="generatedBoxTitle"> <div id="centeredBoxComponent"> <h1>${storeBox.nome_da_loja}</h1> </div> </div> <div id="generatedBoxContent"> <div id="centeredBoxComponent"> <a href="/lojas/${storeBox.nome_do_dono}"> <img src="${storeBox.imagem}" id="generatedBoxImage"/> </a> </div><div id="centeredBoxComponent"> <h2>Loja de: ${storeBox.nome_do_dono}</h2></div> </div> </div>`
                            
                            $(target).append(str)
                        })
                    }
                }
                else {
                    document.getElementById("productNameIndicator").hidden = true;
                    document.getElementById("unknownProductH1").innerText = `Ainda não conheço ninguém que vende ${produto}...`
                }
            })
        }
    }, [])

    if(query.get('cmd')) {
        return (
            <div style={{display:"column"}}>
                <Sidebar />

                <header>
                    <div className="headerBarPedir">
                        <div className="centered">
                            <h1 id="headerProdutoTitle"></h1>
                        </div>

                        <div className="centered">
                            <h2 id="productNameIndicator"></h2>
                        </div>

                        <div className="centered">
                            <h1 id="unknownProductH1"></h1>
                        </div>

                        <div className="centered">
                            <h1>Você vende?</h1>
                        </div>

                        <div className="centered">
                            <Link to="/criar">
                                <button id="createRestaurantPointButtonEs">Fazer parte</button>
                            </Link>
                        </div>
                    </div>
                </header>

                <div id="mainGeneratedContent" />
            </div>
        )
    }
    else {

        $(document).ready(function discoverProducts() {
            document.getElementById("headerProdutoTitle").innerText = `Vamos escolher algo para pedir`
        })

        return (
            <div className="mainContent">
                <Sidebar />

                <header>
                    <div className="headerBarPedir">
                        <div className="centered">
                            <h1 id="headerProdutoTitle"></h1>
                        </div>
                    </div>
                </header>

                <div className="centered">
                    <div id="mainGeneratedContent" />
                </div>
            </div>
        )
    }
}
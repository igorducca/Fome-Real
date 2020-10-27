import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import Sidebar from "../components/sidebar"

import { FiPlus, FiCheck } from 'react-icons/fi';

import whats from '../assets/whats.png'

import "../stylesheet/pages/lojas.css"

export default function Lojas() {

    let { id } = useParams();

    function avalInputOpen() {

        axios.get(`https://fomereal-server.herokuapp.com/comercio/find/loja/${id}`)
        .then(resp => {
            var nomeDaLoja = resp.data.nome_da_loja
            var input = "avalInput"
            document.getElementById("avalInput").hidden = false;
            document.getElementById("avalNameInput").hidden = false;
            $("#"+input).attr('placeholder', `Escreva sua opinião sobre a loja ${nomeDaLoja}`)
            document.getElementById("verifyAval").style.opacity = "100%"
        })
    }

    function avalPost() {

        var aval = document.getElementById("avalInput").value
        var autor = document.getElementById("avalNameInput").value

        axios.post("https://fomereal-server.herokuapp.com/comercio/avaliar/Reinaldo", {
            avaliacao: aval,
            autor: autor
        })
        .then(resp => {
            console.log(resp)

            if(resp.data.sucesso = true) {
                window.location.href = window.location.href
            }
        })
    }

    useEffect(() => {
        axios.get(`https://fomereal-server.herokuapp.com/comercio/find/loja/${id}`)
        .then(resp => {
            var data = resp.data

            var whatsNum = '+55' + resp.data.whats

            var avaliacoes = resp.data.avaliacoes

            document.getElementById("lojaImg").src = `${data.imagem}`
            document.getElementById("descriptH2").innerText = `"${data.descricao}"`
            document.getElementById("pageTitle").innerText = `${data.nome_da_loja}`
            document.getElementById("donoName").innerText = `A loja de ${data.nome_do_dono}`
            document.getElementById("cardapioH2").innerText = `Confira o cardápio do ${data.nome_da_loja}`
            document.getElementById("cardapioImg").src = `${data.cardapio}`

            document.getElementById("atendimentoTextTitle").innerText = `Quando o ${data.nome_do_dono} pode te atender`
            document.getElementById("atendimentoText").innerText = `${data.atendimento}`
            document.getElementById("whatsButtonText").innerText = `Conversar com ${data.nome_do_dono}`

            document.getElementById("pessoalTitle").innerText = `Instruções de onde fica a loja ${data.nome_da_loja}`
            document.getElementById("pessoalmenteLocal").innerText = `"${data.localizacao}"`

            document.getElementById("hrefButton").href = `https://web.whatsapp.com/send?phone=${whatsNum}`

            avaliacoes.forEach(aval => {
                var genStr = `<div className="avalGen" id="avalGen"> <h2>${aval.autor} disse:</h2> <h3> "${aval.avaliacao}" </h3> </div>`

                $("#avaliacaoGen").append(genStr)
            })
        })
    }, [])

    return (
        <div className="mainContent">
            <form className="create-orphanage-form">
                    <h1 id="pageTitle" />

                    <h3 id="donoName" style={{color:"#37C77F"}}/>

                    <hr />

                    <div className="centered">
                        <img id="lojaImg" style={{height:"300px", width:"500px", borderRadius:"24px", border:"2px solid #37C77F"}} />
                    </div>

                    <div className="centered">
                        <h2 id="descriptH2" style={{color:"#37C77F"}}/>
                    </div>

                    <hr />

                    <h2 id="cardapioH2" />

                    <div className="centered">
                        <img id="cardapioImg" style={{borderRadius:"24px", border:"2px solid #37C77F", maxHeight:"400px", maxWidth:"700px"}}/>
                    </div>

                    <hr />

                    <h2>Gostou né? Vamos fazer seu pedido</h2>

                    <div className="atendimentoWrapper">
                        <div className="centered">
                            <h2 id="atendimentoTextTitle" />
                        </div>

                        <div className="centered">
                            <h3 id="atendimentoText" style={{maxWidth:"500px"}}/>
                        </div>

                        <div className="whatsButtonWrapper centered">
                            <a id="hrefButton" ><button id="whatsButton"><img src={whats} style={{height:"50px", width:"50px"}}/><h3 id="whatsButtonText" /></button></a>
                        </div>
                    </div>

                    <hr />

                    <h2>Prefere pedir pessoalmente?</h2>

                    <div className="atendimentoWrapper">
                        <div className="centered">
                            <h2 id="pessoalTitle" />
                        </div>

                        <div className="centered">
                            <h3 id="pessoalmenteLocal" />
                        </div>
                    </div>

                    <hr />

                    <h2>Veja o que outras pessoas pensam sobre esta loja</h2>

                    <div className="atendimentoWrapper" id="avaliacaoGenWrapper">
                        <div id="avaliacaoGen" />
                        
                        <div className="centered">
                            <FiPlus size={24} style={{cursor:"pointer"}} id="addAval" onClick={ avalInputOpen }/>
                        </div>

                        <div className="centered">
                            <input id="avalNameInput" hidden placeholder="Seu nome"/>
                        </div>

                        <div className="centered">
                            <input id="avalInput" hidden />
                        </div>

                        <div className="centered">
                            <FiCheck size={24} style={{cursor:"pointer"}} id="verifyAval" onClick={ avalPost } style={{opacity:"0%"}} />
                        </div>
                    </div>
                </form>
        </div>
    )
}
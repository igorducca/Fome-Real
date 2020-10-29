import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';

import sucessImg from '../assets/sucess-devices.png';

export default function Sucesso() {

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();

    let token = query.get("tk")

    useEffect(() => {

        axios.get("https://fomereal-server.herokuapp.com/comercio/find/token/"+token)
        .then(resp => {

            var data = resp.data

            var dono = data.nome_do_dono

            document.getElementById("wellDono").innerText = `Muito bem, ${dono}, agora outras pessoas podem ver sua loja! 👏`
            document.getElementById("tokenText").innerText = `Seu token: ${token}`
            document.getElementById("deleteLojaInstruct").innerText = `Anote o seu token, por que se caso você queira remover a sua loja de nossa plataforma, basta nos mandar mensagem no instagram e nos fornecer o token de sua loja`

            var urlNomeDaLoja = encodeURIComponent(data.nome_da_loja.trim())

            axios.post("https://fomereal-server.herokuapp.com/comercio/link/shorten", {
                body: {
                    "url":`https://fomereal.netlify.app/lojas/${urlNomeDaLoja}`
                }
            })
            .then(resp => {
    
                var qrcode = resp.data.qrcode
    
                document.getElementById("qrcodeImg").src = qrcode
            })
        })
    }, [])

    return (
        <form className="create-orphanage-form">
            <h2 style={{color:"#dd3636", fontSize:"28px"}}>Parabéns, a sua loja foi criada com sucesso!</h2>

            <hr />

           <div className="centered">
            <img src={sucessImg} style={{height:"400px", width:"600px"}}/>
           </div>

           <div className="centered">
                <h2 id="wellDono">Muito bem,, agora outras pessoas podem ver sua loja! 👏</h2>
           </div>

           <div className="centered">
               <img id="qrcodeImg" style={{height:"300px", width:"300px"}}/>
           </div>

           <div className="centered">
               <h2>Mostre o seu QRcode para as pessoas nos seus stories do insta marcando o @FomeReal</h2>
           </div>

           <div className="centered">
               <h2>Irei repostar todos que me marcarem 😜</h2>
           </div>

           <div style={{marginTop:"30px"}}>
               <h1>Caso você queira remover sua loja</h1>

               <hr />

               <h2 id="tokenText" style={{color:"red"}}></h2>

               <h3 id="deleteLojaInstruct"></h3>
           </div>
        </form>
    )
}
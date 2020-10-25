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

    const [ FinalUrl, setUrl ] = useState('')

    useEffect(() => {

        axios.get("https://fomereal-server.herokuapp.com/comercio/find/token/"+token)
        .then(resp => {

            console.log(resp)

            var data = resp.data

            var dono = data.nome_do_dono

            document.getElementById("wellDono").innerText = `Muito bem, ${dono}, agora outras pessoas podem ver sua loja! 👏`

            setUrl(`https://fomereal.netlify.app/lojas/${data.nome_da_loja}`)
        })

        axios.post("https://fomereal-server.herokuapp.com/comercio/link/shorten", {
            body: {
                "url":FinalUrl
            }
        })
        .then(resp => {

            console.log(resp)

            var qrcode = resp.data.qrcode

            document.getElementById("qrcodeImg").src = qrcode
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
               <h2>Mostre para as pessoas o QRcode para que eles encontrem sua loja</h2>
           </div>
        </form>
    )
}
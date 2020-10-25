import React from 'react'
import { useParams } from 'react-router-dom'

export default function Lojas() {

    let { loja } = useParams();

    alert(loja)

    return (
        <h1>Lojas</h1>
    )
}
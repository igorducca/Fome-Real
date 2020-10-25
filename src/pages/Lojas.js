import React from 'react'
import { useParams } from 'react-router-dom'

export default function Lojas() {

    let { id } = useParams();

    return (
        <h1>Loja: {id}</h1>
    )
}
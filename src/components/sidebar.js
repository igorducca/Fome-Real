import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import mapMarkerImg from '../assets/map-marker.png'
import '../stylesheet/components/sidebar.css'

export default function Sidebar() {
    const { goBack } = useHistory()

    return (
        <aside className="app-sidebar">
        <img src={mapMarkerImg} alt="Fome Real" />

        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </aside>
    )
}
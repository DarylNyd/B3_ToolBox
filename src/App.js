import logo from './logo.svg'
import './App.css'
import { useEffect, useState } from 'react'
import Dashboard from './components/dashboard'
import ResizeImg from './components/resize-image'
import WelcomePage from './components/welcome'

function App() {
  console.log('electron', window.electron)

  return <WelcomePage />
}

export default App

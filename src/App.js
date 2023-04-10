import logo from './logo.svg'
import './App.css'
import { useEffect, useState } from 'react'
import Dashboard from './components/dashboard'
import ResizeImg from './components/resize-image'

function App() {
  console.log('electron', window.electron)

  return <ResizeImg />
}

export default App

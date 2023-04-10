import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/toolbox.png'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #43a3d3;
  height: 100vh;
`
const Title = styled.h1`
  font-weight: bold;
  font-size: 32px;
  margin-top: 50px;
  margin-bottom: 20px;
`
const Button = styled.button`
  background-color: #cf7af8;
  color: white;
  padding: 14px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 20px;
`

function WelcomePage() {
  return (
    <Container>
      <img src={logo} width='100' alt='logo' />
      <Title>Welcome to your personal toolbox</Title>

      <Button>Resize Image</Button>
    </Container>
  )
}

export default WelcomePage

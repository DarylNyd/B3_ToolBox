import React from 'react'
import './style.css'
import logo from '../../images/picture.png'
import { useState } from 'react'
import styled from 'styled-components'

const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #327ded;
  height: 100vh;
`

const Container2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const Container2label = styled.label`
    display: flex;
    flex-direction: column;
    align-items: center;
    width; 16rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1.75rem;
  padding-bottom: 1.75rem;
  background-color: rgb(255 255 255);
  color: rgb(107 114 128);
  border-radius: 0.5rem;
  letter-spacing: 0.025em;
  text-transform: uppercase;
`
const Container2span = styled.span`
  margin-top: 0.5rem;
  line-height: 1.5;
`
const Container3 = styled.div`
  margin-top: 1.5rem;
`
const Container4 = styled.div`
  margin-top: 1rem;
`

const ResizeImg = () => {
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [filename, setFilename] = useState('')
  const [outputPath, setOutputPath] = useState('')

  const handleFileSelect = event => {
    setSelectedFile(event.target.files[0])
    setFilename(event.target.files[0].name)
    setHeight(event.target.files[0].height)
    setWidth(event.target.files[0].width)
  }

  const handleSubmit = event => {
    event.preventDefault()
    // Code for image resizing goes here
    // Set the output path once resizing is done
    setOutputPath('/path/to/resized/image')
  }

  return (
    <Container1>
      <Container2>
        <Container2label htmlFor='img'>
          <img src={logo} width='32' alt='logo' />
          <Container2span>Select an image to resize</Container2span>
          <input
            id='img'
            type='file'
            className='hidden'
            onChange={handleFileSelect}
          />
        </Container2label>
      </Container2>

      <form
        id='img-form'
        onSubmit={handleSubmit}
        className={selectedFile ? '' : 'hidden'}
      >
        <Container3>
          <label className='mt-1 block text-white text-center w-80 m-auto py-3 shadow-sm border-gray-300 rounded-md'>
            Width
          </label>
          <input
            type='number'
            name='width'
            id='width'
            className='mt-1 block w-80 m-auto p-3 shadow-sm border-gray-300 rounded-md'
            placeholder='Width'
            value={width}
            onChange={event => setWidth(event.target.value)}
          />
        </Container3>

        <Container4>
          <label className='mt-1 block text-white text-center w-80 m-auto py-3 shadow-sm border-gray-300 rounded-md'>
            Height
          </label>
          <input
            type='number'
            name='height'
            id='height'
            className='mt-1 block w-80 m-auto p-3 shadow-sm border-gray-300 rounded-md'
            placeholder='Height'
            value={height}
            onChange={event => setHeight(event.target.value)}
          />
        </Container4>

        <Container3>
          <button
            type='submit'
            className='w-80 m-auto flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-500 hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            Resize
          </button>
        </Container3>
      </form>

      <p className='text-white text-lg text-center font-mono mt-6'>
        <strong>File: </strong>
        <span id='filename'>{filename}</span>
      </p>
      <p className='text-white text-lg text-center font-mono mt-2'>
        <strong>Output: </strong>
        <span id='output-path'>{outputPath}</span>
      </p>
    </Container1>
  )
}

export default ResizeImg

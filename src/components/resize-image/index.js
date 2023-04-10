import React from 'react'
import './style.css'
import logo from '../../images/picture.png'
import { useState } from 'react'
import { ipcRenderer } from 'electron'
import {
  Container1,
  Container2,
  Container2label,
  Container2span,
  Container3,
  Container4
} from './style.js'

const ResizeImg = () => {
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [filename, setFilename] = useState('')
  const [outputPath, setOutputPath] = useState('')

  const form = document.querySelector('#img-form')
  const img = document.querySelector('#img')
  const heightInput = document.querySelector('#height')
  const widthInput = document.querySelector('#width')
  const Toastify = window.Toastify
  const os = window.os
  const path = window.path

  const alertSuccess = message => {
    Toastify.toast({
      text: message,
      duration: 5000,
      close: false,
      style: {
        background: 'green',
        color: 'white',
        textAlign: 'center'
      }
    })
  }

  const alertError = message => {
    Toastify.toast({
      text: message,
      duration: 5000,
      close: false,
      style: {
        background: 'red',
        color: 'white',
        textAlign: 'center'
      }
    })
  }
  // Make sure file is an image
  const isFileImage = file => {
    const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png']
    return file && acceptedImageTypes.includes(file['type'])
  }

  const handleFileSelect = event => {
    setSelectedFile(event.target.files[0])
    setFilename(event.target.files[0].name)

    const file = event.target.files[0]

    // Check if file is an image
    if (!isFileImage(file)) {
      alertError('Please select an image')
      return
    }

    // Add current height and width to form using the URL API
    const image = new Image()
    image.src = URL.createObjectURL(file)
    image.onload = function () {
      widthInput.value = this.width
      heightInput.value = this.height
    }

    // Show form, image name and output path
    form.style.display = 'block'
    filename.innerHTML = img.files[0].name
    outputPath.innerText = path.join(os.homedir(), 'imageresizer')
  }

  const handleSubmit = event => {
    event.preventDefault()
    event.preventDefault()

    if (!img.files[0]) {
      alertError('Please upload an image')
      return
    }

    if (widthInput.value === '' || heightInput.value === '') {
      alertError('Please enter a width and height')
      return
    }

    // Electron adds a bunch of extra properties to the file object including the path
    const imgPath = img.files[0].path
    const width = widthInput.value
    const height = heightInput.value

    ipcRenderer.send('image:resize', {
      imgPath,
      height,
      width
    })
    setOutputPath('/path/to/resized/image')
  }

  // When done, show message
  ipcRenderer.on('image:done', () =>
    alertSuccess(`Image resized to ${heightInput.value} x ${widthInput.value}`)
  )

  // File select listener
  img.addEventListener('change', handleFileSelect)
  // Form submit listener
  form.addEventListener('submit', handleSubmit)

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

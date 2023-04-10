import React from 'react'
import './style.css'
import logo from '../../images/picture.png'
import { useState } from 'react'

const ResizeImg = () => {
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [filename, setFilename] = useState('')
  const [outputPath, setOutputPath] = useState('')

  const handleFileSelect = event => {
    setSelectedFile(event.target.files[0])
    setFilename(event.target.files[0].name)
  }

  const handleSubmit = event => {
    event.preventDefault()
    // Code for image resizing goes here
    // Set the output path once resizing is done
    setOutputPath('/path/to/resized/image')
  }

  return (
    <div className='bg-teal-700 h-screen flex flex-col align-center justify-center'>
      <div className='flex flex-col w-full items-center justify-center bg-grey-lighter'>
        <label
          htmlFor='img'
          className='w-64 flex flex-col items-center px-4 py-7 bg-white text-gray-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:text-teal-800'
        >
          <img src={logo} width='32' alt='logo' />
          <span className='mt-2 leading-normal'>Select an image to resize</span>
          <input
            id='img'
            type='file'
            className='hidden'
            onChange={handleFileSelect}
          />
        </label>
      </div>

      <form
        id='img-form'
        onSubmit={handleSubmit}
        className={selectedFile ? '' : 'hidden'}
      >
        <div className='mt-6'>
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
        </div>

        <div className='mt-4'>
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
        </div>

        <div className='mt-6'>
          <button
            type='submit'
            className='w-80 m-auto flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-500 hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            Resize
          </button>
        </div>
      </form>

      <p className='text-white text-lg text-center font-mono mt-6'>
        <strong>File: </strong>
        <span id='filename'>{filename}</span>
      </p>
      <p className='text-white text-lg text-center font-mono mt-2'>
        <strong>Output: </strong>
        <span id='output-path'>{outputPath}</span>
      </p>
    </div>
  )
}

export default ResizeImg

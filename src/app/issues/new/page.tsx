'use client'
import 'bytemd/dist/index.css'
import { Button, TextArea, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import gfm from '@bytemd/plugin-gfm'
import { Editor, Viewer } from '@bytemd/react'

const plugins = [
  gfm(),
  // Add more plugins here
]
const NewIssuePage = () => {
  const [value, setValue] = useState('')

  return (
    <div className='max-w-xl space-y-3'>
      <TextField.Root placeholder="Please enter the title of the issue">
      </TextField.Root>
      <Editor
        value={value}
        placeholder="Description"
        plugins={plugins}
        onChange={(v) => {
          setValue(v)
        }}
      />
      <Button>Submit new Issue</Button>
    </div>
  )
}

export default NewIssuePage
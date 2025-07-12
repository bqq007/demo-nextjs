import { Button, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-3'>
      <TextField.Root placeholder="Please enter the title of the issue">
      </TextField.Root>
      <TextArea placeholder="Please enter the Description" />
      <Button>Submit new Issue</Button>
    </div>
  )
}

export default NewIssuePage
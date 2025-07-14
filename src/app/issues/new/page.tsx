'use client'
import 'bytemd/dist/index.css'
import { Button, Callout, TextArea, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import gfm from '@bytemd/plugin-gfm'
import { Editor, Viewer } from '@bytemd/react'
import { Controller, useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'


const plugins = [
  gfm(),
  // Add more plugins here
]
interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const [value, setValue] = useState('')
  const { register,control,handleSubmit} = useForm<IssueForm>();
  const router = useRouter()
  const [error,setError]= useState("")

  return (
    <div className='max-w-xl'>
      {
        error && (
          <Callout.Root color='red' className='mb-5'>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )
      }
      <form className='space-y-3' onSubmit={handleSubmit(async (data)=>{
        try {
          await axios.post('/api/issues', data)
            .then(response => {
              console.log('Issue created successfully:', response.data);
              router.push('/issues'); // Redirect to the issues page after successful creation
            })
            // .catch(error => {
            //   console.error('Error creating issue:', error);
            // });        
        } catch (error) {
          console.error('Error creating issue:', error);
          setError('An unexpected error occurred while creating the issue. Please try again later.');
        }
      })}>
        <TextField.Root placeholder="Please enter the title of the issue" {...register('title')}>
        </TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Editor
              {...field}
              value={value}
              placeholder="Description"
              plugins={plugins}
              onChange={(v) => {
                setValue(v)
                field.onChange(v)
              }}
            />
          )}
        />
        <Button>Submit new Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage
'use client'
import 'bytemd/dist/index.css'
import { Button, Callout, Text, TextArea, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import gfm from '@bytemd/plugin-gfm'
import { Editor, Viewer } from '@bytemd/react'
import { Controller, useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/validationSchemas'
import { z } from 'zod'

type IssueForm = z.infer<typeof createIssueSchema>


const plugins = [
  gfm(),
  // Add more plugins here
]

const NewIssuePage = () => {
  const [value, setValue] = useState('')
  const { register,control,handleSubmit,formState:{errors}} = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
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
        {errors.title && <Text color="red" as='p'>{errors.title.message}</Text>}
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
        {errors.description && <Text color="red" as='p'>{errors.description.message}</Text>}
        <Button>Submit new Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage
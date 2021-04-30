import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Form, TextArea } from 'semantic-ui-react';
import gql from 'graphql-tag';

export default function CreatePost() {
  const initInput = {
    title: '',
    content: ''
  }
  const [values, setValues] = useState(initInput)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createPost()
  }

  const [createPost] = useMutation(CREATE_POST_MUTATION, {
    update(_, result) {
      setSuccess(true)
    },
    onError(err) {
      console.log(JSON.stringify(err, null, 2))
      setSuccess(false)
    },
    variables: values
  })

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          label='Title'
          placeholder='title'
          name='title'
          type='text'
          value={values.title}
          onChange={handleChange}
        />
        <TextArea
          placeholder='Write something here'
          type='text'
          name='content'
          value={values.content}
          onChange={handleChange}
        />
        <Button type='submit' primary>
          Submit
        </Button>
      </Form>
      {
        success ?
          <p>
            Successfully created a post!
        </p>
          :
          <div></div>
      }
    </div>
  )
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      id
      author
      title
      content
      createdAt
    }
  }
`;
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
      setValues(initInput)
    },
    onError(err) {
      console.log(JSON.stringify(err, null, 2))
      setSuccess(false)
    },
    variables: values
  })

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div className='component-card'>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            label='Title'
            placeholder='title'
            name='title'
            type='text'
            value={values.title}
            onChange={handleChange}
          />
          <div
            style={{
              marginBottom: 20
            }}
          >
            <CKEditor
              editor={ClassicEditor}
              data={values.content}
              onChange={(event, editor) => {
                const data = editor.getData()
                setValues({ ...values, content: data })
              }}
            />
          </div>

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
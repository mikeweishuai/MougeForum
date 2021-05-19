import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';
import '../App.css'

export default function Login(props) {
  const initInput = {
    username: '',
    password: '',
  }
  const [values, setValues] = useState(initInput)
  const [errors, setErrors] = useState({})

  // Get the context
  const context = useContext(AuthContext)

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    loginUser()
  }

  const [loginUser] = useMutation(LOGIN_USER, {
    update(_, result) {
      // Pass the user data to the context login function
      context.login(result.data.login)
      // Send the user back to home screen if success
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      // console.log(errors);
    },
    variables: values
  });

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div className='component-card' style={{
        width: 400
      }}>
        <Form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <Form.Input
            label='Username'
            placeholder='username'
            name='username'
            type='text'
            value={values.username}
            error={errors.general}
            onChange={handleChange}
          />
          <Form.Input
            label='Password'
            placeholder='password'
            name='password'
            type='password'
            value={values.password}
            error={errors.general}
            onChange={handleChange}
          />
          <Button type='submit' primary>
            Submit
        </Button>
        </Form>
      </div>
    </div>
  )
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password){
      id
      username
      email
      createdAt
      bio
      token
    }
  }
`;
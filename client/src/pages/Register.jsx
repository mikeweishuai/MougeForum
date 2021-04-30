import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';
import '../App.css'

export default function Register(props) {
  const initInput = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    addUser()
  }

  const [addUser] = useMutation(REGISTER_USER, {
    update(_, result) {
      // Pass the user data to the context login function
      context.login(result.data.register)
      // Send the user back to home screen if success
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
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
          <h1>Register</h1>
          <Form.Input
            label='Username'
            placeholder='username'
            name='username'
            type='text'
            value={values.username}
            error={errors.username}
            onChange={handleChange}
          />
          <Form.Input
            label='Email'
            placeholder='email'
            name='email'
            type='email'
            value={values.email}
            error={errors.email}
            onChange={handleChange}
          />
          <Form.Input
            label='Password'
            placeholder='password'
            name='password'
            type='password'
            value={values.password}
            error={errors.password}
            onChange={handleChange}
          />
          <Form.Input
            label='Confirm Password'
            placeholder='confirm password'
            name='confirmPassword'
            type='password'
            value={values.confirmPassword}
            error={errors.confirmPassword}
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

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      bio
      token
    }
  }
`;
import React, { useContext, useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { AuthContext } from '../../context/auth';


export default function UpdateEmail() {
  const context = useContext(AuthContext)

  // below similar to register/login
  const initInput = {
    email: '',
  }
  const [values, setValues] = useState(initInput)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    changeEmail({ variables: { username: context.user.username, field: 'email', value: values.email } })
  }

  const [changeEmail] = useMutation(UPDATE_EMAIL, {
    update(_, result) {
      setErrors({})
      setSuccess(true)
    },
    onError(err) {
      console.log(err)
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      setSuccess(false)
    }
  });

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          label='Email'
          placeholder='email'
          name='email'
          type='email'
          value={values.email}
          error={errors.email}
          onChange={handleChange}
        />
        <Button type='submit' primary>
          Update
        </Button>
      </Form>
      {
        success ?
          <div>Update success</div>
          :
          <div></div>
      }
    </div>
  )
}

const UPDATE_EMAIL = gql`
  mutation updateProfile(
    $username: String!
    $field: String!
    $value: String!
  ) {
    updateProfile(
      username: $username,
      field: $field,
      value: $value
    ) {
      id
      email
      username
      createdAt
      bio
    }
  }
`;
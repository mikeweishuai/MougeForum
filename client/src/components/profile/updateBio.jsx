import React, { useContext, useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { AuthContext } from '../../context/auth';


export default function UpdateBio() {
  const context = useContext(AuthContext)

  // below similar to register/login
  const initInput = {
    bio: '',
  }
  const [values, setValues] = useState(initInput)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    changeBio({ variables: { username: context.user.username, field: 'bio', value: values.bio } })
  }

  const [changeBio] = useMutation(UPDATE_BIO, {
    update(_, result) {
      setErrors({})
      setSuccess(true)
    },
    onError(err) {
      // console.log(JSON.stringify(err, null, 2))
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      setSuccess(false)
    }
  });

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          label='Bio'
          placeholder='bio'
          name='bio'
          type='text'
          value={values.bio}
          error={errors.bio}
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

const UPDATE_BIO = gql`
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
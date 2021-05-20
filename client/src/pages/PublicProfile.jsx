import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react'
import { useParams } from 'react-router';

export default function PublicProfile() {
  const { username } = useParams();

  const { loading, data } = useQuery(GET_USER_BY_NAME, {
    onError(err) {
      console.log(JSON.stringify(err, null, 2))
    },
    variables: { username: username }
  })

  if (loading) {
    return (
      <div> loading... </div>
    )
  }

  return (
    <div style={{
      padding: 10,
      display: 'flex',
      justifyContent: 'center',
    }}>
      <div style={{
        display: 'flex',
        boxShadow: ' 0 6px 10px 0 rgba(0, 0, 0, 0.19)'
      }}>
        <div style={{
          backgroundColor: '#fef9f3',
          padding: 15,
        }}>
          <img
            src='https://react.semantic-ui.com/images/avatar/small/stevie.jpg'
            style={{
              height: 150,
              width: 150,
              objectFit: 'cover',
              borderRadius: '50%'
            }}
            alt={"alt"}
          />
        </div>

        <div style={{
          backgroundColor: '#fef9f3',
          flexGrow: 0,
          width: 200,
          wordWrap: 'break-word',
          padding: 15
        }}>
          <h1>{data.getUserByName.username}</h1>
          <h3>Bio</h3>
          <p>{data.getUserByName.bio}</p>
          <h3>Email</h3>
          <p>{data.getUserByName.email}</p>
          <h3>Register time</h3>
          <p>{data.getUserByName.createdAt}</p>
        </div>
      </div>

    </div>

  )
}

const GET_USER_BY_NAME = gql`
  query getUserByName($username: String!) {
    getUserByName(username: $username) {
      id
      email
      username
      bio
      createdAt
    }
  }
`
import React from 'react'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

export default function UserProfile() {
  let profile = {}

  const { loading, data } = useQuery(GET_USER_INFO, {
    onError(err) {
      console.log(JSON.stringify(err, null, 2))
    }
  })

  if (loading) {
    return (
      <div>
        loading...
      </div>
    )
  } else {
    console.log(data)
    profile = data.getUserInfo
  }

  return (
    <div>
      <h3>
        Username:
      </h3>
      <p>
        {profile.username}
      </p>
      <h3>
        Bio:
      </h3>
      <p>
        {profile.bio}
      </p>
      <h3>
        Email:
      </h3>
      <p>
        {profile.email}
      </p>
      <h3>
        Created at:
      </h3>
      <p>
        {profile.createdAt}
      </p>
    </div>
  )
}

const GET_USER_INFO = gql`
{
  getUserInfo {
    id
    email
    username
    bio
    createdAt
  }
}
  
`
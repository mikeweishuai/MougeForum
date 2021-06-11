import React, { useContext } from 'react'

import ProfileBar from '../components/ProfileBar'
import { AuthContext } from '../context/auth'

export default function Profile() {
  const context = useContext(AuthContext)
  return (
    <div>
      {
        context.user ? <ProfileBar />
          : <h2>You must login to view this page</h2>
      }

    </div>
  )
}
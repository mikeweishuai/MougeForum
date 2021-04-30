import React, { useContext } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/auth'

export default function MenuBar() {
  // Get the context
  const context = useContext(AuthContext)

  // Display different menu bar when login/log out
  const menuBar = context.user ? (
    <Menu>
      <Menu.Item
        name='home'
        as={Link}
        to='/'
      >
        Home
      </Menu.Item>
      <Menu.Item
        name='profile'
        as={Link}
        to='/profile'
      >
        {context.user.username}
      </Menu.Item>
      <Menu.Item
        name='posts'
        as={Link}
        to='/posts'
      >
        Posts
      </Menu.Item>
      <Menu.Item
        name='create-post'
        as={Link}
        to='/create-post'
      >
        Create a Post
      </Menu.Item>
      <Menu.Item
        name='logout'
        onClick={context.logout}
        position='right'
        as={Link}
        to='/'
      >
        Log out
      </Menu.Item>
    </Menu>
  ) : (
    <Menu>
      <Menu.Item
        name='home'
        as={Link}
        to='/'
      >
        Home
      </Menu.Item>
      <Menu.Item
        name='posts'
        as={Link}
        to='/posts'
      >
        Posts
      </Menu.Item>
      <Menu.Item
        name='login'
        as={Link}
        to='/login'
      >
        Login
      </Menu.Item>
      <Menu.Item
        name='register'
        as={Link}
        to='/register'
      >
        Register
      </Menu.Item>
    </Menu>
  )

  return menuBar
}
import React, { useContext, useState, useEffect } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/auth'
import MyMenu from './navigation/MyMenu'
import Drawer from './navigation/Drawer'

export default function MenuBar() {
  // Get the context
  const context = useContext(AuthContext)

  // Use the window width as a state
  const [width, setWidth] = useState(window.innerWidth);

  // Add window resize listerner and clean up
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleWindowResize);

    return () => window.removeEventListener('resize', handleWindowResize);
  }, [])

  // Display different menu items when login/log out
  const items = context.user ? (
    <>
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
        to='/posts/1'
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
        as={Link}
        to='/'
      >
        Log out
      </Menu.Item>
    </>
  ) : (
    <>
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
        to='/posts/1'
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
    </>
  )

  return width > 600 ? <MyMenu items={items} /> : <Drawer items={items} />;
}
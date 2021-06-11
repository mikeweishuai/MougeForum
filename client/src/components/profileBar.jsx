import React, { useState } from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import UpdateBio from './profile/UpdateBio';
import UpdateEmail from './profile/UpdateEmail';
import UserProfile from './profile/UserProfile';

export default function ProfileBar() {
  const [activeItem, setActiveItem] = useState('profile')

  const handleItemClick = (e, { name }) => setActiveItem(name)

  let content = (<div>default</div>);
  if (activeItem === 'profile') {
    content = (<UserProfile />)
  } else if (activeItem === 'update email') {
    content = (<UpdateEmail />)
  } else if (activeItem === 'update bio') {
    content = (<UpdateBio />)
  }

  return (
    <Grid>
      <Grid.Column width={4}>
        <Menu fluid vertical tabular>
          <Menu.Item
            name='profile'
            active={activeItem === 'profile'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='update email'
            active={activeItem === 'update email'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='update bio'
            active={activeItem === 'update bio'}
            onClick={handleItemClick}
          />
        </Menu>
      </Grid.Column>
      <Grid.Column width={12}>
        <Segment>
          {content}
        </Segment>
      </Grid.Column>
    </Grid>
  )
}
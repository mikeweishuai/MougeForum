import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';

export default function MyMenu(props) {

  return (
    <Menu style={{
      margin: 5
    }}>
      {props.items}
    </Menu>
  )
}
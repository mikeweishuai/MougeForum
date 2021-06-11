import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';

export default function MyMenu(props) {

  return (
    <Menu fixed='top' borderless={true}>
      {props.items}
    </Menu>
  )
}
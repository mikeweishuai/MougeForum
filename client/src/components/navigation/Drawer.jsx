import React, { useState } from 'react';
import {
  Checkbox,
  Icon,
  Menu,
  Sidebar,
} from 'semantic-ui-react';

export default function Drawer(props) {
  const [visible, setVisible] = useState(false);

  const ret = (
    <div>
      <Menu borderless={true} style={{
        margin: 5
      }}>
        <Menu.Item
          as='a'
          onClick={() => setVisible(true)}
          icon='bars'
        >
        </Menu.Item>
      </Menu>
      <Sidebar
        as={Menu}
        animation='overlay'
        icon='labeled'
        inverted
        onHide={() => setVisible(false)}
        vertical
        visible={visible}
        width='thin'
      >
        {props.items}
      </Sidebar>
    </div>
  )

  return ret;
}
import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';

export default function MyMenu(props) {
  const [activeItem, setActiveItem] = useState('home')

  const handleItemClick = (e, { name }) => setActiveItem(name)

  const items = props.itemsName.map((name) => {
    return (
      <Menu.Item
        key={name}
        name={name}
        onClick={handleItemClick}
        active={activeItem === name}
      >
        {name}
      </Menu.Item>
    )
  })

  return (
    <div>
      <Menu style={{
        margin: 5
      }}>
        {items}
      </Menu>
      <p>{activeItem}</p>
    </div>
  )
}
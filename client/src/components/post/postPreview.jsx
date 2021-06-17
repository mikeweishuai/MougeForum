import React from 'react';
import { Card } from 'semantic-ui-react'

import '../../App.css';

export default function PostPreview(props) {
  const { id, author, title, content, commentsCount } = props.data;
  const preview = content.substring(0, 35).concat('...');

  return (
    <Card
      style={{
        backgroundColor: 'fef9f3'
      }}
      href={`/post/${id}`}
    >
      <Card.Content>
        <Card.Header>
          {title}
        </Card.Header>
        <Card.Meta>
          {author}
        </Card.Meta>
        <Card.Description>
          {preview}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {commentsCount}
      </Card.Content>
    </Card>
  )
}

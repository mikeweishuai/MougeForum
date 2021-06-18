import React from 'react';
import { Card, Icon } from 'semantic-ui-react'
import { DateTime } from "luxon";

import '../../App.css';

export default function PostPreview(props) {
  const { id, author, title, content, commentsCount, createdAt } = props.data;
  const preview = content.substring(0, 150).concat('...');

  // Convert to luxon datetime for utilizing toRelative()
  const date = DateTime.fromISO(createdAt);

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
        <Icon name='comments' />
        {commentsCount}
        <div style={{
          float: 'right'
        }}>
          {date.toRelative()}
        </div>
      </Card.Content>
    </Card>
  )
}

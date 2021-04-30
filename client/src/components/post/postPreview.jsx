import React from 'react';
import { Card } from 'semantic-ui-react'
import '../../App.css'

export default function PostPreview(props) {
  const { id, author, title, content } = props.data
  const preview = content.substring(0, 20).concat('...')

  return (
    <Card
      style={{
        backgroundColor: 'fef9f3'
      }}
      header={title}
      meta={author}
      description={preview}
      href={`/post/${id}`}
    />
  )
}
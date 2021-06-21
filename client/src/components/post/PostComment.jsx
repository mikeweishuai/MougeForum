import React from 'react';
import { Comment } from 'semantic-ui-react';
import { DateTime } from 'luxon';

export default function PostComment(props) {
  const { author, createdAt, content } = props.data;
  const date = DateTime.fromISO(createdAt);

  return (
    <Comment>
      <Comment.Content>
        <Comment.Avatar
          style={{ marginRight: 10 }}
          src='https://react.semantic-ui.com/images/avatar/small/stevie.jpg' />
        <Comment.Author
          as='a'
          href={'/profile/' + author}
        >{author}</Comment.Author>
        <Comment.Metadata>
          <div>{date.toRelative()}</div>
        </Comment.Metadata>
        <Comment.Text>{content}</Comment.Text>
      </Comment.Content>
    </Comment>
  )
}
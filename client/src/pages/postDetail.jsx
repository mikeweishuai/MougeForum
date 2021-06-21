import gql from 'graphql-tag';
import React, { useState, useContext } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router';
import { Button, Comment, Form, Container } from 'semantic-ui-react'
import parse from 'html-react-parser';
import { DateTime } from "luxon";

import PostComment from '../components/post/PostComment';
import { AuthContext } from '../context/auth'
import '../App.css'

export default function PostDetail() {
  // Get the auth information
  const context = useContext(AuthContext)
  // Get the post id from the router
  const { id } = useParams();

  // Query for post information and comments under this post
  const { loading: postLoading, data: postData } = useQuery(FETCH_POST_DETAIL, { variables: { postId: id } });
  const { loading: commentLoading, data: commentData } = useQuery(FETCH_COMMENTS_BY_POST, { variables: { postId: id } });

  // Form input staff
  const initInput = {
    content: ''
  }
  const [values, setValues] = useState(initInput)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createComment()
  }

  const [createComment] = useMutation(CREATE_COMMENT, {
    update(_, result) {
      setValues(initInput)
      setSuccess(true)
    },
    onError(err) {
      console.log(JSON.stringify(err, null, 2))
      setSuccess(false)
    },
    variables: { parent: id, content: values.content }
  })

  if (postLoading || commentLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  // Create comment components to render
  let myComments = commentData.getCommentsByPost
  const commentComponents = myComments.map(comment => {
    return <PostComment data={comment} />
  })

  // Convert to luxon datetime for utilizing toRelative()
  const date = DateTime.fromISO(postData.getPost.createdAt);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
    }}>
      <Container>
        <div className='component-card'>
          <h2>
            {postData.getPost.title}
          </h2>
          <p>
            {postData.getPost.author}
          </p>
          <div className='line-break'>
            {parse(postData.getPost.content)}
          </div>
          <p style={{
            textAlign: 'right',
            marginTop: 10,
            color: 'grey'
          }}>
            {'Created at: ' + date.toFormat('LLL, dd, yyyy, HH:mm:ss')}
          </p>
        </div>
        <div
          className='component-card'
          style={{
            marginTop: 20
          }}>
          <h3>
            Comments
          </h3>
          <Comment.Group>
            {commentComponents}
            {context.user ?
              <Form reply onSubmit={handleSubmit}>
                <Form.TextArea
                  placeholder='Write something here'
                  type='text'
                  name='content'
                  value={values.content}
                  onChange={handleChange}
                />
                <Button content='Add Reply' labelPosition='left' icon='edit' primary />
              </Form> :
              <div />
            }
          </Comment.Group>
          {success ? <p>Success! Refresh the page to see the update</p> : <div></div>}
        </div>
      </Container>
    </div>
  )
}

const FETCH_POST_DETAIL = gql`
  query getPost($postId: String) {
    getPost(postId: $postId) {
      id
      title
      content
      author
      createdAt
    }
  }
`

const FETCH_COMMENTS_BY_POST = gql`
  query getCommentsByPost($postId: ID) {
    getCommentsByPost(postId: $postId) {
      id
      parent
      content
      author
      createdAt
    }
  }
`

const CREATE_COMMENT = gql`
  mutation createComment($parent: String!, $content: String!) {
    createComment(parent: $parent, content: $content) {
      id
      author
      parent
      content
      createdAt
    }
  }
`
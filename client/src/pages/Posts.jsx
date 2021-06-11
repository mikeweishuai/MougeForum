import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { Pagination } from 'semantic-ui-react'

import PostPreview from '../components/post/PostPreview';
import '../App.css';

export default function Posts() {
  const { pageNum } = useParams();
  const history = useHistory();

  // Query from databse
  const { loading, data } = useQuery(FETCH_POST_PAGE, {
    onError(err) {
      console.log(JSON.stringify(err, null, 2))
    },
    variables: {
      pageSize: 5,
      pageNum: parseInt(pageNum)
    }
  });

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  // Extract posts from data
  let myPosts = data.getPostsPage.posts
  const postComponents = myPosts.map(post => {
    return <PostPreview data={post} />
  })

  // Change page
  const handleChange = (e, pageInfo) => history.push(`/posts/${pageInfo.activePage}`)

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
    }}>
      <div>
        {postComponents}
        <Pagination
          activePage={parseInt(pageNum)}
          onPageChange={handleChange}
          totalPages={data.getPostsPage.totalPages}
        />
      </div>
    </div>
  )
}

const FETCH_POST_PAGE = gql`
  query getPostsPage($pageSize: Int!, $pageNum: Int!) {
    getPostsPage(pageSize: $pageSize, pageNum: $pageNum) {
      totalPages
      currentPage
      posts {
        id
        title
        author
        content
        createdAt
      }
    }
  }
`
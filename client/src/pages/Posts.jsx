import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Pagination } from 'semantic-ui-react'

import PostPreview from '../components/post/postPreview';
import '../App.css';

export default function Posts() {
  // Variables for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  // Query from databse
  const { loading, data } = useQuery(FETCH_ALL_POSTS, {
    onError(err) {
      console.log(JSON.stringify(err, null, 2))
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
  let myPosts = { data: data.getPosts }.data
  const postComponents = myPosts.map(post => {
    return <PostPreview data={post} />
  })

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postComponents.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (e, pageInfo) => setCurrentPage(pageInfo.activePage)

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div>
        {currentPosts}
        <Pagination
          activePage={currentPage}
          onPageChange={paginate}
          totalPages={Math.ceil(myPosts.length / postsPerPage)}
        />
      </div>
    </div>

  )
}

const FETCH_ALL_POSTS = gql`
  {
    getPosts {
      id
      title
      author
      content
      createdAt
    }
  }
`
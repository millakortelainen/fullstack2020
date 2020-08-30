import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Testing title',
    author: 'Author of the testing blog',
    url: 'teset.com',
    likes: 0
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Testing title Author of the testing blog'
  )
})

test('clickin the button shows info of the blog', async () => {
  const blog = {
    title: 'Testing title',
    author: 'Author of the testing blog',
    url: 'teset.com',
    likes: 0
  }

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'Testing title Author of the testing blog',
    'teset.com',
    'likes: 0'
  )
})

test('clickin like button twice calls handler twice', async () => {
  const blog = {
    title: 'Testing title',
    author: 'Author of the testing blog',
    url: 'teset.com',
    likes: 0
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} addLike={mockHandler} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)

})
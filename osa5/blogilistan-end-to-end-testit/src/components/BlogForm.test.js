import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('BlogForm works ', () => {
  const createBlog = jest.fn()
  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const inputTitle = component.container.querySelector('#title')
  const inputAuthor = component.container.querySelector('#author')
  const inputUrl = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(inputTitle, {
    target: { value: 'Hello world' }
  })

  fireEvent.change(inputAuthor, {
    target: { value: 'Author of the hello world' }
  })

  fireEvent.change(inputUrl, {
    target: { value: 'helloworld.com' }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Hello world')
  expect(createBlog.mock.calls[0][0].author).toBe('Author of the hello world')
  expect(createBlog.mock.calls[0][0].url).toBe('helloworld.com')
})
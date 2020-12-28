const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('id is called id', async () => {
  const response = await api.get('/api/blogs/')
  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('a valid blog can be added', async () => {
  const newBlog = {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  }

  const inf = await api
    .post('/api/login')
    .send({
      username: 'mluukkai',
      password: 'salainen'
    })

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${inf.body.token}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})

test('blog with undefined likes has zero likes', async () => {
  const newBlog = {
    _id: "1",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    __v: 0
  }

  const inf = await api
    .post('/api/login')
    .send({
      username: 'mluukkai',
      password: 'salainen'
    })

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${inf.body.token}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toEqual(0)

})

test('blog without title is not added', async () => {
  const blog = {
    _id: "5a422bc61b54a676234d17fc",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }

  const inf = await api
    .post('/api/login')
    .send({
      username: 'mluukkai',
      password: 'salainen'
    })

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${inf.body.token}`)
    .send(blog)
    .expect(400)

})

test('blog without url is not added', async () => {
  const blog = {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    likes: 2,
    __v: 0
  }

  const inf = await api
    .post('/api/login')
    .send({
      username: 'mluukkai',
      password: 'salainen'
    })

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${inf.body.token}`)
    .send(blog)
    .expect(400)

})

test('blog is removed', async () => {

  const inf = await api
    .post('/api/login')
    .send({
      username: 'mluukkai',
      password: 'salainen'
    })

  const newBlog = {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  }

  const blogToDelete = await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${inf.body.token}`)
    .send(newBlog)


  await api
    .delete(`/api/blogs/${blogToDelete.body.id}`)
    .set('Authorization', `bearer ${inf.body.token}`)
    .expect(204)
  console.log(helper.blogsInDb())
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
})

test('a blog can be edited', async () => {
  const [ aBlog ] = await helper.blogsInDb()

  const editedBlog = { ...aBlog, likes: aBlog.likes + 1 }

  await api
    .put(`/api/blogs/${aBlog.id}`)
    .send(editedBlog)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  const edited = blogsAtEnd.find(b => b.url === aBlog.url)
  expect(edited.likes).toBe(aBlog.likes + 1)
})

afterAll(() => {
  mongoose.connection.close()
})
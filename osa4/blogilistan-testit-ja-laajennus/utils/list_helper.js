const _ = require('lodash');
const { groupBy } = require('lodash');

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item
    }
    return blogs.length === 0
        ? 0
        : blogs.map(blog => blog.likes).reduce(reducer)
}

const favoriteBlog = (blogs) => {
    const mostLikes = Math.max(...blogs.map(b => b.likes))

    return blogs.find(blog => blog.likes === mostLikes)
}

const mostBlogs = (blogs) => {
    return _.chain(blogs)
        .groupBy("author")
        .map((value, key) => ({ author: key, blogs: value.length }))
        .maxBy("blogs")
        .value()
}

const mostLikes = (blogs) => {
    return _.chain(blogs)
        .groupBy("author")
        .map((value, key) => ({ author: key, likes: totalLikes(value) }))
        .maxBy("likes")
        .value()
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
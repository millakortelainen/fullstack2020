import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'ADD_BLOG':
            return [...state, action.data]
        case 'REMOVE_BLOG':
            return state.filter(b => b.id !== action.data)
        case 'LIKE_BLOG':
            return state.map(b => b.id !== action.data.id ? b : action.data)
        default: return state
    }
}

export const initBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const newBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.create(blog)
        dispatch({
            type: 'ADD_BLOG',
            data: newBlog
        })
    }
}

export const removeBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch({
            type: 'REMOVE_BLOG',
            data: id
        })
    }
}

export const likeBlog = (likedBlog) => {
    return async dispatch => {
        await blogService.update(likedBlog)
        dispatch({
            type: 'LIKE_BLOG',
            data: likedBlog
        })
    }
}

export default blogReducer
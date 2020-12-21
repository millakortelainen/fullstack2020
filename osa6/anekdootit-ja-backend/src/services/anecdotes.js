import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (anecdote) => {
    const asObject = {
        content: anecdote,
        votes: 0
    }

    const response = await axios.post(baseUrl, asObject)
    return response.data
}

const addVote = async (anecdoteId) => {
    const previous = await axios.get(`${baseUrl}/${anecdoteId}`)
    const response = await axios.put(`${baseUrl}/${anecdoteId}`, { ...previous.data, votes: previous.data.votes + 1 })
    return response.data
}

export default { getAll, createNew, addVote }
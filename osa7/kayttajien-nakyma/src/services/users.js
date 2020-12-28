import axios from 'axios'

const baseUrl = '/api/users'

const getAll = () => {
    const request = axios.get(baseUrl)
    console.log(request.then(response => response.data))
    return request.then(response => response.data)
}

export default { getAll }
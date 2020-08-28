import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {

  if (!newObject.user) {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  } else {
    const obj = {
      id: id,
      title: newObject.title,
      author: newObject.author,
      url: newObject.url,
      likes: newObject.likes,
      user: newObject.user.id
    }

    const request = axios.put(`${baseUrl}/${id}`, obj)
    return request.then(response => response.data)
  }
}

const remove = async id => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`,config)
  return request.then(response => response.data)
}
export default { getAll, create, update, remove, setToken }
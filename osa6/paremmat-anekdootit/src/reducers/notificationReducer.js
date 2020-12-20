const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.data.message
    case 'RESET':
      return ''
    default: return state
  }
}

export const showVoteNotification = (vote) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: { message: `you voted '${vote}'` }
  }
}

export const showCreateAnecdoteNotification = (anecdote) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: { message: `you added anecdote '${anecdote}'` }
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET'
  }
}

export default notificationReducer
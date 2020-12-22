const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      console.log(action.data)
      return action.data
    case 'RESET':
      return ''
    default: return state
  }
}

export const setNotification = (message, time) => {
  return async dispatch => {
    setTimeout(() => {
      dispatch(resetNotification())
    }, time * 1000)
    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: message
    })
    
  }
}

export const resetNotification = () => {
  return async dispatch => {
    dispatch({ type: 'RESET' })
  }

}

export default notificationReducer
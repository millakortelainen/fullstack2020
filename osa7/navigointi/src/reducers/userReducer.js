import userService from '../services/users'

const userReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_USERS':
            return action.data
        default: return state
    }
}

export const initUsers = () => {
    console.log('hello')
    return async dispatch => {
        const users = await userService.getAll()
        dispatch({
            type: 'INIT_USERS',
            data: users
        })
    }
}

export default userReducer
import { apiService } from './services/api'

const getUsers = async () => {
    const res = await apiService.get('api/users', {})
    return res.data
}

const getBookings = async () => {
    const res = await apiService.get('api/bookings', {})
    return res.data
}

const createUser = async (params) => {
    const param = {
        username: params.name,
        password: params.password
    }
    const res = await apiService.post('api/auth/signup', param)
    return res.status
}

const loginUser = async (params) => {
    const param = {
        username: params.name,
        password: params.password
    }
    const res = await apiService.post('api/auth/login', param)
    return res.status
}

const createBooking = async (params) => {
    const param = {
        people: params.people,
        name: params.username,
        time: params.time
    }
    const res = await apiService.post('api/bookings', param)
    return res
}

const apiActions = {
    getBookings,
    getUsers,
    createBooking,
    createUser,
    loginUser
}

export default apiActions
import {User} from '../database/database_define'

export const getAll = async () => {
    return await User.findAll()
}
export const getByUsername = async (username) => {
    return await User.findOne({
        where: {
            username: username
        }
    })
}

export const store = async (userData) => {
    return await User.create({
        first_name: userData.first_name,
        last_name: userData.last_name,
        username: userData.username,
        password: userData.password,
        role_id: userData.role_id
    })
}
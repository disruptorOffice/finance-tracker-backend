import {User} from '../database/database_define'

export const getAll = async () => {
    return await User.findAll()
}
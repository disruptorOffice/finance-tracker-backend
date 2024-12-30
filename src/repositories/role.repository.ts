import {Role} from '../database/database_define'

export const getByName = async (name) => {
    return await Role.findAll({
        where: {
            name: name
        }
    })
}
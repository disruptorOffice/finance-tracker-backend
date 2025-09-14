import {Category} from '../database/database_define'

export const getAll = async () => {
    return await Category.findAll()
}

export const getById = async (id) => {
    return await Category.findByPk(id)
}

export const store = async (categoryData) => {
    return await Category.create({
        name: categoryData.name
    })
}
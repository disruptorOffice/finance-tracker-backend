import express from 'express'
import {CategoryService} from '../services/category.service'

const categoryService = new CategoryService()

const router = express.Router()
router.use(express.json())


router.get('/', async (req, res) => {
    const result = await categoryService.getAllCategories()
    res.send(result)
})

router.post('/', async (req, res, next) => {
    try {
        const result = await categoryService.storeCategory(req.body)
        res.send(result)
    } catch (error) {
        next(error)
    }
})

export default router
const { Router } = require('express')
const Category = require('./model')
const router = new Router()

router.get('/category', (req, res, next) => {
    //pagination?
    const limit = req.query.limit || 25
    const offset = req.query.offset || 0

    Category
        .findAll({limit, offset})
        .then(categories => {
            if(!categories) {
                res.status(404).send('No categories found')
            } else {
                return res.send(categories)
            }
      })
    .catch(next)
})

router.post('/category', (req, res, next) => { 
    Category.create(req.body)
    .then(category => {
        res.send(category)
    })
})

router.put('/category/:id', (req, res, next) => {
    Category.findByPk(req.params.id)
    .then(category => {
        if(!category) {
            res.status(404).send('Category not found')
        } else {
            category.update(req.body)
            .then(updatedCategory => {
                res.send(updatedCategory)
            })
        }
    })
    .catch(next)
})

router.delete('/category/:id', (req, res, next) => {
    Category.findByPk(req.params.id)
    .then(category => {
        if(!category) {
            res.status(404).send('Category not found')
        } else {
            category.destroy()
            res.status(201).send('Destroyed')
        }
    })
})

module.exports = router;
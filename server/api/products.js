const router = require('express').Router()
const {Product, Category, Review, User} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const {isAdmin, isAdminOrIsUser} = require('../middleware/auth.middeware')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const categories = req.query.categories

    //console.log(categories)
    let products
    if (categories) {
      // format categories into array of objecs
      // as this is the structure sequel takes the options in
      const formattedCategories = categories.map(cat => {
        return {name: cat}
      })

      products = await Product.findAll({
        include: [
          {
            model: Category,
            where: {
              [Op.and]: formattedCategories
            }
          }
        ],
        where: {
          inventory: {
            [Op.gte]: 1
          }
        },
        limit: 10
      })
    } else {
      products = await Product.findAll({
        where: {
          inventory: {
            [Op.gte]: 1
          }
        },
        limit: 10
      })
    }

    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {id: req.params.id},
      include: [{model: Review, limit: 10}]
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.put('/:id/editproduct', isAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    const editedProdcut = await product.update(req.body)
    res.json(editedProdcut)
  } catch (error) {
    next(error)
  }
})

router.post('/:id/postreview', isAdminOrIsUser, async (req, res, next) => {
  try {
    const review = await Review.create(req.body)

    const currentProduct = await Product.findByPk(req.body.productId)
    await currentProduct.addReview(review)

    const currentUser = await User.findByPk(req.body.userId)
    await currentUser.addReview(review)
    res.json(review)
  } catch (error) {
    next(error)
  }
})

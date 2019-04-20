const router = require('express').Router()
const { Product, Category } = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const categories = req.query.categories
    
    
    console.log(categories);
    let products;
    if (categories) {
      
      // format categories into array of objecs
      // as this is the structure sequel takes the options in
      const formattedCategories = categories.map((cat) => {
        return { name: cat };
      });
      
      products = await Product.findAll({
        include: [{
          model: Category,
          where: {
            [Op.and]: formattedCategories
          }
        }],
        where: {
          inventory: {
            [Op.gte]: 1
          },
        },
        limit: 10,
      })
      

    } else {

      products = await Product.findAll({
        where: {
          inventory: {
            [Op.gte]: 1
          },
        },
        limit: 10,
      })
    }

    res.json(products)

  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

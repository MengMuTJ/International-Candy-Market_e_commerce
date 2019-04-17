const router = require('express').Router()
const {User} = require('../db/models')
const {isAdmin} = require('../middleware/auth.middeware')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', isAdmin, async (req, res, next) => {
  try {
      User.destroy({
        where: {
          id: req.params.userId
        }
      })

  } catch (err) {
    next(err)
  }
 })


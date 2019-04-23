const router = require('express').Router()
const {User, Review, Order} = require('../db/models')
const {isAdmin, isAdminOrIsUser} = require('../middleware/auth.middeware')
module.exports = router

router.get('/', isAdmin, async (req, res, next) => {
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

router.get('/:id/orderhistory', isAdminOrIsUser, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {id: req.params.id},
      include: [Order]
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', isAdmin, (req, res, next) => {
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

router.put('/makeAdmin', isAdmin, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    const makeUserAdmin = await user.update(
      {isAdmin: true},
      {
        where: {
          isAdmin: false
        }
      }
    )
    res.json(makeUserAdmin)
  } catch (err) {
    next(err)
  }
})

const Router = require('express')
const router = new Router()
const controller = require('./authController')
const authMiddleware = require('./middlewaree/authMiddleware')
const roleMiddleware = require('./middlewaree/roleMiddleware')


router.post('/registration', controller.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddleware(["Admin"]), controller.getUsers)
router.get('/user/:id', authMiddleware(["Admin"]), controller.getUser)
router.put('/user/:id', controller.updateUser)
router.delete('/user/:id', controller.deleteUser)
router.get('/userid', controller.getIdByToken)

module.exports = router

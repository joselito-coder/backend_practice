const express = require('express')
const router = express.Router()

const { login, register,nukeDB } = require('../controllers/auth')


router.post('/login',login)
router.post('/register',register)
router.delete('/nuke',nukeDB);

module.exports = router
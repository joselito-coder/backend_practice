const express = require('express')
const router = express.Router();

const { login, dashboard } = require('../controllers/main')
const authMiddleware = require('../middleware/auth')

const trollUser = (req, res) => {
    return res.status(200).json({ msg: `Lol Noob you cant get the login route` })
}

router.route('/dashboard').get(authMiddleware, dashboard);
router.route('/login').post(login).get(trollUser)

module.exports = router
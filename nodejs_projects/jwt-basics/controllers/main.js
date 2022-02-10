const { BadRequestError } = require('../errors/')
const jwt = require('jsonwebtoken')


const login = async (req, res) => {
    const { username, password } = req.body;

    const id = new Date().getDate()

    if (!username || !password) {
        throw new BadRequestError('Please provide username and password')
    }

    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' })

    res.status(200).json({ msg: "User created", token })
}

const dashboard = async (req, res) => {
    const { user } = req

    const randomNumber = Math.floor(Math.random() * 100);

    return res.status(200).json({ msg: `Hello, Lolicon ${user.username}`, secret: `Hi there lolicon, your loli code ${randomNumber}` })



}

module.exports = { login, dashboard }
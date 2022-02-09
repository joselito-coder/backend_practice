const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')


const login = async (req, res) => {
    const {username, password} = req.body;

    const id = new Date().getDate()

    if (!username || !password){
        throw new CustomAPIError('Please provide username and password',400)
    }

    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})

    res.status(200).json({msg:"User created", token})
}

const dashboard = async (req, res) => {
    const randomNumber = Math.floor(Math.random() * 100);

    return res.status(200).json({ msg: `Hello, Shankar Doe`, secret: `Hi there lolicon, here is your secret ${randomNumber}` })

}

module.exports = { login, dashboard }
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {

    const user = await User.create({ ...req.body })

    const token = user.createJWT();

    res.status(StatusCodes.CREATED).json({ user:{name: user.getName(), },token })
}

const login = (req, res) => {
    res.send("login user")
}


const nukeDB = async (req, res) => {
    const { secret } = req.body;
    const mySecret = process.env.SEKRET;

    if (!secret) {
        throw new BadRequestError("LOl Chomu")
    }
    else if (secret != mySecret) {
        throw new UnauthenticatedError("LOL Get rick rolled")
    }

    const user = await User.deleteMany({});
    return res.status(200).json({ msg: "LOL Chomu the nuke was a success", count: user.deletedCount });

}

module.exports = { register, login, nukeDB }
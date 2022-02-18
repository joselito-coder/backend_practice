const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors')


const getAllJobs = (req, res) => {
    res.send("Get all Jobs")
}


const getJob = (req, res) => {
    res.send("Get single job")
}

const updateJob = (req, res) => {
    res.send("Update job")
}

const createJob = async (req, res) => {
    // res.send("Create job")
    req.body.createdBy = req.user.userId;


    const job = await Job.create(req.body)

    return res.json({job})
}

const deleteJob = (req, res) => {
    res.send("delete job")
}

module.exports = {
    createJob,
    deleteJob,
    updateJob,
    getAllJobs,
    getJob,

}
const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors')


const getAllJobs = async (req, res) => {

    const jobs = await Job.find({ createdBy: req.user.userId });
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });

}


const getJob = async (req, res) => {
    const { params: { id: jobId }, user: { userId } } = req;

    const job = await Job.findOne({
        _id: jobId,
        createdBy: userId
    });

    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }

    res.status(StatusCodes.OK).json({ job })
}

const updateJob = async (req, res) => {

    const {
        body: { company, position },
        params: { id: jobId },
        user: { userId }
    } = req;

    if (company === '' || position === '') {
        throw new BadRequestError("Company or Position fields cannot be empty")
    }

    const job = await Job.findOneAndUpdate({ _id: jobId, createdBy: userId }, req.body, { new: true, runValidators: true })

    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }

    res.status(StatusCodes.OK).json({ job })

}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;

    const job = await Job.create(req.body)

    return res.status(StatusCodes.CREATED).json({ job })
}

const deleteJob = async (req, res) => {
    const { params: { id: jobId }, user: { userId } } = req

    const job = await Job.findOneAndDelete({
        _id: jobId,
        createdBy: userId
    });

    if (!job) {
        throw new NotFoundError(`No job with ${jobId}`)
    }


    res.status(StatusCodes.OK).send("OK Boomer")
}

module.exports = {
    createJob,
    deleteJob,
    updateJob,
    getAllJobs,
    getJob,

}
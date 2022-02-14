

const getAllJobs = (req, res) => {
    res.send("Get all Jobs")
}



const getJob = (req, res) => {
    res.send("Get single job")
}

const updateJob = (req, res) => {
    res.send("Update job")
}

const createJob = (req, res) => {
    res.send("Create job")
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
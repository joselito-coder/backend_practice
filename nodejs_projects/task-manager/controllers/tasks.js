const Task = require('../models/Task')
const getAllTasks = async(req, res) => {
  try{
    const tasks = await Task.find({})
    res.status(200).json({tasks})
  }
  catch(error){
    res.status(500).json({ error })
  }
};

const createTask = async (req, res) => {
  try{
    const task = await Task.create(req.body)
    res.status(201).json({task})
  }
  catch(error){
    res.status(500).json({ error })
    // res.status(500).json({ error  })

  }
  
};

const getTask = async (req, res) => {
  try{
    const {id:taskID} = req.params
    const task = await Task.findOne({_id:taskID})
    if (!task){
      return res.status(404).json({msg: `No task with ID : ${taskID}`})
    }
    res.status(200).json({task})
  }
  catch(error){
    res.status(500).json({ error })

  }

};

const updateTask = (req, res) => {
  res.send("Update task");
};

const deleteTask = async(req, res) => {
  try{
    const {id:taskID} = req.params;
    const task = await Task.findOneAndDelete({_id:taskID})
    if (!task){
      return res.status(404).json({msg: `no Task with id : ${taskID}`})
    }
    return res.status(200).json({task})

  }
  catch(error){
    res.status(500).json({ error })

  }

  // res.send("Delete task");

};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};

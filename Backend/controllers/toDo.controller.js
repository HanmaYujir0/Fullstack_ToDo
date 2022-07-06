const ToDo = require('../Models/ToDo.model');


module.exports.toDoController = {
  getToDo: async (req, res) => {
    try {
      const getToDo = await ToDo.find()
      res.json(getToDo)
    } catch (error) {
      res.json(error)
    }
  },
  postToDo: async (req, res) => {
    try {
      const postToDo = await ToDo.create({
        text: req.body.text
      })
      res.json(postToDo)
    } catch (error) {
      res.json('Ошибка при добавлении дела')
    }
  },
  patchToDo: async (req, res) => {
    try {
      const patchToDo = await ToDo.findByIdAndUpdate(req.params.id , {
        compleate: req.body.compleate
      })
      return res.json(patchToDo)
    } catch (error) {
      res.json('Ошибка при измении дела')
    }
  },
  deleteToDo: async (req, res) => {
    try {
      const deleteToDo = await ToDo.findByIdAndRemove(req.params.id)
      res.json('Дело удалено')
    } catch (error) {
      res.json('Ошибка при удалении')
    }
  }
}
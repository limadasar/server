const {Answer} = require('../models/index')

class Controller {
  static show (req, res) {
    let category = req.params.category
    let alphabet = req.params.alphabet
    Answer.findAll({where: {firstAlphabet: alphabet, category}})
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
}

module.exports = Controller
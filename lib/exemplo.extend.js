const _ = require('lodash')
const Exemplo = require('./exemplo.schema')
const Crud = require('../../grm-class/grm.crud')
const grmScheduler = require('../../grm-class/grm.scheduler')


// Mais uma função middleware
function resumo(req, res) {
  Exemplo.aggregate({
    $project: {credito: {$sum: "$credito.value"}, debito: {$sum: "$debito.value"}}
  }, {
    $group: {_id: null, credito: {$sum: "$credito"}, debito: {$sum: "$debito"}}
  }, {
    $project: {_id: 0, credito: 1, debito: 1}
  }, function(error, result) {
    if(error) {
      res.status(500).json({errors: [error]})
    } else {
      res.json(_.defaults(result[0], {credito: 0, debito: 0}))
    }
  })
}

function teste(req, res) {
    const exemploCrud = new Crud('exemplo')
    exemploCrud.find({_id: '5a31b041b388420abcf9f048'})
        .catch(console.log)
        .then(result => result[0].name)
        .then(result => result.toUpperCase())
        .then(result => res.send(result) )
}

function stopAgenda(req, res) {
  res.send('stop agenda!')
  grmScheduler.pauseTask('testeAgenda')
}



module.exports = { resumo, teste, stopAgenda }

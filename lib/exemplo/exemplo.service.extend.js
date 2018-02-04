
// const exemplo = require('./exemplo.schema') // ESTÁ CHAMANDO SCHEMA ANTIGO, DEVE SER ALTERADO PARA PASTA SCHEMA
// const Crud = require('../../grm-class/grm.crud')
const _ = require('lodash')
const scheduler = require('../../grm-class/grm.scheduler')
const orm = require('grm-orm')

// Mais uma função middleware
function resumo(req, res) {
  orm.mongoose.models.exemplo.aggregate({
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


function stopAgenda(req, res) {
  res.send('stop agenda!')
  scheduler.pauseTask('exemploAgenda')
}


function teste(req, res) {
  orm.mongoose.models.exemplo.find()
  .then(result => result[0].name)
  .then(result => result.toUpperCase())
  .then( r => res.send(r) )
}


function soma(req, res) {
  res.send('Soma: ' + (Number(req.params.v1) + Number(req.params.v2)) )
}
soma.p = {
  auth: true,
  params: ['v1','v2'],
  methodsAuth: ['get', 'post'],
  methods: 'get'
}


module.exports = [ resumo, teste, stopAgenda, soma ]

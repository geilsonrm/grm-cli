const restful = require('node-restful')
const mongoose = restful.mongoose


const creditoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, min: 0, required: true }
})

const debitoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, min: 0, required: [true, 'Informe o valor do débito!'] }
})

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  data: { type: Date, required: false },
  month: { type: Number, min: 1, max: 12, required: true},
  year: { type: Number, min: 1980, max: 2020, required: true},
  sexo: { type: String, uppercase: true, enum: ['M','F'] },
  credito: [creditoSchema],
  debito: [debitoSchema]
})


schema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {   delete ret._id  }
});

module.exports = restful.model('n1', schema)
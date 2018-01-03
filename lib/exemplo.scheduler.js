
function testeAgenda() {
    var data = new Date()
    data = data.toString().slice(0,24)
    console.log(`${data} Agendamento de tarefa "exemplo" está funcionando!`);
}


let schedule = {
    schedule: 's/5 m h D M DS', 
    taskFunction: testeAgenda
}


module.exports = { schedule }
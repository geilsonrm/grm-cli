
function exemploAgenda() {
    var data = new Date()
    data = data.toString().slice(0,24)
    c.log(`${data} Agendamento de tarefa "exemplo" está funcionando.`);
}


let schedule = {
    schedule: 's/10 m h D M DS', 
    firstTimeNow: false,
    taskFunction: exemploAgenda
}


module.exports = { schedule }

function testeAgenda() {
    console.log(`${new Date()} Agenda "exemplo" está funcionando!`);
}


let schedule = {
    schedule: 's m h D M DS', 
    taskFunction: testeAgenda
}


module.exports = { schedule }
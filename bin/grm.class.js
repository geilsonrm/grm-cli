
const explorer = require('./grm.explorer')
const trash = require('trash');
var fs = require('fs');
const data = new Date()

const nameLibs = ['data', 'scheduler', 'service', 'service.extend']
const nameLibs2 = ['mongoose', 'sequelize']
const nameFolders = []

class Api {

    constructor(p) {
        this.nameFolders = p.names
        this.option = p.options
        this.line = 0
    }

    copy() {
        // se for utilizado em outro ambiente buscar arquivos dentro de node_modules
        const path = fs.existsSync('lib') ? `lib/` : `node_modules/grm-cli/lib/`

        this.nameFolders.forEach(nameFolder => {

            // copia pastas com arquivos da biblioteca
            explorer.copyDir(`${path}/exemplo`, `api/${nameFolder}`)
            explorer.copyDir(`${path}/exemplo.schema`, `api/${nameFolder}/${nameFolder}.schema`)
            var self = this;

            // renomeia arquivos da pasta copiada acima
            nameLibs.forEach(nameLib => {
                let oldName = `api/${nameFolder}/exemplo.${nameLib}.js`
                let newName = `api/${nameFolder}/${nameFolder}.${nameLib}.js`

                fs.rename(oldName, newName, function (err) {
                    if (err) console.log(err)
                    self.replace(newName, nameFolder)
                })
            })

            // renomeia arquivos da subpasta acima
            nameLibs2.forEach(nameLib => {
                let oldName = `api/${nameFolder}/${nameFolder}.schema/exemplo.${nameLib}.js`
                let newName = `api/${nameFolder}/${nameFolder}.schema/${nameFolder}.${nameLib}.js`

                fs.rename(oldName, newName, function (err) {
                    if (err) console.log(err)
                    self.replace(`api/${nameFolder}/${nameFolder}.schema/index.js`, nameFolder)
                })
            })

        })

        this.increment()
    }

    remove() {
        this.nameFolders.forEach(nameFolder => {
            trash(`api/${nameFolder}`).then(() => {
                this.decrement()
                console.log(`A API "${nameFolder}" foi enviada para a lixeira.`)
            })
        })
    }


    /**
     * Este método lê o arquivo
     * Localiza a string informada
     * E incremeta nova string
     * Caso seja passo um número a ser localizado
     * O incremeto será na linha referente ao número
     * O 3º parâmetro opcional determina quebra de linha 
     */
    increment() {
        let file = `api/grm.api-service.js`
        var self = this

        fs.readFile(file, "utf-8", function (err, data) {
            if (err) console.log('Erro ao ler arquivo:', err)
            var newData = data
            var add2 = ""
            self.nameFolders.forEach(nameFolder => {
                let find = 'module.exports = ['
                let add1 = `const ${nameFolder}Service = require('./${nameFolder}/${nameFolder}.service')`
                add2 = `  ${nameFolder}Service,`

                if( !data.exist(add2) ) {
                    newData = newData.findAndAdd(0, add1)
                    newData = newData.findAndAdd(find, add2)
                    c.warn(`A api "${nameFolder}" foi criada.`)
                }
            })
            if(!(data == newData)) fs.writeFile(file, newData)
        })
    }


    decrement() {
        let file = `api/grm.api-service.js`
        var self = this

        fs.readFile(file, "utf-8", function (err, data) {
            if (err) console.log('Erro ao ler arquivo:', err)
            var newData = data
            self.nameFolders.forEach(nameFolder => {
                let find1 = `${nameFolder}Service,`
                let find2 = `const ${nameFolder}Service = require('./${nameFolder}/${nameFolder}.service')`
                
                newData = newData.findAndRemove(find1)
                newData = newData.findAndRemove(find2)
                c.warn(`A api "${nameFolder}" foi removida.`)
            })
            fs.writeFile(file, newData)
        })
    }

    comment() {
        let file = `api/grm.api-service.js`
        var self = this

        fs.readFile(file, "utf-8", function (err, data) {
            if (err) console.log('Erro ao ler arquivo:', err)
            var newData = data

            self.nameFolders.forEach(nameFolder => {
                let find1 = `${nameFolder}Service,`
                let find2 = `const ${nameFolder}Service = require('./${nameFolder}/${nameFolder}.service')`
                
                newData = newData.replace(find1, `// ${find1}`)
                newData = newData.replace(find2, `// ${find2}`)
                c.warn(`A api "${nameFolder}" foi comentada.`)
            })
            fs.writeFile(file, newData)
        })
    }
    
    uncomment() {
        let file = `api/grm.api-service.js`
        var self = this

        fs.readFile(file, "utf-8", function (err, data) {
            if (err) console.log('Erro ao ler arquivo:', err)
            var newData = data

            self.nameFolders.forEach(nameFolder => {
                let find1 = `${nameFolder}Service,`
                let find2 = `const ${nameFolder}Service = require('./${nameFolder}/${nameFolder}.service')`
                
                newData = newData.replace(`// ${find1}`, find1)
                newData = newData.replace(`// ${find2}`, find2)
                c.warn(`A api "${nameFolder}" foi descomentada.`)
            })
            fs.writeFile(file, newData)
        })
    }

    
    replace(file, nameLib) {
        let find = 'module.exports = ['
        let add1 = `const ${nameLib}Service = require('./${nameLib}/${nameLib}.service')`
        let add2 = `  ${nameLib}Service,`

        fs.readFile(file, "utf-8", function (err, data) {
            if (err) console.log('Erro ao ler arquivo:', err)
            var newData = data.replaceAll('exemplo', nameLib)
            // console.log(newData)
            fs.writeFile(file, newData)
        })
    }


    init() {
        if (this.option.length == 0) {
            this.copy()
        } else {
            switch (this.option) {
                case '--remove': this.remove()
                    break
                case '--comment': this.comment()
                    break
                case '--uncomment': this.uncomment()
                    break

                default:
                    console.log(`ERROR: A frag "${this.option}" é desconhecida.`)
            }
        }
    }


}



module.exports = Api
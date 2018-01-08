
const requireText = require('require-text')

const fs = require('fs');
var mkdirp = require('mkdirp');
const cpFile = require('cp-file')

// fs.defaultEncoding = 'utf-8'

class Grm {

    constructor(p) {
        this.cmds = p.cmd
        this.nameFiles = p.nameFiles
        this.libFile = '',
        this.options = p.options,
            this.destination = '',
            this.libFiles = ['schema', 'service', 'service.extend', 'scheduler', 'functions', 'data'],
            this.apiFiles = ['service', 'scheduler', 'data']
    }

    info() {
        console.log(`
        command: ${this.cmds}
        nameFiles: ${this.nameFiles}
        options: ${this.options}
        typeFiles: ${this.typeFiles}
        `)
    }

    stringToReplace(name, libFile) {
        const nameCamelCase = name.concat(libFile.capitalize())
        const pathFile = `./${name}/${name}.${libFile}`
        const concatRequire = `const ${nameCamelCase} = require('${pathFile}')`
        return {

            path: `api/grm.api-${libFile}.js`,
            action: {
                increment: {
                    replace1a: `\nmodule.exports = [`, replace1b: `${concatRequire}\n\nmodule.exports = [`,
                    replace2a: 'exports = [', replace2b: `exports = [\n  ${nameCamelCase},`
                },
                comment: {
                    replace1a: concatRequire, replace1b: `// ${concatRequire}`,
                    replace2a: `${nameCamelCase},`, replace2b: `// ${nameCamelCase},`
                },
                uncomment: {
                    replace1a: `// ${concatRequire}`, replace1b: concatRequire,
                    replace2a: `// ${nameCamelCase},`, replace2b: `${nameCamelCase},`
                },
                remove: {
                    replace1a: `${concatRequire}\n`, replace1b: ``,
                    replace2a: `${nameCamelCase},\n  `, replace2b: ``
                },
            }
        }

    }

    // concatDestination(name, file,t) {
    //     this.destination = `api/${name}/${name}.${file}.js`
    //     console.log(t, name, file)
    // }

    isApi(cmd) {
        return ['a', 'api'].find(item => cmd == item)
    }

    isOption(option) {
        return this.options.find(item => `--${option}` == item)
    }

    isFile() {
        let inner = [
            '--schema', '--service', '--extend', '--scheduler', '--functions', '--data'
        ].innerJoin(this.options)
        return inner.length
    }

    setLibFiles() {
        let inner = [
            '--schema', '--service', '--extend', '--scheduler', '--functions', '--data'
        ].innerJoin(this.options)
        this.libFiles = inner.replaceString('--','')
    }

    option(option) {
        this.nameFiles.forEach(name => {
            this.apiFiles.forEach(apiFile => {
                let api = this.stringToReplace(name, apiFile)
                // console.log(option)
                this.fileReplace(
                    api.path,
                    [
                        [api.action[option].replace1a, api.action[option].replace1b],
                        [api.action[option].replace2a, api.action[option].replace2b]
                    ]
                )
            })
        })
    }

    getFileAndReplace(libFile, nameFile) {
        this.libFile = requireText(`../lib/exemplo.${libFile}`, require)
        return this.libFile.replaceAll('exemplo', nameFile)
    }

    createApi() {
        if (this.isOption('basic')) this.libFiles.splice(2, 7)
        if (this.isFile()) this.setLibFiles()
        this.nameFiles.forEach(nameFile => {
            const self = this
            
            mkdirp(`api/${nameFile}`, function (err) {
                if (err) { console.error(err) 
                } else {
                    self.libFiles.forEach(libFile => {
                        let newFile = self.getFileAndReplace(libFile, nameFile)
                        let destination = `api/${nameFile}/${nameFile}.${libFile}.js`

                        fs.writeFile(destination, newFile, function (err) {
                            if (err) return console.log(err);                            
                            self.incrementRequire(nameFile, libFile)
                            console.log(`     |- ${nameFile}.${libFile}.js`);
                        })
                    })
                }
            });

            console.log(`API "${nameFile}" created`)
        })


    }

    incrementRequire(nameFile, libFile) {
        if (['service', 'data', 'scheduler'].find(item => item == libFile)) {
            let api = this.stringToReplace(nameFile, libFile)
            this.fileReplace(
                api.path,
                [
                    [api.action.increment.replace1a, api.action.increment.replace1b],
                    [api.action.increment.replace2a, api.action.increment.replace2b]
                ]
            )
        }
    }

    fileReplace(destination, replaces) {
        let readFile = function (file, callback) {
            fs.readFile(file, "utf-8", function (err, data) {
                if (err) console.log('Erro ao ler arquivo:', err);
                callback(data)
            });
        }

        let callback = function (data) {
            replaces.forEach(replace => {
                data = data.replaceAll(replace[0], replace[1])
            })
            fs.writeFile(destination, data, function (err) {
                if (err) throw err;
                // code success...
            })
        }

        readFile(destination, callback)
    }


    init() {
        this.cmds.forEach(cmd => {

            if (this.isOption('comment')) {
                this.option('comment')
                return
            }

            if (this.isOption('uncomment')) {
                this.option('uncomment')
                return
            }

            if (this.isOption('remove')) {
                this.option('remove')
                return
            }

            if (this.isApi(cmd)) this.createApi()

        })
    }

}

module.exports = Grm
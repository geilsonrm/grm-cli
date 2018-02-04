
module.exports = () => {

    String.prototype.replaceAll = function (searchStr, replaceStr) {
        var str = this;
        // escape regexp special characters in search string
        searchStr = searchStr.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        return str.replace(new RegExp(searchStr, 'gi'), replaceStr);
    };

    String.prototype.insert = function (index, string) {
        if (index > 0)
            return this.substring(0, index) + string + this.substring(index, this.length);
        else
            return string + this;
    };

    String.prototype.reverse = function () {
        return this.split("").reverse().join("");
    }

    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };


    String.prototype.camelCase = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

    String.prototype.exist = function (value) {
        return this.indexOf(value) >= 0
    }


    Array.prototype.exist = function (value) {
        return this.indexOf(value) >= 0
    }

    Array.prototype.innerJoin = function (arr) {
        let concat = []
        this.forEach(item1 => {
            arr.forEach(item2 => {
                if (item1 == item2) concat.push(item1)
            })
        })
        return concat
    }


    Array.prototype.replaceString = function (str1, str2) {
        let concat = []
        this.forEach(item => {
            concat.push(item.replace(str1, str2))
        })
        return concat
    }

    String.prototype.findAndAdd = function (find, add, breakLine = true) {
        var concat = ""
        this.split('\n').forEach((item, index) => {
            concat += item.concat('\n')
            if (typeof find == 'string') {
                if (item.exist(find)) concat += breakLine ? add.concat('\n') : add
            } else {
                if (index == find) concat += breakLine ? add.concat('\n') : add
            }
        })
        return concat
    }

    String.prototype.findAndRemove = function (str) {
        var concat = ""
        this.split('\n').forEach((item, index) => {
            if (!item.exist(str)) concat += item.concat('\n')
        })
        return concat
    }

    global.c = {
        yellowFg: "\x1b[33m",
        blueFg:   "\x1b[36m",
        whiteFg:  "\x1b[37m",
        redFg:    "\x1b[31m",
        reset:    "\x1b[0m",
        reverse:  "\x1b[7m",
    
        console: function (color, arguments) {
            console.log(
                '' + color, // cor do icone
                '\u26A0', // icone
                ' GRM:',
                // "\x1b[0m", // reset
                // this.whiteFg, // cor da fonte
                ...arguments, // parâmetros da função
                "\x1b[0m" // reset
            )
        },
    
        log: function () { this.console('', arguments) },
        warn: function () { this.console(this.yellowFg, arguments) },
        info: function () { this.console(this.blueFg, arguments) },
        error: function () { this.console(this.redFg, arguments) }
    }

    module.exports = {}

}
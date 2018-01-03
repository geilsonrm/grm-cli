
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
    
    String.prototype.reverse = function(){
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
                if(item1 == item2) concat.push(item1)
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
    
    module.exports = {}

}
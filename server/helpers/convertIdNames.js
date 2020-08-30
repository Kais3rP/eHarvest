module.exports = function(str){

    return /.*(?=.png)/.exec(str)[0]
    }
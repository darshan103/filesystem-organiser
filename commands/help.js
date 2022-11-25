// Help Function will list all the ways by which you can run the commands of this project

function helpFn(){
    console.log(`List of all the command :
                        1) Tree - node FO.js tree <dirPath>
                        2) organise - node Fo.js organise <dirPath>
                        3) help - node FO.js help
                `)
}

module.exports = {
    helpFnKey : helpFn
}
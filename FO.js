// terminal pe array ki input lega i.e node FO.js Darshan
const fs = require('fs')
const path = require('path')

let input = process.argv.slice(2)
let inputArr = input 
let command = inputArr[0];

switch(command){
    case 'tree':
        console.log('Tree Implemented')
        break;
    case 'organise':
        organiseFn(inputArr[1])
        break;
    case 'help':
        helpFn()
        break;
    default :
        console.log('Please enter a Valid command')
        break;
}

function helpFn(){
    console.log(`List of all the command :
                        1) Tree - node FO.js tree <dirPath>
                        2) organise - node Fo.js organise <dirPath>
                        3) help - node FO.js help
                `)
}

/* Organise Function will organise all your target folder's files in a 
   different folder according to their extensions */
function organiseFn(dirPath){
    let destPath
    // check whether directory path passed or not & if not smply return
    if(dirPath==undefined){
        console.log("Please Enter a valid Directory Path")
        return;
    }

    // doesExist will tell Target folder(i.e testFolder) is exist or not
    let doesExist = fs.existsSync(dirPath)
    if(doesExist==true){
        destPath=path.join(dirPath,'Organise_Files')
        // check whether in the given destPath does a folder exists with 
        // same name and if does not make a folder
        if(fs.existsSync(destPath)==false){
            fs.mkdirSync(destPath)
        }
        else{
            console.log('Folder Already Exists')
        } 
    }
    else{
        console.log("Please Enter a Valid Path")
    } 
}


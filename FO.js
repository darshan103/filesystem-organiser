// terminal pe array ki input lega i.e node FO.js Darshan
const fs = require('fs')
const path = require('path')

let input = process.argv.slice(2)  //Commandline se input lene ke liye or yeh ek array ki form me liya jata h
let inputArr = input 
let command = inputArr[0];

let types = {
    media: ["mp4", "mkv", "mp3","jpeg","jpg"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: ["docx","doc","pdf","xlsx","xls","odt","ods","odp","odg","odf","txt","ps","tex",],
    app: ["exe", "dmg", "pkg", "deb"],
};

switch(command){
    case 'tree':
        treeFn(inputArr[1])
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

    organiseHelper(dirPath,destPath)
}

function organiseHelper(src,dest){
    // It reads the content in the src(i.e dirPath)
    let childNames = fs.readdirSync(src)
    // console.log(childNames)

    for(let i=0; i<childNames.length; i++){
        // It joins (src & childNames with index) and gives 
        // child addresses for each childNames
        let childAddress = path.join(src, childNames[i])
        // console.log(childAddress)
        // console.log(childNames[i])

        // If file exist then return true otherwise return false
        // lstatSync gives stats for each childAddress and isFile
        // function is applied with lstatSync
        let isFile = fs.lstatSync(childAddress).isFile()
        if(isFile==true){
            // console.log(childAddress)
            let fileCategory = getCategory(childNames[i])
            sendFiles(childAddress,dest,fileCategory)
        }
    }
}

function getCategory(fileName){
    // we extracted the extension name of target files
    let ext = path.extname(fileName).slice(1)
    // console.log(ext)

    for(let type in types){
        // we look for all the category type ARRAYs here
        let cTypeArr = types[type]
        // console.log(cTypeArr)

        for(let i=0; i<cTypeArr.length; i++){
            if(ext == cTypeArr[i]){
                return type
            }
        }
    }
} 

function sendFiles(srcfilePath, dest, fileCategory){
    // We will create path for each category type encountered to create folders of their names
    let catPath = path.join(dest, fileCategory)
    if(fs.existsSync(catPath)==false){
        fs.mkdirSync(catPath)
        // console.log(catPath)
    }

    // We tookout the basename of all the files
    let fileName = path.basename(srcfilePath)
    let destfilePath = path.join(catPath, fileName)
    fs.copyFileSync(srcfilePath, destfilePath)

    // It deletes the files in targeted folder
    fs.unlinkSync(srcfilePath)
    console.log('Files Organised')
}

function treeFn(dirPath){
    if(dirPath==undefined){
        console.log("Please enter a valid path : ")
        return
    }
    else{
        let doesExist = fs.existsSync(dirPath)
        if(doesExist == true){
            treeHelper(dirPath,' ')
        }
    }
}

function treeHelper(targetPath, indent){

    isFile = fs.lstatSync(targetPath).isFile()

    if(isFile==true){
        let fileName = path.basename(targetPath)
        console.log(indent + "├── " + fileName)
    }
    else{
        let dirName = path.basename(targetPath)
        console.log(indent+ "└──" +dirName)

        let children = fs.readdirSync(targetPath)
        for(let i=0; i<children.length; i++){
            let childpath = path.join(targetPath, children[i])
            treeHelper(childpath, indent+"\t")
        }
    }
}
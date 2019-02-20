const path = require('path');
const p = path.join(__dirname, '../..', 'MOquestions.xlsx');
const XLSX = require('xlsx');
const fs = require(`fs`);
const { promisify } = require(`util`);
const readFile = promisify(fs.readFile);

flag = false;
let DOMParser = require('xmldom').DOMParser;
let parser = new DOMParser();
let workBook = XLSX.readFile(`${p}`);
let i = 2;
let questions = [];
let answers = [];
let dataCalVal = [];
let answerColumn = [];
let questionColumn;
let dataCalcColumn;


let firstSheet = workBook.SheetNames[0];
let worksheet = workBook.Sheets[firstSheet];
let questionCell = 'A';
let answerCells = ['B','C','D','E'];
let dataCalcCell = 'G';

while(!flag){

    questionColumn = worksheet[questionCell + i.toString()];
    dataCalcColumn = worksheet[dataCalcCell + i.toString()];

    if(questionColumn === undefined){
        flag = true;
    }else{
        for(let k = 0; k < 4; k++){
            answerColumn = worksheet[answerCells[k] + i.toString()];
            //console.log(answerColumn);
        }
        questions.push(questionColumn);
        dataCalVal.push(dataCalcColumn)
        answers.push(answerColumn);
        i++;
    }
}


/*Load and Read HTML Document from MO_QUIZ*/
function loadHTML(html){
let dom,rawUlList, parsedBody;
    let liElements = [];

    rawUlList = fs.readFileSync(path.join(__dirname,'./..', html), `utf-8`);
    dom = parser.parseFromString(rawUlList,'text/html');
    parsedBody = dom.getElementsByTagName('label');
    console.log(parsedBody);
    dom.appendChild("TESTESTEST");
        /*

        ,function read(err, html){
            if (!err){
                dom = parser.parseFromString(raw, 'text/html');
                rawUlList = dom.getElementsByTagName("body").innerHTML;
                console.log(rawUlList);

                for(let i = 0; i < rawUlList.length; i++){
                    liElements.push(rawUlList[i].innerHTML)
                }

            }else{
                alert("Could Not Read MO_FINAL!");
            }
            //console.log(liElements);
            processFile(raw);
        })
        */
};

loadHTML('MOfinal.html')
function processFile(body) {


}


const path = require('path');
const p = path.join(__dirname, '../..', 'MOquestions.xlsx');
const XLSX = require('xlsx');
const fs = require(`fs`);
const { promisify } = require(`util`);
const readFile = promisify(fs.readFile);

flag = false;
var DomParser = require('dom-parser');
var parser = new DomParser();
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
let ansIndex = 0;
const {BrowserWindow} = require('electron')

while(!flag){

    questionColumn = worksheet[questionCell + i.toString()];
    dataCalcColumn = worksheet[dataCalcCell + i.toString()];
    answerColumn = [];

    if(questionColumn === undefined){
        flag = true;
    }else{
        for(let k = 0; k < 4; k++){
            answerColumn.push (worksheet[answerCells[k] + i.toString()].v + ' ');
            //console.log(answerColumn);
        }
        questions.push(questionColumn);
        dataCalVal.push(dataCalcColumn)
        answers.push(answerColumn);
        i++;
        ansIndex++;
    }
}


/*Load and Read HTML Document from MO_QUIZ*/
function loadHTML(html){
let dom,rawUlList, parsedBody;
    let liElements = [];

    fs.readFile(path.join(__dirname,'./..', html), `utf-8`, function(err, html) {
        if (!err){
          var dom = parser.parseFromString(html); 
          var updatedHtmlStr = '<div id="listq">';
          updatedHtmlStr += dom.getElementById('listq').innerHTML;
          var qcounter = dom.getElementsByTagName('li').length;
          
          questions.forEach((item, ind) => {
            console.log(item.v);
            console.log(answers[ind]);
            qcounter = qcounter + 1;
            updatedHtmlStr += '<li class="QA'+qcounter+'" id="id_'+qcounter+'" data-type="control_checkbox">';
            updatedHtmlStr += '<label class="Question" id="Q'+qcounter+'" for="input_'+qcounter+'_0">' + item.v + '</label>';
            updatedHtmlStr += '<div class="Answers" data-component="checkbox">';

            var ansArr= answers[ind];
                ansArr.forEach((ansItem, ansInd) => {
                    updatedHtmlStr += '<input name="answer" class="form-checkbox" id="input_'+qcounter+'_'+ansInd+'" type="checkbox" value="'+ansItem+'" data-calcvalue="true">';
                    updatedHtmlStr += '<label id="label_input_'+qcounter+'_'+ansInd+'" for="input_'+qcounter+'_'+ansInd+'"> '+ansItem+' </label>';

                }); 
                updatedHtmlStr += '</div>';
                updatedHtmlStr += '</li>';
          });
          
         
      updatedHtmlStr += '</div>';
      fs.writeFileSync("./qlist.html", updatedHtmlStr, {encoding: "utf8"});
      BrowserWindow.getFocusedWindow().reload();
          //console.log(updatedHtmlStr);
        }
    })

};

loadHTML('qlist.html')
function processFile(body) {


}


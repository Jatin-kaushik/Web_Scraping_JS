// Library minimist, jsdom, axios, excel4node, pdf-lib
//npm init -y //first time folder visit
// run node scrap.js --excel=worldcup.csv --datafolder=data --source=https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/match-results
let minimist = require('minimist'); // args and input read krne ke lie
let fs = require('fs'); // file read nd write krne ke lie
let jsdom = require('jsdom'); // html read krke object nikalne me(page ka documented object model like tree bnane ke lie)
let axios = require('axios'); // html page read ke lie
let excel = require('excel4node'); // excel bnaane ke lie
let pdf = require('pdf-lib'); // pdf bnaane ke lie

let args = minimist(process.argv);

// steps to do this task
// download data using axios
//extract info using jsdom
// manipulate data using array functions
//Save in excel using excel4node
// create folders and prepare pdfs


let responsekapromise = axios.get(args.source);
responsekapromise.then(function(response){
    let html = response.data;
    // console.log(html);

    let dom = new jsdom.JSDOM(html);
    let document = dom.window.document;

    let matches = [];
    let matchDivs = document.querySelectorAll("div.match-score-block"); //aisi div jispe ye class lagi ho
    // console.log(matchDivs.length); // 48 matches total 
    for(i = 0; i<matchDivs.length; i++){
        let matchDiv = matchDivs[i];
        let match = {
            t1 : "",
            t2 : "",
            t1s : "",
            t2s : "",
            result : ""
        };

        let teamparas = matchDiv.querySelectorAll("div.name-detail > p.name");
        match.t1 = teamparas[0].textContent;
        match.t2 = teamparas[1].textContent;


        let scorespans = matchDiv.querySelectorAll("div.score-detail>span.score");
        if (scorespans.length == 2){
            match.t1s = scorespans[0].textContent;
            match.t2s = scorespans[1].textContent;

        }

        else if (scorespans.length == 1) {
            match.t1s = scorespans[0].textContent;
            match.t2s = "";
        }
        else {
            match.t1s = "";
            match.t2s = "";
        }

        let resultspan = matchDiv.querySelector("div.status-text > span");
        // console.log(resultspan.textContent);
        match.result = resultspan.textContent;




        matches.push(match);
    }
    console.log(matches);

})
//57 min

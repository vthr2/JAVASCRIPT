//Function to load json data using sample code provided in lectures 






//It was hard to find a way to populate the table while also adding a delete option only for yaks posted by myself, First I tried using a seperacte function which gets my nickname but I could not find a way to make it while also populating the table. I wanted to both get all the yaks and my only my nickname and use those both in the same function to populate the table and adding delete option for my nickname. I figured it could be possible to use a fetch call inside a fetch call to access both of them using the get user API and get yaks API requests.






/*
async function getAsyncData(){
   let result = await fetch("https://cs5003-api.host.cs.st-andrews.ac.uk/api/yaks?key=ae26c4ea-2ca8-4c01-83e5-e4d810950cf1", {
    method: 'GET', 
  })
    let dat = await result.json();
    console.log(dat);
    return dat;
}

function getData() {
    clearBody();
  getAsyncData()
  .then(dat => {
        console.log(dat);
        let response = fetch("https://cs5003-api.host.cs.st-andrews.ac.uk/api/user?key=ae26c4ea-2ca8-4c01-83e5-e4d810950cf1", 
        {
        method: 'GET'
        }).then(response =>
        {
        //console.log(response);
        return response.json();
        })
        .then(data => {
        //console.log(data.userNick);  
        popTable(dat,data.userNick);
        })
       .catch(error =>{
           console.log(error+"error");
       })       
  })
  .catch(err=> 
         {
      console.log(err+"err");
  })
}
*/

//reactiveData();

//Here we get the data from the JSON. The biggest problem I had was finding a way to acces that data. Finally I realised I could use my functions  inside the .then call using the JSON data that was fetched in the .then call



function getData() {
    clearBody();
    let result = fetch("https://cs5003-api.host.cs.st-andrews.ac.uk/api/yaks?key=ae26c4ea-2ca8-4c01-83e5-e4d810950cf1", {
    method: 'GET', 
  }).then(res =>{
      console.log(res);
      return res.json();
  })
  .then(dat => {
        console.log(dat);
        let response = fetch("https://cs5003-api.host.cs.st-andrews.ac.uk/api/user?key=ae26c4ea-2ca8-4c01-83e5-e4d810950cf1", 
        {
        method: 'GET'
        }).then(response =>
        {
        //console.log(response);
        return response.json();
        })
        .then(data => {
        //console.log(data.userNick);  
        popTable(dat,data.userNick);
        })
       .catch(error =>{
           console.log(error+"error");
       })       
  })
  .catch(err=> 
         {
      console.log(err+"err");
  })
  
      //clearBody();
}


//window.addEventListener ("load", function() {
//  getData();
//});
//function updatePage() {
//    $.getJSON('https://cs5003-api.host.cs.st-andrews.ac.uk/api/yaks?key=ae26c4ea-2ca8-4c01-83e5-e4d810950cf1', function(data) {
//      clearBody();
//       getData();    
//    });
//}


//getAsyncData();

getData();
function postData(postedMessage) {
  // Default options are marked with *
  let response = fetch("https://cs5003-api.host.cs.st-andrews.ac.uk/api/yaks?key=ae26c4ea-2ca8-4c01-83e5-e4d810950cf1", {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
       
          content: postedMessage
      })
  }).then(response =>{
      //console.log(response);
         getData(); // On success we refresh data
      return response.json();
   
  })
  .catch(err=> 
         {
      console.log(err+ "err")
  })
}


function deleteData(deleteId)
{
  // Default options are marked with *
  let res = fetch("https://cs5003-api.host.cs.st-andrews.ac.uk/api/yaks/"+deleteId+"?key=ae26c4ea-2ca8-4c01-83e5-e4d810950cf1", {
    method: 'DELETE'
  }).then(res=>{
      console.log(res);
      getData(); 
  })
  .catch(err=> 
         {
      console.log(err+"err");
  })
}

setInterval(getData, 1000*60*5);


function addNick(myNick)
{
    let response = fetch("https://cs5003-api.host.cs.st-andrews.ac.uk/api/user?key=ae26c4ea-2ca8-4c01-83e5-e4d810950cf1", {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
          "userNick": myNick
      })
  }).then(response =>{
     console.log(response+ "test");
      getData();
      return response.json();
  })
  .catch(err=> 
         {
      console.log(err+ "err")
  })
}


function voteUp(idOfVote)
{
    
  // Default options are marked with 
    
 // let res = fetch("https://cs5003-api.host.cs.st-andrews.ac.uk/api/yaks/"+idOfVote"/vote?key=ae26c4ea-2ca8-4c01-83e5-e4d810950cf1", {
    let res = fetch("https://cs5003-api.host.cs.st-andrews.ac.uk/api/yaks/"+idOfVote+"/vote?key=ae26c4ea-2ca8-4c01-83e5-e4d810950cf1", {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
          "direction": "up"
      })
  }).then(res=>{
      console.log(res);
       getData();   
  })
  .catch(err=> 
         {
      console.log(err+"err")
  })
}

function voteDown(idOfVote)
{
    
  // Default options are marked with 
    
 // let res = fetch("https://cs5003-api.host.cs.st-andrews.ac.uk/api/yaks/"+idOfVote"/vote?key=ae26c4ea-2ca8-4c01-83e5-e4d810950cf1", {
    let res = fetch("https://cs5003-api.host.cs.st-andrews.ac.uk/api/yaks/"+idOfVote+"/vote?key=ae26c4ea-2ca8-4c01-83e5-e4d810950cf1", {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
          "direction": "down"
      })
  }).then(res=>{
        getData(); 
      console.log(res);
  })
  .catch(err=> 
         {
      console.log(err+"err")
  })
}




function postYak()
{
    var postedData = window.prompt("Write your yak below");
    postData(postedData);
}


function addNickname()
{
    var addNickname = window.prompt("Write your new nickname below");
    document.getElementById("myNickname").innerHTML = "Current nickname: " + addNickname;
    addNick(addNickname);
}

function getName()
{

    let response = fetch("https://cs5003-api.host.cs.st-andrews.ac.uk/api/user?key=ae26c4ea-2ca8-4c01-83e5-e4d810950cf1", {
    method: 'GET'
    }).then(response =>{
      console.log(response);
      return response.json();
  })
  .then(dat => {
      console.log(dat.userNick);  
      return dat.userNick;
  })
  .catch(err=> 
         {
      console.log(err+"err")
  })
}

function createTable()
{
            
    var body = document.getElementsByTagName('body')[0];
    var myTable = document.createElement("table");
    body.appendChild(myTable);
    myTable.id ="yakTable";
    var tableBody = document.createElement('tbody');
    myTable.appendChild(tableBody);
    var tableRow = document.createElement("tr");
    tableBody.appendChild(tableRow);
    var tblHeader1 = document.createElement("th");
    var tblHeader2 = document.createElement("th");
    var tblHeader3 = document.createElement("th");
    var tblHeader4 = document.createElement("th");
    var tblHeader5 = document.createElement("th");
    var tblHeader6 = document.createElement("th");
    var tblHeader7 = document.createElement("th");
    var tblHeader8 = document.createElement("th");
  
    
    var createHeader = function(header,name)
    {
        var text = document.createTextNode(name);
        header.appendChild(text);
        tableRow.appendChild(header);
    }
    
    createHeader(tblHeader1, "Yaks");
    createHeader(tblHeader2, "IDs");
    createHeader(tblHeader3, "Votes");
    createHeader(tblHeader4, "Nicknames");
    createHeader(tblHeader5, "Vote Up");
     createHeader(tblHeader6,"Vote Down");
    createHeader(tblHeader7, "Delete");
    createHeader(tblHeader8, "Time of Post");
    //console.log(myTable);
}



function popTable(myYaks,myNick)
{
    //console.log(myYaks);
    
    createTable();
    
    var table = document.getElementById("yakTable");
    //console.log(table);
    
  // loop through albums and add row with each entry
  for(let i = 0; i < myYaks.length; i++) 
  {
    var allYaks = myYaks[i]; //Store each yak
    var tr = document.createElement("tr");
    // for each property of the object, add a cell to the table row
    var addCell = function(text) 
    {
        var td = document.createElement("td");
        var txt = document.createTextNode(text);
        td.appendChild(txt);
        tr.appendChild(td);
    };
          
    //Add year artist, nationality,album, wikipedia link for each entry as a row in the table
    var upvote = function(name)
    {
        var td = document.createElement("td");
 
        let input = document.createElement("input");
        input.type = "button";
        input.className = "button";
        input.value = name;
        input.id = allYaks.id //Same logic as in delete button, I first made the logic behind the delete button, can use same logic for vote button
        input.onclick =  function() { voteUp(this.id);
                                 
                                    };
        td.appendChild(input);
        tr.appendChild(td);
    }
    var downvote = function(name)
    {
        var td = document.createElement("td");
 
        let input = document.createElement("input");
        input.type = "button";
        input.className = "button";
        input.value = name;
        input.id = allYaks.id //Same logic as in delete button, I first made the logic behind the delete button, can use same logic for vote button
        input.onclick =  function() { voteDown(this.id);
                                        };
        td.appendChild(input);
        tr.appendChild(td);
    }
    
    var deleteButton = function(name)
    {
        
        var td = document.createElement("td");
 
        var deleteInput = document.createElement("input");
        deleteInput.type = "button";
        deleteInput.className = "button";
        deleteInput.value = name;
        deleteInput.id = allYaks.id; 
        //Make id of button same as id of yak so I can put the id in the deleteData easily. Took long time to figure out at first I tried to put allYaks.id Into deleteData function and it deleted all my entries. Realised it was because of the for loop all deleteData will be called each time for each id. Had to find some way to get the id in of yak in same column as the button. Figured that each button could have different id and then I realised I could just have the id the same as yakid and then call the delete function with the id of the button.
        deleteInput.onclick = function() {deleteData(this.id);
}; //When button is pressed call delete data and put in the id of the button in the delete data 
        //console.log("test"+ allYaks.id);
        if(allYaks.userNick==myNick)
            {
            td.appendChild(deleteInput);
            }
        tr.appendChild(td);
    }
    
    
    
    addCell(allYaks.content);
    addCell(allYaks.id);
    addCell(allYaks.votes);
    addCell(allYaks.userNick);
    upvote("Up");
    downvote("Down");
    deleteButton("Delete");
    addCell(allYaks.timestamp)
    // add the newly create row to the table
    table.appendChild(tr);
  }
}



function clearBody(){
    var myTable = document.getElementById("yakTable");
    if (myTable)
    {
        myTable.parentNode.removeChild(myTable);
    }
}

function filterFunction(input, Column) {
  // Help from https://www.w3schools.com/howto/howto_js_filter_table.asp
  myInput = document.getElementById(input);
  myFilter = myInput.value.toUpperCase();
  myTable = document.getElementById("yakTable");
  tableRow = myTable.getElementsByTagName("tr");
  for (let i = 0; i < tableRow.length; i++) {
    tableCol = tableRow[i].getElementsByTagName("td")[Column];  //Get nickname column
    if (tableCol) {
      myText= tableCol.textContent || tableCol.innerText;
      myTextFixed = myText.toUpperCase();
      if (myTextFixed.indexOf(myFilter) > -1) {
        tableRow[i].style.display = "";
      } else {
        tableRow[i].style.display = "none";
      }
    }
  }

}


function sortNames()
{
myTable = document.getElementById("yakTable");
console.log(myTable);
tableRow = myTable.getElementsByTagName("tr");
var indexesOfVotes = [];
var tableCol = [];

  for (let i = 1; i < tableRow.length; i++) {
    
    tableCol[i-1] = [tableRow[i].getElementsByTagName("td")[2].innerText,i];  //Get vote column and indexes of each vote
    }
    
    var test_with_index = [];
    for (var i in tableCol) {
        test_with_index.push([tableCol[i], i]);
    }
    test_with_index.sort(function(left, right) {
    return left[0] < right[0] ? -1 : 1;
    });
    console.log(test_with_index);
var indexes = [];
var sortedArr = [];
test = [];
for (let j in test_with_index) {
    sortedArr.push(parseInt(test_with_index[j][0]));
    indexes.push(parseInt(test_with_index[j][1]));
}
console.log(sortedArr);
console.log(indexes);
for(let k = 1; k < tableRow.length; k++)
{
    console.log(tableRow[k].getElementsByTagName("td")[2].innerText+ "number");
    console.log(tableRow[indexes[k]].getElementsByTagName("td")[2].innerText+ "low");
    tableRow[k].getElementsByTagName("td")[2].innerHTML = tableRow[indexes[k]].getElementsByTagName("td")[2].innerText;
}
}

function sortVotes()
{

    myTable = document.getElementById("yakTable");
    console.log(myTable);
    tableRow = myTable.getElementsByTagName("tr");
    var tableCol = [];
     for (let i = 1; i < tableRow.length; i++) {
    
    tableCol[i-1] = [tableRow[i].getElementsByTagName("td")[2].innerText];  //Get vote column and indexes of each vote
    }

        
    tableCol.sort(function(a, b){return a - b});
        
    

    console.log(tableCol);
    for(let j = 1; j < tableRow.length; j++)
    {
    tableRow[j].getElementsByTagName("td")[2].innerHTML = tableCol[j-1];
    }
}


function mySorter()
{
     myTable = document.getElementById("yakTable");
    console.log(myTable);
    tableRow = myTable.getElementsByTagName("tr");
    var tableCol = [];
     for (let i = 1; i < tableRow.length; i++) {
    
    tableCol[i-1] = [tableRow[i].getElementsByTagName("td")[2].innerText];  //Get vote column and indexes of each vote
    }
    
    tableCol = 
}


function clearBox(input)
{
    var myFilter = document.getElementById(input);
    var myFilter2 = myFilter.value;
    console.log(myFilter);
   // myFilter.removeAttribute(myFilter);
}


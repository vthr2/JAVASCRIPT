//Function to load json data using sample code provided in lectures 






//It was hard to find a way to populate the table while also adding a delete option only for yaks posted by myself, First I tried using a seperacte function which gets my nickname but I could not find a way to make it while also populating the table. I wanted to both get all the yaks and my only my nickname and use those both in the same function to populate the table and adding delete option for my nickname. I figured it could be possible to use a fetch call inside a fetch call to access both of them using the get user API and get yaks API requests.


function getData() {
    //  clearBody();
    let result = fetch("https://cs5003-api.host.cs.st-andrews.ac.uk/api/yaks?key=ae26c4ea-2ca8-4c01-83e5-e4d810950cf1", {
    method: 'GET', 
  }).then(res =>{
      //console.log(res);
      return res.json();
  })
  .then(dat => {
      //console.log(dat);
        let response = fetch("https://cs5003-api.host.cs.st-andrews.ac.uk/api/user?key=ae26c4ea-2ca8-4c01-83e5-e4d810950cf1", 
        {
        method: 'GET'
        }).then(response =>
        {
        console.log(response);
        return response.json();
        })
        .then(data => {
        console.log(data.userNick);  
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
//function updatePage() {
//    $.getJSON('https://cs5003-api.host.cs.st-andrews.ac.uk/api/yaks?key=ae26c4ea-2ca8-4c01-83e5-e4d810950cf1', function(data) {
//      clearBody();
//       getData();    
//    });
//}

//setInterval(getData, 1000);

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
  })
  .catch(err=> 
         {
      console.log(err+"err");
  })
}

    


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
     // console.log(response);
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
    addNick(addNickname);
    document.getElementById("myNickname").innerHTML = addNickname;
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

function createTableTemplate()
{
    var myTable = document.createElement("table");
    myTable.id = "yakTable";
    var myRow = document.createElement("td");
    myTable.appendChild(myRow);
    var col1 = document.createElement("th");
    col1.value = "Yak";
    
     var col2 = document.createElement("th");
    col1.value = "IDs";
    
     var col3 = document.createElement("th");
    col1.value = "Votes";
    
     var col4 = document.createElement("th");
    col4.value = "Nickname";
    
     var col5 = document.createElement("th");
    col5.value = "Delete";
    
    myRow.appendChild(col1);
    myRow.appendChild(col2);
    myRow.appendChild(col3);
    myRow.appendChild(col4);
    myRow.appendChild(col5);
    
}



function popTable(myYaks,myNick)
{
    console.log(myYaks);
    
    createTableTemplate();
    
    var table = document.getElementById("yakTable");
    console.log(table);
    
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
        input.onclick =  function() { voteUp(this.id);};
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
        input.onclick =  function() { voteDown(this.id);};
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
        deleteInput.onclick = function() {deleteData(this.id)}; //When button is pressed call delete data and put in the id of the button in the delete data 
        console.log("test"+ allYaks.id);
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


function filterFunction()
{
    var mySearch = document.getElementById("myInput");
    var myFilter = mySearch.value.toUpperCase();
    var table = document.getElementById("yakTable");
    var tableRow = table.getElementsByTagName("tr");
    console.log(tableRow);
    
    for(let i = 0;i<tableRow.length;i++)
    {
        var tableCol = tableRow[i].getElementsByTagName("td");
        if (tableCol){
            myText = tableCol.textContent || tableCol.innerText;
            console.log(myText);
            if(myText.toUpperCase().indexOf(mySearch)>-1)
                {
                    tableRow[i].style.display + "";        
                }
            else{
                tableRow[i].style.display = "none"
            }
            
        }
    }
    
}
//Function to load json data using sample code provided in lectures 






//It was hard to find a way to populate the table while also adding a delete option only for yaks posted by myself, First I tried using a seperacte function which gets my nickname but I could not find a way to make it while also populating the table. I wanted to both get all the yaks and my only my nickname and use those both in the same function to populate the table and adding delete option for my nickname. I figured it could be possible to use a fetch call inside a fetch call to access both of them using the get user API and get yaks API requests.


function getData() {
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
}

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
  console.log(deleteId);
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


function voteData()
{
  // Default options are marked with *
  let res = fetch("https://cs5003-api.host.cs.st-andrews.ac.uk/api/yaks/eb2def91-5ad8-45c0-87c1-deff64a3df06/vote?key=ae26c4ea-2ca8-4c01-83e5-e4d810950cf1", {
    method: 'POST', 
    header: {
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


function postYak()
{
    var postedData = window.prompt("Write your yak below");
    postData(postedData);
}


function addNickname()
{
    var addNickname = window.prompt("Write your new nickname below");
    addNick(addNickname);
    document.write(addNickname);
}



function voteUpDown()
{
    
    //var storeVote = window.prompt("Up or downvote?");
    voteData();
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


function popTable(myYaks,myNick)
{
    console.log(myYaks);

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
    var addButton = function(name)
    {
        var td = document.createElement("td");
 
        let input = document.createElement("input");
        input.type = "button";
        input.className = "button";
        input.value = name;
        input.onclick =  function() { voteUpDown();};
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
        console.log("test"+ allYaks.id);
        if(allYaks.userNick==myNick)
            {
            deleteData(allYaks.id);
            console.log(allYaks.id);
            td.appendChild(deleteInput);
            }
        tr.appendChild(td);
    }
    
    
    
    addCell(allYaks.content);
    addCell(allYaks.id);
    addCell(allYaks.votes);
    addCell(allYaks.userNick);
    addButton("Vote");
    deleteButton("Delete");
         
    // add the newly create row to the table
    table.appendChild(tr);
  }
}


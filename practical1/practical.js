//Function to load json data using sample code provided in lectures 
async function getData() {
    let result = await fetch("https://cs5003-api.host.cs.st-andrews.ac.uk/api/yaks?key=ae26c4ea-2ca8-4c01-83e5-e4d810950cf1",
    {
        method: 'GET'
    });
    let data = await result.json();
    console.log(data);
    return data;
}

async function postData() {
  // Default options are marked with *
  const response = await fetch("https://cs5003-api.host.cs.st-andrews.ac.uk/api/yaks?key=ae26c4ea-2ca8-4c01-83e5-e4d810950cf1", {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

postData( { content: "Testing1,2,3" })
  .then((data) => {
    console.log(data); // JSON data parsed by `response.json()` call
  });
postData();

window.addEventListener ("load", function() {
  getData()
    .then(result => 
    {
        console.log(result);
        var yaks = result;
       // var temp =JSON.parse(yaks);
        console.log(yaks);
        popTable(yaks);
    })
    .catch(error => {
        console.error('Error:', error);
    })
});



function popTable(myYaks)
{
    console.log(myYaks);

    var table = document.getElementById("yakTable");
    console.log(table);

  // loop through albums and add row with each entry
  for(let i = 0; i < myYaks.length; i++) 
  {

    var allYaks = myYaks[i]; //Store each yak
    console.log(allYaks.id);
   // document.write(allYaks.id);
    //document.write(allYaks.votes);
    //document.write(allYaks.content);
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
    
    
    addCell(allYaks.content);
    addCell(allYaks.id);
    addCell(allYaks.votes);
         
    // add the newly create row to the table
    table.appendChild(tr);
  }
}





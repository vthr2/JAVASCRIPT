var albums = JSON.parse(myAlbums);
//Use code from movie example as help to fill in a table 
window.onload = function() {
  // get a reference to the movies table in the DOM
  var table = document.getElementById("hitsTable");

  // for each object in the movies array, add a row to the table
  for(var albumID = 0; albumID < albums.length; albumID++) {

    // get a reference to the current movie
      

    var album = albums[albumID];
    var tr = document.createElement("tr");
    // for each property of the object, add a cell to the table row
    var addCell = function(text) {
      var td = document.createElement("td");
      var txt = document.createTextNode(text);
      td.appendChild(txt);
      tr.appendChild(td);
    };
      console.log(album.nationality);
    if(album.nationality == null) //Showing null is not user friendly, other is 
    {
        album.nationality ="Other";
    }
    addCell(album.year);
    addCell(album.artist);
    addCell(album.nationality);
    addCell(album.album);

    // add the newly create row to the table
    table.appendChild(tr)
    
    // create a new row
      
  
};
}


//FIRST VERSION OF FILTER FUNCTION BEFORE MAKING BOTH DROPDOWNS WORK TOGETHER, KEPT IN FOR DOCUMENTATION, NOT USED 
//Function for filtering table take in two variables so we can use this function for both dropdown lists 
function filterFunction(var1,var2)
{
    var td;
    var selection = document.getElementById(var1); //Get selected dropdown value
    var select = selection.value;  //Get the value
  //  console.log(select);  Debugging
    var myTable = document.getElementById("hitsTable");  //Get the elements in the table
    var tr = myTable.getElementsByTagName("tr");    //Get the rows of the table
    test = tr[5].getElementsByTagName("td")[var2];
  //  console.log(test.innerHTML); Debugging
    
    //Check every row of the table and see if they match with selected value from dropdown list if they do not we hide it
    for(var i = 0;i<tr.length; i++)
    {
        td = tr[i].getElementsByTagName("td")[var2];  //Get the right column of the row nationality or year
       // console.log(td.innerHTML);  Debugging
        if(td)
        {
            if(select =="All")  //If all we display all rows
            {
                tr[i].style.display = "";
            }
            else
            {
                if(td.innerHTML != select) //Hide all unmatched values
                {
                    tr[i].style.display = "none";
                }
                else
                {
                    tr[i].style.display = "";  //Display matched values
                }
            }
        }
    }
}


function filterFunction2()
{
    var td;
    var selectionCountry = document.getElementById("selectCountry");
    var selectionYear = document.getElementById("selectYear"); //Get selected dropdown values
    var selectCountry = selectionCountry.value;  //Get the value of selected country
    var selectYear = selectionYear.value;           // Get value of selected year
    
  
    var myTable = document.getElementById("hitsTable");  //Get the elements in the table
    var tr = myTable.getElementsByTagName("tr");    //Get the rows of the table
    
    
    //Check every row of the table and see if they match with selected value from dropdown list if they do not we hide it
    for(var i = 0;i<tr.length; i++)
    {
        tdCountry = tr[i].getElementsByTagName("td")[2];  //Get the right column of the row nationality or year
        tdYear = tr[i].getElementsByTagName("td")[0];

        //USE A BUNCH OF CONDITIONAL IF ELSE STATEMENTS TO MAKE THE DROPDOWN LISTS FUNCTION TOGETHER, PROBABLY A MORE PRETTIER WAY TO MAKE IT WORK BUT THIS ONE WORKS SO THAT IS GOOD ENOUGH FOR ME.
        if(tdYear)
        {
             
            if(selectYear == "All" && selectCountry =="All")  //IF-ELSE CONDITIONAL IF BOTH DROPDOWNS SELECTED HAVE ALL WE SHOW ALL ROWS
            {
                   tr[i].style.display = ""; 
            }
            else //IF NOT WE GO THROUGH ALL OTHER POSSIBLE CASES AND HIDE UNMATCHED VALUES BUT SHOW MATCHED ONES
            {
                if(selectYear =="All" || selectCountry =="All") // DEAL WITH CASES THAT HAVE ALL SELECTED SEPERATELY 
                {

                    if(selectYear =="All" && selectCountry != tdCountry.innerHTML)  //ALL YEARS AND UNMATCHED COUNTRIES HIDDEN
                    {
                        tr[i].style.display = "none";
                    }

                    else if(selectYear != tdYear.innerHTML && selectCountry == "All") //ALL COUNTRIES AND UNMATCHED YEARS HIDDEN
                    {
                        tr[i].style.display = "none";
                    }

                    else                                                              //OTHER CASES ARE SHOWN WHEN EITHER ONE IS ALL AND THE OTHER ONE HAS A MATCH
                    {
                        tr[i].style.display = ""; 
                    }
                }

                else if(selectYear != tdYear.innerHTML ||  selectCountry != tdCountry.innerHTML)  //HIDE CASES WHERE EITHER ONE IS UNMATCHED SO IF 1966 IS SELECTED WE HIDE ALL OTHER YEARS BUT FOR 1966 WE ALSO CHECK IF THE SELECTED COUNTRY IS MATCHED SO WE DONT HIDE THE ENTRY IF USA AND 1966 IS PICKED (AND OF COURSE IF ALL and 1966 IS PICKED)
                {
                    tr[i].style.display = "none";
                }

                else                                    // IN OTHER CASES WHERE THERE IS MATCH IN WE SHOW THE ENTRY.
                {
                    tr[i].style.display = ""; 
                }
                   
            }
            
        }
    }
}



    //Make a function for year selections so we dont have to write it all 
    function yearOptions()
    {

        var option = ""; //Create empty string to fill in later with optiong tags and years
        
        for(var i = 1956; i<2017;i++){
            option += "<option value ='"+i+"'>"+i+"</option>";  // Fill it with all possible years  
        }

        document.getElementById("selectYear").innerHTML = option;
    }

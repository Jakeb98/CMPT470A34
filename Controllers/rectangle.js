var nextID = 1;
var currentIDs = new Map();

//inital fetch from DB
window.onload = function() {
    var request = new XMLHttpRequest();
    request.open("GET", "/initialFetch", true);
    request.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    request.onload = function() {
        //console.log("Inital fetch")
        //console.log(this.response);
        var rectsInDB = JSON.parse(this.response);
        //console.log(rectsInDB.length);
        //clearTable();
        for (var i = 0; i < rectsInDB.length; i++) {
            //console.log(rectsInDB[i].ID);
            //console.log(parseInt(rectsInDB[i].ID));
            currentIDs.set(parseInt(rectsInDB[i].ID), '');
            //console.log(currentIDs);
            addToTable(rectsInDB[i].ID, rectsInDB[i].Name, rectsInDB[i].Height, rectsInDB[i].Width, rectsInDB[i].Colour, rectsInDB[i].Opacity);
        }
        for (var i = 0; i < currentIDs.size; i++) {
            if (!currentIDs.has(nextID)) {
                break;
            }
            nextID++;
        }
        var dispReq = new XMLHttpRequest();
        dispReq.open("GET", "/displayReq", true);
        dispReq.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        dispReq.onload = function() {
        var option = this.response;
        //console.log(`DISPLAY OPTION: ${option}`);
        if (option == "1") {
        //    console.log("Displaying option 1");
        //    console.log(currentIDs);
            displayInOrder();
        }
        else if (option == "2") {
            groupByColour();
        }

        };
        dispReq.send();
    };
    request.send();

    
};

// adding rect to db
document.getElementById("SubmitButton").addEventListener("click", function() {
    var name, height, width, colour, opacity;
    name = document.getElementById("NameInput");
    height = document.getElementById("HeightInput");
    width = document.getElementById("WidthInput");
    colour = document.getElementById("ColourInput");
    opacity = document.getElementById("OpacityInput");

    if (height.value == "" || width.value == "" || colour.value == "" || opacity.value == "")
    {
        window.alert("Please enter a valid height, width, colour, and opacity.");
    }
    else
    {
        //send to db
        var params = {
            ID: `${nextID}`,
            Name: `${name.value}`,
            Height: `${height.value}`,
            Width: `${width.value}`,
            Colour: `${colour.value}`,
            Opacity: `${opacity.value}`
        };
        console.log(params);
        var request = new XMLHttpRequest();
        request.open("POST", "/addRect", true);
        request.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        request.send(JSON.stringify(params));
        
        //addToTable(-1, name.value, height.value, width.value, colour.value, opacity.value);
        currentIDs.set(nextID, '');
        for (var i = 0; i < currentIDs.size; i++) {
            if (!currentIDs.has(nextID)) {
                break;
            }
            nextID++;
        }
        location.reload();
        // name.value = "";
        // height.value = "";
        // width.value = "";
        // colour.value = "#000000";
        // opacity.value = "100";
    }
}); 

// fetching rect from db
document.getElementById("EnterID").addEventListener("click", function() {
    var id /*, name, height, width, colour, opacity;*/
    id = document.getElementById("selectID").value;
    // name = document.getElementById("NameUpdate");
    // height = document.getElementById("HeightUpdate");
    // width = document.getElementById("WidthUpdate");
    // colour = document.getElementById("ColourUpdate");
    // opacity = document.getElementById("OpacityUpdate");
    if (!currentIDs.has(parseInt(id))) {
        window.alert("Pick a rectangle in the database");
    }
    else {
        var request = new XMLHttpRequest();
        request.open("POST", "/prepResults", true);
        request.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        request.onload = function() {
            console.log("Calling fetchResults")
            fetchResults();
        };
        request.send(JSON.stringify({ID: `${id}`}));
    }
    // TODO
    // send request to server for row matching ID, then populate fields
    //var fetched;

    
   // console.log(fetched);
    
   
}); 

function fetchResults() {
    var id, name, height, width, colour, opacity;
    id = document.getElementById("selectID").value;
    name = document.getElementById("NameUpdate");
    height = document.getElementById("HeightUpdate");
    width = document.getElementById("WidthUpdate");
    colour = document.getElementById("ColourUpdate");
    opacity = document.getElementById("OpacityUpdate");
    console.log("IN fetchResults");
    var request = new XMLHttpRequest();
    request.open("GET", "/fetchRect", true);
    request.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    request.onload = function() {
        fetched = JSON.parse(this.response);
        console.log(fetched);
        name.value = fetched.Name;
        height.value = fetched.Height;
        width.value = fetched.Width;
        colour.value = fetched.Colour;
        opacity.value = fetched.Opacity;
        updateOpac();
    };
    request.send();
}

// updating rect in db
document.getElementById("UpdateButton").addEventListener("click", function() {
    var id, name, height, width, colour, opacity;
    id = document.getElementById("selectID");
    name = document.getElementById("NameUpdate");
    height = document.getElementById("HeightUpdate");
    width = document.getElementById("WidthUpdate");
    colour = document.getElementById("ColourUpdate");
    opacity = document.getElementById("OpacityUpdate");

    // TODO
    // send values to server to update row in db
    if (height.value == "" || width.value == "" || colour.value == "" || opacity.value == "")
    {
        window.alert("Please enter a valid height, width, colour, and opacity to update.");
    }
        
    else {
        var params = {
            ID: `${id.value}`,
            Name: `${name.value}`,
            Height: `${height.value}`,
            Width: `${width.value}`,
            Colour: `${colour.value}`,
            Opacity: `${opacity.value}`
        };
        // deleteRow("UserTable", parseInt(id.value));
        // addToTable(id.value, name.value, height.value, width.value, colour.value, opacity.value);

        var request = new XMLHttpRequest();
        request.open("POST", "/updateRect", true);
        request.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        request.send(JSON.stringify(params));
        location.reload();
    }
    
    // id.value = "";
    // name.value = "";
    // height.value = "";
    // width.value = "";
    // colour.value = "#000000";
    // opacity.value = "100";
}); 

// deleting rect from db
document.getElementById("DeleteButton").addEventListener("click", function() {
    var id, confirmID, name, height, width, colour, opacity;
    id = document.getElementById("selectID");

    confirmID = document.getElementById("deleteID");
    if (confirmID.value != id.value || id.value == "")
    {
        window.alert("Make sure you input the same ID twice in order to delete a rectangle");
    }
    else if (!currentIDs.has(parseInt(id.value)))
    {
        window.alert("Make sure the rectangle you want to delete exists");
    }
    else {
        name = document.getElementById("NameUpdate");
        height = document.getElementById("HeightUpdate");
        width = document.getElementById("WidthUpdate");
        colour = document.getElementById("ColourUpdate");
        opacity = document.getElementById("OpacityUpdate");

        
        // send ID to server to delete row
        //send to db
        var params = {
            ID: `${id.value}`,
            Name: `${name.value}`,
            Height: `${height.value}`,
            Width: `${width.value}`,
            Colour: `${colour.value}`,
            Opacity: `${opacity.value}`
        };
        var request = new XMLHttpRequest();
        request.open("POST", "/deleteRect", true);
        request.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        request.send(JSON.stringify(params));

        location.reload();
        // deleteRow("UserTable", parseInt(id.value));
        // currentIDs.delete(parseInt(id.value));

        // id.value = "";
        // name.value = "";
        // height.value = "";
        // width.value = "";
        // colour.value = "#000000";
        // opacity.value = "100";
        // confirmID.value = "";
    }

        
}); 

function addToTable(id, name, height, width, colour, opacity)
{
    var table = document.getElementById("tableBody");
    var newRow = table.insertRow(-1);
    var newID = newRow.insertCell(0);
    var newName = newRow.insertCell(1);
    var newHeight = newRow.insertCell(2);
    var newWidth = newRow.insertCell(3);
    var newColour = newRow.insertCell(4);
    var newOpacity = newRow.insertCell(5);

    newRow.className = "tableRow";
    newID.innerHTML = id > 0 ? id : nextID;
    newName.innerHTML = name;
    newHeight.innerHTML = height;
    newWidth.innerHTML = width;
    newColour.style.backgroundColor = colour;
    newOpacity.innerHTML = opacity + "%";
    //id > 0 ? console.log(`Updated id ${id}`) : console.log("adding");
}

// function clearTable () {
//     var tableRows = document.getElementsByTagName("td");
//     console.log(tableRows);
//     for (var i = 0; i < tableRows.length; i++) {
//         tableRows[i].remove();
//     }
// }

function deleteRow(id, givenValue) {
    //var givenValue = document.getElementById("blah").value;
    //console.log(givenValue);
   // console.log(typeof givenValue);
    var td = $("#" + id + " td");
    $.each(td, function(i) {
       // console.log(i);
      if ($(td[i]).text() == givenValue && i%6 === 0) {
        $(td[i]).parent().remove();
      } 
    });
    //console.log("DELETED");
  }



  var newSlider = document.getElementById("OpacityInput");
  var newOutput = document.getElementById("opacityValue");
  newOutput.innerHTML = newSlider.value + "%"; // Display the default slider value
  
  // Update the current slider value (each time you drag the slider handle)
  newSlider.oninput = function() {
    newOutput.innerHTML = this.value + "%";
  }
  
  var updateSlider = document.getElementById("OpacityUpdate");
  var updateOutput = document.getElementById("updateOpacityValue");
  updateOutput.innerHTML = updateSlider.value + "%"; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
updateSlider.oninput = function() {
    updateOutput.innerHTML = this.value + "%";
};

function updateOpac() {
  updateOutput.innerHTML = updateSlider.value + "%";
}

function wantToDisplay(n) {
    if (currentIDs.size == 0) {
        window.alert("Enter a rectangle into the database to display it");
    }
    else {
      //  console.log(`displaying option: ${n}`);
        var request = new XMLHttpRequest();
        request.open("POST", "/wantToDisplay", true);
        request.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        request.onload = function () {
      //  console.log("inside req");
        location.reload();

    };
    request.send(JSON.stringify({dispOption: n}));

  //  console.log("After request code");
    }
}


function displayInOrder() {

    //console.log("displaying in order");
    //console.log(currentIDs.keys());
    for (let id of currentIDs.keys()) {
        var fetched;
        var request = new XMLHttpRequest();
        request.open("POST", "/displayRect", true);
        request.setRequestHeader("Content-type", "application/json;charset=UTF-8");
       // console.log("displaying");
        request.onload = function() {
           // console.log(this.response);
            // want = (this.response)[i];
            // console.log(want);
            fetched = JSON.parse(this.response);
            //console.log(fetched);
            var opacity = parseInt(fetched.Opacity)/100;
            var newRect = document.createElement("div");

            newRect.className = "rectangle";
           
            if (fetched.Colour == "#ffffff") {
                newRect.style = `height:${fetched.Height}px; width:${fetched.Width}px; opacity:${opacity}; background-color:${fetched.Colour}; margin:20px; border: 2px solid black;`;
            }
            else {
                newRect.style = `height:${fetched.Height}px; width:${fetched.Width}px; opacity:${opacity}; background-color:${fetched.Colour}; margin:20px;`;
            }
            if (fetched.Colour == "#000000") {
                newRect.innerHTML = `<p class="rectangle" style="opacity:1; font:bold; color:white"> ${fetched.Name} </p>`;
            }
            else {
                newRect.innerHTML = `<p class="rectangle" style="opacity:1; font:bold; color:black"> ${fetched.Name} </p>`;
            }
            
            document.body.appendChild(newRect);
            

        };
        request.send(JSON.stringify({ID: `${id}`}));
    }
}



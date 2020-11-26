// Jakeb Puffer
// 301313164

var nextID = 1;
var currentIDs = new Map();


//inital fetch from DB
window.onload = function() {
    var request = new XMLHttpRequest();
    request.open("GET", "/initialFetch", true);
    request.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    request.onload = function() {
        var rectsInDB = JSON.parse(this.response);
	console.log(rectsInDB);
        for (var i = 0; i < rectsInDB.length; i++) {
            currentIDs.set(parseInt(rectsInDB[i].ID), '');

            addToTable(rectsInDB[i].ID, rectsInDB[i].Name, rectsInDB[i].Height, rectsInDB[i].Width, rectsInDB[i].Colour, rectsInDB[i].Opacity);
        }
        for (var i = 0; i < currentIDs.size; i++) {
            if (!currentIDs.has(nextID)) {
                break;
            }
            nextID++;
        }

        displayInOrder();

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
	    request.onload = function () {
	        location.reload();
	    };
        request.send(JSON.stringify(params));
        
    
        currentIDs.set(nextID, '');
        for (var i = 0; i < currentIDs.size; i++) {
            if (!currentIDs.has(nextID)) {
                break;
            }
            nextID++;
        }

    }
}); 

// fetching rect from db
document.getElementById("EnterID").addEventListener("click", function() {
    var id 
    id = document.getElementById("selectID").value;
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

        var request = new XMLHttpRequest();
        request.open("POST", "/updateRect", true);
        request.setRequestHeader("Content-type", "application/json;charset=UTF-8");
	    request.onload = function () {
	        location.reload();
	    };
        request.send(JSON.stringify(params));

    }
    
}); 

// deleting rect from db
document.getElementById("DeleteButton").addEventListener("click", function() {
    var id = document.getElementById("selectID");

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
        // send ID to server to delete row
        //send to db
        var params = {
            ID: `${id.value}`
        };
        var request = new XMLHttpRequest();
        request.open("POST", "/deleteRect", true);
        request.setRequestHeader("Content-type", "application/json;charset=UTF-8");
	    request.onload = function () {
	        location.reload();
	    };
        request.send(JSON.stringify(params));

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
}


function deleteRow(id, givenValue) {
    var td = $("#" + id + " td");
    $.each(td, function(i) {

      if ($(td[i]).text() == givenValue && i%6 === 0) {
        $(td[i]).parent().remove();
      } 
    });

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



function displayInOrder() {

    for (let id of currentIDs.keys()) {
        var fetched;
        var request = new XMLHttpRequest();
        request.open("POST", "/displayRect", true);
        request.setRequestHeader("Content-type", "application/json;charset=UTF-8");

        request.onload = function() {

            fetched = JSON.parse(this.response);

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



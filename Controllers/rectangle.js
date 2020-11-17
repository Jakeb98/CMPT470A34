var nextID = 1;





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
        
        addToTable(name.value, height.value, width.value, colour.value, opacity.value);
        nextID++;
        name.value = "";
        height.value = "";
        width.value = "";
        colour.value = "#000000";
        opacity.value = "50";
    }
}); 

// fetching rect from db
document.getElementById("EnterID").addEventListener("click", function() {
    var id, name, height, width, colour, opacity;
    id = document.getElementById("selectID").value;
    name = document.getElementById("NameUpdate");
    height = document.getElementById("HeightUpdate");
    width = document.getElementById("WidthUpdate");
    colour = document.getElementById("ColourUpdate");
    opacity = document.getElementById("OpacityUpdate");

    // TODO
    // send request to server for row matching ID, then populate fields
    var fetched;
    var request = new XMLHttpRequest();
    request.open("POST", "/fetchRect", false);
    request.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    request.onload = function() {
        console.log(this.response);
        fetched = JSON.parse(this.response);
        console.log(fetched);
    };
    request.send(JSON.stringify({ID: `${id}`}));
    
    console.log(fetched);
    name.value = fetched.Name;
    height.value = fetched.Height;
    width.value = fetched.Width;
    colour.value = fetched.Colour;
    opacity.value = fetched.Opacity;
    updateOpac();
}); 

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

    id.value = "";
    name.value = "";
    height.value = "";
    width.value = "";
    colour.value = "#000000";
    opacity.value = "50";
}); 

// deleting rect from db
document.getElementById("DeleteButton").addEventListener("click", function() {
    var id, confirmID, name, height, width, colour, opacity;
    id = document.getElementById("selectID");
    confirmID = document.getElementById("deleteID");
    if (confirmID.value != id.value)
    {
        window.alert("Make sure you input the same ID twice in order to delete a rectangle");
    }
    else {
        name = document.getElementById("NameUpdate");
        height = document.getElementById("HeightUpdate");
        width = document.getElementById("WidthUpdate");
        colour = document.getElementById("ColourUpdate");
        opacity = document.getElementById("OpacityUpdate");

        // TODO
        // send ID to server to delete row

        id.value = "";
        name.value = "";
        height.value = "";
        width.value = "";
        colour.value = "#000000";
        opacity.value = "50";
    }

        
}); 

function addToTable(name, height, width, colour, opacity)
{
    var table = document.getElementById("tableBody");
    var newRow = table.insertRow(-1);
    var newID = newRow.insertCell(0);
    var newName = newRow.insertCell(1);
    var newHeight = newRow.insertCell(2);
    var newWidth = newRow.insertCell(3);
    var newColour = newRow.insertCell(4);
    var newOpacity = newRow.insertCell(5);

    newID.innerHTML = nextID;
    newName.innerHTML = name;
    newHeight.innerHTML = height;
    newWidth.innerHTML = width;
    newColour.style.backgroundColor = colour;
    newOpacity.innerHTML = opacity + "%";
}

function deleteRow(id/*, givenValue*/) {
    var givenValue = document.getElementById("blah").value;
    var td = $("#" + id + " td");
    $.each(td, function(i) {
        console.log(i);
      if ($(td[i]).text() === givenValue && i%6 === 0) {
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

function inOrder() {

}

function groupByColour() {
    
}


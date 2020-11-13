var ageArray = [];
var id = 1;
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
        addToTable(name.value, height.value, width.value, colour.value, opacity.value);
        name.value = "";
        height.value = "";
        width.value = "";
        colour.value = "#000000";
        opacity.value = "50";
    }
}); 

document.getElementById("EnterID").addEventListener("click", function() {
    var name, height, width, colour, opacity;
    name = document.getElementById("NameUpdate");
    height = document.getElementById("HeightUpdate");
    width = document.getElementById("WidthUpdate");
    colour = document.getElementById("ColourUpdate");
    opacity = document.getElementById("OpacityUpdate");

    // TODO
    // send request to server for row matching ID, then populate fields

    // name.value = //queried value
    // height.value = //queried value
    // width.value = //queried value
    // colour.value = //queried value
    // opacity.value = //queried value
}); 

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

    newID.innerHTML = id++;
    newName.innerHTML = name;
    newHeight.innerHTML = height;
    newWidth.innerHTML = width;
    newColour.style.backgroundColor = colour;
    newOpacity.innerHTML = opacity + "%";
}

function calculateAge(birthday)
{
    var today = new Date();
    var birthDate = new Date(birthday);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if (age < 0){
        return 0;
    }
    return age;
}

function averageAge() {
    var total = 0;
    for (i = 0; i < ageArray.length; i++){
        total += ageArray[i];
    }
    return total/ageArray.length;
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
}

function inOrder() {

}

function groupByColour() {
    
}

// /* Obtained from: https://www.w3schools.com/howto/howto_js_sort_table.asp on 2020-10-16
//    Title: "How TO - Sort a Table", subsection: "Sort Table by Clicking the Headers" */
// function sortTable(n) {
//     var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
//     table = document.getElementById("UserTable");
//     switching = true;
//     // Set the sorting direction to ascending:
//     dir = "asc";
//     /* Make a loop that will continue until
//     no switching has been done: */
//     while (switching) {
//       // Start by saying: no switching is done:
//       switching = false;
//       rows = table.rows;
//       /* Loop through all table rows (except the
//       first, which contains table headers): */
//       for (i = 1; i < (rows.length - 1); i++) {
//         // Start by saying there should be no switching:
//         shouldSwitch = false;
//         /* Get the two elements you want to compare,
//         one from current row and one from the next: */
//         x = rows[i].getElementsByTagName("TD")[n];
//         y = rows[i + 1].getElementsByTagName("TD")[n];
//         /* Check if the two rows should switch place,
//         based on the direction, asc or desc: */
//         if (dir == "asc") {
//           if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
//             // If so, mark as a switch and break the loop:
//             shouldSwitch = true;
//             break;
//           }
//         } else if (dir == "desc") {
//           if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
//             // If so, mark as a switch and break the loop:
//             shouldSwitch = true;
//             break;
//           }
//         }
//       }
//       if (shouldSwitch) {
//         /* If a switch has been marked, make the switch
//         and mark that a switch has been done: */
//         rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
//         switching = true;
//         // Each time a switch is done, increase this count by 1:
//         switchcount ++;
//       } else {
//         /* If no switching has been done AND the direction is "asc",
//         set the direction to "desc" and run the while loop again. */
//         if (switchcount == 0 && dir == "asc") {
//           dir = "desc";
//           switching = true;
//         }
//       }
//     }
//   }

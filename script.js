// time block object array
var timeBlocks = [
    {
        hour: 9,
        event: "",
    }
];

// Get tge container object where all the time blocks will be appended.
//var timeBlockContainer = $("#time-blocks");

{/* <div class="row time-block">
        <div class='hour col-md-1'>9AM</div>
        <textarea class="description col-md-10">Doctors Appointment</textarea>
        <button class="col-md-1 btn saveBtn"><i class="fas fa-lock"></i></button>
      </div> */}

// Display current data in header.
$("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));

// Create a new time block row and append it to the
// main time-blocks container.
var newTimeBlock = $("<div class=\"timeblock row\">");
$("#time-blocks").append(newTimeBlock);

// go through the time blocks
var i = 0;  
var currHour = 9;   // Start hour to display

for (i; i < 9; i++) {
    // Display the hour
    var displayHour = currHour.toString() + ":00:00";
    displayHour = moment(displayHour, "HH:mm:ss").format("hA");
    var newElement = $("<div class=\"hour col-md-1\">");
    newElement.text(displayHour);

    newTimeBlock.append(newElement);

    // Display the description.
    newElement = $("<textarea class=\"description col-md-10\">");
    newTimeBlock.append(newElement);

    // Display the button.
    newElement = $("<button id=\"btn1\" class=\"col-md-1 btn saveBtn\">");
    newTimeBlock.append(newElement);

    // Display the lock icon to the button.
    newElement.append($("<i class=\"fas fa-lock\"></i>"));

    currHour++;
}



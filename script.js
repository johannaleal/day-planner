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

// Get current time.
var i = 0;
var currentHour = moment("12:00", "HH:mm:ss");

var hour = 9;   // Start hour to display

for (i; i < 9; i++) {
    var disabled = "";

    // Create a new time block row and append it to the
    // main time-blocks container.
    var newTimeBlock = $("<div class=\"timeblock row\">");
    $("#time-blocks").append(newTimeBlock);

    // Class for description which will determine background color.
    var bgColorClass = "";

    // Display the hour
    var displayHour = moment(hour.toString() + ":00:00", "HH:mm:ss");
    var newElement = $("<div class=\"hour col-md-1\">");
    newElement.text(moment(displayHour).format("hA"));
    newTimeBlock.append(newElement);

    // Display the description.
    var textArea = "<textarea class=\"description col-md-10";

    // If the hour being displayed is the same as the current
    // actual hour, then set the class as present which will make the 
    // background red.
    if (displayHour.format("HH") === currentHour.format("HH")) {
        textArea = textArea + " present\">";
    }
    // Else if the hour being displayed is greater than the current
    // actual hour that meana that it is in the future so give 
    // it a class of future which will make the background green.
    else if (displayHour.format("HH") > currentHour.format("HH")) {
        textArea = textArea + " future\">";
    }
    // Else the time is in past so make it a class of past 
    // which will display as grey and make it read only.
    else {
        textArea = textArea + " past\" readonly>";
        disabled = "disabled";
    }
    
    newTimeBlock.append($(textArea));

    // Display the button.
    newElement = $("<button id=\"btn1\" class=\"col-md-1 btn saveBtn\"" + disabled + ">");
    newTimeBlock.append(newElement);

    // Display the lock icon to the button.
    newElement.append($("<i class=\"fas fa-lock\"></i>"));

    hour++;
}



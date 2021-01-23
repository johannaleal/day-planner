// Time block object and time block array
var timeBlockObject = {
    hour: null,
    event: "",
};
var timeBlocks = [];
 
// Get current time.
// Start hour to display
var i = 0;
var currentHour = moment("12:00", "HH:mm:ss");
var hour = 9;

// See if any events were previously saved to local storage.
var savedTimeBlocks = JSON.parse(localStorage.getItem("time-blocks"));
var savedData = false;

// If there is data saved in local storage then set the flag to true.
if (savedTimeBlocks.length > 0) {
    savedData = true;
}
//console.log(savedTimeBlocks[0].hour);

// Display the current date in header.
$("#currentDay").text(moment().format("dddd, MMMM Do YYYY h:mmA"));

// Build the day planner from 9AM to 5PM.
for (i; i < 9; i++) {
    // Saved data vars for the current hour being built
    var savedHour; //?????????????
    var savedEvent = "";
    var savedDataIndex;

    // ======================
    if (savedData) {
        savedDataIndex = lookForSavedData(savedTimeBlocks, i);
        savedEvent = savedTimeBlocks[savedDataIndex].event;
        //console.log(savedTimeBlocks[savedDataIndex].event);
    };

    // Flag for disabling button on past events.
    var disabled = "";

    // Create a new time block row and append it to the
    // main time-blocks container.
    var newTimeBlock = $("<div class=\"timeblock row\">");
    $("#time-blocks").append(newTimeBlock);

    // Class for description which will determine background color.
    var bgColorClass = "";

    // Append the hour div to the row.
    var displayHour = moment(hour.toString() + ":00:00", "HH:mm:ss");
    var newElement = $("<div class=\"hour col-md-1\">");
    newElement.text(moment(displayHour).format("hA"));
    newTimeBlock.append(newElement);

    // Add the textarea that will contain the event entered by the user.
    var textArea = "<textarea id=\"event" + i + "\" class=\"description col-md-10";

    // If the hour being displayed is the same as the current
    // actual hour, then set the class as "present" which will make the 
    // background red.
    if (displayHour.format("HH") === currentHour.format("HH")) {
        textArea = textArea + " present\">";
    }
    // Else if the hour being displayed is greater than the current
    // actual hour that means that it is in the future so give 
    // it a class of "future" which will make the background green.
    else if (displayHour.format("HH") > currentHour.format("HH")) {
        textArea = textArea + " future\">";
    }
    // Else the time is in past so make it a class of "past"
    // which will display as grey and make it read only.
    else {
        textArea = textArea + " past\" readonly>";
        disabled = "disabled";
    }
    
    // Append the text area to the row.
    newTimeBlock.append($(textArea));

    // Display the button.
    newElement = $("<button value=\"" + i + "\" class=\"col-md-1 btn saveBtn\"" + disabled + ">");
    newTimeBlock.append(newElement);

    // Display the lock icon to the button.
    newElement.append($("<i class=\"fas fa-lock\"></i>"));

    // Add an click event to each button.
    newElement.on('click', function() {
        // Save the data for this event.
        var btnValue = $(this).attr("value");
        saveData(btnValue);
    })

    hour++;
}
// Function to save the hour and event entered after clicking one of the lock buttons.
function saveData(hourToSave) {
    // Get the value entered in the textarea element that pertains to the button clicked.
    var saveEvent = $("#event" + hourToSave.toString()).val();

    // Save the time and event to the object array.
    timeBlockObject = {event: saveEvent , hour: hourToSave};
    timeBlocks.push(timeBlockObject);

    // Clear the current local storage.
    localStorage.clear();

    // Save the current array of time block objects.
    localStorage.setItem("time-blocks", JSON.stringify(timeBlocks));
}

function lookForSavedData(savedData, curri) {
    var arrayLength = saveData.length;
    var returnIndex = 0;

    //console.log(arrayLength);

    for (var i = 0; i < arrayLength; i++) {
        if (Number(savedData[i].hour) === i) {
            returnIndex = i;
            break;
        }
    }

    return returnIndex;
}


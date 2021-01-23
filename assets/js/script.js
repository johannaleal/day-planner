// Time block object and time block array
var timeBlockObject = {
    hour: null,
    eventDescr: "",
};
var timeBlocks = [];
 
// Get current time.
var currentHour = moment();
var hour = 9;

// See if any events were previously saved to local storage.
var savedData = false;
var savedTimeBlocks = JSON.parse(localStorage.getItem("time-blocks"));

// If there is data saved in local storage then get the saved tinme blocks
// and set the savedData flag to true.
if (savedTimeBlocks !== null) {
    timeBlocks = savedTimeBlocks;
    savedData = true;
};

// Display the current date in header.
$("#currentDay").text(moment().format("dddd, MMMM Do YYYY h:mmA"));

// Build the day planner from 9AM to 5PM.
for (var i = 0; i < 9; i++) {
    // Saved data vars for the current hour being built
    var savedEvent = "";
    var savedDataIndex;

    // If there is saved data in local storage, get the event description
    // currently saved for the time being processed.
    if (savedData) {
        savedEvent = timeBlocks[i].eventDescr;
    };

    // Flag for disabling button on past events.
    var disabled = "";

    // Create a new time block row and append it to the
    // main time-blocks container.
    var newTimeBlock = $("<div class=\"timeblock row\">");
    $("#time-blocks").append(newTimeBlock);

    // Class for event description which will determine background color
    // of textarea.
    var bgColorClass = "";

    // Append the hour div to the new time block row.
    var displayHour = moment(hour.toString() + ":00:00", "HH:mm:ss");
    var newElement = $("<div class=\"hour col-md-1\">");
    newElement.text(moment(displayHour).format("hA"));
    newTimeBlock.append(newElement);

    // Add the textarea that will contain the event entered by the user.
    // The textarea's ID will be the word 'event' + the current index being 
    // processed (i). This will allow us to access this element later by
    // its ID in order to grab any event description entered.
    var textArea = "<textarea id=\"event" + i + "\" class=\"description col-md-10";

    // If the hour being processed is the same as the current
    // actual hour, then set the class as "present" which will make the 
    // background red.
    if (displayHour.format("HH") === currentHour.format("HH")) {
        textArea = textArea + " present\">";
    }
    // Else if the hour being processed is greater than the current
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
    };

    // Append the text area to the new time block row.
    newTimeBlock.append($(textArea));

    // If there is saved data from local storage then display the saved
    // event description that is saved.
    if (savedData) {
        //$("#event" + i.toString()).val(timeBlocks[i].eventDescr);
        $("#event" + i.toString()).val(savedEvent);
    };

    // Append a save button to the new time block row. If the hour being processed occurs in 
    // the past then the button will be disabled.
    newElement = $("<button value=\"" + i + "\" class=\"col-md-1 btn saveBtn\"" + disabled + ">");
    newTimeBlock.append(newElement);

    // Display the lock icon in the button.
    newElement.append($("<i class=\"fas fa-lock\"></i>"));

    // If there is no saved data in local storage then initialize the time block's
    // hour to the current hour being processed and the event description to be a blank string.
    // Add the time block object to the array of time row objects.
    // Else leave it alone in order not to overwrite any saved data in the object for this hour. 
    if (!savedData) {
        timeBlockObject = {hour: i, eventDescr: ""};
        timeBlocks.push(timeBlockObject);
    }

    // Add a click event to each save button that will save the data entered in the event
    // description for the hour.
    newElement.on('click', function(event) {
        // The value of the button is the current index being processed.
        var btnValue = $(this).attr("value");

        saveData(btnValue);
    })

    // Next display hour
    hour++;
}

// Function to save the hour and event entered after clicking one of the saves buttons.
function saveData(hourToSave) {
    // Get the event description value entered in the textarea element that pertains to the button clicked.
    var saveEvent = $("#event" + hourToSave.toString()).val();
  
    // Find the corresponding time block object in the array of time block objects
    // and store whatever the user entered in the textarea in the object.
    for (var i = 0; i < timeBlocks.length; i++) {
        if (parseInt(timeBlocks[i].hour) === parseInt(hourToSave)) {
            timeBlocks[i].eventDescr = saveEvent;
            break;
        }
    }

    // Save the current array of time block objects to local storage.
    localStorage.setItem("time-blocks", JSON.stringify(timeBlocks));

    // Set global variable to true.
    savedData = true;
}

const dateToday = moment().format("dddd, MMMM Do");
const currentHour = moment().format("H");
let events = [];

// Display current date in header
$("#currentDay").text(dateToday);

// change css styling and behavior based on current hour
let eventHours = [15, 16, 17];
eventHours.forEach(hour => {
  // compare currentHour to the value of div id
  const divHourVal = $("#div-" + hour).data("hour");
  if (currentHour > divHourVal) {
    // event is already done
    $("#div-" + hour).css("background", "lightgray");
    $("#event-" + hour).attr("readonly", true);
    $("#btn-" + hour).attr("disabled", true);
  } else if (currentHour == divHourVal) {
    // event is currently happening
    $("#div-" + hour).css("background", "orange");
  } else if (currentHour < divHourVal) {
    // event is going to happen
    $("#div-" + hour).css("background", "lightgreen");
  }
});

// Adding on click function when saving events
$(".row").on("click", function(e) {
  if (e.target.matches("button")) {
    const rowID = $(this).data("hour");
    const rowEvent = $("#event-" + rowID).val();
    saveEvent(rowID, rowEvent);
  }
});

// Save events in localStorage
function saveEvent(id, event) {
  let eventObj = {
    id: id,
    event: event
  };

  events.push(eventObj);
  localStorage.setItem("events", JSON.stringify(events));
  alert("Event Save");
}

// Populate hourly task from localStorage values
function populateEventRows() {
  const eventsArr = JSON.parse(localStorage.getItem("events"));

  if (eventsArr != null) {
    eventsArr.forEach(event => {
      $("#event-" + event.id).val(event.event);
    });
  }
}

populateEventRows();

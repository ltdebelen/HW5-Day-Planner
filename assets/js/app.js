const dateToday = moment().format("dddd, MMMM Do");
let events = [];

// Display current date in header
$("#currentDay").text(dateToday);

// Adding on click function when saving events
$(".row").on("click", function(e) {
  if (e.target.matches("button")) {
    const rowID = $(this).data("id");
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
  alert("Event has been saved");
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

const dateToday = moment().format("dddd, MMMM Do");
const currentHour = moment().format("H");
let events = [];

generateEventRows();
// Dynamically create elements and append them in
function generateEventRows() {
  let timeArr = [9, 10, 11, 12, 13, 14, 15, 16, 17];
  let hoursFormat12 = 0;
  let hourFormat = "";

  for (var i = 0; i < timeArr.length; i++) {
    if (timeArr[i] < 12) {
      hourFormat = "AM";

      let innerHTML = ` 
      <div class="row p-2" id="div-${timeArr[i]}" data-hour="${timeArr[i]}">
        <div class="col-md-2">
        ${timeArr[i]} ${hourFormat}
        </div>
        <div class="col-md-8">
          <div class="form-group">
            <input type="text" class="form-control" id="event-${timeArr[i]}" />
          </div>
        </div>
        <div class="col-md-2">
          <button class="btn btn-primary" id="btn-${timeArr[i]}">Save</button>
        </div>
      </div>`;

      $(".container").append(innerHTML);
    }

    if (timeArr[i] == 12) {
      hourFormat = "PM";
      let innerHTML = ` 
      <div class="row p-2" id="div-${timeArr[i]}" data-hour="${timeArr[i]}">
        <div class="col-md-2">
        ${timeArr[i]} ${hourFormat}
        </div>
        <div class="col-md-8">
          <div class="form-group">
            <input type="text" class="form-control" id="event-${timeArr[i]}" />
          </div>
        </div>
        <div class="col-md-2">
          <button class="btn btn-primary" id="btn-${timeArr[i]}">Save</button>
        </div>
      </div>`;

      $(".container").append(innerHTML);
    }

    if (timeArr[i] > 12) {
      hoursFormat12 = timeArr[i] - 12;
      hourFormat = "PM";

      let innerHTML = ` 
      <div class="row p-2" id="div-${timeArr[i]}" data-hour="${timeArr[i]}">
        <div class="col-md-2">
        ${hoursFormat12} ${hourFormat}
        </div>
        <div class="col-md-8">
          <div class="form-group">
            <input type="text" class="form-control" id="event-${timeArr[i]}" />
          </div>
        </div>
        <div class="col-md-2">
          <button class="btn btn-primary" id="btn-${timeArr[i]}">Save</button>
        </div>
      </div>`;

      $(".container").append(innerHTML);
    }
  }
}

// Display current date in header
$("#currentDay").text(dateToday);

// change css styling and behavior based on current hour
let eventHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
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
    $("#div-" + hour).css("background", "skyblue");
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

let calendarEventEl = $(`.description`);
let text;
let inputEl;
let newEventEl;
let eventArray = [];
let timesArray = [];

// compare each time to the current time and adjust classes accordingly
// color-code time blocks for if they're present, future, or past
// change class attributes dependent on current time
function updateTime() {
  $(`#currentDay`).text(moment().format(`dddd, MMMM Do YYYY`));
  timeEl = $(`.hour`)[0];
  for (i = 0; i < $(`.hour`).length; i++) {
    time = $(`.hour`)[i].innerHTML;
    timesArray.push(time);
    localStorage.setItem(`Times`, JSON.stringify(timesArray));
  }
  timesArray = JSON.parse(localStorage.getItem(`Times`));
  time = moment(timesArray[1], `hA`);
  if (moment().isAfter(time, `hour`)) {
    $(`.9AM`).addClass(`present`);
  } else if (time.isAfter(moment())) {
  }
}

updateTime();

function editEvent() {
  text = $(this).text().trim();
  inputEl = $(`<textarea>`).addClass(`description col-10`).val(text);

  $(this).replaceWith(inputEl);
  inputEl.focus().select();

  $(document).ready(function () {
    $(`textarea`).blur(function () {
      blurredEvent();
    });
  });
}

function blurredEvent() {
  $(`.icon`).removeClass(`fa-lock`);
  $(`.icon`).addClass(`fa-lock-open`);

  newEventEl = $(`<div>`).addClass(`col-10 past description `);
  newEventEl.text($(`textarea`).val());

  $(`textarea`).replaceWith(newEventEl);
  $(newEventEl).on(`click`, editEvent);
}

function saveEvent() {
  $(event.target).addClass(`fa-lock`);
  $(event.target).removeClass(`fa-lock-open`);
  eventArray = [];

  for (i = 0; i < $(`.description`).length; i++) {
    eventArray.push($(`.description`)[i].innerHTML);
  }
  localStorage.setItem(`Events`, JSON.stringify(eventArray));
}

function pullEvents() {
  eventArray = JSON.parse(localStorage.getItem(`Events`));

  for (i = 0; i, i < eventArray.length; i++) {
    let oldEvents = calendarEventEl[i];
    oldEvents.innerHTML = eventArray[i];
  }
}

$(window).on(`load`, pullEvents);
$(calendarEventEl).on(`click`, editEvent);
$(`.icon`).on(`click`, saveEvent);

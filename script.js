let calendarEventEl = $(`.description`);
let text;
let inputEl;
let newEventEl;
let eventArray = [];
let timesArray = [];

function updateTime() {
  $(`#currentDay`).text(moment().format(`dddd, MMMM Do YYYY`));
  timeEl = $(`.hour`);

  for (i = 0; i < $(`.hour`).length; i++) {
    time = $(`.hour`)[i].innerHTML;
    timesArray.push(time);
  }

  for (i = 0; i < $(`.hour`).length; i++) {
    time = moment(timesArray[i], `hA`);
    let calendarTimes = timeEl[i];

    if (moment().isAfter(time, `hour`));
    let timesToCompare = $(`.hour`)[i].innerHTML;
    let convertedTimesToCompare = moment(timesToCompare, 'hA');

    if (moment().isAfter(convertedTimesToCompare, `hour`)) {
      calendarTimes.classList.add(`past`);
    } else if (moment().isSame(convertedTimesToCompare, `hour`)) {
      calendarTimes.classList.add(`present`);
    } else {
      calendarTimes.classList.add(`future`);
    }
  }
}

function editEvent() {
  updateTime();

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

  newEventEl = $(`<div>`).addClass(`col-10 description event`);
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

  if (eventArray === null) {
    return;
  }
  for (i = 0; i, i < eventArray.length; i++) {
    let oldEvents = calendarEventEl[i];
    oldEvents.innerHTML = eventArray[i];
  }
}

$(window).on(`load`, pullEvents);
$(calendarEventEl).on(`click`, editEvent);
$(`.icon`).on(`click`, saveEvent);

updateTime();

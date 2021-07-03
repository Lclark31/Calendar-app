let calendarEventEl = $(`.description`);
let text;
let inputEl;
let newEventEl;
let eventArray = [];
let timesArray = [];
// color-code time blocks for if they're present, future, or past
// change class attributes dependent on current time

function updateTime() {
  $(`#currentDay`).text(moment().format(`dddd, MMMM Do YYYY mm:ss`));
  timeEl = $(`.hour`)[0];
  // console.log(timeEl.innerHTML);
  for (i = 0; i < $(`.hour`).length; i++) {
    time = $(`.hour`)[i].innerHTML;
    timesArray.push(time);
    localStorage.setItem(`Times`, JSON.stringify(timesArray));
  }
  timesArray = JSON.parse(localStorage.getItem(`Times`));
  time = moment(timesArray[4], `hA`);
  console.log(timesArray[4]);
  console.log(moment().format(`hA`));
  if (moment().isAfter(time, `hour`)) {
    $(`.10AM`).addClass(`present`);
  } else if (time.isAfter(moment())) {
    console.log(`true`);
    $(`.10AM`).addClass(`future`);
  }
}

updateTime();

function editEvent() {
  text = $(this).text().trim();
  inputEl = $(`<textarea>`).addClass(`description col-10`).val(text);

  $(this).replaceWith(inputEl);
  inputEl.focus();

  $(document).ready(function () {
    $(`textarea`).blur(function () {
      blurredEvent();
    });
  });
}

function blurredEvent() {
  newEventEl = $(`<div>`).addClass(`col-10 past description `);
  newEventEl.text($(`textarea`).val());

  $(`textarea`).replaceWith(newEventEl);
  saveEvent();
  $(newEventEl).on(`click`, editEvent);
}

// when saved button is clicked, event is saved in localStorage
// saveButton.on(`click` localStorage.setItem)
function saveEvent() {
  return;
}

// when page is refreshed events persist
// hmm..

$(calendarEventEl).on(`click`, editEvent);

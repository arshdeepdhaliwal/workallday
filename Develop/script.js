$(function () {
  // Display the current day at the top of the calendar
  $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));

  // Function to update the time blocks with the correct past, present, or future class
  function updateTimeBlocks() {
    var currentHour = dayjs().hour();

    $('.time-block').each(function () {
      var blockHour = parseInt($(this).attr('id').split('-')[1]);

      if (blockHour < currentHour) {
        $(this).addClass('past').removeClass('present future');
      } else if (blockHour === currentHour) {
        $(this).addClass('present').removeClass('past future');
      } else {
        $(this).addClass('future').removeClass('past present');
      }
    });
  }

  // Event listener for click events on the save button
  $('.saveBtn').on('click', function () {
    var hour = $(this).parent().attr('id');
    var text = $(this).siblings('.description').val();
    localStorage.setItem(hour, text);
  });

  // Load any saved data from localStorage for each hour
  function loadSavedData() {
    $('.time-block').each(function () {
      var hour = $(this).attr('id');
      var savedText = localStorage.getItem(hour);
      if (savedText !== null) {
        $(this).children('.description').val(savedText);
      }
    });
  }

  // Initial function calls
  updateTimeBlocks();
  loadSavedData();

  // Update time blocks every minute
  setInterval(updateTimeBlocks, 60000);
});

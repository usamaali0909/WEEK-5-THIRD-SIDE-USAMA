$(function () {
  // Add a listener for click events on the save button.
  $('.saveBtn').on('click', function () {
    // Get the user input from the textarea element.
    var userInput = $(this).siblings('textarea').val();
    // Get the id of the containing time block (e.g., "hour-9").
    var timeBlockId = $(this).parent().attr('id');
    // Save the user input in local storage using the time block id as the key.
    localStorage.setItem(timeBlockId, userInput);
  });

  // Apply the past, present, or future class to each time block.
  function updateTimeBlocks() {
    var currentHour = dayjs().hour();

    $('.time-block').each(function () {
      var timeBlockId = $(this).attr('id');
      var timeBlockHour = parseInt(timeBlockId.split('-')[1]);

      if (timeBlockHour < currentHour) {
        $(this).removeClass('present future').addClass('past');
      } else if (timeBlockHour === currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }

  // Get any user input saved in localStorage and set the textarea values.
  function retrieveUserInput() {
    $('.time-block').each(function () {
      var timeBlockId = $(this).attr('id');
      var userInput = localStorage.getItem(timeBlockId);
      $(this).find('textarea').val(userInput);
    });
  }

  // Display the current date in the header.
  function displayCurrentDate() {
    var currentDate = dayjs().format('MMMM DD, YYYY');
    $('#currentDay').text(currentDate);
  }

  // Call the functions to initialize the page.
  displayCurrentDate();
  updateTimeBlocks();
  retrieveUserInput();

  // Update time blocks and retrieve user input every minute (60000 milliseconds).
  setInterval(function () {
    updateTimeBlocks();
    retrieveUserInput();
  }, 60000);
});

// submit new task to db
$('.submit-task').click(function (e) {
  e.preventDefault()
  let newTask = $('#task').val()
  let dueDate = $('#due_date').val()
  console.log('Clicked')

  if (newTask !== '' && dueDate !== '') {
    $.ajax({
      url: '/newtask',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        task: newTask,
        due_date: dueDate
      })
    })
    .done(() => {
      // displayTasks()
      setTimeout(displayTasks, 300)
      // TODO: remove this if no timing issues
    })
    .fail(() => {
      $('.new-task .alert').text('There was a problem submitting your task.')
    })
  }
})
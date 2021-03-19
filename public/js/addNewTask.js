// submit new task to db
$('.submit-task').click(function (e) {
  e.preventDefault()
  let newTask = $('#task').val()
  let dueDate = $('#due_date').val()

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
      $('.new-task-alert').after(`
      <tr class="old-task">
        <td>${inputDateConverter(dueDate)}</td>
        <td>${newTask}</td>
        <td><a class="clear" id="${task.id}">Clear</a></td>
      </tr>
      `);
    })
    .fail(() => {
      $('.new-task .alert').text('There was a problem submitting your task.')
    })
  }
})
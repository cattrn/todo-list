// display current tasks in table
const displayTasks = () => {
  $.getJSON("/alltasks")
  .then((tasks) => {
    if (tasks.length > 0) {
      $.each(tasks, (i, task) => {
        $('.tasks').append(`
          <tr class="old-task">
            <td>${task.due_date}</td>
            <td>${task.task}</td>
            <td><a class="clear" id="${task.id}">Clear</a></td>
          </tr>
          `
        )
      })
    } else {
      $('.tasks').append(`
    <tr>
      <td colspan="3">You have completed your toDo list, woohoo!</td>
    </tr>
    `)
    }
  })
  .catch((err) => {
    $('.tasks').append(`
    <tr>
      <td colspan="3">We could not retreive your tasks.</td>
      <td coldpan="3">${err.message}</td>
    </tr>
    `)
  })
}

displayTasks()






// strikethrough on click



// delete task from db


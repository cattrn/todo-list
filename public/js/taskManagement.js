// display all current tasks in table
const displayAllTasks = () => {
  completeTasks()
  
  $.getJSON("/api/alltasks")
  .then((tasks) => {
    if (tasks.length > 0) {
      $.each(tasks, (i, task) => {
        let taskHTML = ''
        if (task.complete) {
          taskHTML = `
          <tr class="old-task completed" id="task-${task.id}">
            <td><strong>${task.task}</strong><br/ >${task.due_date}</td>
            <td><a class="edit"><i class="fas fa-pencil-alt"></i></a></td>
          </tr>
          `
        } else {
          taskHTML = `
          <tr class="old-task" id="task-${task.id}">
            <td><strong>${task.task}</strong><br/ >${task.due_date}</td>
            <td><a class="edit"><i class="fas fa-pencil-alt"></i></a></td>
          </tr>
          `
        }
        $('.tasks').append(taskHTML)
      })
    } else {
      $('table').after(`
      <h2 class="tasks-complete">You've completed all your tasks, incredible!</h2>
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

const displayTodaysTasks = () => {
  completeTasks()

  $.getJSON("/api/todaystasks")
  .then((tasks) => {
    if (tasks.length > 0) {
      $.each(tasks, (i, task) => {
        let taskHTML = ''
        if (task.complete) {
          taskHTML = `
          <tr class="old-task completed" id="task-${task.id}">
            <td>${task.task}</td>
            <td><a class="edit"><i class="fas fa-pencil-alt"></i></a></td>
          </tr>
          `
        } else {
          taskHTML = `
          <tr class="old-task" id="task-${task.id}">
            <td>${task.task}</td>
            <td><a class="edit"><i class="fas fa-pencil-alt"></i></a></td>
          </tr>
          `
        }
        $('.tasks').append(taskHTML)
      })
    } else {
      $('table').after(`
      <h2 class="tasks-complete">You've completed all your tasks for today, you're amazing!</h2>
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


// submit new task to db for today
$('.add-task-today').click(function (e) {
  e.preventDefault()
  $('.tasks-complete').remove()
  let newTask = $('#task').val()

  if (newTask !== '') {
    $.ajax({
      url: '/newtasktoday',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        task: newTask
      })
    })
    .done(() => {
      // add new task and include the task id
      $.getJSON("/api/todaystasks")
      .then((tasks) => {
        console.log(tasks[tasks.length - 1].id)
        $('.new-task-alert').after(`
        <tr class="old-task" id="task-${tasks[tasks.length - 1].id}">
        <td>${newTask}</td>
        <td><a class="edit"><i class="fas fa-pencil-alt"></i></a></td>
        </tr>
        `);
      })
      .catch((err) => {
        console.log(err)
        // TODO: error catching
      })
    })
    .fail(() => {
      $('.new-task-alert').text('There was a problem submitting your task.').removeClass('hidden')
    })
  }
})

const completeTasks = () => {
  // strikethrough on click
  $('table').on('click', '.old-task', function() {
    $(this).toggleClass('completed')

    // if task has "completed" class, set complete = true in db
    if($(this).attr('class').slice(9) === 'completed') {
      const taskId = $(this).attr('id').slice(5)
      const taskComplete = true
      $.ajax({
        url: '/api/completetask',
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({
          id: taskId,
          complete: taskComplete
        })
      })
      .fail((err) => {
        console.log(err)
        // TODO: error catching
      })
      // if it doesn't have "completed" class, set complete = false in db
    } else {
      const taskId = $(this).attr('id').slice(5)
      const taskComplete = false
      $.ajax({
        url: '/api/completetask',
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({
          id: taskId,
          complete: taskComplete
        })
      })
      .fail((err) => {
        console.log(err)
        // TODO: error catching
      })
    } 
  })
}


// delete completed tasks from db
$('.remove-completed').click(function() {
  $.ajax({
    url: '/api/deletetasks',
    type: 'DELETE',
    contentType: 'application/json'
  })
  .done(() => {
    $('tr.completed').remove()
  })
  .fail((err) => {
    console.log(err)
    // TODO: error catching
  })
})
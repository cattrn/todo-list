// display current tasks in table
const displayTasks = () => {
  let toDoTable = ''
  $.getJSON("/alltasks")
  .then((tasks) => {
    $.each(tasks, (i, task) => {
      toDoTable += `
      <tr class="old-task">
      <td>${task.due_date}</td>
      <td>${task.task}</td>
      <td><a class="clear" id="${task.id}">Clear</a></td>
      </tr>
      `
    })
  })
  .catch((err) => {
    toDoTable = '<p>Could not retreive your list.</p>'
  })
  
  $('.tasks').append(toDoTable)
}








// strikethrough on click



// delete task from db


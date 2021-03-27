$('#one-off-task').click(() => {
  $('.recurring-input').remove()
  const html = `
  <div class="one-off-input">
    <label for="date" class="hidden"></label>
    <input id="date" type="date" name="date">
  </div>
  `
  $('.task-type').after(html)
})

$('#recurring-task').click(() => {
  $('.one-off-input').remove()
  const html = `
  <div class="recurring-input">
    <div>
      <label for="frequency" class="hidden"></label>
      <select name="frequency" id="frequency">
          <option value="">Frequency</option>
          <option value="1">Every day</option>
          <option value="2">Every 2 days</option>
          <option value="7">Weekly</option>
      </select>
    </div>

    <div>
      <label for="start-date" class="hidden"></label>
      <input id="start-date" type="date" name="start-date">
    </div>
  </div>
  `
  $('.task-type').after(html)
})
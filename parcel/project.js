import ID from './signup.js'

$('#person_project button[type="submit"]').click((event) => {
    event.preventDefault()
    $.get('./person_project', {
      id: ID,
      project_personal: $('#person_project input[name=project_personal]').val(),
      start_year: $('#person_project input[name=start_year]').val(),
      start_month: $('#person_project input[name=start_month]').val(),
      start_day: $('#person_project input[name=start_day]').val(),
      end_year: $('#person_project input[name=end_year]').val(),
      end_month: $('#person_project input[name=end_month]').val(),
      end_day: $('#person_project input[name=end_day]').val(),
      target_number: $('#person_project input[name=target_number]').val(),
    }, (data) => {
      $("#person_project-output").html(`${data}`);
    });
  })


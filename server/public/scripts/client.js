$(document).ready(onReady);

function onReady() {
    getTasks();
    $('#submit-button').on('click', addTask);
    $('ul').on('click', '.delete-button', deleteTasks)
}

function deleteTasks() {  
    $.ajax({
        type: 'DELETE',
        url: `/list/${$(this).parent().data('id')}`,
      }).then(function (response) {
        getTasks();
      }).catch(function (error) {
        console.log('Error in POST', error)
      });
}

function completedTasks() {  
    $.ajax({
        type: 'PUT',
        url: `/list/${$(this).parent().data('id')}`,
      }).then(function (response) {
        getTasks();
      }).catch(function (error) {
        console.log('Error in POST', error)
      });
}

function addTask() {

    $.ajax({
        url: '/list',
        method: 'POST',
        data: {
            task: $('#task-input').val(),
            complete: false,
        }
    }).then(function (response) {
        getTasks();
    });
};

function getTasks() {

    $('.task-list').empty();

    $.ajax({
        url: '/list',
        method: 'GET',
    }).then(function (response) {
        appendTasks(response);
    });
};


function appendTasks(response) {

    for (element of response) {
        $('.task-list').append(`
        <li data-id="${element.id}" data-complete="${element.complete}">
        ${element.task} 
        <button class="delete-button">Delete</button>
        <button class="complete-button">Completed</button>
        </li>
    `);
    }

    $('#task-input').val('');

};
$(document).ready(onReady);

function onReady() {
    getTasks();
    $('#submit-button').on('click', addTask);
    $('ul').on('click', '.delete-button', deleteTask)
    $('ul').on('click', '.complete-button', completeTask)
}

function deleteTask() {
    $.ajax({
        type: 'DELETE',
        url: `/list/${$(this).parent().data('id')}`,
    }).then(function (response) {
        getTasks();
    }).catch(function (error) {
        console.log('Error in POST', error)
    });
}

function completeTask() {

    $.ajax({
        type: 'PUT',
        url: `/list/true/${$(this).parent().data('id')}`,
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

        if (element.complete == true) {
            $('.task-list').append(`
            <li class="completed-item" data-id="${element.id}" data-complete="${element.complete}">
            ${element.task} 
            <button class="delete-button">Delete</button>
            <button class="complete-button">Completed</button>
            </li>
        `);

        } else {
            $('.task-list').append(`
            <li data-id="${element.id}" data-complete="${element.complete}">
            ${element.task} 
            <button class="delete-button">Delete</button>
            <button class="complete-button">Completed</button>
            </li>
        `);
        }
    }
    $('#task-input').val('');
};


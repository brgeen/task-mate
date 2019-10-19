$(document).ready(onReady);

function onReady() {
    getTasks();
    $('#submit-button').on('click', addTask);
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

    $('#task-list').empty();

    $.ajax({
        url: '/list',
        method: 'GET',
    }).then(function (response) {
        appendTasks(response);
    });
};


function appendTasks(response) {

    for (element of response) {
        $('#task-list').append(`
        <li>
        <data-id="${element.id}">
        <input type="checkbox">${element.task} 
        <data-complete="${element.complete}">
        </li>
    `);
    }

    $('#task-input').val('');

};
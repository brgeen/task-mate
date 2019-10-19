$(document).ready(onReady);

function onReady() {
    console.log('jQuery Sourced');
    getTasks();
}

function addTask() {

    $('#task-list').empty();

    $.ajax({
        url: '/list',
        method: 'POST',
        data: {
            task: leftSideOfOperator,
            complete: false,
        }
    }).then(function (response) {
        appendTasks();
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
        <input type="checkbox">${element.task} ${element.complete}
        </li>
    `);
    }

    $('#task-input').val('');
    
};
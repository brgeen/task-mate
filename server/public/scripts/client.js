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

    for (let i = 0; i < response.length; i++) {
        $('#task-list').append(`
        <li> <data-id="${response[i].id}"> <input type="checkbox">${response[i].task} ${response[i].complete}</li>
    `);
    }

    $('#task-input').val('');

};
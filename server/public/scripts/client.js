$(document).ready(onReady);

function onReady() {
    console.log('jQuery Sourced');
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
}
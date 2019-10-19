$(document).ready(onReady);

function onReady() {
    getTasks();
    $('#submit-button').on('click', addTask);
    $('tbody').on('click', '.delete-button', deleteTask)
    $('tbody').on('click', '.complete-button', completeTask)
}

function deleteTask() {

    $.ajax({
        type: 'DELETE',
        url: `/list/${$(this).parent().parent().data('id')}`,
    }).then(function (response) {
        getTasks();
    }).catch(function (error) {
        console.log('Error in POST', error)
    });
}

function completeTask() {

    $.ajax({
        type: 'PUT',
        url: `/list/true/${$(this).parent().parent().data('id')}`,
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


// function appendTasks(response) { // as a list

//     for (element of response) {

//         if (element.complete == true) {
//             $('.task-list').append(`
//             <li class="completed-item" data-id="${element.id}" data-complete="${element.complete}">
//             ${element.task} 
//             <button class="delete-button">Delete</button>
//             <button class="complete-button">Completed</button>
//             </li>
//         `);

//         } else {
//             $('.task-list').append(`
//             <li data-id="${element.id}" data-complete="${element.complete}">
//             ${element.task} 
//             <button class="delete-button">Delete</button>
//             <button class="complete-button">Completed</button>
//             </li>
//         `);
//         }
//     }
//     $('#task-input').val('');
// };

function appendTasks(response) { // as a table
    let sortedArray = []; // this array holds the sorted tasks by ID

    for (const element of response) { // this loop takes the response and sorts the items by ID number
        sortedArray.push([element.id, element.task, element.complete])
        sortedArray.sort();
    }

    for (element of sortedArray) { // this loop is for appending the sorted to-do's

        if (element[2] == true) { // this conditional checks to see if the item has been completed, if so, assigns it a completed-item class
            $('.task-list').prepend(`<tr class="completed-item" data-id="${element[0]}" data-complete="${element[2]}">
            <td>${element[1]}</td>
            <td><button class="delete-button">Delete</button></td>
            <td><button class="complete-button">Completed</button></td>
            </tr>
            `);
        } else {
            $('.task-list').prepend(`<tr data-id="${element[0]}" data-complete="${element[2]}">
            <td>${element[1]}</td>
            <td><button class="delete-button">Delete</button></td>
            <td><button class="complete-button">Completed</button></td>
            </tr>
            `);
        }
    }
    $('#task-input').val('');
};




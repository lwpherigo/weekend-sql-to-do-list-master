console.log('js');

$(document).ready(init);

function init() {
    console.log('JQ is ON');
    getList();
    $('#js-addItem').on('click', getItem);
    $('.js-list').on('click', '.js-btn-complete', completeBtn);
    $('.js-list').on('click', '.js-btn-delete', deleteItem);
}

function getItem(event) {
    console.log('hey');
    const newItem = {
        task: $('#js-newToDo').val(),
    };

    postItem(newItem);
}

function postItem(newItem) {
    $.ajax({
        method: 'POST',
        url: '/api/list',
        data: newItem,
    })
    .then ((response) => {
        console.log('POST list item');
        getList();
    })
    .catch ((err) => {
        console.warn(err);
    })
}

function getList() {
    $.ajax({
        method: 'GET',
        url: '/api/list'
    })
    .then ((response) => {
        console.log('GET!');
        render(response);
    })
    .catch ((err) => {
        console.warn(err);
    })
}

function completeBtn() {
    let id = $(this).data('id');
    let val = true;
    let turnGreen = $(this).data('trans');

    if (val === true) {
        turnGreen = document.getElementById(id).style.background = 'green';
    } else {
        turnGreen = turnGreen;
    }
    console.log(turnGreen);
    putTask(turnGreen, id);
}

function putTask(complete, id) {
    console.log(complete);
    $.ajax({
        method: 'PUT',
        url: '/api/list/' + id,
        data: {
            complete: complete
        }
    })
    .then((response) => {
        console.log('PUT LIST');
        getList();
    }) 
    .catch((err) => {
        console.warn(err);
    })
}

function deleteItem() {
    console.log($(this).data('id'));
    const idNum = $(this).data('id');

    $.ajax({
        method: "DELETE",
        url: '/api/list/' + idNum
    })
    .then((response) => {
        getList();
    })
    .catch((response) => {
        console.warn(response);
    })
};

function render(response) {
    $('.js-list').empty();

    for(let i = 0; i < response.length; i++) {
        const listItem = response[i]; 
        $('.js-list').append(`
            <tr>
            <td>${listItem.task}</td>
            <td><button class='js-btn-complete' data-trans="${listItem.task}" data-id="${listItem.id}">Complete!</button></td>
            <td><button class='js-btn-delete' data-trans="${listItem.task}" data-id="${listItem.id}">Delete!</button></td>
            </tr>
        `)
    }
};
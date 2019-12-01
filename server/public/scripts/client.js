console.log('js');

$(document).ready(init);

function init() {
    console.log('JQ is ON');
    $('#js-addItem').on('click', getItem)
}

function getItem(event) {
    console.log('hey');
    const newItem = {
        item: $('#js-newToDo').val(),
    }

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

function render(response) {
    $('.js-list').empty();

    for(let i = 0; i < response.length; i++) {
        const listItem = response[i];

        $('.js-list').append(`
            <ul>
                <li>${listItem.task}</li>
            </ul>
        `)        
    }
}


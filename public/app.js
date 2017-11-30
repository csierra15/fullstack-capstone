let MOCK_LISTS = {
    "lists" : [
        {
            "id": "11111",
            "content": "apples, oranges, bread, ground beef",
            "listId": "aaaaa",
            "listName": "My List 1",
            "publishedAt": 1470016976609
        },
        {
            "id": "22222",
            "content": "beets, bananas, chicken, granola",
            "listId": "bbbbb",
            "listName": "My List 2",
            "publishedAt": 1470012976609
        },
        {
            "id": "33333",
            "content": "pretzels, mustard, saurkraut",
            "listId": "ccccc",
            "listName": "My List 3",
            "publishedAt": 1470015976609
        },
        {
            "id": "44444",
            "content": "butter, flour, sugar, eggs, milk",
            "listId": "ddddd",
            "listName": "My List 4",
            "publishedAt": 1470010976609
        }
    ]
};

function getLists(callbackFn) {
    setTimeout(function() {
        callbackFn(MOCK_LISTS)}, 100);
}

function displayLists(data) {
    for (index in data.lists) {
        $('body').append(
            '<h3>' + data.lists[index].listName + '</h3>' + '<li>' + data.lists[index].content + '</li>'
        );
    }
}

function getAndDisplayLists() {
    getLists(displayLists);
}

$(function() {
    getAndDisplayLists();
})
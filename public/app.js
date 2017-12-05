let MOCK_LISTS = {
    "lists" : [
        {
            "id": "11111",
            "content": [
                {
                    name: "apples",
                    department: "produce"
                }, 
                {
                    name: "oranges",
                    department: "produce"
                }, 
                {
                    name: "bread",
                    department: "bakery"},
                {
                    name: "ground beef",
                    department: "meat"}
            ],
            "listId": "aaaaa",
            "listName": "My List 1",
            "publishedAt": 1470016976609
        },
        {
            "id": "22222",
            "content": [
                {
                    name: "beets",
                    department: "produce"
                }, 
                {
                    name: "bananas",
                    department: "produce"
                }, 
                {
                    name: "granola",
                    department: "dry goods"
                },
                {
                    name: "chicken",
                    department: "meat"
                }
            ],
            "listId": "bbbbb",
            "listName": "My List 2",
            "publishedAt": 1470012976609
        },
        {
            "id": "33333",
            "content": [
                {
                    name: "pretzels",
                    department: "dry goods"
                }, 
                {
                    name: "mustard",
                    department: "condiments"
                }, 
                {
                    name: "saurkraut",
                    department: "canned goods"
                },
            ],
            "listId": "ccccc",
            "listName": "My List 3",
            "publishedAt": 1470015976609
        },
        {
            "id": "44444",
            "content": [
                {
                    name: "butter",
                    department: "dairy"
                }, 
                {
                    name: "flour",
                    department: "dry goods"
                }, 
                {
                    name: "sugar",
                    department: "dry goods"},
                {
                    name: "eggs",
                    department: "dairy"
                },
                {
                    name: "milk",
                    department: "dairy"
                }
            ],
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
            `<div class="mylist">
            <h3>${data.lists[index].listName}</h3>
            <div class="items">${data.lists[index].content.map(itemName => itemName.name)}</div>
            <div class="actions">
                <button class="view-btn">View</button>
                <button class="edit-btn">Edit</button>
                <button class="del-btn">Delete</button>
            </div>
        </div> `
        );
    }
}

function getAndDisplayLists() {
    getLists(displayLists);
}

$(function() {
    getAndDisplayLists();

    $('body').on('click', '.view-btn', (e) => {
        console.log('You clicked view')
        //view the whole list
    });

    $('body').on('click', '.edit-btn', (e) => {
        console.log('You clicked edit')
        //add or delete items from a list
    });

    $('body').on('click', '.del-btn', (e) => {
        console.log('You clicked delete')
        //remove list
    });

})


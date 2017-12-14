let MOCK_STORES = {
    "stores" : [
        {
            id: "11111111",
            name: "Krooger",
            state: "Tennessee",
            city: "Nashville",
            products: [
                {
                    1: "aisle 1",
                    2: "aisle 2",
                    3: "aisle 3"
                },
                {
                    4: "aisle 1",
                    5: "aisle 2",
                    6: "aisle 3"
                },
                {
                    7: "aisle 4",
                    8: "aisle 5",
                    9: "aisle 6"
                }
            ]
        },
        {
            id: "2222222",
            name: "All-d",
            state: "Tennessee",
            city: "Nashville",
            products: [
                {
                    1: "aisle 1",
                    2: "aisle 2",
                    3: "aisle 3"
                },
                {
                    4: "aisle 1",
                    5: "aisle 2",
                    6: "aisle 3"
                },
                {
                    7: "aisle 4",
                    8: "aisle 5",
                    9: "aisle 6"
                }
            ]
        },
        {
            id: "3333333",
            name: "Bargain Bob's",
            state: "Alabama",
            city: "Huntsville",
            products: [
                {
                    1: "aisle 1",
                    2: "aisle 2",
                    3: "aisle 3"
                },
                {
                    4: "aisle 1",
                    5: "aisle 2",
                    6: "aisle 3"
                },
                {
                    7: "aisle 4",
                    8: "aisle 5",
                    9: "aisle 6"
                }
            ]
        },
        {
            id: "4444444",
            name: "Ma and Pa's",
            state: "Alabama",
            city: "Huntsville",
            products: [
                {
                    1: "aisle 1",
                    2: "aisle 2",
                    3: "aisle 3"
                },
                {
                    4: "aisle 1",
                    5: "aisle 2",
                    6: "aisle 3"
                },
                {
                    7: "aisle 4",
                    8: "aisle 5",
                    9: "aisle 6"
                }
            ]
        }
    ]
};

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

let states = [];
let cities = [];
let stores = [];
let aisles = [];

function displayStates() {
    const options = states.map(state => {
        return `<option value="${state}">${state}</option>`;
    });
    options.unshift(`<option value="0">Select State...</option>`)

    $('#select-state').html(options);
}

function processData(data, callback) {
        states = Object.keys(data
            .stores
            .map(store => store.state).reduce((acc, curr) => {
                acc[curr] = 1;
                return acc;
            }, {}));

        cities = Object.values(data
            .stores
            .map(store => ({
                city: store.city,
                state: store.state
            }))
            .reduce((acc, curr) => {
                acc[`${curr.city}_${curr.state}`] = curr;
                return acc;
            }));

            stores = Object.values(data.stores);
        
        callback();
}

function fetchData(callbackFn) {
    setTimeout(function(){ processData(MOCK_STORES, callbackFn)}, 100);
}

function displayCities() {
    const state = $('#select-state').val();
    const filtered_cities = cities
        .filter(city => city.state === state)
        .map(city => `<option value="${city.city}">${city.city}</option>`);
    filtered_cities.unshift(`<option value="0">Select City...</option>`)

    $('#select-city').html(filtered_cities);
}

function displayStores() {
    const state = $('#select-state').val();
    const city = $('#select-city').val();
    const storeNames = stores
        .filter(store => store.city === city && store.state === state)
        .map(store => `<option value="${store.id}">${store.name}</option>`);
    storeNames.unshift(`<option value="0">Select Store...</option>`);
    $('#select-store').html(storeNames);
}

function displayAisles() {
    const storeId = $('#select-store').val();
    const aisles = aisles.map(aisle => ``);
    const store = stores.find((store) => {
        return store.id = storeId;
    });
    
}

$(function() {
    fetchData(displayStates);

    $('#select-state').change(function(e){
        if($('#select-state').val() != '0') {
            displayCities();
        }else{
            $('#select-city').empty();
        }
        
        console.log('select city ran');
    });

    $('#select-city').change(function(e) {
        if($('#select-stores').val() != '0'){
            displayStores();
        }else{
            $('#select-store').empty();
        }
        console.log('display stores ran')
    });

    //select-store.change..., check to make sure not 0, call displayAisles
});
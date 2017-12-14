let MOCK_STORES = {
    "stores" : [
        {
            id: "11111111",
            name: "Krooger",
            state: "Tennessee",
            city: "Nashville",
            aisles: [
                {
                    aisleName: "Aisle 1",
                    products: [
                        "cereal",
                        "granola bars",
                        "oatmeal"
                    ]
                },
                {
                    aisleName: "Aisle 2",
                    products: [
                        "frozen fruit",
                        "frozen vegetables",
                        "frozen meals"
                    ]
                },
                {
                    aisleName: "Aisle 3",
                    products: [
                        "meat",
                        "bread",
                        "produce"
                    ]
                }
            ]
        },
        {
            id: "2222222",
            name: "All-d",
            state: "Tennessee",
            city: "Nashville",
            aisles: [
                {
                    aisleName: "Aisle 1",
                    products: [
                        "cereal",
                        "granola bars",
                        "oatmeal"
                    ]
                },
                {
                    aisleName: "Aisle 2",
                    products: [
                        "frozen fruit",
                        "frozen vegetables",
                        "frozen meals"
                    ]
                },
                {
                    aisleName: "Aisle 3",
                    products: [
                        "meat",
                        "bread",
                        "produce"
                    ]
                }
            ]
        },
        {
            id: "3333333",
            name: "Bargain Bob's",
            state: "Alabama",
            city: "Huntsville",
            aisles: [
                {
                    aisleName: "Aisle 1",
                    products: [
                        "cereal",
                        "granola bars",
                        "oatmeal"
                    ]
                },
                {
                    aisleName: "Aisle 2",
                    products: [
                        "frozen fruit",
                        "frozen vegetables",
                        "frozen meals"
                    ]
                },
                {
                    aisleName: "Aisle 3",
                    products: [
                        "meat",
                        "bread",
                        "produce"
                    ]
                }
            ]
        },
        {
            id: "4444444",
            name: "Ma and Pa's",
            state: "Alabama",
            city: "Huntsville",
            aisles: [
                {
                    aisleName: "Aisle 1",
                    products: [
                        "cereal",
                        "granola bars",
                        "oatmeal"
                    ]
                },
                {
                    aisleName: "Aisle 2",
                    products: [
                        "frozen fruit",
                        "frozen vegetables",
                        "frozen meals"
                    ]
                },
                {
                    aisleName: "Aisle 3",
                    products: [
                        "meat",
                        "bread",
                        "produce"
                    ]
                }
            ]
        }
    ]
}

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
    //when the user has selected their store, 
    //display the aisles in that store
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
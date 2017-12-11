let MOCK_STORES = {
    "stores" : [
        {
            id: "11111111",
            name: "Krooger",
            state: "Tennessee",
            city: "Nashville"
        },
        {
            id: "2222222",
            name: "All-d",
            state: "Tennessee",
            city: "Nashville"
        },
        {
            id: "3333333",
            name: "Bargain Bob's",
            state: "Alabama",
            city: "Huntsville"
        },
        {
            id: "4444444",
            name: "Ma and Pa's",
            state: "Alabama",
            city: "Huntsville"
        }
    ]
}

let states = [];
let cities = [];
let stores = [];

function displayStates() {
    const options = states.map(state => {
        return `<option value="${state}">${state}</option>`;
    });

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

            stores = Object.values(data
                .stores
                .map(store => store.name).reduce((acc, curr) => {
                    acc[curr] = 1;
                    return acc;
                }, {}));
        
        callback();
}

function fetchData(callbackFn) {
    setTimeout(function(){ processData(MOCK_STORES, callbackFn)}, 100);
}

function displayCities() {
    const state = $(this).val();
    const filtered_cities = cities
        .filter(city => city.state === state)
        .map(city => `<option value="${city.city}">${city.city}</option>`);

    $('#select-city').html(filtered_cities);
}

function displayStores() {
    const city = $(this).val();
    const storeName = stores
        .filter(name => name.city === city)
        .map(store => `<option value="${store.name}">${store.name}</option>`);

    $('#select-store').html(storeName);
}

$(function() {
    fetchData(displayStates);

    $('#select-state').change(function(e){
        displayCities();
        console.log('select city ran');
    });

    //event handler for the city select box

    $('#select-city').change(function(e) {
        displayStores();
        console.log('display stores ran')
    })
})
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
let names = [];

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
    const state = $('#select-state').val();
    const filtered_cities = cities
        .filter(city => city.state === state)
        .map(city => `<option value="${city.city}">${city.city}</option>`);
    filtered_cities.unshift(`<option value="0">Select City...</option>`)

    $('#select-city').html(filtered_cities);
}

function displayStores() {
    const city = $('#select-city').val();
    const filtered_stores = names
        //.filter(name => name.city === city)
        .map(name => `<option value="${name}">${name}</option>`);
    filtered_stores.unshift(`<option value="0">Select Store...</option>`);
    $('#select-store').html(filtered_stores);
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
    })
})
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
            name: "Bargin Bob's",
            state: "Alabama",
            city: "Hunstville"
        },
        {
            id: "4444444",
            name: "Ma and Pa's",
            state: "Alabama",
            city: "Huntsville"
        }
    ]
}

function getStores(callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_STORES)}, 100);
}

function displayStores(data) {
    for (index in data.products) {
        $('body').append();
    }
}

function getAndDisplayStores() {
    getStores(displayStores);
}

$(function() {
    getAndDisplayStores();
})
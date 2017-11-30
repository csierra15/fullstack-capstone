let MOCK_DEPARTMENTS = {
    departments = [
        {
            "id": "111111",
            "deptName": "produce",
            "products": [
                "apples",
                "bananas",
                "broccoli",
                "bell peppers",
                "carrots",
                "onions",
                "oranges",
                "potatoes",
                "turnip greens"
            ]
        },
        {
            "id": "222222",
            "deptName": "meat",
            "products": [
                {
                    "beef": [
                        "steak",
                        "short ribs",
                        "ground beef"
                    ]
                },
                {
                    "chicken": [
                        "thighs",
                        "breast",
                        "feet",
                        "tenders",
                        "whole"
                    ]
                },
                {
                    "pork": [
                        "shoulder",
                        "bacon",
                        "pork chops",
                        "sausage",
                    ]
                },
                {
                    "seafood": [
                        "salmon",
                        "tilapia",
                        "scallops",
                        "shrimp",
                        "crab"
                    ]
                }
            ]
        },
        {
            "id": "333333",
            "deptName": "dairy",
            "products": [
                "butter",
                "milk",
                "yogurt",
                "cheese",
                "ice cream"
            ]
        },
        {
            "id": "444444",
            "deptName": "dry goods",
            "products": [
                "flour",
                "sugar",
                "spices",
                "cornmeal",
                "breadcrumbs"
            ]
        }
    ]
};

function getDepartments(callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_DEPARTMENTS)}, 100);
}

function displayDepartments(data) {
    for (index in data.departments) {
        $('body').append(
            '<p>' + data.departments[index].products + '</p>'
        );
    }
}

function getAndDisplayDepartments() {
    getDepartments(displayDepartments);
}

$(function() {
    getAndDisplayDepartments();
})

const SCREENS = {
    chooseFiguresScreen: '.choose-figures-screen',
    gameScreen: '.game-screen'
}

function generateTd(is_cell) {
    if (is_cell == 1) {
        return '<td class="cell"></td>';
    }
    return '<td class="empty-cell"></td>';
}

function generateTr(row) {
    let result = '<tr>' 
    for (let i in row) {
        result += generateTd(row[i])
    }
    result += '</tr>'
    return result
}

function generateTable(table, id) {
    let result = '';
    for (let i in table) {
        result += `<div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="figure${i}">
                    <label class="form-check-label" for="figure${i}">
                    <table>`
        for (let j in table[i]) {
            result += generateTr(table[i][j])
        }
        result += `</table>
                </label>
            </div>`    
    };

    return result
};

const button = document.querySelector('.button-start')
button.disabled = true;

let checkboxes = [];

function check() {
    checkboxes.forEach(input => {
         if(input.checked) {
            button.disabled=false;
         };
        });
};

function changeScreen(active_screen) {
    for (let screenName in SCREENS) {
        const screen = SCREENS[screenName];
        const element = document.querySelector(screen);
        if (screen == active_screen) {
            element.style.removeProperty("display");
            continue;
        };
        element.style.display = "none";
    };
};


    



const requestPromise = fetch('./figures.json')

let figures = [];

requestPromise.then(function(httpResponse){
    console.log(httpResponse);
    const jsonPromise = httpResponse.json();
    jsonPromise.then(function (figuresJson) {
        figures = figuresJson;
        console.log(figuresJson);

        const chooseFiguresScreen = document.querySelector(SCREENS.chooseFiguresScreen);
        chooseFiguresScreen.innerHTML = generateTable(figuresJson);
        checkboxes = document.querySelectorAll('input[type=checkbox]')
        checkboxes.forEach(input => input.addEventListener('change', check));
    });
});
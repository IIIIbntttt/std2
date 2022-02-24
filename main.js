

function generateTd(is_cell) {
    if (is_cell == 1) {
        return '<td class="cell"></td>';
    }
    return '<td class="empty-cell"></td>';
}

function generateTr(row) {
    let result = '<tr>' 
    for (i in row) {
        result += generateTd(row[i])
    }
    result += '</tr>'
    return result
}

function generateTable(table, id) {
    let result = `<div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="figure${id}">
                <label class="form-check-label" for="figure${id}">
                <table>`
     for (i in table) {
        result += generateTr(table[i])
     }
     result += `</table>
            </label>
        </div>`
     return result
}


const requestPromise = fetch('./figures.json')

requestPromise.then(function(httpResponse){
    console.log(httpResponse)
    const jsonPromise = httpResponse.json();
    jsonPromise.then(function (figuresJson) {
        console.log(figuresJson)
    })
});
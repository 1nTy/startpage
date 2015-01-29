// FILE: go.main.js

// NOTE: Configuration

var fadeDur = 200,
    titlePrefix = "Search ",

    idxWidth = 700,
    idxLogoFull = [225, 80],
    idxLogoSmall = [157, 56],
    idxMargin = 24,
    idxFadedOpacity = 0.3;


// NOTE: Empty placeholer variables

var eng_count = 0,
    init_status = 0,
    eng = {},
    current = {},
    idxHeight = 0;


// NOTE: Initial Setup Function

function init() {
    indexCreate();

    // NOTE: Behavior

    $(".i").keyup(function (ev) {
        fetchSuggestions(ev.which);
    });
    $(document).click(function (ev) {
        closeSugBox(ev.srcElement);
    });

    $(".toggleInfo").click(function () {
        $(".infoBox").toggle(400);
    });

    // NOTE: Show first search engine

    build(firstProp(eng), false);
}


// NOTE: Keyboard stuff

var isCtrl = false;
var isCmd = false;

$(document).keyup(function (e) {
    if (e.which === 17) isCtrl = false;
    if (e.which === 91) isCmd = false;
}).keydown(function (e) {
    if (e.which === 17) isCtrl = true;
    if (e.which === 91) isCmd = true;

    if (e.which == 49 && isCtrl === true) { /* Key "1" */
        nextEngine();
        return false;
    }
    if (e.which == 50 && isCtrl === true) { /* Key "2" */
        nextPlace();
        return false;
    }
    if (e.which == 51 && isCtrl === true) { /* Key "3" */
        nextLanguage();
        return false;
    }

    if (e.which == 38) { /* Arrow Up */
        prevSugResult();
    }
    if (e.which == 40) { /* Arrow Down */
        nextSugResult();
    }
    if (e.which == 27) { /* ESC */
        closeSugBox(false);
    }
    if (e.which == 13) { /* Enter */
        applySugResult();
    }
});


// FILE: go.tools.js


// NOTE: Returns the first property of an object

function firstProp(obj) {
    var first = true;
    for (prop in obj) {
        if (first) {
            return (prop);
        }
        first = false;
    }
}


// NOTE: Returns the property following a specified property of an object

function findNext(where, now) {
    var isNext = false;
    var next = null;
    for (item in where) {
        if (isNext) {
            next = item;
            isNext = false;
        }
        if (item == now) isNext = true;
    }
    if (next === null) next = firstProp(where);
    return next;
}


// NOTE: Returns the number of properties in an object

function numKeys(obj) {
    var count = 0;
    for (var prop in obj) {
        count++;
    }
    return count;
}


// NOTE: Checks if an array contains a certain value

function inArray(needle, haystack) {
    return ((',' + haystack.toString() + ',').indexOf(',' + needle + ',') !== -1);
}
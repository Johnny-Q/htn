function createElement(type, classes, text) {
    if (classes === void 0) { classes = []; }
    if (text === void 0) { text = ""; }
    var temp = document.createElement(type);
    classes.forEach(function (name) {
        temp.classList.add(name);
    });
    if (text) {
        temp.innerText = text;
    }
    return temp;
}
function make2Digits(num) {
    if (num < 10) {
        return "0" + num.toString();
    }
    return num.toString();
}
function assertObject(obj, props) {
    if (props === void 0) { props = []; }
    //only checks if the key is there, not if it has value
    if (!obj)
        return false;
    if (Object.entries(obj).length == 0)
        return false;
    for (var i = 0; i < props.length; i++) {
        if (!(props[i] in obj)) {
            console.log(props[i]);
            return false;
        }
    }
    return true;
}
;

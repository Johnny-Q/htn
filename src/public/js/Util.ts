function createElement(type: string, classes = [], text = "") {
    let temp = document.createElement(type);
    classes.forEach(name => {
        temp.classList.add(name);
    });
    if (text) {
        temp.innerText = text;
    }

    return temp;
}
function make2Digits(num: number): string {
    if (num < 10) {
        return "0" + num.toString();
    }
    return num.toString();
}

function assertObject(obj, props = []): boolean {
    //only checks if the key is there, not if it has value
    if (!obj) return false;
    if (Object.entries(obj).length == 0) return false;
    for (let i = 0; i < props.length; i++) {
        if (!(props[i] in obj)) {
            console.log(props[i]);
            return false;
        }
    }
    return true;
};
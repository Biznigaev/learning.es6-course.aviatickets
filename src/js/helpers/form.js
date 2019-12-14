export function isValidForm(...fields) {
    let validInput = true;
    for (let variable of fields) {
        if (typeof variable == "undefined") {
            validInput = false;
            break;
        }
    }
    return validInput;
}
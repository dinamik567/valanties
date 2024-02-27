
export function getDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = addZero(date.getMonth() + 1);
    const day = addZero(date.getDate());

    return `${year}${month}${day}`
}

function addZero(num: number) {
    if (num < 10 && num > 0) {
        return '0' + num
    }

    return num
}

let arr = []
while (arr.length !== 7) {
    let num = Math.floor(Math.random()*10);
    if (arr.indexOf(num) == -1) {
        arr.push(num);
    }
}
console.log(arr)
console.log(arr.sort())

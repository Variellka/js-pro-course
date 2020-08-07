function isPalindrom (word) {
    const newWord = word.split('').reverse().join('');
    (word === newWord) ? console.log(true) : console.log(false);
}
isPalindrom ('шалаш')
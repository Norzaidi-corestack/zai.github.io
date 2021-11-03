// program to count the number of vowels in a string

// defining vowels
const vowels = ["a", "e", "i", "o", "u"]

function countVowel(str) {
    // initialize count
    let count = 0;

    // loop through string to test if each character is a vowel
    for (let letter of str.toLowerCase()) {
        if (vowels.includes(letter)) {
            count++;
        }
    }

    // return number of vowels
    return count
}

// take input
//const string = prompt('Enter a string: ');

//const result = countVowel(string);

//console.log(result);

let vowBtn = document.getElementById("getVowels")
vowBtn.addEventListener("click", function(){
    //alert("button linked success!")
    let getString = document.getElementById("getString")
    //alert(getString.value)
    let a = countVowel(getString.value)
    
    alert("The vowel(s) in the string: "+ a)
           
})
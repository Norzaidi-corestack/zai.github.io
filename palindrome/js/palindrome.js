function checkPalindrome(str) {

    // find the length of a string
    const len = str.length;
    

    // loop through half of the string
    for (let i = 0; i < len / 2; i++) {

        // check if first and last string are same
        if (str[i] !== str[len - 1 - i]) {
            alert("Word is not a palindrome");
            return;
        }
    }
    alert("Word is a palindrome");
    
}
  


let palBtn = document.getElementById("getPalindrome")
palBtn.addEventListener("click", function(){
    //alert("button linked success!")
    let getString = document.getElementById("getString")
    //alert(getString.value)
    checkPalindrome(getString.value)
           
})
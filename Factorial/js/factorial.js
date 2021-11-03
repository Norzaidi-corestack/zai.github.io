function factor(_inp) {
    //let _inp = document.getElementById("getvalue")

    let total = 1
    _inp = parseFloat(_inp)
    if (isNaN(_inp)) {
        alert("Please enter a number")
        total = 'invalid'
        return total;
    }

    
    //let keyedin = _inp
    //let next = _inp
    //let factor = 1
    if (_inp == 0 || _inp == 1) {
        return _inp
    } else {
        for (let i = _inp; i >= 1; i--){
            //next = _inp - i
            total = total * i
            //alert(total)
            //alert(i)
            //alert(next)
        }
        return total

    }

   

    //arr2.push(_inp)
    //console.log(arr2)
    //eldisplay.innerHTML = "Values entered are: " + arr2
    
}

let getBtn = document.getElementById("getFactorial")
getBtn.addEventListener("click", function () {
    //alert("button linked success!")
    let getNumber = document.getElementById("getNumber")
    //alert(getNumber.value)
    a = factor(getNumber.value)
    alert("The factorial for the number you entered is: " + a)
})
function rot13(str) {

    var newCharCode = (oldCharCode) => {
        let retCode = oldCharCode + 13;
        if (retCode > 90) {
            retCode -= 26;
        }
        return retCode;
    }

    let retWord = "";
    for (let i = 0; i < str.length; i++) {
        let thisCharCode = str.charCodeAt(i);
        if (thisCharCode >= 65 && thisCharCode <= 90) {
            let newChar = newCharCode(thisCharCode);
            retWord = retWord + String.fromCharCode(newChar);
        } else {
            retWord = retWord + str.charAt(i);
        }
    }
    console.log(`retWord is ${retWord}`);
    return retWord;
  }
  
  rot13("SERR PBQR PNZC");  // FREE CODE CAMP
  rot13("SERR CVMMN!"); // FREE PIZZA
  
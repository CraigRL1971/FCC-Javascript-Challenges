function telephoneCheck(str) {
    
    let rules = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$|^1\s[0-9]{3}[\s|-][0-9]{3}[\s|-][0-9]{4}$|^1\s?\([0-9]{3}\)\s?[0-9]{3}-[0-9]{4}$|^[0-9]{10}$|^\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/;

    let result = rules.test(str);
    console.log(`result is ${result}`);
    return result;
  
}
  
  telephoneCheck("555-555-5555");  // true
  telephoneCheck("55555555"); // false
  telephoneCheck("1(555)555-5555"); // true
  telephoneCheck("(275)76227382"); // false
  telephoneCheck("2 (757) 622-7382"); // false
  telephoneCheck("2(757)622-7382");  // false
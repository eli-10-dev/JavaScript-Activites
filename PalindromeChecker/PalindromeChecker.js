// DOM
const textInput = document.getElementById("text-input");
const checkButton = document.getElementById("check-btn");
const result = document.getElementById("result");

// #check-btn should check if there is an input, if thre is none "Please input a value"

const cleanInputString = (str) =>{
  const regex = /[_.(),:\-\ /\ \\ \s]/g;
  return str.replace(regex, '');
}

const checkPalindrome = () =>{
  const userInput = document.getElementById("text-input").value;

  if (userInput === ""){
    alert("Please input a value");
      
  } else{
    const cleanInput = cleanInputString(userInput).toLowerCase();
    const reversedCleanInput = cleanInput.split('').reverse().join('').toLowerCase();
    console.log(cleanInput);
    console.log(reversedCleanInput);
    
    if (cleanInput === reversedCleanInput){
      result.innerHTML = `${userInput} is a palindrome`;
    } else{
      result.innerHTML = `${userInput} is not a palindrome`;
    }
  }
}


checkButton.addEventListener("click", checkPalindrome);

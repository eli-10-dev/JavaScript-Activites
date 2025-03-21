// DOM
const textInput = document.getElementById("text-input");
const checkButton = document.getElementById("check-btn");
const result = document.getElementById("result");

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
      result.innerHTML = `
      <div class="palindrome">
        ${userInput} = ${reversedCleanInput} <br>
        ${userInput} is a palindrome
      </div>
      `;
    } else{
      result.innerHTML = `
      <div class="not-palindrome">
        ${userInput} ≠ ${reversedCleanInput} <br>
        ${userInput} is not a palindrome
      </div>
      `;
    }
  }
}


checkButton.addEventListener("click", checkPalindrome);

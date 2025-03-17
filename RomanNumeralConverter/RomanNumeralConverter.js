const inputBox = document.getElementById("number");
const outputContainer = document.getElementById("output");
const convertButton = document.getElementById("convert-btn");

const valueConversions = [
{
  roman: "M",
  arabic: 1000 
},
{
  roman: "CM",
  arabic: 900 
},
{
  roman: "D",
  arabic: 500 
},
{
  roman: "CD",
  arabic: 400 
},
{
  roman: "C",
  arabic: 100 
},
{
  roman: "XC",
  arabic: 90 
},
{
  roman: "L",
  arabic: 50 
},
{
  roman: "XL",
  arabic: 40 
},
{
  roman: "X",
  arabic: 10 
},
{
  roman: "IX",
  arabic: 9 
},
{
  roman: "V",
  arabic: 5 
},
{
  roman: "IV",
  arabic: 4 
},
{
  roman: "I",
  arabic: 1 
},
];

const convertToRomanNumeral = (num) => {
  let result = "";

  for (let i = 0; i < valueConversions.length; i++){
      while (num >= valueConversions[i].arabic){
      num -= valueConversions[i].arabic;
      result += valueConversions[i].roman;
      console.log(result);
    }
  }
  // console.log(result);
  return result;
}

const displayOutput = () => {

  if(!inputBox.value){
    outputContainer.innerText = "Please enter a valid number";
  } else if (inputBox.value < 1){
    outputContainer.innerText = "Please enter a number greater than or equal to 1";
  } else if (inputBox.value > 3999){
    outputContainer.innerText = "Please enter a number less than or equal to 3999";
  }
  
  else{
     const romanNumeral = convertToRomanNumeral(inputBox.value);
     outputContainer.innerText = romanNumeral;
  }
  outputContainer.classList.remove("hidden");
};

convertButton.addEventListener("click", displayOutput);

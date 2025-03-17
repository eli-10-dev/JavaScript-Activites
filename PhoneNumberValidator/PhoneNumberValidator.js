document.addEventListener("DOMContentLoaded", () => {
  const clearBtn = document.getElementById("clear-btn");
  const userInput = document.getElementById("user-input");
  const checkBtn = document.getElementById("check-btn");
  const resultsDiv = document.getElementById("results-div");
  if (!resultsDiv) {
    console.error("resultsDiv is missing from the DOM");
    return;
  }
  resultsDiv.textContent = "LET'S CHECK IF YOUR NUMBER IS VALID!";
  if (!userInput || !checkBtn || !resultsDiv) {
    throw new Error("One or more required elements are missing from the DOM.");
  }   
  console.log("resultsDiv innerHTML:", resultsDiv.innerHTML);


  const cleanPhoneNumber = (input) => {
    const regex = /[\s]/g;
    const cleaned = input.replace(regex, "");
    return cleaned;
  }

  const validatePhoneNumber = (input) =>  {
    const cleaned = cleanPhoneNumber(input);

    if(cleaned === "") { 
      alert("Please provide a phone number");
      return;
    } 

    // ^(1-?)? = Ensures that 1 should be the first number, makes the dash beside it optional, and the whole group of 1- are optional in case the country code is not counted.
    // (\(\d{3}\)|\d{3}) - Makes sure that 3 digit numbers with or without parentheses are considered. After realizing that I shouldn't use a none capturing group 
    // (?: (\(\d{3}\)))
    // Adding (-?) - Optional dashes.

    const regex = /^(1-?)?(\(\d{3}\)|\d{3})(-?)(\d{3})(-?)(\d{4})$/;
    
    if (regex.test(cleaned)) {
      resultsDiv.innerHTML = `<br><div class="green">Valid US number: ${input}</div>`;
    } else {
      resultsDiv.innerHTML = `<br><div class="red">Invalid US number: ${input}</div> `;
    }
    console.log("resultsDiv innerHTML:", resultsDiv.innerHTML);
  }

  const clearInput = () => {
    userInput.value = "";
    resultsDiv.textContent = "";
  }

  checkBtn.addEventListener("click", () => {
    validatePhoneNumber(userInput.value);
  });

  clearBtn.addEventListener("click", () => {
    clearInput();
  });
});

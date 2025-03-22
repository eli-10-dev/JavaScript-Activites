// INPUT
const cash = document.getElementById("cash");
const priceInput = document.getElementById("price-input");

// BUTTON
const purchaseBtn = document.getElementById("purchase-btn");
const resetBtn = document.getElementById("reset");
const numpadBtns = document.querySelectorAll(".num");

// DISPLAYS 
const changeDueDisplay = document.getElementById("change-due");
const priceDisplay = document.getElementById("price");
const cashInDrawerDisplay = document.getElementById("cash-contents");
const statusDisplay = document.getElementById("status-display");

let cid = [
  ["PENNY", 0.50],  
  ["NICKEL", 0.50],  
  ["DIME", 1.00],    
  ["QUARTER", 2.50], 
  ["ONE", 5.00],   
  ["FIVE", 5.00],    
  ["TEN", 10.00],   
  ["TWENTY", 20.00], 
  ["ONE HUNDRED", 100.00]
];

const dupCid = JSON.parse(JSON.stringify(cid));
// console.log(dupCid);

let unitValues = { 
  'PENNY': 0.01,
  'NICKEL': 0.05,
  'DIME': 0.10,
  'QUARTER': 0.25,
  'ONE': 1.00,
  'FIVE': 5.00,
  'TEN': 10.00,
  'TWENTY': 20.00,
  'ONE HUNDRED': 100.00
};

let price = priceInput.value;

let currentTotalCashInDrawer = cid.reduce((sum, money) => sum + money[1], 0);
currentTotalCashInDrawer = Math.round(currentTotalCashInDrawer * 100) / 100;

changeDueDisplay.innerText = "";
cashInDrawerDisplay.innerText = cid.map((money) => `${money[0]} = ${money[1]}`).join("\n");

const getChange = (cashPayment) => {
  cashPayment = parseFloat(cashPayment);
  let change = cashPayment - price;
  let changeBreakdown = [];
  let tempCid = JSON.parse(JSON.stringify(cid)); 

  currentTotalCashInDrawer = tempCid.reduce((sum, money) => sum + money[1], 0);
  currentTotalCashInDrawer = Math.round(currentTotalCashInDrawer * 100) / 100;

  displayStatus(cashPayment, change);

  if (currentTotalCashInDrawer < change) {
    return;
  }

  if (change === 0) {
    changeDueDisplay.innerText = "No change due - customer paid with exact cash.";
    return;
  }

  for (let i = tempCid.length - 1; i >= 0; i--) {
    let unitName = tempCid[i][0];
    let unitValue = unitValues[unitName];
    let amountFromDenomination = 0;

    while (change >= unitValue && tempCid[i][1] >= unitValue) {
      change = Math.round((change - unitValue) * 100) / 100;
      tempCid[i][1] = Math.round((tempCid[i][1] - unitValue) * 100) / 100;
      amountFromDenomination += unitValue;
    }

    if (amountFromDenomination > 0) {
      changeBreakdown.push(`${unitName}: $${amountFromDenomination.toFixed(2)}`);
    }
  }

  if (change > 0) { 
    changeDueDisplay.innerText = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  cid = tempCid;

  cashInDrawerDisplay.innerText = cid.map((unit) => `${unit[0]} = ${unit[1]}`).join("\n");
  changeDueDisplay.innerText += changeBreakdown.join(" ");
};


const displayStatus = (cashPayment, change) => {
  let status = "";
  
  if (!cash.value) return;

  if (cashPayment === price) {
    changeDueDisplay.innerText = "No change due - customer paid with exact cash";
    return;
  } else if (cashPayment < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (currentTotalCashInDrawer === change) {
    status = "Status: CLOSED ";
  } else if (currentTotalCashInDrawer < change) {
    status = "Status: INSUFFICIENT_FUNDS";
    changeDueDisplay.innerText = status;
    return;
  } else if (currentTotalCashInDrawer > change) {
    status = "Status: OPEN ";
  }

  changeDueDisplay.innerText = status;
};

const reset = () => {
  cid = dupCid.map(subArray => [...subArray]);
  cashInDrawerDisplay.innerText = cid.map((money) => `${money[0]} = ${money[1]}`).join("\n");
  changeDueDisplay.innerText = "";
  cash.value = "";
}

purchaseBtn.addEventListener("click", () => {
  getChange(cash.value);
}); 

let activeInput = cash;

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("focus", () => {
    activeInput = input;
  });
});

numpadBtns.forEach((div) => {
  div.addEventListener("click", () => {
    if (!activeInput) activeInput = cash; // Default to cash input if none is selected

    if (div.getAttribute("value") === "Del") {
      activeInput.value = activeInput.value.slice(0, -1); // Remove last character
      return;
    }
    
    activeInput.value += div.getAttribute("value"); // Append clicked number
  });
});
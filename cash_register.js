function checkCashRegister(price, cash, cid) {
    
    let currencyUnits = {"ONE HUNDRED" : 100.0,
                        "TWENTY" : 20.0,
                        "TEN" : 10.0,
                        "FIVE" : 5.0,
                        "ONE" : 1.0,
                        "QUARTER" : 0.25,
                        "DIME" : 0.1,
                        "NICKEL" : 0.05,
                        "PENNY" : 0.01};

    let cr_total = (crin) => crin.reduce(function(sum, item) { return sum + item[1]; }, 0);
    
    function calculate_change(change) {
        let change_out = [];  // This will be output array
        let index = 0;
        for (const unit in currencyUnits) {  // Iterate through each currency unit (i.e. one hundred, twenty...penny)
            let currencyValue = currencyUnits[unit];  //  Not needed but improves readability
            if (change > currencyValue) {  // We can use the current currency value to provide change
                change_out.push([]);
                let quotient = Math.floor(change / currencyValue);  
                let fromThisUnit = (quotient * currencyValue).toFixed(2);  // How much change we need from this currency unit
                let cidUnit = cid.find(function (item) {
                    if (item[0] == unit) { return item; }
                });
                if (fromThisUnit > cidUnit[1]) {  // Check to see if we have enough of this currency unit in the till (drawer)
                    fromThisUnit = cidUnit[1];
                }
                fromThisUnit = parseFloat(fromThisUnit);  // Remove trailing zeroes
                change_out[index] = [unit, fromThisUnit];  // Append to our output array
                change = (change - fromThisUnit).toFixed(2);  // Subtract amount from change
                index++;
            }
        }
        if (change > 0.0) {  // If we still have change left over then there wasn't a sufficient combination of currency units for this transaction
            return -1;
        } else {
            return change_out;
        }
    }

    let total_in_cr = cr_total(cid).toFixed(2);  // Total value of money in the till (drawer)
    let change_needed = cash - price;
    
    if (change_needed > total_in_cr) {
        return {status: "INSUFFICIENT_FUNDS", change: []};
    } else if (change_needed == total_in_cr) {
        return {status: "CLOSED", change: cid};
    } else {
        let change_due = calculate_change(change_needed);
        if (change_due === -1) {
            return {status: "INSUFFICIENT_FUNDS", change: []};
        } else {
            return {status: "OPEN", change: change_due};
        }
    }

}
  
  console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
  console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
  console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
  console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
  console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
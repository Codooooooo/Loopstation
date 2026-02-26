
var currencyDropdown = document.getElementById("currency-dropdown");

// Get the element used to display the price
var priceElement = document.getElementById("pd_price");
console.log("Price element value: " + priceElement.textContent);

// Call the updatePrice function when the currency selection has changed
currencyDropdown.addEventListener("change", updatePrice);


function updatePrice() {
  // Get the selected target currency code
  var targetCurrency = currencyDropdown.value;
  console.log(targetCurrency);

  // Get the amount to be converted
  var amount = parseInt(priceElement.getAttribute("data-price"));
  //console.log(amount);

  // Constructing the URL of the API request
  var url = "https://api.apilayer.com/fixer/convert?to=" + targetCurrency +"&from=THB"+ "&amount=" + amount;
  var myHeaders = new Headers();
  myHeaders.append("apikey", "9jI20wSgO2xCvdiJxFAMIFmR64OhDq9q");
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders,
    mode: 'cors' // Add this line to enable CORS
  };
  // Calling the API and updating prices
  fetch(url,requestOptions)
    .then(response => response.json())
    .then(data => {
      // Get the converted amount
      var convertedAmount = data.result;
      console.log(convertedAmount);

      // Formatted prices value to currency format
      var formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: targetCurrency }).format(convertedAmount);

      // Update the displayed price
      priceElement.textContent = formattedPrice;

      // Return Price Value
      return convertedAmount;
    })
    .catch(error => console.log('API error:', error));
}

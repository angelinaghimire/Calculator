document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.querySelector(".input");
    const buttons = document.querySelectorAll(".button");
    let currentCalculation = "";
    let calculationPerformed = false;
    let errorOccurred = false;
  
    function updateInputField(value) {
      inputField.value = value;
    }
  
    function formatNumber(number) {
      const formattedNumber = parseFloat(number).toString();
      return formattedNumber.endsWith('.0') ? formattedNumber.replace('.0', '') : formattedNumber;
    }
  
    function handleButtonClick(buttonText) {
      switch (buttonText) {
        case "AC":
          currentCalculation = "";
          break;
        case "+/-":
          if (currentCalculation.startsWith("-")) {
            currentCalculation = currentCalculation.substring(1);
          } else {
            currentCalculation = "-" + currentCalculation;
          }
          break;
        case "⌫":
          currentCalculation = currentCalculation.slice(0, -1);
          break;
        case "=":
          try {
            currentCalculation = currentCalculation.replace(/x/g, '*').replace(/÷/g, '/');
            let result = math.evaluate(currentCalculation);
            currentCalculation = formatNumber(result);
            currentCalculation = parseFloat(result.toFixed(5));
            calculationPerformed = true;
            errorOccurred = false;
          } catch (error) {
            currentCalculation = "Error";
            errorOccurred = true;
          }
          break;
        default:
          if (errorOccurred) {
            currentCalculation = buttonText;
            errorOccurred = false;
          } else if (calculationPerformed) {
            currentCalculation = buttonText;
            calculationPerformed = false;
          } else {
            currentCalculation += buttonText;
          }
          break;
      }
      updateInputField(currentCalculation);
    }
  
    inputField.setAttribute("readonly", "true");
  
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        handleButtonClick(button.textContent.trim());
      });
    });
  });
  
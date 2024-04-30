class Calculator {
  constructor() {
    this.result = 0;
    this.resultEl = document.querySelector(".result");
    this.resultEl.innerHTML = this.result;
  }

  onClickNumber(value) {
    if (this.resultEl.innerHTML.length >= 12) return;
    if (this.operation) {
      this.resultEl.innerHTML = value;
    } else if (this.resultEl.textContent === "0") {
      this.resultEl.innerHTML = value;
    } else {
      this.resultEl.innerHTML += value;
    }
  }

  onClickOperator(operator) {
    this.currentNum = parseFloat(this.resultEl.textContent);
    this.operation = operator;
  }

  calculate() {
    let secondNum = parseFloat(this.resultEl.textContent);
    switch (this.operation) {
      case "add":
        this.result = this.currentNum + secondNum;
        break;
      case "sub":
        this.result = this.currentNum - secondNum;
        break;
      case "mul":
        this.result = this.currentNum * secondNum;
        break;
      case "div":
        this.result = this.currentNum / secondNum;
        break;
    }
    console.log(this.result);
    this.resultEl.innerHTML = this.limitDigits(this.result, 12);
  }

  deleteNumber() {
    let display = this.resultEl.textContent;
    this.resultEl.innerHTML = display.length === 1 ? "0" : display.slice(0, -1);
  }

  limitDigits(num, totalDigits) {
    const numStr = num.toString();
    const parts = numStr.split(".");
    const integerDigits = parts[0].length;
    const decimalDigits = totalDigits - integerDigits;
    return Number(num.toFixed(decimalDigits));
  }
}

const calc = new Calculator();

document.querySelectorAll(".calculator button").forEach((button) => {
  button.addEventListener("click", function () {
    if (this.dataset.number) {
      calc.onClickNumber(this.dataset.number);
    } else if (this.dataset.operator) {
      calc.onClickOperator(this.dataset.operator);
    } else if (this.dataset.function === "del") {
      calc.deleteNumber();
    } else if (this.dataset.function === "enter") {
      calc.calculate();
    }
  });
});

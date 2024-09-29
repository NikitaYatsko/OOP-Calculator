class Calculator {
    constructor(displayElement) {
        this.displayElement = displayElement;
        this.displayContent = '';
        this.clear();
    }

    appendNumber(number) {
        if (this.currentOperand === '' && number === '0') return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
        this.updateDisplay();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let result;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = '';
        this.updateDisplay();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    updateDisplay() {
        this.displayElement.value = this.currentOperand;
    }

    handleButtonClick(buttonValue) {
        if (!isNaN(buttonValue)) {
            this.appendNumber(buttonValue);
        } else if (['+', '-', '*', '/'].includes(buttonValue)) {
            this.chooseOperation(buttonValue);
        } else if (buttonValue === '=') {
            this.compute();
        } else if (buttonValue === 'C') {
            this.clear();
        }
    }
}

// Получаем элементы кнопок и дисплея
const displayElement = document.getElementById('display');
const buttons = document.querySelectorAll('.calculator button');

// Создаем экземпляр калькулятора
const calculator = new Calculator(displayElement);

// Добавляем обработчики событий на кнопки
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonValue = button.textContent;
        calculator.handleButtonClick(buttonValue);
    });
});

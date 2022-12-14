class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    clear(){
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    appendNumber(number){ 
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand += number.toString();
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return;
        if(this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return;
        switch (this.operation){
            case '+':
                computation = prev + current;
                break;
            case '−':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':                
                computation = prev / current;
                break;
            default:
                return;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';

    }

    updateDisplay(){
        if(this.operation != null){
            this.previousOperandTextElement.textContent = `${this.previousOperand} ${this.operation}`;
        }else {
            this.previousOperandTextElement.textContent = this.previousOperand;
        }
        this.currentOperandTextElement.textContent = this.currentOperand;
        
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const clearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.textContent);
        calculator.updateDisplay();
    })
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {        
        calculator.chooseOperation(button.textContent);
        calculator.updateDisplay();
    })
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

window.addEventListener('keydown', keyHandler);

function keyHandler(e){
    if(e.keyCode === 13){
        calculator.compute();
        calculator.updateDisplay();
    }

    let key = document.querySelector(`button[data-key='${e.keyCode}']`); 
    
    if(!key) return;    

    if(e.shiftKey){
        key = document.querySelector(`button[data-key='${e.keyCode} shift']`);    
    } 

    if(key.dataset.hasOwnProperty('number')){
        calculator.appendNumber(key.textContent);
        calculator.updateDisplay();
    }else if(key.dataset.hasOwnProperty('operation')){
        calculator.chooseOperation(key.textContent);
        calculator.updateDisplay();
    }else if(key.dataset.hasOwnProperty('delete')){
        calculator.delete();
        calculator.updateDisplay();        
    }else {
        calculator.compute();
        calculator.updateDisplay();
    }
}
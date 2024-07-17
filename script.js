document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const keys = document.querySelector('.calculator-keys');
    
    keys.addEventListener('click', function(e) {
        if (!e.target.matches('button')) return;
        
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = keys.dataset.previousKeyType;
        
        if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = keyContent;
            } else {
                display.textContent = displayedNum + keyContent;
            }
            keys.dataset.previousKeyType = 'number';
        }
        
        if (action === 'operation') {
            keys.dataset.previousKeyType = 'operator';
            keys.dataset.firstValue = displayedNum;
            keys.dataset.operator = keyContent;
        }
        
        if (action === 'calculate') {
            const firstValue = keys.dataset.firstValue;
            const operator = keys.dataset.operator;
            const secondValue = displayedNum;
            
            display.textContent = calculate(firstValue, operator, secondValue);
            keys.dataset.previousKeyType = 'calculate';
        }
        
        if (action === 'clear') {
            display.textContent = '0';
            keys.dataset.previousKeyType = 'clear';
        }
        
        if (action === 'delete') {
            display.textContent = displayedNum.slice(0, -1) || '0';
            keys.dataset.previousKeyType = 'delete';
        }
    });
    
    function calculate(first, operator, second) {
        first = parseFloat(first);
        second = parseFloat(second);
        
        if (operator === '+') return first + second;
        if (operator === '-') return first - second;
        if (operator === '*') return first * second;
        if (operator === '/') return first / second;
        if (operator === '%') return first % second;
    }
});

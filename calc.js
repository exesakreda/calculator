console.log('');
function performOperation(operator, a, b) {
    switch (operator) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': if (b !== 0) {
            return a / b;
        }
        else
            throw new Error('Деление на ноль.');
        default: return;
    }
}
function calc(expression) {
    try {
        var operators_1 = ['+', '-', '*', '/'];
        var stack_1 = [];
        var firstArg_1;
        var secondArg_1;
        var brackets_1 = 0;
        var args_1 = 0;
        var newExpression = expression.split('').reverse();
        // console.log(expression, newExpression)
        newExpression.forEach(function (element) {
            if (element == '(' || element == ')' || element == ' ') {
                if (element == '(') {
                    brackets_1++;
                }
                if (element == ')') {
                    brackets_1--;
                }
                return;
            }
            if (args_1 == 1 && brackets_1)
                args_1--;
            if (!isNaN(Number(element))) {
                if (args_1 >= 2)
                    throw new Error('Слишком много аргументов. Используйте круглые скобки.');
                stack_1.push(Number(element));
                args_1++;
            }
            else if (operators_1.includes(element)) {
                if (stack_1.length >= 2) {
                    firstArg_1 = stack_1.pop();
                    secondArg_1 = stack_1.pop();
                    args_1 -= 2;
                }
                else
                    throw new Error('Не хватает аргументов.');
                var result = performOperation(element, Number(firstArg_1), Number(secondArg_1));
                stack_1.push(Number(result));
                args_1++;
            }
            else
                throw new Error('Неизвестный оператор.');
        });
        if (brackets_1 !== 0)
            throw new Error('Не хватает круглых скобок.');
        if (stack_1.length == 1 && typeof stack_1[0] == 'number') {
            var result = stack_1[0];
            console.log('Выражение:', expression);
            console.log('Результат:', result);
        }
        else
            throw new Error('Некорректное выражение.');
    }
    catch (error) {
        console.log('Выражение:', expression);
        console.error('Ошибка!', error.message);
    }
    console.log('');
}
// Тест 1: Проверка обработки отрицательных чисел
calc('+ (-2 3) 4'); // Ожидаемый результат: 1
// Тест 2: Проверка обработки чисел с несколькими цифрами
calc('+ 10 20'); // Ожидаемый результат: 30
// Тест 3: Проверка обработки выражений с несколькими операторами
calc('+ 1 * 2 3'); // Ожидаемый результат: 7 (1 + (2 * 3))
// Тест 4: Проверка на отсутствие операндов
calc('* 2'); // Ожидаемая ошибка: 'Missing operands.'
// Тест 5: Проверка деления на ноль
calc('/ 1 0'); // Ожидаемая ошибка: 'Division by zero.'
// Тест 6: Проверка неправильного оператора
calc('& 1 2'); // Ожидаемая ошибка: 'Undefined operator.'
// Тест 7: Проверка неправильно расставленных скобок
calc('+ 1 (* 2 3'); // Ожидаемая ошибка: 'Incorrect expression.'
// Тест 8: Проверка пустого выражения
calc(''); // Ожидаемая ошибка: 'Incorrect expression.'
// Тест 9: Проверка на наличие пробелов и игнорирование их
calc('+   1   *  2  3'); // Ожидаемый результат: 7
// Тест 10: Проверка с некорректным количеством операндов для сложных выражений
calc('* + 1 2 3'); // Ожидаемая ошибка: 'Missing operands.'
calc('* (-5 6)7');
calc('+3 *5 2');

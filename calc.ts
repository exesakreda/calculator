console.log('')

function performOperation(operator: string, a: number, b: number) {
    switch (operator) {
        case '+': return a + b
        case '-': return a - b
        case '*': return a * b
        case '/': if (b !== 0) {
            return a / b
        } else throw new Error('Деление на ноль.')
        default: return
    }
}

function calc(expression: string) {
    try {
        const operators = ['+', '-', '*', '/']
        const stack: Array<number> = []

        let firstArg
        let secondArg

        let brackets = 0
        let args = 0    

        let newExpression = expression.split('').reverse()
        // console.log(expression, newExpression)

        newExpression.forEach(element => {
            if (element == '(' || element == ')' || element == ' ') {
                if (element == '(') {
                    brackets++
                }
                if (element == ')') {
                    brackets--
                }
                return
            }

            if (args == 1 && brackets) args--

            if (!isNaN(Number(element))) {
                if (args >= 2) throw new Error('Слишком много аргументов. Используйте круглые скобки.')
                stack.push(Number(element))
                args++
            } else if (operators.includes(element)) {
                if (stack.length >= 2) {
                    firstArg = stack.pop()
                    secondArg = stack.pop()
                    args -= 2
                } else throw new Error('Не хватает аргументов.')
                const result = performOperation(element, Number(firstArg), Number(secondArg))
                stack.push(Number(result))
                args++
            } else throw new Error('Неизвестный оператор.')
        })

        if (brackets !== 0) throw new Error('Не хватает круглых скобок.')
        
        if (stack.length == 1 && typeof stack[0] == 'number') {
            const result = stack[0] as number
            console.log('Выражение:', expression)
            console.log('Результат:', result)
        } else throw new Error('Некорректное выражение.')

    } catch (error) {
        console.log('Выражение:', expression)
        console.error('Ошибка!', error.message)
    }
    console.log('')
}


calc('+ (-2 3) 4'); 
calc('+ 10 20'); 
calc('+ 1 * 2 3'); 
calc('* 2'); 
calc('/ 1 0'); 
calc('& 1 2'); 
calc('+ 1 (* 2 3'); 
calc(''); 
calc('+   1   *  2  3'); 
calc('* + 1 2 3'); 
calc('* (-5 6)7'); 
calc('+(+ 3 (*5 2)) 4');


calc('+(+ 3 ((((((*5 2))))))) 4');
calc('(* (+ 2 3)) 4');
calc('+ (* 2 3) (- 4 1)');

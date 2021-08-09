//    let prompt1;
//    let prompt2;
//    let prompt3;

   let askAgain;
   let result = 0;
   let prompt5 = true;

   operate(prompt1, prompt2, prompt3);

   function operate(prompt1, prompt2, prompt3){
       switch(prompt1){
            case '+':
                add(prompt2, prompt3);
                console.log(result);
                break;
            case '-':
                subtract(prompt2, prompt3);
                break;
            case '*':
                multiply(prompt2, prompt3);
                break;
            case '/':
                divide(prompt2, prompt3);
                break;
       }
   }

    function clear(){
        result = 0;
        prompt = false;
    }
    // if num then use result if not then use a fresh num
    function add(num1, num2){
        console.log(addition);
    }

     function subtract(num1, num2){
        console.log(subtraction);
    }

     function multiply(num1, num2){
        console.log(num1 * num2);
    }

     function divide(num1, num2){
        console.log(num1 / num2);
    }
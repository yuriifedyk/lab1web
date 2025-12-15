console.log("Інструкція з використання функції triangle:");
console.log('Синтаксис: triangle(значення1, "тип1", значення2, "тип2");');
console.log('Приклади:');
console.log('  triangle(4, "leg", 8, "hypotenuse");');
console.log('  triangle(8, "hypotenuse", 4, "leg");');
console.log('Допустимі типи: "leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"');

function triangle(val1, type1, val2, type2) {
    const toRadians = angle => angle * Math.PI / 180;
    const toDegrees = rad => rad * 180 / Math.PI;

    const allowedTypes = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];
    
    if (!allowedTypes.includes(type1) || !allowedTypes.includes(type2)) {
        console.log("Неправильно вказано тип елемента. Будь ласка, перечитайте інструкцію.");
        return "failed";
    }

    let sideA, sideB, hypotenuse, angleAlpha, angleBeta;

    function displayResult() {
        console.log(`a = ${sideA.toFixed(4)}`);
        console.log(`b = ${sideB.toFixed(4)}`);
        console.log(`c = ${hypotenuse.toFixed(4)}`);
        console.log(`α = ${angleAlpha.toFixed(4)}°`);
        console.log(`β = ${angleBeta.toFixed(4)}°`);
        return "success"; 
    }

    function compute(v1, t1, v2, t2) {
        // Катет і Гіпотенуза
        if (t1 === "leg" && t2 === "hypotenuse") {
            sideA = v1; hypotenuse = v2;
            if (sideA <= 0 || hypotenuse <= 0) return "Помилка: Значення мають бути додатніми";
            if (sideA >= hypotenuse) return "Помилка: Катет не може бути більшим або рівним гіпотенузі";
            
            sideB = Math.sqrt(hypotenuse ** 2 - sideA ** 2);
            angleAlpha = toDegrees(Math.asin(sideA / hypotenuse));
            angleBeta = 90 - angleAlpha;
            return "success";
        }
        if (t2 === "leg" && t1 === "hypotenuse") return compute(v2, t2, v1, t1);

        // Катет і Катет
        if (t1 === "leg" && t2 === "leg") {
            sideA = v1; sideB = v2;
            if (sideA <= 0 || sideB <= 0) return "Помилка: Значення мають бути додатніми";
            
            hypotenuse = Math.sqrt(sideA ** 2 + sideB ** 2);
            angleAlpha = toDegrees(Math.atan(sideA / sideB));
            angleBeta = 90 - angleAlpha;
            return "success";
        }

        // Катет і Прилеглий кут
        if (t1 === "leg" && t2 === "adjacent angle") {
            sideA = v1; angleAlpha = v2;
            if (sideA <= 0) return "Помилка: Катет має бути додатнім";
            if (angleAlpha <= 0 || angleAlpha >= 90) return "Помилка: Гострий кут має бути більше 0 і менше 90 градусів";
            
            sideB = sideA * Math.tan(toRadians(angleAlpha));
            hypotenuse = sideA / Math.cos(toRadians(angleAlpha));
            angleBeta = 90 - angleAlpha;
            return "success";
        }
        if (t2 === "leg" && t1 === "adjacent angle") return compute(v2, t2, v1, t1);

        // Катет і Протилежний кут
        if (t1 === "leg" && t2 === "opposite angle") {
            sideA = v1; angleAlpha = v2;
            if (sideA <= 0) return "Помилка: Катет має бути додатнім";
            if (angleAlpha <= 0 || angleAlpha >= 90) return "Помилка: Гострий кут має бути більше 0 і менше 90 градусів";
            
            hypotenuse = sideA / Math.sin(toRadians(angleAlpha));
            sideB = Math.sqrt(hypotenuse ** 2 - sideA ** 2);
            angleBeta = 90 - angleAlpha;
            return "success";
        }
        if (t2 === "leg" && t1 === "opposite angle") return compute(v2, t2, v1, t1);

        // Гіпотенуза і Кут
        if (t1 === "hypotenuse" && t2 === "angle") {
            hypotenuse = v1; angleAlpha = v2;
            if (hypotenuse <= 0) return "Помилка: Гіпотенуза має бути додатною";
            if (angleAlpha <= 0 || angleAlpha >= 90) return "Помилка: Гострий кут має бути більше 0 і менше 90 градусів";
            
            sideA = hypotenuse * Math.sin(toRadians(angleAlpha));
            sideB = hypotenuse * Math.cos(toRadians(angleAlpha));
            angleBeta = 90 - angleAlpha;
            return "success";
        }
        if (t2 === "hypotenuse" && t1 === "angle") return compute(v2, t2, v1, t1);

        console.log("Поєднання типів не підтримується або введено некоректно.");
        return "failed";
    }

    const status = compute(val1, type1, val2, type2);
    
    if (status === "success") {
        displayResult();
        return "success";
    } else {
        console.log(status);
        return status; 
    }
}

console.log("Як користуватися функцією: ");
console.log('calculateTriangle(4, "leg", 8, "hypotenuse");');
console.log('calculateTriangle(8, "hypotenuse", 4, "leg");');

function calculateTriangle(val1, type1, val2, type2) {
    const toRadians = angle => angle * Math.PI / 180;
    const toDegrees = rad => rad * 180 / Math.PI;

    const allowedTypes = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];
    if (!allowedTypes.includes(type1) || !allowedTypes.includes(type2)) {
        console.log("Помилка параметрів");
        return "error";
    }

    let sideA, sideB, hypotenuse, angleAlpha, angleBeta;

    function displayResult() {
        console.log(`a = ${sideA.toFixed(4)}`);
        console.log(`b = ${sideB.toFixed(4)}`);
        console.log(`c = ${hypotenuse.toFixed(4)}`);
        console.log(`α = ${angleAlpha.toFixed(4)}°`);
        console.log(`β = ${angleBeta.toFixed(4)}°`);
    }

    function compute(v1, t1, v2, t2) {
        if (t1 === "leg" && t2 === "hypotenuse") {
            sideA = v1; hypotenuse = v2;
            if (sideA <= 0 || hypotenuse <= 0 || sideA >= hypotenuse) return "Помилка";
            sideB = Math.sqrt(hypotenuse ** 2 - sideA ** 2);
            angleAlpha = toDegrees(Math.asin(sideA / hypotenuse));
            angleBeta = 90 - angleAlpha;
            return "ok";
        }
        if (t2 === "leg" && t1 === "hypotenuse") return compute(v2, t2, v1, t1);

        if (t1 === "leg" && t2 === "leg") {
            sideA = v1; sideB = v2;
            if (sideA <= 0 || sideB <= 0) return "Помилка";
            hypotenuse = Math.sqrt(sideA ** 2 + sideB ** 2);
            angleAlpha = toDegrees(Math.atan(sideA / sideB));
            angleBeta = 90 - angleAlpha;
            return "ok";
        }

        if (t1 === "leg" && t2 === "adjacent angle") {
            sideA = v1; angleAlpha = v2;
            if (sideA <= 0 || angleAlpha <= 0 || angleAlpha >= 90) return "Помилка";
            sideB = sideA * Math.tan(toRadians(angleAlpha));
            hypotenuse = sideA / Math.cos(toRadians(angleAlpha));
            angleBeta = 90 - angleAlpha;
            return "ok";
        }
        if (t2 === "leg" && t1 === "adjacent angle") return compute(v2, t2, v1, t1);

        if (t1 === "leg" && t2 === "opposite angle") {
            sideA = v1; angleAlpha = v2;
            if (sideA <= 0 || angleAlpha <= 0 || angleAlpha >= 90) return "Помилка";
            hypotenuse = sideA / Math.sin(toRadians(angleAlpha));
            sideB = Math.sqrt(hypotenuse ** 2 - sideA ** 2);
            angleBeta = 90 - angleAlpha;
            return "ok";
        }
        if (t2 === "leg" && t1 === "opposite angle") return compute(v2, t2, v1, t1);

        if (t1 === "hypotenuse" && t2 === "angle") {
            hypotenuse = v1; angleAlpha = v2;
            if (hypotenuse <= 0 || angleAlpha <= 0 || angleAlpha >= 90) return "Помилка";
            sideA = hypotenuse * Math.sin(toRadians(angleAlpha));
            sideB = hypotenuse * Math.cos(toRadians(angleAlpha));
            angleBeta = 90 - angleAlpha;
            return "ok";
        }
        if (t2 === "hypotenuse" && t1 === "angle") return compute(v2, t2, v1, t1);

        return "Помилка параметрів";
    }

    const status = compute(val1, type1, val2, type2);
    if (status === "ok") {
        displayResult();
    } else {
        console.log(status);
    }

    return status;
}

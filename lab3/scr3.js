console.log("--- Частина 1: ES5 Syntax (1.2.3 - 1.2.10) ---");


var car1 = new Object();
car1.color = "red";
car1.maxSpeed = 200;
car1.driver = new Object(); // Вкладений об'єкт
car1.driver.name = "Ваше Ім'я"; // Замініть на своє ім'я
car1.driver.category = "C";
car1.driver["personal limitations"] = "No driving at night"; // Властивість з пробілом
car1.tuning = true;
car1["number of accidents"] = 0;


var car2 = {
    color: "blue",
    maxSpeed: 180,
    driver: {
        name: "Ваше Ім'я",
        category: "B",
        "personal limitations": null
    },
    tuning: false,
    "number of accidents": 2
};


car1.drive = function() {
    console.log("I am not driving at night");
};
console.log("Car 1 drive:");
car1.drive();


car2.drive = function() {
    console.log("I can drive anytime");
};
console.log("Car 2 drive:");
car2.drive();


function Truck(color, weight, avgSpeed, brand, model) {
    this.color = color;
    this.weight = weight;
    this.avgSpeed = avgSpeed;
    this.brand = brand;
    this.model = model;

    
    this.trip = function() {
        if (!this.driver) {
            console.log("No driver assigned");
        } else {
            var msg = "Driver " + this.driver.name;
            msg += this.driver.nightDriving ? " drives at night" : " does not drive at night";
            msg += " and has " + this.driver.experience + " years of experience";
            console.log(msg);
        }
    };
}


Truck.prototype.AssignDriver = function(name, nightDriving, experience) {
    this.driver = {
        name: name,
        nightDriving: nightDriving,
        experience: experience
    };
};


console.log("\n--- Truck Demo ---");
var truck1 = new Truck("white", 5000, 90.5, "Volvo", "FH16");
var truck2 = new Truck("black", 6000, 85.0, "MAN", "TGX");

// Призначення водіїв
truck1.AssignDriver("Ivan Petrenko", true, 10);
truck2.AssignDriver("Oleg Sydorenko", false, 5);

// Виклик trip
console.log("Truck 1 trip:");
truck1.trip();
console.log("Truck 2 trip:");
truck2.trip();

console.log("\n--- Частина 2: ES6 Classes (1.2.11 - 1.2.24) ---");


const toRad = (deg) => deg * (Math.PI / 180);


class Square {
    constructor(a) {
        this.a = a;
    }

    static help() {
        console.log("Square: геометрична фігура, у якої всі сторони рівні та всі кути прямі.");
    }

    length() {
        console.log(`Perimeter: ${4 * this.a}`);
    }

    square() {
        console.log(`Area: ${this.a * this.a}`);
    }

    info() {
        console.log(`\n--- Info for ${this.constructor.name} ---`);
        console.log(`Sides: ${this.a}, ${this.a}, ${this.a}, ${this.a}`);
        console.log(`Angles: 90°, 90°, 90°, 90°`);
        this.length();
        this.square();
    }
}


class Rectangle extends Square {
    constructor(a, b) {
        super(a);
        this.b = b;
    }

    
    static help() {
        console.log("Rectangle: чотирикутник, у якого всі кути прямі, а протилежні сторони рівні.");
    }

    length() {
        console.log(`Perimeter: ${2 * (this.a + this.b)}`);
    }

    square() {
        console.log(`Area: ${this.a * this.b}`);
    }

    info() {
        console.log(`\n--- Info for ${this.constructor.name} ---`);
        console.log(`Sides: ${this.a}, ${this.b}, ${this.a}, ${this.b}`);
        console.log(`Angles: 90°, 90°, 90°, 90°`);
        this.length();
        this.square();
    }
}


class Rhombus extends Square {
    constructor(a, alpha, beta) {
        super(a);
        this.alpha = alpha; // тупий кут
        this.beta = beta;   // гострий кут
    }

    
    static help() {
        console.log("Rhombus: паралелограм з рівними сторонами.");
    }

    length() {
        console.log(`Perimeter: ${4 * this.a}`);
    }

    square() {
        // Площа ромба = a^2 * sin(beta)
        console.log(`Area: ${(this.a * this.a * Math.sin(toRad(this.beta))).toFixed(2)}`);
    }

    info() {
        console.log(`\n--- Info for ${this.constructor.name} ---`);
        console.log(`Sides: ${this.a}, ${this.a}, ${this.a}, ${this.a}`);
        console.log(`Angles: ${this.beta}°, ${this.alpha}°, ${this.beta}°, ${this.alpha}°`);
        this.length();
        this.square();
    }
    
    
    get sideA() { return this.a; }
    set sideA(val) { this.a = val; }
    get angleAlpha() { return this.alpha; }
    set angleAlpha(val) { this.alpha = val; }
    get angleBeta() { return this.beta; }
    set angleBeta(val) { this.beta = val; }
}


class Parallelogram extends Rectangle {
    constructor(a, b, alpha, beta) {
        super(a, b);
        this.alpha = alpha; // тупий кут
        this.beta = beta;   // гострий кут
    }

    
    static help() {
        console.log("Parallelogram: чотирикутник з попарно паралельними сторонами.");
    }

    length() {
        console.log(`Perimeter: ${2 * (this.a + this.b)}`);
    }

    square() {
        // Площа = a * b * sin(beta)
        console.log(`Area: ${(this.a * this.b * Math.sin(toRad(this.beta))).toFixed(2)}`);
    }

    info() {
        console.log(`\n--- Info for ${this.constructor.name} ---`);
        console.log(`Sides: ${this.a}, ${this.b}, ${this.a}, ${this.b}`);
        console.log(`Angles: ${this.beta}°, ${this.alpha}°, ${this.beta}°, ${this.alpha}°`);
        this.length();
        this.square();
    }
}


console.log("\n--- Static Help Calls ---");
Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();


const sq = new Square(10);
const rect = new Rectangle(5, 10);
const rhomb = new Rhombus(10, 120, 60);
const para = new Parallelogram(10, 20, 150, 30);

sq.info();
rect.info();
rhomb.info();
para.info();

console.log("\n--- Частина 3: Functions & Closures (1.2.25 - 1.2.31) ---");


function Triangular(a = 3, b = 4, c = 5) {
    return { a, b, c };
}

console.log("Triangles:");
console.log(Triangular()); // За замовчуванням
console.log(Triangular(6, 8, 10));
console.log(Triangular(5, 12, 13));

function PiMultiplier(number) {
    return function() {
        return Math.PI * number;
    };
}

console.log("\nPi Multipliers:");
const mulBy2 = PiMultiplier(2);
const mulBy3div2 = PiMultiplier(3/2);
const divBy2 = PiMultiplier(0.5); // ділення на 2 = множення на 0.5

console.log("Pi * 2 =", mulBy2());
console.log("Pi * 3/2 =", mulBy3div2());
console.log("Pi / 2 =", divBy2());

function Painter(color) {
    return function(obj) {
        if (obj && obj.type) {
            console.log(`Color: ${color}, Type: ${obj.type}`);
        } else {
            console.log("No ‘type’ property occurred!");
        }
    };
}

const PaintBlue = Painter("Blue");
const PaintRed = Painter("Red");
const PaintYellow = Painter("Yellow");


const obj1 = { maxSpeed: 280, type: "Sportcar", color: "magenta" };
const obj2 = { type: "Truck", "avg speed": 90, "load capacity": 2400 };
const obj3 = { maxSpeed: 180, color: "purple", isCar: true };

console.log("\nPainter Demo:");
console.log("--- Object 1 ---");
PaintBlue(obj1);
PaintRed(obj1);
PaintYellow(obj1);

console.log("--- Object 2 ---");
PaintBlue(obj2);
PaintRed(obj2);
PaintYellow(obj2);

console.log("--- Object 3 ---");
PaintBlue(obj3); 
PaintRed(obj3);
PaintYellow(obj3);

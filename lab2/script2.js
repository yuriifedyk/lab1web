const people = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];

for (const person of people) {
    const firstLetter = person[0].toLowerCase();
    if (firstLetter === "j") {
        goodBye(person);
    } else {
        hello(person);
    }
}

console.log("Обчислюємо середнє ASCII-кодів літер.\n");
console.log("Якщо середнє < 60 — (hello), інакше —  (goodBye).\n");

function asciiValues(name) {
    return [...name].map(ch => ch.charCodeAt(0));
}

function mean(arr) {
    return arr.reduce((sum, val) => sum + val, 0) / arr.length;
}

function variance(arr) {
    const m = mean(arr);
    return arr.reduce((sum, val) => sum + (val - m) ** 2, 0) / arr.length;
}

for (const name of names) {
    const values = asciiValues(name);
    const avg = mean(values).toFixed(2);
    const varVal = variance(values).toFixed(2);

    console.log(`${name}: середнє = ${avg}, дисперсія = ${varVal}`);

    if (varVal < 60) {
        hello(`${name}  ✅`);
    } else {
        goodBye(`${name} ⚡`);
    }
}

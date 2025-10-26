const people = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];

for (const person of people) {
    const firstLetter = person[0].toLowerCase();
    if (firstLetter === "j") {
        goodBye(person);
    } else {
        hello(person);
    }
}

console.log("\nОбчислюємо середнє ASCII-кодів літер.\n");
console.log("Якщо середнє < 90 — (hello), інакше — (goodBye).\n");

function asciiAverage(name) {
    const total = [...name].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
    return total / name.length;
}

for (const name of people) {
    const avg = asciiAverage(name).toFixed(2);
    console.log(`${name}: середнє ASCII = ${avg}`);

    if (avg < 90) {
        hello(`${name} ✅`);
    } else {
        goodBye(`${name} ⚡`);
    }
}

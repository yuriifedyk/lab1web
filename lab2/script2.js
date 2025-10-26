const people = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];

// Greet or say goodbye depending on first letter
for (const person of people) {
    const firstLetter = person[0].toLowerCase();
    if (firstLetter === "j") {
        goodBye(person);
    } else {
        hello(person);
    }
}

// Function to turn a string into binary representation (7-bit per char)
function toBinary(text) {
    return [...text]
        .map(char => char.charCodeAt(0).toString(2).padStart(7, "0"))
        .join(" ");
}

// Analyze binary representation of each name
for (const person of people) {
    const binaryForm = toBinary(person);
    const countOnes = binaryForm.split("").filter(bit => bit === "1").length;

    console.log(`${person} in binary: ${binaryForm}`);
    console.log(`Number of ones in ${person}: ${countOnes}`);

    if (countOnes % 2 === 0) {
        hello(person);
    } else {
        goodBye(person);
    }
}

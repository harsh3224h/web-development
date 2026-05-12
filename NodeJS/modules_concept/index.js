const fs = require("node:fs");
console.log(fs);

const story = `Elara watched the stars from her cockpit, millions of miles from Earth. Suddenly, her console beeped—a rhythmic signal from the void. It wasn't noise; it was music. Breathless, she realized humanity wasn't alone. As the glowing nebula swallowed her ship, Elara finally knew what it felt like to be home`;

// ----- file & data creation/deletion
// fs.unlinkSync("copy.txt");
// const content = fs.readFileSync("notes.txt", "utf-8");
// fs.writeFileSync("space-story.txt", story, "utf-8");

// ----- directory creation/deletion
// fs.mkdirSync("Stories/space", { recursive: true });
// fs.rmdirSync("Stories");

fs.mkdirSync("Stories/space", { recursive: true });
fs.writeFileSync("Stories/space/view-by-Elara.txt", story, "utf-8");

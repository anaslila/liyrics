const textarea = document.getElementById("lyricsPad");
const rhymesBox = document.getElementById("rhymesBox");
const fileList = document.getElementById("fileList");
const darkToggle = document.getElementById("darkToggle");

let files = JSON.parse(localStorage.getItem("lyricsFiles") || "{}");

function updateFileList() {
  fileList.innerHTML = "";
  Object.keys(files).forEach(name => {
    let div = document.createElement("div");
    div.innerHTML = `<strong>${name}</strong>`;
    div.onclick = () => textarea.value = files[name];
    fileList.appendChild(div);
  });
}

function newFile() {
  textarea.value = "";
}

function saveFile() {
  const name = prompt("Enter file name:");
  if (name) {
    files[name] = textarea.value;
    localStorage.setItem("lyricsFiles", JSON.stringify(files));
    updateFileList();
  }
}

function openFile() {
  const name = prompt("Enter file name to open:");
  if (files[name]) textarea.value = files[name];
  else alert("File not found!");
}

function deleteFile() {
  const name = prompt("Enter file name to delete:");
  if (files[name]) {
    delete files[name];
    localStorage.setItem("lyricsFiles", JSON.stringify(files));
    updateFileList();
  } else alert("File not found!");
}

function shareLyrics() {
  const blob = new Blob([textarea.value], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  prompt("Copy this link to share:", url);
}

function getLastWord(text) {
  const words = text.trim().split(/\s+/);
  return words[words.length - 1];
}

textarea.addEventListener("input", () => {
  const word = getLastWord(textarea.value);
  if (/[a-zA-Z]{2,}/.test(word)) {
    rhymesBox.innerText = "Rhymes: " + getEnglishRhymes(word).join(", ");
  } else {
    rhymesBox.innerText = "";
  }
});

function getEnglishRhymes(word) {
  const dummy = {
    "day": ["play", "stay", "way"],
    "light": ["fight", "night", "sight"],
    "love": ["dove", "above", "shove"]
  };
  return dummy[word.toLowerCase()] || ["No rhymes found"];
}

// Dark Mode Toggle
darkToggle.onclick = () => {
  document.body.classList.toggle("dark");
};

updateFileList();
async function suggestRhyme() {
  const lang = document.getElementById('lang-select').value;
  const line = document.getElementById('input-line').value.trim();
  if (!line) return alert('Please enter a lyric line.');

  // Here you would call your actual AI rhyme API.
  // Below is a mocked function. Replace with real API call to e.g., Writecream/Toolzoon/Generatelyrics.

  const suggestions = await fetchRhymeSuggestions(line, lang);
  displayResults(suggestions);
}

// Mocked AI response — you would integrate with a true API
async function fetchRhymeSuggestions(line, lang) {
  // Replace this with AJAX/fetch to your backend or 3rd-party API
  const responses = {
    english: ["Time to shine, make you mine", "Tonight’s the sign, cross that line", "Feel so fine, stars align"],
    hindi: ["Dil ki baat, ghum ke saath", "Sapnon ka raasta, milta hai vaasta", "Aasman chhoo jaa, dosti nibhaa"],
    urdu: ["Ishq ka samaa, rangin fiza", "Dil hai jawaan, armaan anjaan", "Raat ki chaah, dil ki raah"]
  };
  // In real use, connect to AI here
  return responses[lang] || responses['english'];
}

function displayResults(arr) {
  const results = document.getElementById('results');
  results.innerHTML = '';
  arr.forEach(s => {
    const li = document.createElement('li');
    li.textContent = s;
    results.appendChild(li);
  });
}
const fontMappings = {
  'Arial': "'Arial', sans-serif",
  'Verdana': "'Verdana', sans-serif", 
  'Times New Roman': "'Times New Roman', serif",
  'Georgia': "'Georgia', serif",
  'Courier New': "'Courier New', monospace",
  'Montserrat': "'Montserrat', sans-serif",
  'Inter': "'Inter', sans-serif",
  'Roboto': "'Roboto', sans-serif",
  'Open Sans': "'Open Sans', sans-serif",
  'Lato': "'Lato', sans-serif",
  'Poppins': "'Poppins', sans-serif",
  'Source Sans Pro': "'Source Sans Pro', sans-serif",
  'Nunito': "'Nunito', sans-serif"
};

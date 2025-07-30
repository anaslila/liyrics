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

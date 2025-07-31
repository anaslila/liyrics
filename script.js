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

function donateAmount(amount) {
  // Multiple UPI app support for better compatibility
  const upiApps = [
    {
      name: 'Google Pay',
      link: `tez://upi/pay?pa=lilaanas6-3@okicici&pn=Anas%20Lila&tn=LiLyrics%20Support%20Donation&am=${amount}.00&cu=INR`
    },
    {
      name: 'PhonePe',
      link: `phonepe://pay?pa=lilaanas6-3@okicici&pn=Anas%20Lila&tn=LiLyrics%20Support%20Donation&am=${amount}.00&cu=INR`
    },
    {
      name: 'Paytm',
      link: `paytmmp://pay?pa=lilaanas6-3@okicici&pn=Anas%20Lila&tn=LiLyrics%20Support%20Donation&am=${amount}.00&cu=INR`
    },
    {
      name: 'Generic UPI',
      link: `upi://pay?pa=lilaanas6-3@okicici&pn=Anas%20Lila&tn=LiLyrics%20Support%20Donation&am=${amount}.00&cu=INR`
    }
  ];
  
  // Try each UPI app
  let appOpened = false;
  
  upiApps.forEach((app, index) => {
    setTimeout(() => {
      if (!appOpened) {
        try {
          window.open(app.link, '_blank');
          appOpened = true;
        } catch (error) {
          console.log(`Failed to open ${app.name}:`, error);
        }
      }
    }, index * 100);
  });
  
  // Fallback: Show manual payment details
  setTimeout(() => {
    if (!appOpened) {
      showManualPaymentDetails(amount);
    }
  }, 1000);
  
  alert(`❤️ Opening UPI apps for ₹${amount} donation to support LiLyrics!\n\nIf apps don't open automatically, please use:\nUPI ID: lilaanas6-3@okicici\nAmount: ₹${amount}\nNote: LiLyrics Support`);
}

function showManualPaymentDetails(amount) {
  const detailsHTML = `
    <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 9999; display: flex; align-items: center; justify-content: center;">
      <div style="background: white; padding: 30px; border-radius: 15px; max-width: 400px; text-align: center;">
        <h3 style="color: #4285f4; margin-bottom: 20px;">💝 Manual Payment Details</h3>
        <div style="background: #f0f8ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
          <strong>UPI ID:</strong> lilaanas6-3@okicici<br>
          <strong>Amount:</strong> ₹${amount}<br>
          <strong>Note:</strong> LiLyrics Support Donation<br>
          <strong>Name:</strong> Anas Lila
        </div>
        <p style="font-size: 14px; color: #666;">Copy the UPI ID and use any UPI app to send the donation. Thank you for supporting LiLyrics! ❤️</p>
        <button onclick="this.parentElement.parentElement.remove()" style="background: #4285f4; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin-top: 10px;">
          Close
        </button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', detailsHTML);
}

function donateCustomAmount() {
  const amount = document.getElementById('customAmount').value;
  if (!amount || amount <= 0) {
    alert('Please enter a valid donation amount (minimum ₹10).');
    return;
  }
  if (amount < 10) {
    alert('Minimum donation amount is ₹10.');
    return;
  }
  donateAmount(amount);
}


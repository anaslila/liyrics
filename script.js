const select = document.getElementById('project-select');
const textarea = document.getElementById('lyrics');
const status = document.querySelector('.status');
const newBtn = document.getElementById('new-project');
const suggestBtn = document.getElementById('suggest-rhymes');
const darkBtn = document.getElementById('dark-toggle');

let projects = JSON.parse(localStorage.getItem('lyricProjects')) || {};
let current = Object.keys(projects)[0] || 'Default';
if (!projects[current]) projects[current] = '';

function save() {
  localStorage.setItem('lyricProjects', JSON.stringify(projects));
}
function load(name) {
  current = name;
  textarea.value = projects[name] || '';
  select.value = name;
}
function updateProjects() {
  select.innerHTML = '';
  Object.keys(projects).forEach(p => {
    const o = document.createElement('option');
    o.value = p; o.textContent = p;
    select.append(o);
  });
}
newBtn.onclick = () => {
  const name = prompt('New project name:');
  if (!name) return;
  projects[name] = '';
  updateProjects(); load(name); save();
};
select.onchange = () => {
  projects[current] = textarea.value;
  load(select.value); save();
};
textarea.oninput = () => {
  projects[current] = textarea.value; save();
  status.textContent = 'Saving...';
  setTimeout(() => status.textContent = 'Auto saved', 500);
};
suggestBtn.onclick = () => {
  const lastWord = textarea.value.trim().split(/\s+/).pop();
  if (!lastWord) return;
  alert(`Paste this into ChatGPT:\n\nGive me 5 Roman Urdu rhymes for '${lastWord}'`);
};
darkBtn.onclick = () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
};
if (localStorage.getItem('darkMode') === 'true') document.body.classList.add('dark');

updateProjects(); load(current);

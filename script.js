let projects = JSON.parse(localStorage.getItem("lyricProjects")) || {};
let currentProject = Object.keys(projects)[0] || "Untitled";
if (!projects[currentProject]) projects[currentProject] = "";

function saveProjects() {
  localStorage.setItem("lyricProjects", JSON.stringify(projects));
}
function loadProject(name) {
  currentProject = name;
  document.getElementById("lyricPad").value = projects[name] || "";
  document.getElementById("projectSelector").value = name;
}
function newProject() {
  const name = prompt("New project name:");
  if (!name || projects[name]) return;
  projects[name] = "";
  updateProjectSelector();
  loadProject(name);
  saveProjects();
}
function renameProject() {
  const newName = prompt("Rename project to:");
  if (!newName || projects[newName]) return;
  projects[newName] = projects[currentProject];
  delete projects[currentProject];
  updateProjectSelector();
  loadProject(newName);
  saveProjects();
}
function deleteProject() {
  if (!confirm(`Delete project "${currentProject}"?`)) return;
  delete projects[currentProject];
  const remaining = Object.keys(projects);
  currentProject = remaining[0] || "Untitled";
  if (!projects[currentProject]) projects[currentProject] = "";
  updateProjectSelector();
  loadProject(currentProject);
  saveProjects();
}
function updateProjectSelector() {
  const sel = document.getElementById("projectSelector");
  sel.innerHTML = "";
  Object.keys(projects).forEach(name => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    sel.appendChild(opt);
  });
  sel.onchange = () => {
    projects[currentProject] = document.getElementById("lyricPad").value;
    loadProject(sel.value);
    saveProjects();
  };
}
document.getElementById("lyricPad").oninput = () => {
  projects[currentProject] = document.getElementById("lyricPad").value;
  saveProjects();
};
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("lyricPadDarkMode", document.body.classList.contains("dark"));
}
if (localStorage.getItem("lyricPadDarkMode") === "true") {
  document.body.classList.add("dark");
}
function suggestUrduRhymes() {
  const text = document.getElementById("lyricPad").value.trim();
  const lastWord = text.split(/\s+/).pop().toLowerCase();
  if (!lastWord) return;
  const msg = `✍️ Copy this and paste it in ChatGPT:\n\n"Give me 5 Roman Urdu rhymes for '${lastWord}'"`;
  document.getElementById("urduRhymes").textContent = msg;
}
updateProjectSelector();
loadProject(currentProject);

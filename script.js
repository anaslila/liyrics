let projects = JSON.parse(localStorage.getItem("lyricProjects")) || {};
let currentProject = Object.keys(projects)[0] || "Untitled";

function saveProjects() {
  localStorage.setItem("lyricProjects", JSON.stringify(projects));
}

function loadProject(name) {
  currentProject = name;
  document.getElementById("lyricPad").value = projects[name] || "";
  document.getElementById("projectSelector").value = name;
}

function newProject() {
  const name = prompt("Enter a new project name:");
  if (!name) return;
  projects[name] = "";
  updateProjectSelector();
  loadProject(name);
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

updateProjectSelector();
loadProject(currentProject);

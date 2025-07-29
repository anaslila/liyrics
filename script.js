const textarea = document.getElementById('lyrics');
const status = document.querySelector('.status');
const projectSelect = document.getElementById('project-select');
const newProjectBtn = document.getElementById('new-project');

// Auto-save to local storage
textarea.addEventListener('input', () => {
  const currentProject = projectSelect.value;
  localStorage.setItem(`lyrics_${currentProject}`, textarea.value);
  status.textContent = 'Saving...';
  setTimeout(() => status.textContent = 'Auto saved', 300);
});

// Load saved project
projectSelect.addEventListener('change', () => {
  const val = localStorage.getItem(`lyrics_${projectSelect.value}`);
  textarea.value = val || '';
  status.textContent = 'Project loaded';
  setTimeout(() => status.textContent = 'Auto saved', 1000);
});

// Create new project
newProjectBtn.addEventListener('click', () => {
  const name = prompt("Enter new project name:");
  if (!name) return;
  const option = document.createElement('option');
  option.value = name;
  option.textContent = name;
  projectSelect.appendChild(option);
  projectSelect.value = name;
  textarea.value = '';
  localStorage.setItem(`lyrics_${name}`, '');
  status.textContent = 'New project created';
});

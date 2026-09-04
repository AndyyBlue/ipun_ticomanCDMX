const anio = new Date().getFullYear();
document.getElementById("anio").textContent = anio;

const buttons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.content-section');
const mobileQuery = window.matchMedia('(max-width: 768px)');

function isMobileMode() {
  return mobileQuery.matches;
}

const text = '¡DIOS TE BENDIGA!';
const speed = 100;
let i = 0;
const writerText = document.getElementById('writer-text');
const writerDiv = document.querySelector('.writer');

function writer() {
  if (writerText && i < text.length) {
    writerText.innerHTML += text.charAt(i);
    i++;
    setTimeout(writer, speed);
  }
}

function showSection(targetId) {
  sections.forEach((section) => {
    section.classList.toggle('active', section.id === targetId);
  });

  buttons.forEach((button) => {
    button.classList.toggle('active', button.dataset.target === targetId);
  });

  if (writerDiv) {
    if (targetId === 'inicio') {
      writerDiv.style.display = 'block';
      writerText.innerHTML = ''; 
      i = 0;
      writer(); 
    } else {
      writerDiv.style.display = 'none';
    }
  }
  history.replaceState(null, '', '#' + targetId);
}

function scrollToSection(targetId) {
  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;
  targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  history.replaceState(null, '', '#' + targetId);
  buttons.forEach((button) => {
    button.classList.toggle('active', button.dataset.target === targetId);
  });

   if (writerDiv) {
    if (targetId === 'inicio') {
      writerDiv.style.display = 'block';
      writerText.innerHTML = '';
      i = 0;
      writer();
    } else {
      writerDiv.style.display = 'none';
    }
  }
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const targetId = button.dataset.target;
    if (isMobileMode()) {
      scrollToSection(targetId);
    } else {
      showSection(targetId);
    }
  });
});

const initialId = window.location.hash.replace('#', '') || 'inicio';
if (isMobileMode()) {
  //sections.forEach((section) => section.classList.add('active'));
  const validId = document.querySelector(`[data-target="${initialId}"]`) ? initialId : 'inicio';
  scrollToSection(validId);

  if (writerDiv && validId === 'inicio') {
    writerDiv.style.display = 'block';
    writerText.innerHTML = '';
    i = 0;
    writer(); 
  }
} else {
  showSection(document.querySelector(`[data-target="${initialId}"]`) ? initialId : 'inicio');
}

document.querySelector('.arrow').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});


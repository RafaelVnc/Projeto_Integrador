const shrink_btn = document.querySelector(".shrink-btn");
const search = document.querySelector(".search");
const sidebar_links = document.querySelectorAll(".sidebar-links a");
const active_tab = document.querySelector(".active-tab");

const tooltip_elements = document.querySelectorAll(".tooltip-element");

let activeIndex;

shrink_btn.addEventListener("click", () => {
  document.body.classList.toggle("shrink");
  setTimeout(moveActiveTab, 400);

  shrink_btn.classList.add("hovered");

  setTimeout(() => {
    shrink_btn.classList.remove("hovered");
  }, 500);
});

search.addEventListener("click", () => {
  document.body.classList.remove("shrink");
  search.lastElementChild.focus();
});

function moveActiveTab() {
  let topPosition = activeIndex * 58 + 2.5;

  active_tab.style.top = `${topPosition}px`;
}

function changeLink() {
  sidebar_links.forEach((sideLink) => sideLink.classList.remove("active"));
  this.classList.add("active");

  activeIndex = this.dataset.active;

  moveActiveTab();
}

sidebar_links.forEach((link) => link.addEventListener("click", changeLink));

function showTooltip() {
  let tooltip = this.parentNode.lastElementChild;
  let spans = tooltip.children;
  let tooltipIndex = this.dataset.tooltip;

  Array.from(spans).forEach((sp) => sp.classList.remove("show"));
  spans[tooltipIndex].classList.add("show");

  tooltip.style.top = `${(100 / (spans.length * 2)) * (tooltipIndex * 2 + 1)}%`;
}

tooltip_elements.forEach((elem) => {
  elem.addEventListener("mouseover", showTooltip);
});

const mainContent = document.getElementById('main-content');
const buttons = document.querySelectorAll('.sidebar-links a');

const loadContent = (page) => {
  fetch(`./pages/${page}.html`)
    .then(response => response.text())
    .then(data => {
      mainContent.innerHTML = data;
      loadPageScript(page); 
    })
    .catch(error => console.error('Erro ao carregar a página:', error));
};

const loadPageScript = (page) => {

  const existingScript = document.querySelector(`script[src="./assets/js/${page}.js"]`);
  if (!existingScript) {
    removeOldScripts();
    const script = document.createElement('script');
    script.src = `./assets/js/${page}.js`;
    document.body.appendChild(script);
  }
};

const removeOldScripts = () => {
  const oldScripts = document.querySelectorAll('script[src*="./assets/js/"]');
  oldScripts.forEach(script => script.remove());
};

buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    const page = this.getAttribute('data-page');
    loadContent(page);
  });
});

loadContent('inicio'); 
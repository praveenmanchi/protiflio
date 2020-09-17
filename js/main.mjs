// Vars
const cloudinary = 'https://res.cloudinary.com/saurabhdaware/image/upload';
const placeholder = 'https://res.cloudinary.com/saurabhdaware/image/upload/c_scale,q_100,w_360/v1573760342/saurabhdaware.in/projects/placeholder.webp';

const isInstagram = navigator.userAgent.toLowerCase().includes('instagram');

let projectsData = Array.from(document.querySelectorAll('.project-item'))
	.map(project => ({
		...project.dataset,
		tags: project.dataset.tags.split(',')
	}));
console.log(projectsData);

// Helpers
const isMobile = (() => {
	if( navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/Windows Phone/i)
  ){
		return true;
  }
  else {
		return false;
  }
})();

// Main Logic

function showProjects(e) {
	document.querySelectorAll('.projects-container > .project-item')
		.forEach(project => project.style.display = 'inline-block');
	e.target.style.display = 'none';
}

function setProjects(projects=projectsData) {
  const projectContainer = document.querySelector('.projects-container');
  const projectImageParams = isMobile?'/c_scale,q_100,w_300':'/c_scale,q_100,w_360';

	projectContainer.innerHTML = projects.map((project, index)  => /* html */`
		<div 
			class="project-item" 
			data-link="${project.link}"
			data-name="${project.name}"
			data-description="${project.description}"
			data-tags="${project.tags}"
			data-image="${project.image}"
			data-index="${index}"
		>
			<a href="${project.link}">
				<h2>${project.name} <small>${project.tags[0]}</small></h2>
				<div class="project-image-container">
					<div class="overlay"></div>
					<img loading="lazy" alt="Cover image of ${project.name}" id="projectimage-${index}" src="${cloudinary + projectImageParams + project.image}">
					<div class="project-link">${project.link} ↗</div>
					<div class="project-description">${project.description}</div>
				</div>
			</a>
		</div>
	`).join('')
}



function loadGalaxy() {
  const starfieldEl = document.querySelector('#starfield');
  const shootingStarEl = document.querySelector('#shooting-star');

  starfieldEl.style.width ='100%';
  starfieldEl.style.height='100%';
  starfieldEl.width = starfieldEl.offsetWidth;
  starfieldEl.height = starfieldEl.offsetHeight;

  shootingStarEl.style.width = '100%';
  shootingStarEl.style.height = '100%';
  shootingStarEl.width = shootingStarEl.offsetWidth;
  shootingStarEl.height = shootingStarEl.offsetHeight;
  try{
    if(isInstagram){
      throw "load on same thread";
    }
    const starfield = starfieldEl.transferControlToOffscreen();
    const shootingStar = shootingStarEl.transferControlToOffscreen();
    const starfieldWorker = new Worker('js/starfield.worker.js');
  
    starfieldWorker.postMessage({ starfield, shootingStar }, [starfield, shootingStar]);
  }catch(err){
    // Load on same thread
    const canvasScript = document.createElement('script');
    canvasScript.src = 'js/starfield.worker.js';
    document.body.appendChild(canvasScript);
    canvasScript.onload = () => declareContext(starfieldEl, shootingStarEl);
  }
}

function search(event, isFiltering=false) {
  if(!isMobile || event.type !== 'input' || isFiltering) {
    const viewProjectsButton = document.querySelector('#show-project-button');
    const searchText = document.querySelector('.project-search-input').value;
    
    const newProjects = projectsData.filter(project => {
      if(!project.name) return false;
      const tagsLower = project.tags.join('-').toLowerCase();
      return project.name.toLowerCase()
        .includes(searchText.toLowerCase()) 
      || tagsLower
        .includes(searchText.toLowerCase());
    });
  
    setProjects([...newProjects],true);
    viewProjectsButton.style.display = (newProjects.length > 3)?'inline-block':'none';

    if(newProjects.length == 0){
      document.querySelector('.projects-container').innerHTML = '<span style="font-size:14pt;">No project found that matches your query :( </span>';
    }
    return;
  }
}



// Loading hacks

function renderBuyMeCoffeeButton() {
  document.querySelector('#bmc-container').innerHTML = `<style>.bmc-button img{width: 35px !important;margin-bottom: 1px !important;box-shadow: none !important;border: none !important;vertical-align: middle !important;}.bmc-button{padding: 7px 5px 7px 10px !important;line-height: 35px !important;height:51px !important;min-width:217px !important;text-decoration: none !important;display:inline-flex !important;color:#ffffff !important;background-color:#5F7FFF !important;border-radius: 5px !important;border: 1px solid transparent !important;padding: 7px 5px 7px 10px !important;font-size: 28px !important;letter-spacing:0.6px !important;box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5) !important;-webkit-box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.5) !important;margin: 0 auto !important;font-family:'Cookie', cursive !important;-webkit-box-sizing: border-box !important;box-sizing: border-box !important;-o-transition: 0.3s all linear !important;-webkit-transition: 0.3s all linear !important;-moz-transition: 0.3s all linear !important;-ms-transition: 0.3s all linear !important;transition: 0.3s all linear !important;}.bmc-button:hover, .bmc-button:active, .bmc-button:focus {-webkit-box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.5) !important;text-decoration: none !important;box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.5) !important;opacity: 0.85 !important;color:#ffffff !important;}</style><link href="https://fonts.googleapis.com/css?family=Cookie" rel="stylesheet"><a class="bmc-button" target="_blank" rel="noopener" href="https://www.buymeacoffee.com/saurabhdaware"><img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Buy me a coffee"><span style="margin-left:15px;font-size:28px !important;">Buy me a coffee</span></a>`;
}

window.onload = function() {
  const isSafari = (navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome"));

  if(isSafari) {
		document.querySelectorAll('.projects-container > .project-item')
			.forEach(projectImage => {
				const newImage = projectImage.querySelector('img').src.replace('.webp', '.png');
				projectImage.querySelector('img').src = newImage;
				projectImage.setAttribute('data-image', newImage);
			});
  }

	renderBuyMeCoffeeButton();
	loadGalaxy();
}



function openFilterMenu() {
  document.querySelector('.filter-selector').classList.remove('hide');
  document.querySelector('.nav-overlay').classList.add('show');
}

function closeFilterMenu() {
  document.querySelector('.filter-selector').classList.add('hide');
  document.querySelector('.nav-overlay').classList.remove('show');
}

document.querySelector('#currentYear').innerHTML = new Date().getFullYear();


// Event Listeners
document.querySelector('.project-search-input').addEventListener('input', search);
document.querySelector('.project-search-input').addEventListener('search', search);
document.querySelector('#search-button').addEventListener('click', search);

if(isMobile) {
  document.querySelector('#filter-button').addEventListener('click', e => {
    if(document.querySelector('.filter-selector').classList.contains('hide')){
      openFilterMenu();
    }else{
      closeFilterMenu();
    }
  });
}

// Accessibility hackz
function handleFirstTab(e) {
  if (e.keyCode === 9) { // the "I am a keyboard user" key
    document.body.classList.add('user-is-tabbing');
    window.removeEventListener('keydown', handleFirstTab);
  }
}

document.querySelectorAll('.filter-selector > button')
  .forEach(option => option.addEventListener('click', () => {
    document.querySelector('.project-search-input').value = option.dataset.value;
    closeFilterMenu();
    search({}, true);
  }))

document.querySelectorAll('.nav-item')
  .forEach(navLink => navLink.addEventListener('click', () => document.querySelector('.nav').classList.remove('open')));

document.querySelector('.nav-overlay').addEventListener('click', () => {
  document.querySelector('.nav').classList.remove('open');
  document.querySelector('.nav-overlay').classList.remove('show');
  closeFilterMenu();
});

document.querySelector('#show-project-button').addEventListener('click', showProjects);

document.querySelector('.project-search input').addEventListener('focus', () => {
  document.querySelector('.typer').classList.add('typing');
});

document.querySelector('.project-search input').addEventListener('focusout', () => {
  document.querySelector('.typer').classList.remove('typing');
});


window.addEventListener('keydown', handleFirstTab);
console.log("%cHi, Good to see you here🚀", 'font-weight:bold;font-size:14pt;');
console.log("Are you here to hack my website? please dont :c");
console.log("Well there's nothing to hack tbh.. the website is totally static and does not have any database");
console.log("If you want to see any of my other open source code please checkout my github: https://github.com/saurabhdaware")

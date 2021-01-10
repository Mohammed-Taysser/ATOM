/* global $*/


let randomImage = true,
	bgInterval;

// ---------------- localStorage theme check
let main_color = localStorage.getItem('color-theme');
if (main_color !== null) {
	document.documentElement.style.setProperty('--main-color', main_color);
	document
		.querySelectorAll('.setting-menu .setting-container .color-choice li')
		.forEach((temp) => {
			temp.classList.remove('active');
			if (temp.dataset.color == main_color) {
				temp.classList.add('active');
			}
		});
}

// ---------------- localStorage random bg check
let randomImageChoice = localStorage.getItem('bg-option');
if (randomImageChoice !== null) {
	if (randomImageChoice == 'true') {
		randomImage = true;
	} else {
		randomImage = false;
	}
	document
		.querySelectorAll('.setting-menu .setting-container .background-choice .choice button')
		.forEach((temp) => {
			temp.classList.remove('active');
		});
	if (randomImageChoice == 'true') {
		document
			.querySelector(
				'.setting-menu .setting-container .background-choice .choice button[data-bg="yes"]'
			)
			.classList.add('active');
	} else {
		document
			.querySelector(
				'.setting-menu .setting-container .background-choice .choice button[data-bg="no"]'
			)
			.classList.add('active');
	}
}

// ---------------- localStorage bolts check
let bolts_choice = localStorage.getItem('bolts-option');
if (bolts_choice !== null) {
	document
		.querySelectorAll(
			'.setting-menu .setting-container .bolts-choice .choice button'
		)
		.forEach((temp) => {
			temp.classList.remove('active');
		});
	if (bolts_choice == 'true') {
		document.querySelector('.nav-bolts').style.display = 'block';
		document
			.querySelector(
				'.setting-menu .setting-container .bolts-choice .choice button[data-blt="yes"]'
			)
			.classList.add('active');
	} else {
		document.querySelector('.nav-bolts').style.display = 'none';
		document
			.querySelector(
				'.setting-menu .setting-container .bolts-choice .choice button[data-blt="no"]'
			)
			.classList.add('active');
	}
}

// ---------------- toggle menu
document.querySelector('.setting-menu .icon').onclick = function () {
	document.querySelector('.setting-menu').classList.toggle('open');
	document.querySelector('.setting-menu .icon em').classList.toggle('active');
};

// ---------------- color setting

document
	.querySelectorAll('.setting-menu .setting-container .color-choice li')
	.forEach((li) => {
		li.onclick = function () {
			document.documentElement.style.setProperty(
				'--main-color',
				this.dataset.color
			);
			localStorage.setItem('color-theme', this.dataset.color);
			handelActive(this);
		};
	});

// ---------------- handel active
function handelActive(ev) {
	ev.parentElement.querySelectorAll('.active').forEach((temp) => {
		temp.classList.remove('active');
	});
	ev.classList.add('active');
}
// ---------------- random header bg image
function runRandomImage() {
	if (randomImage) {
		bgInterval = setInterval(function () {
			document.querySelector('header').style.backgroundImage =
				'url("sources/header-bg/bg-' +
				Math.floor(Math.random() * 5 + 1) +
				'.jpg")';
		}, 5000);
	}
}

runRandomImage();

// ---------------- background setting

document
	.querySelectorAll(
		'.setting-menu .setting-container .background-choice .choice button'
	)
	.forEach((span) => {
		span.onclick = function () {
			handelActive(this);

			if (this.dataset.bg == 'yes') {
				randomImage = true;
				runRandomImage();
				localStorage.setItem('bg-option', 'true');
			} else {
				randomImage = false;
				clearInterval(bgInterval);
				localStorage.setItem('bg-option', 'false');
			}
		};
	});

// ---------------- bolts setting

document
	.querySelectorAll('.setting-menu .setting-container .bolts-choice .choice button')
	.forEach((span) => {
		span.onclick = function () {
			handelActive(this);

			if (this.dataset.blt == 'yes') {
				document.querySelector('.nav-bolts').style.display = 'block';
				localStorage.setItem('bolts-option', 'true');
			} else {
				document.querySelector('.nav-bolts').style.display = 'none';
				localStorage.setItem('bolts-option', 'false');
			}
		};
	});

// ---------------- reset button
let randomCode = '';
let charChain = '0123456789abcdefghijklmnopqrstuvxwzABCDEFGHIJKLMNOPQRSTUVXWZ';
for (let i = 0; i < 10; i++) {
	randomCode += charChain.charAt(Math.floor(Math.random() * charChain.length));
}


document.querySelector('.setting-menu .setting-container .reset-choice .write-input label span.code').textContent = randomCode;
document.querySelector(
	'.setting-menu .setting-container .reset-choice button'
).onclick = function () {
	let invalidFeedback = document.querySelector('.setting-menu .setting-container .reset-choice .write-input .invalid-feedback'), input_text = document.querySelector('.setting-menu .setting-container .reset-choice .write-input input[type="text"]');
	if (input_text.value.length == 0) {
		invalidFeedback.textContent = 'This field can\'t be Empty !';
		if (input_text.classList.contains('is-valid')) {
			input_text.classList.remove('is-valid');
		}
		if (!input_text.classList.contains('is-invalid')) {
			input_text.classList.add('is-invalid');
		}
	}
	else {
		if (!input_text.classList.contains('is-valid')) {
			input_text.classList.add('is-valid');
		}
		if (input_text.classList.contains('is-invalid')) {
			input_text.classList.remove('is-invalid');
		}

		if (input_text.value != randomCode) {
			invalidFeedback.textContent = 'Please provide the same code!';
			if (!input_text.classList.contains('is-invalid')) {
				input_text.classList.add('is-invalid');
			}
			if (input_text.classList.contains('is-valid')) {
				input_text.classList.remove('is-valid');
			}
		}
		else {
			localStorage.setItem('bg-option', 'false');
			localStorage.setItem('bolts-option', 'false');
			localStorage.removeItem('color-theme');

			//	remove all localStorage elements
			// localStorage.clear();

			setTimeout(() => {
				window.location.reload();
			}, 2000);
		}
	}
};

// ---------------- our skills

let our_skill = document.querySelector('.our-skill');
window.onscroll = function () {
	if (window.innerWidth > 766) {
		if (
			this.pageYOffset >
			our_skill.offsetTop + our_skill.offsetHeight - this.innerHeight - 150
		) {
			document
				.querySelectorAll('.our-skill .skills-box .skill .progress p')
				.forEach((skill) => {
					skill.style.width = skill.dataset.progress + '%';
					skill.children[0].textContent = skill.style.width;
				});
		}
	}
	else {
		if (
			this.pageYOffset >
			our_skill.offsetTop + our_skill.offsetHeight - this.innerHeight - 370
		) {
			document
				.querySelectorAll('.our-skill .skills-box .skill .progress p')
				.forEach((skill) => {
					skill.style.width = skill.dataset.progress + '%';
					skill.children[0].textContent = skill.style.width;
				});
		}
	}
};

// ---------------- our glary

document.querySelectorAll('.img-glary .glary img').forEach((img) => {
	img.onclick = function () {
		let new_overlay = document.createElement('div');
		new_overlay.className = 'popup-overlay';
		// new_overlay.classList.add('close-button');

		let popup_box = document.createElement('div');
		let popup_img = document.createElement('img');

		popup_box.className = 'popup-box';
		popup_img.src = img.src;
		popup_box.appendChild(popup_img);

		document.body.append(new_overlay);
		document.body.append(popup_box);
		document.body.classList.add('modal-open');

		if (img.alt != null) {
			let alternative = document.createElement('h3');
			alternative.className = 'img-alt';
			let img_text = document.createTextNode(img.alt);
			alternative.appendChild(img_text);
			popup_box.appendChild(alternative);
		}

		let close_button = document.createElement('span');
		let close_button_text = document.createTextNode('X');
		close_button.appendChild(close_button_text);
		close_button.className = 'close-button';
		popup_box.appendChild(close_button);
	};
});

document.addEventListener('click', function (e) {
	if (e.target.classList.contains('close-button')) {
		e.target.parentNode.remove();
		document.querySelector('.popup-overlay').remove();
		document.body.classList.remove('modal-open');
	}
});

document.addEventListener('click', function (e) {
	if (e.target.classList.contains('popup-overlay')) {
		e.target.remove();
		document.body.classList.remove('modal-open');
		document.querySelector('.popup-box').remove();
	}
});

// ---------------- nav-bolts

function scrollToElement(element) {
	element.forEach((elm) => {
		elm.onclick = function () {
			document.querySelector(elm.dataset.section).scrollIntoView({
				behavior: 'smooth',
			});
		};
	});
}

scrollToElement(document.querySelectorAll('.nav-bolts ul li'));
scrollToElement(document.querySelectorAll('header .nav-bar ul li'));

// ------------- toggle menu

let toggleButton = document.querySelector(
	'header .nav-bar .links-container .toggle-menu'
);
let toggleMenu = document.querySelector('header .nav-bar ul.links');

toggleButton.onclick = function (e) {
	e.stopPropagation();
	this.classList.toggle('active');
	toggleMenu.classList.toggle('open');
};
toggleMenu.onclick = function (e) {
	e.stopPropagation();
};

document.addEventListener('click', (e) => {
	if (e.target != toggleMenu && e.target != toggleButton) {
		if (toggleMenu.classList.contains('open')) {
			toggleButton.classList.toggle('active');
			toggleMenu.classList.toggle('open');
		}
	}
});


//------------ date
let currentDate = new Date();
document.getElementById('current-year').textContent = currentDate.getFullYear();







//------------------ plugin
$('.setting-menu .setting-container').niceScroll('.warp');
$('body').niceScroll();
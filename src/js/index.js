/* global $*/

/**
 * @todo onclick check if it content the class or not (reduce performance)
 * @todo add image source to option
 * @todo add glary image source to option
 */
// (function () {

// default setting use incase if no saved options on localStorage
var options = {
	// color that use to apply on total website
	'colors': ['#007bff', '#ff884b', '#ff577f', '#a685e2', '#c24914', '#20c997', '#9cf400'],

	// the default color that apply on website on first visit
	'default_color': '#007bff',

	// apply header random image or not
	'active_random_image': 'true',

	// shoe nav bolts (on right) or not
	'show_bolts': 'true',

	// global interval used for header background image
	'random_image_interval': 0,

	// names of localStorage 
	color_localeStorage: 'color_option',
	bolts_localeStorage: 'options.bolts_localeStorage',
	background_localeStorage: 'options.background_localeStorage',
};



// get localStorage value if found else use default setting
options.default_color = localStorage.getItem(options.color_localeStorage) || options.default_color;
options.active_random_image = localStorage.getItem(options.background_localeStorage) || options.active_random_image;
options.show_bolts = localStorage.getItem(options.bolts_localeStorage) || options.show_bolts;


// declare used html elements
let color_theme_choices_container = document.querySelector('#color_theme_choices');
let yes_background_btn = document.querySelector('#yes_random_background'), no_background_btn = document.querySelector('#no_random_background');
let nav_bolts = document.querySelector('.nav-bolts'), yes_bolts_btn =
	document.querySelector('#yes_show_bolts'), no_bolts_btn = document.querySelector('#no_show_bolts');

// ------------------ 
// | navbar setting |
// ------------------
// toggle menu on click
toggle_menu('#toggle-menu', 'header .nav-bar ul.links');
// scroll to clicked item link
scrollToElement('header .nav-bar ul li');

// -----------------------
// |---- setting menu ---|
// ----------------------
// toggle menu on click
toggle_menu('.setting-menu .icon', '.setting-menu');

// ------------------ 
// | color settings |
// ------------------ 

// ------ create color items and append it to ul as children
options.colors.forEach(element => {
	let new_li = document.createElement('li');
	new_li.style.backgroundColor = new_li.dataset.color = element;
	color_theme_choices_container.append(new_li);

	// add event click to created elements
	new_li.onclick = function () {
		let current_color = this.dataset.color;

		// apply new change to css as main color
		document.documentElement.style.setProperty('--main-color', current_color);

		// save new change to localStorage
		localStorage.setItem(options.color_localeStorage, current_color);

		// apply new change to option on default color
		options.default_color = current_color;

		// add active class to new chosen color and remove it from old noe
		active_new_color_theme();
	};
});

// ------ add all created elements to variable after created
let color_theme_choices = document.querySelectorAll('#color_theme_choices li');

// ------ set main-color value on css from options.default_color
document.documentElement.style.setProperty('--main-color', options.default_color);


// ------ add active class to selected or default color theme value 
active_new_color_theme();


// ------------------------------------- 
// | random background images settings |
// ------------------ ------------------

// run random background image
options.random_image_interval = create_bg_interval();
toggle_yes_or_no(yes_background_btn, no_background_btn, 'active_random_image');

// addEventListener for button to active random images change
// save the new choice to localStorage
// log message if on or off
[yes_background_btn, no_background_btn].forEach((btn) => {
	btn.onclick = function () {
		if (this.dataset.bg == 'yes' && options.active_random_image == 'false') {
			options.active_random_image = 'true';
			options.random_image_interval = create_bg_interval();
			localStorage.setItem(options.background_localeStorage, 'true');
			console.log('random images is on');
		} else if (this.dataset.bg == 'no' && options.active_random_image == 'true') {
			options.active_random_image = 'false';
			clearInterval(options.random_image_interval);
			localStorage.setItem(options.background_localeStorage, 'false');
			console.log('random images is off');
		}
		toggle_yes_or_no(yes_background_btn, no_background_btn, 'active_random_image');
	};
});


// ------------------ 
// |  bolts settings |
// ------------------ 
// nav-bolts scroll on click
scrollToElement('.nav-bolts ul li');

toggle_yes_or_no(yes_bolts_btn, no_bolts_btn, 'show_bolts');
toggle_bolts_show();

// addEventListener for button to active show_bolts change
// save the new choice to localStorage
// log message if on or off
[no_bolts_btn, yes_bolts_btn].forEach((btn) => {
	btn.onclick = function () {
		if (this.dataset.blt == 'yes' && options.show_bolts == 'false') {
			localStorage.setItem(options.bolts_localeStorage, 'true');
			options.show_bolts = 'true';
			console.log('bolts is appear');
		} else if (this.dataset.blt == 'no' && options.show_bolts == 'true') {
			localStorage.setItem(options.bolts_localeStorage, 'false');
			options.show_bolts = 'false';
			console.log('bolts is disappear');
		}
		toggle_bolts_show();
		toggle_yes_or_no(yes_bolts_btn, no_bolts_btn, 'show_bolts');
	};
});


// ------------------ 
// | reset defaults |
// ------------------ 
// generate random code 
let generated_random_code = generate_random_code(10);
// add code to DOM 
document.querySelector('#reset_random_code').textContent = generated_random_code;
// check user input
let user_input_text = document.querySelector('#valid-input-1');
let reset_btn = document.querySelector('#reset_random_btn');
// check if user input is not empty and equal to generated code
let check_reset = user_input_text.value.length != 0 && user_input_text.value == generated_random_code;

reset_btn.onclick = function () {

	if (check_reset && confirm('are you sure to reset defaults')) {
		remove_localStorage_setting();

		user_input_text.value = '';

		// reload page after 1 second
		setTimeout(() => {
			window.location.reload();
		}, 1000);
	}
};

user_input_text.oninput = function () {
	check_reset = user_input_text.value.length != 0 && user_input_text.value == generated_random_code;
	if (check_reset) {
		reset_btn.classList.remove('disabled');
	} else {
		reset_btn.classList.add('disabled');
	}
};

// ----------------------- 
// | our skills animation |
// ----------------------- 
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

// ----------------------- 
// |  our glary animation |
// ----------------------- 
document.querySelectorAll('.img-glary .glary img').forEach((img) => {
	img.onclick = function () {
		// create popup_box
		let new_overlay = document.createElement('div');
		new_overlay.className = 'popup-overlay';

		let popup_box = document.createElement('div');
		let popup_img = document.createElement('img');

		popup_box.className = 'popup-box';
		popup_img.src = img.src;
		popup_box.appendChild(popup_img);

		// crete overlay and append it to body
		document.body.append(new_overlay);
		document.body.append(popup_box);
		document.body.classList.add('modal-open');

		// add alt text if exist
		if (img.alt != null) {
			let alternative = document.createElement('h3');
			alternative.className = 'img-alt';
			let img_text = document.createTextNode(img.alt);
			alternative.appendChild(img_text);
			popup_box.appendChild(alternative);
		}

		// create close button
		let close_button = document.createElement('span');
		let close_button_text = document.createTextNode('x');
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


//------------ footer date updated
document.getElementById('current-year').textContent = new Date().getFullYear();

// niceScroll plugins
// $('.setting-menu .setting-container').niceScroll('.warp');
// $('body').niceScroll();


/**
 * function use to add class active to default color theme
 * get the value from options
 * no param needed
 * @returns {void}	no return
 */
function active_new_color_theme() {
	// remove active from all elements
	Array.from(color_theme_choices).map(elem => elem.classList.remove('active'));

	// add active to new chosen element
	color_theme_choices.forEach((choice) => {
		if (choice.dataset.color == options.default_color) {
			choice.classList.add('active');
		}
	});
}

/**
 * function use to toggle menu open & close
 * @param {string} button the button selector use to get the button from dom to trigger the function
 * @param {string} menu   the menu   selector use to get the button from dom to trigger the function
 * @returns {void}	no return
 */
function toggle_menu(button, menu) {

	let real_button = document.querySelector(button), real_menu = document.querySelector(menu);

	real_button.onclick = function (event) {
		event.stopPropagation();
		this.classList.toggle('active');
		real_menu.classList.toggle('open');
	};

	real_menu.onclick = function (event) {
		event.stopPropagation();
	};

	document.addEventListener('click', (event) => {
		if (event.target != real_menu && event.target != real_button) {
			if (real_menu.classList.contains('open')) {
				real_button.classList.toggle('active');
				real_menu.classList.remove('open');
			}
		}
	});

}

/**
 * function use to apply scrollIntoView into children of the given selector
 * @param {Array} selector iterable selector like array or document.querySelectorAll use to get all children of the selector
 * @returns {void}	no return
 */
function scrollToElement(selector) {
	document.querySelectorAll(selector).forEach((elm) => {
		elm.onclick = function () {
			document.querySelector(elm.dataset.section).scrollIntoView({
				behavior: 'smooth',
			});
		};
	});
}

/**
 * function use create interval for change header background image every 5 second
 * no param needed
 * @returns {intervalID} return intervalID of created interval 
 */
function create_bg_interval() {
	if (options.active_random_image == 'true') {
		return setInterval(function () {
			document.querySelector('header').style.backgroundImage =
				'url("images/header-bg/bg-' +
				Math.floor(Math.random() * 5 + 1) +
				'.jpg")';
		}, 5000);
	}
}

/**
 * function use to toggle class active for yes or no button  
 * @param {Element} yes_btn the yes button
 * @param {Element} no_btn the no button
 * @param {String} option localStorage name item
 * @returns {Void} no return 
 */
function toggle_yes_or_no(yes_btn, no_btn, option) {
	if (options[option] == 'true') {
		yes_btn.classList.add('active');
		no_btn.classList.remove('active');
	} else {
		yes_btn.classList.remove('active');
		no_btn.classList.add('active');
	}
}

/**
 * function use to change css display depend on option
 * no param
 * @returns {Void} no return
 */
function toggle_bolts_show() {
	if (options.show_bolts == 'true') {
		nav_bolts.style.display = 'block';
	} else {
		nav_bolts.style.display = 'none';
	}
}

/**
 * function use to generate random code from small letter, numbers and capital letter of length the given number
 * @param {Int} length the length of generated code
 * @returns {String}	generated code 
 */
function generate_random_code(number) {
	let temp = '', charChain = '0123456789abcdefghijklmnopqrstuvxwzABCDEFGHIJKLMNOPQRSTUVXWZ';
	for (let i = 0; i < number; i++) {
		temp += charChain.charAt(Math.floor(Math.random() * charChain.length));
	}
	return temp;
}

/**
 * function use to remove localStorage setting and back it to default one
 * no param needed
 * @returns {void}	no return
 */
function remove_localStorage_setting() {
	localStorage.setItem(options.background_localeStorage, 'true');
	localStorage.setItem(options.bolts_localeStorage, 'true');
	localStorage.removeItem(options.color_localeStorage);
	//	remove all localStorage elements
	// localStorage.clear();
}

// })();


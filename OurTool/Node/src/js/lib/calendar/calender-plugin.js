"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
var controlWidth=0;//赋值插件的宽度(全局)

var flatpickr = function flatpickr(selector, config, width) {
    if (width!= undefined) {
controlWidth = width;
        
    }
  
	var elements = void 0;

	var createInstance = function createInstance(element) {
		if (element._flatpickr) {
			element._flatpickr.destroy();
		}

		element._flatpickr = new flatpickr.init(element, config);
		return element._flatpickr;
	};

	if (selector.nodeName) {
		return createInstance(selector);
	}
	/*
 Utilize the performance of native getters if applicable
 https://jsperf.com/getelementsbyclassname-vs-queryselectorall/18
 https://jsperf.com/jquery-vs-javascript-performance-comparison/22
 */
	else if (/^#[a-zA-Z0-9\-_]*$/.test(selector)) {
			return createInstance(document.getElementById(selector.slice(1)));
		} else if (/^\.[a-zA-Z0-9\-_]*$/.test(selector)) {
			elements = document.getElementsByClassName(selector.slice(1));
		} else {
			elements = document.querySelectorAll(selector);
		}

	var instances = [];

	for (var i = 0; i < elements.length; i++) {
		instances.push(createInstance(elements[i]));
	}

	if (instances.length === 1) {
		return instances[0];
	}

	return {
		calendars: instances,
		byID: function byID(id) {
			return document.getElementById(id)._flatpickr;
		}
	};
};

/**
 * @constructor
 */
flatpickr.init = function (element, instanceConfig) {
    
   
	function createElement(tag, className, content) {
		var newElement = document.createElement(tag);

		if (content) {
		    newElement.textContent = content;
          
          }
	    

	    //制定下宽度
		if (className) {
		    newElement.className = className;
		    if (className=="flatpickr-calendar"&&controlWidth!=0) {
		        $(newElement).css("width", controlWidth);
		    }
		}

		return newElement;
	}

	var debounce = function debounce(func, wait, immediate) {
		var timeout = void 0;
		return function () {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			var context = this;

			var later = function later() {
				timeout = null;
				if (!immediate) {
					func.apply(context, args);
				}
			};

			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (immediate && !timeout) {
				func.apply(context, args);
			}
		};
	};

	// functions
	var self = this;
	var parseConfig = void 0,
	    init = void 0,
	    wrap = void 0,
	    uDate = void 0,
	    equalDates = void 0,
	    pad = void 0,
	    monthToStr = void 0,
	    isEnabled = void 0,
	    buildMonthNavigation = void 0,
	    buildWeekdays = void 0,
	    buildCalendar = void 0,
	    buildDays = void 0,
	    buildWeeks = void 0,
	    buildTime = void 0,
	    timeWrapper = void 0,
	    yearScroll = void 0,
	    updateValue = void 0,
	    amPMToggle = void 0,
	    onKeyDown = void 0,
	    onResize = void 0,
	    updateNavigationCurrentMonth = void 0,
	    handleYearChange = void 0,
	    changeMonth = void 0,
	    getDaysinMonth = void 0,
	    documentClick = void 0,
	    selectDate = void 0,
	    getRandomCalendarIdStr = void 0,
	    bind = void 0,
	    triggerChange = void 0;

	// elements & variables
	var calendarContainer = void 0,
	    weekdayContainer = void 0,
	    timeContainer = void 0,
	    navigationCurrentMonth = void 0,
	    monthsNav = void 0,
	    prevMonthNav = void 0,
	    currentYearElement = void 0,
	    currentMonthElement = void 0,
	    nextMonthNav = void 0,
	    calendar = void 0,
	    weekNumbers = void 0,
	    now = new Date(),
	    wrapperElement = void 0,
	    clickEvt = void 0;

	self.formats = {
		// weekday name, short, e.g. Thu
		D: function D() {
			return self.l10n.weekdays.shorthand[self.formats.w()];
		},

		// full month name e.g. January
		F: function F() {
			return monthToStr(self.formats.n() - 1, false);
		},

		// hours with leading zero e.g. 03
		H: function H() {
			return pad(self.selectedDateObj.getHours());
		},

		// day (1-30) with ordinal suffix e.g. 1st, 2nd
		J: function J() {
			return self.formats.j() + self.l10n.ordinal(self.formats.j());
		},

		// AM/PM
		K: function K() {
			return self.selectedDateObj.getHours() > 11 ? "PM" : "AM";
		},

		// shorthand month e.g. Jan, Sep, Oct, etc
		M: function M() {
			return monthToStr(self.formats.n() - 1, true);
		},

		// seconds 00-59
		S: function S() {
			return pad(self.selectedDateObj.getSeconds());
		},

		// unix timestamp
		U: function U() {
			return self.selectedDateObj.getTime() / 1000;
		},

		// full year e.g. 2016
		Y: function Y() {
			return self.selectedDateObj.getFullYear();
		},

		// day in month, padded (01-30)
		d: function d() {
			return pad(self.formats.j());
		},

		// hour from 1-12 (am/pm)
		h: function h() {
			return self.selectedDateObj.getHours() % 12 ? self.selectedDateObj.getHours() % 12 : 12;
		},

		// minutes, padded with leading zero e.g. 09
		i: function i() {
			return pad(self.selectedDateObj.getMinutes());
		},

		// day in month (1-30)
		j: function j() {
			return self.selectedDateObj.getDate();
		},

		// weekday name, full, e.g. Thursday
		l: function l() {
			return self.l10n.weekdays.longhand[self.formats.w()];
		},

		// padded month number (01-12)
		m: function m() {
			return pad(self.formats.n());
		},

		// the month number (1-12)
		n: function n() {
			return self.selectedDateObj.getMonth() + 1;
		},

		// seconds 0-59
		s: function s() {
			return self.selectedDateObj.getSeconds();
		},

		// number of the day of the week
		w: function w() {
			return self.selectedDateObj.getDay();
		},

		// last two digits of year e.g. 16 for 2016
		y: function y() {
			return String(self.formats.Y()).substring(2);
		}
	};

	self.defaultConfig = {
		/* if true, dates will be parsed, formatted, and displayed in UTC.
  preloading date strings w/ timezones is recommended but not necessary */
		utc: false,

		// wrap: see https://chmln.github.io/flatpickr/#strap
		wrap: false,

		// enables week numbers
		weekNumbers: false,

		allowInput: false,

		/*
  	clicking on input opens the date(time)picker.
  	disable if you wish to open the calendar manually with .open()
  */
		clickOpens: true,

		// display time picker in 24 hour mode
		time_24hr: false,

		// enables the time picker functionality
		enableTime: false,

		// noCalendar: true will hide the calendar. use for a time picker along w/ enableTime
		noCalendar: false,

		// more date format chars at https://chmln.github.io/flatpickr/#dateformat
		dateFormat: "Y-m-d",

		// altInput - see https://chmln.github.io/flatpickr/#altinput
		altInput: false,

		// the created altInput element will have this class.
		altInputClass: "",

		// same as dateFormat, but for altInput
		altFormat: "F j, Y", // defaults to e.g. June 10, 2016

		// defaultDate - either a datestring or a date object. used for datetimepicker"s initial value
		defaultDate: null,

		// the minimum date that user can pick (inclusive)
		minDate: null,

		// the maximum date that user can pick (inclusive)
		maxDate: null,

		// dateparser that transforms a given string to a date object
		parseDate: null,

		// see https://chmln.github.io/flatpickr/#disable
		enable: [],

		// see https://chmln.github.io/flatpickr/#disable
		disable: [],

		// display the short version of month names - e.g. Sep instead of September
		shorthandCurrentMonth: false,

		// displays calendar inline. see https://chmln.github.io/flatpickr/#inline-calendar
		inline: false,

		// position calendar inside wrapper and next to the input element
		// leave at false unless you know what you"re doing
		static: false,

		// code for previous/next icons. this is where you put your custom icon code e.g. fontawesome
		prevArrow: "&lt;",
		nextArrow: "&gt;",

		// enables seconds in the time picker
		enableSeconds: false,

		// step size used when scrolling/incrementing the hour element
		hourIncrement: 1,

		// step size used when scrolling/incrementing the minute element
		minuteIncrement: 5,

		// onChange callback when user selects a date or time
		onChange: null, // function (dateObj, dateStr) {}

		// called every time calendar is opened
		onOpen: null, // function (dateObj, dateStr) {}

		// called every time calendar is closed
		onClose: null, // function (dateObj, dateStr) {}

		onValueUpdate: function() {
		    self.close();//更改完值之后关闭
		},
     
	};

	init = function init() {
		instanceConfig = instanceConfig || {};

		self.element = element;

		parseConfig();

		self.input = self.config.wrap ? element.querySelector("[data-input]") : element;
		self.input.classList.add("flatpickr-input");

		if (self.config.defaultDate) {
			self.config.defaultDate = uDate(self.config.defaultDate);
		}

		if (self.input.value || self.config.defaultDate) {
			self.selectedDateObj = uDate(self.config.defaultDate || self.input.value);
		}

		wrap();
		buildCalendar();
		bind();

		self.uDate = uDate;
		self.jumpToDate();
		updateValue();
	};

	parseConfig = function parseConfig() {
		self.config = {};

		Object.keys(self.defaultConfig).forEach(function (key) {
			if (instanceConfig.hasOwnProperty(key)) {
				self.config[key] = instanceConfig[key];
			} else if (self.element.dataset && self.element.dataset.hasOwnProperty(key.toLowerCase())) {
				self.config[key] = self.element.dataset[key.toLowerCase()];
			} else if (!self.element.dataset && self.element.hasAttribute("data-" + key)) {
				self.config[key] = self.element.getAttribute("data-" + key);
			} else {
				self.config[key] = flatpickr.init.prototype.defaultConfig[key] || self.defaultConfig[key];
			}

			if (typeof self.defaultConfig[key] === "boolean") {
				self.config[key] = self.config[key] === true || self.config[key] === "" || self.config[key] === "true";
			}

			if (key === "enableTime" && self.config[key]) {
				self.defaultConfig.dateFormat = !self.config.time_24hr ? "Y-m-d h:i K" : "Y-m-d H:i";
				self.defaultConfig.altFormat = !self.config.time_24hr ? "F j Y, h:i K" : "F j, Y H:i";
			} else if (key === "noCalendar" && self.config[key]) {
				self.defaultConfig.dateFormat = "h:i K";
				self.defaultConfig.altFormat = "h:i K";
			}
		});
	};

	getRandomCalendarIdStr = function getRandomCalendarIdStr() {
		var randNum = void 0,
		    idStr = void 0;
		do {
			randNum = Math.round(Math.random() * Math.pow(10, 10));
			idStr = "flatpickr-" + randNum;
		} while (document.getElementById(idStr) !== null);

		return idStr;
	};

	uDate = function uDate(date, timeless) {
		timeless = timeless || false;

		if (date === "today") {
			date = new Date();
			timeless = true;
		} else if (typeof date === "string") {
			date = date.trim();

			if (self.config.parseDate) {
				date = self.config.parseDate(date);
			} else if (/^\d\d\d\d\-\d{1,2}\-\d\d$/.test(date)) {
				// this utc datestring gets parsed, but incorrectly by Date.parse
				date = new Date(date.replace(/(\d)-(\d)/g, "$1/$2"));
			} else if (Date.parse(date)) {
				date = new Date(date);
			} else if (/^\d\d\d\d\-\d\d\-\d\d/.test(date)) {
				// disable special utc datestring
				date = new Date(date.replace(/(\d)-(\d)/g, "$1/$2"));
			} else if (/^(\d?\d):(\d\d)/.test(date)) {
				// time-only picker
				var matches = date.match(/^(\d?\d):(\d\d)(:(\d\d))?/),
				    seconds = matches[4] !== undefined ? matches[4] : 0;

				date = new Date();
				date.setHours(matches[1], matches[2], seconds, 0);
			} else {
				console.error("flatpickr: invalid date string " + date);
				console.info(self.element);
			}
		}

		if (!(date instanceof Date) || !date.getTime()) {
			return null;
		}

		if (self.config.utc && !date.fp_isUTC) {
			date = date.fp_toUTC();
		}

		if (timeless) {
			date.setHours(0, 0, 0, 0);
		}

		return date;
	};

	equalDates = function equalDates(date1, date2) {
		return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
	};

	wrap = function wrap() {
		wrapperElement = createElement("div", "flatpickr-wrapper");

		if (self.config.inline || self.config.static) {
			// Wrap input and place calendar underneath
			self.element.parentNode.insertBefore(wrapperElement, self.element);
			wrapperElement.appendChild(self.element);

			wrapperElement.classList.add(self.config.inline ? "inline" : "static");
		} else {
			// Insert at bottom of BODY tag to display outside
			// of relative positioned elements with css "overflow: hidden;"
			// property set.
			document.body.appendChild(wrapperElement);
		}

		if (self.config.altInput) {
			// replicate self.element
			self.altInput = createElement(self.input.nodeName, self.config.altInputClass + " flatpickr-input");
			self.altInput.placeholder = self.input.placeholder;
			self.altInput.type = "text";

			self.input.type = "hidden";
			self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
		}
	};

	getDaysinMonth = function getDaysinMonth() {
		var month = arguments.length <= 0 || arguments[0] === undefined ? self.currentMonth : arguments[0];

		var yr = self.currentYear;

		if (month === 1 && (yr % 4 === 0 && yr % 100 !== 0 || yr % 400 === 0)) {
			return 29;
		}

		return self.l10n.daysInMonth[month];
	};

	updateValue = function updateValue(e) {
		if (self.config.noCalendar && !self.selectedDateObj) {
			// picking time only and method triggered from picker
			self.selectedDateObj = new Date();
		} else if (!self.selectedDateObj) {
			return;
		}

		if (e) {
			e.target.blur();
		}

		var timeHasChanged = void 0;

		if (self.config.enableTime) {
			var previousTimestamp = self.selectedDateObj.getTime();

			// update time
			var hours = parseInt(self.hourElement.value, 10) || 0,
			    seconds = void 0;

			var minutes = (60 + (parseInt(self.minuteElement.value, 10) || 0)) % 60;

			if (self.config.enableSeconds) {
				seconds = (60 + parseInt(self.secondElement.value, 10) || 0) % 60;
			}

			if (!self.config.time_24hr) {
				// the real number of hours for the date object
				hours = hours % 12 + 12 * (self.amPM.innerHTML === "PM");
			}

			self.selectedDateObj.setHours(hours, minutes, seconds === undefined ? self.selectedDateObj.getSeconds() : seconds);

			self.hourElement.value = pad(!self.config.time_24hr ? (12 + hours) % 12 + 12 * (hours % 12 === 0) : hours);
			self.minuteElement.value = pad(minutes);

			if (seconds !== undefined) {
				self.secondElement.value = pad(seconds);
			}

			timeHasChanged = self.selectedDateObj.getTime() !== previousTimestamp;
		}

		self.input.value = self.formatDate(self.config.dateFormat);

		if (self.altInput) {
			self.altInput.value = self.formatDate(self.config.altFormat);
		}

		if (e && (timeHasChanged || e.target.classList.contains("flatpickr-day"))) {
			triggerChange();
		}

		if (self.config.onValueUpdate) {
		    self.close();//更改完值之后关闭
			self.config.onValueUpdate(self.selectedDateObj, self.input.value);
		}
	};

	pad = function pad(num) {
		return ("0" + num).slice(-2);
	};

	self.formatDate = function (dateFormat) {
		var formattedDate = "";
		var formatPieces = dateFormat.split("");

		for (var i = 0; i < formatPieces.length; i++) {
			var c = formatPieces[i];
			if (self.formats.hasOwnProperty(c) && formatPieces[i - 1] !== "\\") {
				formattedDate += self.formats[c]();
			} else if (c !== "\\") {
				formattedDate += c;
			}
		}

		return formattedDate;
	};

	monthToStr = function monthToStr(date, shorthand) {
		if (shorthand || self.config.shorthandCurrentMonth) {
			return self.l10n.months.shorthand[date];
		}

		return self.l10n.months.longhand[date];
	};

	isEnabled = function isEnabled(dateToCheck) {
		if (self.config.minDate && dateToCheck < self.config.minDate || self.config.maxDate && dateToCheck > self.config.maxDate) {
			return false;
		}

		dateToCheck = uDate(dateToCheck, true); // timeless

		var bool = self.config.enable.length > 0,
		    array = bool ? self.config.enable : self.config.disable;

		var d = void 0;

		for (var i = 0; i < array.length; i++) {
			d = array[i];

			if (d instanceof Function && d(dateToCheck)) {
				// disabled by function
				return bool;
			} else if ( // disabled weekday
			typeof d === "string" && /^wkd/.test(d) && dateToCheck.getDay() === (parseInt(d.slice(-1), 10) + self.l10n.firstDayOfWeek - 1) % 7) {
				return bool;
			} else if ((d instanceof Date || typeof d === "string" && !/^wkd/.test(d)) && uDate(d, true).getTime() === dateToCheck.getTime()) {
				// disabled by date string
				return bool;
			} else if ( // disabled by range
			(typeof d === "undefined" ? "undefined" : _typeof(d)) === "object" && d.hasOwnProperty("from") && dateToCheck >= uDate(d.from) && dateToCheck <= uDate(d.to)) {
				return bool;
			}
		}

		return !bool;
	};

	yearScroll = function yearScroll(event) {
		event.preventDefault();

		var delta = Math.max(-1, Math.min(1, event.wheelDelta || -event.deltaY));
		self.currentYear = event.target.value = parseInt(event.target.value, 10) + delta;
		self.redraw();
	};

	timeWrapper = function timeWrapper(e) {
		e.preventDefault();

		var min = parseInt(e.target.min, 10),
		    max = parseInt(e.target.max, 10),
		    step = parseInt(e.target.step, 10),
		    value = parseInt(e.target.value, 10);

		var newValue = value;

		if (e.type === "wheel") {
			newValue = value + step * Math.max(-1, Math.min(1, e.wheelDelta || -e.deltaY));
		}

		if (newValue <= min) {
			newValue = max - step;
		} else if (newValue >= max) {
			newValue = min + step;
		}

		e.target.value = pad(newValue);
	};

	updateNavigationCurrentMonth = function updateNavigationCurrentMonth() {
		currentMonthElement.textContent = monthToStr(self.currentMonth) + " ";
		currentYearElement.value = self.currentYear;
	};

	handleYearChange = function handleYearChange() {
		if (self.currentMonth < 0 || self.currentMonth > 11) {
			self.currentYear += self.currentMonth % 11;
			self.currentMonth = (self.currentMonth + 12) % 12;
		}
	};

	documentClick = function documentClick(e) {
		var isCalendarElement = wrapperElement.contains(e.target),
		    isInput = self.element.contains(e.target) || e.target === self.altInput;

		if (self.isOpen && !isCalendarElement && !isInput) {
			self.close();
		}
	};

	changeMonth = function changeMonth(offset) {
		self.currentMonth += offset;

		handleYearChange();
		updateNavigationCurrentMonth();
		buildDays();
		(self.config.noCalendar ? timeContainer : calendar).focus();
	};

	selectDate = function selectDate(e) {
		e.preventDefault();
		e.stopPropagation();

		if (self.config.allowInput && e.target === (self.altInput || self.input) && e.which === 13) {
			self.setDate((self.altInput || self.input).value);
			self.redraw();
		} else if (e.target.classList.contains("flatpickr-day")) {
			var isPrevMonthDay = e.target.classList.contains("prevMonthDay"),
			    isNextMonthDay = e.target.classList.contains("nextMonthDay"),
			    monthNum = self.currentMonth - isPrevMonthDay + isNextMonthDay;

			if (isPrevMonthDay || isNextMonthDay) {
				changeMonth(+isNextMonthDay - isPrevMonthDay);
			}

			self.selectedDateObj = new Date(self.currentYear, monthNum, e.target.innerHTML);

			updateValue(e);
			buildDays();
		}
	};

	buildCalendar = function buildCalendar() {
		calendarContainer = createElement("div", "flatpickr-calendar");
		calendarContainer.id = getRandomCalendarIdStr();

		calendar = createElement("div", "flatpickr-days");
		calendar.tabIndex = -1;

		if (!self.config.noCalendar) {
			buildMonthNavigation();
			buildWeekdays();

			if (self.config.weekNumbers) {
				buildWeeks();
			}

			buildDays();

			calendarContainer.appendChild(calendar);
		}

		wrapperElement.appendChild(calendarContainer);

		if (self.config.enableTime) {
			buildTime();
		}
	};

	buildMonthNavigation = function buildMonthNavigation() {
		monthsNav = createElement("div", "flatpickr-month");

		prevMonthNav = createElement("span", "flatpickr-prev-month");
		prevMonthNav.innerHTML = self.config.prevArrow;

		currentMonthElement = createElement("span", "cur_month");

		currentYearElement = createElement("input", "cur_year");
		currentYearElement.type = "number";
		currentYearElement.title = self.l10n.scrollTitle;

		nextMonthNav = createElement("span", "flatpickr-next-month");
		nextMonthNav.innerHTML = self.config.nextArrow;

		navigationCurrentMonth = createElement("span", "flatpickr-current-month");
		navigationCurrentMonth.appendChild(currentMonthElement);
		navigationCurrentMonth.appendChild(currentYearElement);

		monthsNav.appendChild(prevMonthNav);
		monthsNav.appendChild(navigationCurrentMonth);
		monthsNav.appendChild(nextMonthNav);

		calendarContainer.appendChild(monthsNav);
		updateNavigationCurrentMonth();
	};

	buildWeekdays = function buildWeekdays() {
		weekdayContainer = createElement("div", "flatpickr-weekdays");
		var firstDayOfWeek = self.l10n.firstDayOfWeek;

		var weekdays = self.l10n.weekdays.shorthand.slice();

		if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
			weekdays = [].concat(weekdays.splice(firstDayOfWeek, weekdays.length), weekdays.splice(0, firstDayOfWeek));
		}

		if (self.config.weekNumbers) {
			weekdayContainer.innerHTML = "<span>" + self.l10n.weekAbbreviation + "</span>";
		}

		weekdayContainer.innerHTML += "<span>" + weekdays.join("</span><span>") + "</span>";

		calendarContainer.appendChild(weekdayContainer);
	};

	buildWeeks = function buildWeeks() {
		calendarContainer.classList.add("hasWeeks");

		weekNumbers = createElement("div", "flatpickr-weeks");
		calendarContainer.appendChild(weekNumbers);
	};

	buildDays = function buildDays() {
		var firstOfMonth = (new Date(self.currentYear, self.currentMonth, 1).getDay() - self.l10n.firstDayOfWeek + 7) % 7,
		    daysInMonth = getDaysinMonth(),
		    prevMonthDays = getDaysinMonth((self.currentMonth - 1 + 12) % 12),
		    days = document.createDocumentFragment();

		var dayNumber = prevMonthDays + 1 - firstOfMonth,
		    currentDate = void 0,
		    dateIsDisabled = void 0;

		if (self.config.weekNumbers) {
			weekNumbers.innerHTML = "";
		}

		calendar.innerHTML = "";

		self.config.minDate = uDate(self.config.minDate, true);
		self.config.maxDate = uDate(self.config.maxDate, true);

		// prepend days from the ending of previous month
		for (; dayNumber <= prevMonthDays; dayNumber++) {
			var curDate = new Date(self.currentYear, self.currentMonth - 1, dayNumber, 0, 0, 0, 0, 0),
			    dateIsEnabled = isEnabled(curDate),
			    dayElem = createElement("span", dateIsEnabled ? "flatpickr-day prevMonthDay" : "disabled", dayNumber);

			if (dateIsEnabled) {
				dayElem.tabIndex = 0;
			}

			days.appendChild(dayElem);
		}

		// Start at 1 since there is no 0th day
		for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++) {
			currentDate = new Date(self.currentYear, self.currentMonth, dayNumber, 0, 0, 0, 0, 0);

			if (self.config.weekNumbers && dayNumber % 7 === 1) {
				weekNumbers.appendChild(createElement("span", "disabled flatpickr-day", currentDate.fp_getWeek()));
			}

			dateIsDisabled = !isEnabled(currentDate);

			var dayElement = createElement("span", dateIsDisabled ? "disabled" : "flatpickr-day", dayNumber);

			if (!dateIsDisabled) {
				dayElement.tabIndex = 0;

				if (equalDates(currentDate, now)) {
					dayElement.classList.add("today");
				}

				if (self.selectedDateObj && equalDates(currentDate, self.selectedDateObj)) {
					dayElement.classList.add("selected");
				}
			}

			days.appendChild(dayElement);
		}

		// append days from the next month
		for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth; dayNum++) {
			var _curDate = new Date(self.currentYear, self.currentMonth + 1, dayNum % daysInMonth, 0, 0, 0, 0, 0),
			    _dateIsEnabled = isEnabled(_curDate),
			    _dayElement = createElement("span", _dateIsEnabled ? "nextMonthDay flatpickr-day" : "disabled", dayNum % daysInMonth);

			if (self.config.weekNumbers && dayNum % 7 === 1) {
				weekNumbers.appendChild(createElement("span", "disabled", _curDate.fp_getWeek()));
			}

			if (_dateIsEnabled) {
				_dayElement.tabIndex = 0;
			}

			days.appendChild(_dayElement);
		}

		calendar.appendChild(days);
	};

	buildTime = function buildTime() {
		timeContainer = createElement("div", "flatpickr-time");
		timeContainer.tabIndex = -1;
		var separator = createElement("span", "flatpickr-time-separator", ":");

		self.hourElement = createElement("input", "flatpickr-hour");
		self.minuteElement = createElement("input", "flatpickr-minute");

		self.hourElement.tabIndex = self.minuteElement.tabIndex = 0;
		self.hourElement.type = self.minuteElement.type = "number";

		self.hourElement.value = self.selectedDateObj ? pad(self.selectedDateObj.getHours()) : 12;

		self.minuteElement.value = self.selectedDateObj ? pad(self.selectedDateObj.getMinutes()) : "00";

		self.hourElement.step = self.config.hourIncrement;
		self.minuteElement.step = self.config.minuteIncrement;

		self.hourElement.min = -self.config.time_24hr;
		self.hourElement.max = self.config.time_24hr ? 24 : 13;

		self.minuteElement.min = -self.minuteElement.step;
		self.minuteElement.max = 60;

		self.hourElement.title = self.minuteElement.title = self.l10n.scrollTitle;

		timeContainer.appendChild(self.hourElement);
		timeContainer.appendChild(separator);
		timeContainer.appendChild(self.minuteElement);

		if (self.config.enableSeconds) {
			timeContainer.classList.add("has-seconds");

			self.secondElement = createElement("input", "flatpickr-second");
			self.secondElement.type = "number";
			self.secondElement.value = self.selectedDateObj ? pad(self.selectedDateObj.getSeconds()) : "00";

			self.secondElement.step = self.minuteElement.step;
			self.secondElement.min = self.minuteElement.min;
			self.secondElement.max = self.minuteElement.max;

			timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
			timeContainer.appendChild(self.secondElement);
		}

		if (!self.config.time_24hr) {
			// add self.amPM if appropriate
			self.amPM = createElement("span", "flatpickr-am-pm", ["AM", "PM"][self.hourElement.value > 11 | 0]);
			self.amPM.title = self.l10n.toggleTitle;
			self.amPM.tabIndex = 0;
			timeContainer.appendChild(self.amPM);
		}

		calendarContainer.appendChild(timeContainer);
	};

	bind = function bind() {
		document.addEventListener("keydown", onKeyDown);
		window.addEventListener("resize", onResize);

		if (self.config.clickOpens) {
			(self.altInput || self.input).addEventListener("click", self.open);
			(self.altInput || self.input).addEventListener("focus", self.open);
		}

		if (self.config.wrap && self.element.querySelector("[data-open]")) {
			self.element.querySelector("[data-open]").addEventListener("click", self.open);
		}

		if (self.config.wrap && self.element.querySelector("[data-close]")) {
			self.element.querySelector("[data-close]").addEventListener("click", self.close);
		}

		if (self.config.wrap && self.element.querySelector("[data-toggle]")) {
			self.element.querySelector("[data-toggle]").addEventListener("click", self.toggle);
		}

		if (self.config.wrap && self.element.querySelector("[data-clear]")) {
			self.element.querySelector("[data-clear]").addEventListener("click", self.clear);
		}

		if (!self.config.noCalendar) {
			prevMonthNav.addEventListener("click", function () {
				changeMonth(-1);
			});

			nextMonthNav.addEventListener("click", function () {
				changeMonth(1);
			});

			currentYearElement.addEventListener("wheel", yearScroll);
			currentYearElement.addEventListener("focus", currentYearElement.select);

			currentYearElement.addEventListener("input", function (event) {
				self.currentYear = parseInt(event.target.value, 10);
				self.redraw();
			});

			calendar.addEventListener("click", selectDate);
		}

		document.addEventListener("click", documentClick);
		document.addEventListener("blur", documentClick, true);

		if (self.config.enableTime) {
			self.hourElement.addEventListener("wheel", timeWrapper);
			self.minuteElement.addEventListener("wheel", timeWrapper);

			self.hourElement.addEventListener("input", timeWrapper);
			self.minuteElement.addEventListener("input", timeWrapper);

			self.hourElement.addEventListener("mouseout", updateValue);
			self.minuteElement.addEventListener("mouseout", updateValue);

			self.hourElement.addEventListener("change", updateValue);
			self.minuteElement.addEventListener("change", updateValue);

			self.hourElement.addEventListener("focus", self.hourElement.select);
			self.minuteElement.addEventListener("focus", self.minuteElement.select);

			if (self.config.enableSeconds) {
				self.secondElement.addEventListener("wheel", timeWrapper);
				self.secondElement.addEventListener("input", timeWrapper);
				self.secondElement.addEventListener("mouseout", updateValue);
				self.secondElement.addEventListener("change", updateValue);
				self.secondElement.addEventListener("focus", self.secondElement.select);
			}

			if (!self.config.time_24hr) {
				self.amPM.addEventListener("click", amPMToggle);

				self.amPM.addEventListener("wheel", amPMToggle);
				self.amPM.addEventListener("mouseout", updateValue);

				self.amPM.addEventListener("keydown", function (e) {
					if (e.which === 38 || e.which === 40) {
						amPMToggle(e);
					}
				});
			}
		}

		if (document.createEvent) {
			clickEvt = document.createEvent("MouseEvent");
			// without all these args ms edge spergs out
			clickEvt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		} else {
			clickEvt = new MouseEvent("click", {
				view: window,
				bubbles: true,
				cancelable: true
			});
		}
	};

	self.open = function () {
		if (self.isOpen || (self.altInput || self.input).disabled || self.config.inline) {
			return;
		} else if (!self.config.static) {
			self.positionCalendar();
		}

		self.isOpen = true;

		wrapperElement.classList.add("open");

		if (!self.config.allowInput) {
			(self.altInput || self.input).blur();
			(self.config.noCalendar ? timeContainer : calendar).focus();
		}

		(self.altInput || self.input).classList.add("active");

		if (self.config.onOpen) {
			self.config.onOpen(self.selectedDateObj, self.input.value);
		}
	};

	// For calendars inserted in BODY (as opposed to inline wrapper)
	// it"s necessary to properly calculate top/left position.
	self.positionCalendar = function () {
		var calendarHeight = calendarContainer.offsetHeight,
		    input = self.altInput || self.input,
		    inputBounds = input.getBoundingClientRect(),
		    distanceFromBottom = window.innerHeight - inputBounds.bottom + input.offsetHeight;

		var top = void 0,
		    left = window.pageXOffset + inputBounds.left;

		if (distanceFromBottom < calendarHeight) {
			top = window.pageYOffset - calendarHeight + inputBounds.top - 2;
			calendarContainer.classList.remove("arrowTop");
			calendarContainer.classList.add("arrowBottom");
		} else {
			top = window.pageYOffset + input.offsetHeight + inputBounds.top + 2;
			calendarContainer.classList.remove("arrowBottom");
			calendarContainer.classList.add("arrowTop");
		}

		wrapperElement.style.top = top + "px";
		wrapperElement.style.left = left + "px";
	};

	self.toggle = function () {
		if (self.isOpen) {
			self.close();
		} else {
			self.open();
		}
	};

	self.close = function () {
		self.isOpen = false;
		wrapperElement.classList.remove("open");
		(self.altInput || self.input).classList.remove("active");

		if (self.config.onClose) {
			self.config.onClose(self.selectedDateObj, self.input.value);
		}
	};

	self.clear = function () {
		self.input.value = "";

		if (self.altInput) {
			self.altInput.value = "";
		}

		self.selectedDateObj = null;

		triggerChange();
		self.jumpToDate();
	};

	triggerChange = function triggerChange() {
		self.input.dispatchEvent(clickEvt);

		if (self.config.onChange) {
			self.config.onChange(self.selectedDateObj, self.input.value);
		}
	};

	self.destroy = function () {
		document.removeEventListener("click", documentClick, false);

		if (self.altInput) {
			self.altInput.parentNode.removeChild(self.altInput);
		}

		if (self.config.inline) {
			var parent = self.element.parentNode,
			    removedElement = parent.removeChild(self.element);

			parent.removeChild(calendarContainer);
			parent.parentNode.replaceChild(removedElement, parent);
		} else {
			document.getElementsByTagName("body")[0].removeChild(wrapperElement);
		}
	};

	self.redraw = function () {
		if (self.config.noCalendar) {
			return;
		}

		updateNavigationCurrentMonth();
		buildDays();
	};

	self.jumpToDate = function (jumpDate) {
		jumpDate = uDate(jumpDate || self.selectedDateObj || self.config.defaultDate || self.config.minDate || now);

		self.currentYear = jumpDate.getFullYear();
		self.currentMonth = jumpDate.getMonth();
		self.redraw();
	};

	self.setDate = function (date, triggerChangeEvent) {
		date = uDate(date);

		if (date instanceof Date && date.getTime()) {
			self.selectedDateObj = uDate(date);
			self.jumpToDate(self.selectedDateObj);
			updateValue();

			if (triggerChangeEvent) {
				triggerChange();
			}
		}
	};

	self.setTime = function (hour, minute, triggerChangeEvent) {
		if (!self.selectedDateObj) {
			return;
		}

		self.hourElement.value = parseInt(hour, 10) % 24;
		self.minuteElement.value = parseInt(minute || 0, 10) % 60;

		if (!self.config.time_24hr) {
			self.amPM.innerHTML = hour > 11 ? "PM" : "AM";
		}

		updateValue();

		if (triggerChangeEvent) {
			triggerChange();
		}
	};

	self.set = function (key, value) {
		if (key in self.config) {
			self.config[key] = value;
			self.jumpToDate();
		}
	};

	amPMToggle = function amPMToggle(e) {
		e.preventDefault();
		self.amPM.textContent = ["AM", "PM"][self.amPM.innerHTML === "AM" | 0];
	};

	onKeyDown = function onKeyDown(e) {
		if (!self.isOpen || self.config.enableTime && timeContainer.contains(e.target)) {
			return;
		}

		switch (e.which) {
			case 13:
				selectDate(e);
				break;

			case 27:
				self.close();
				break;

			case 37:
				changeMonth(-1);
				break;

			case 38:
				e.preventDefault();
				self.currentYear++;
				self.redraw();
				break;

			case 39:
				changeMonth(1);
				break;

			case 40:
				e.preventDefault();
				self.currentYear--;
				self.redraw();
				break;

			default:
				break;
		}
	};

	onResize = debounce(function () {
		if (self.isOpen && !self.config.inline && !self.config.static) {
			self.positionCalendar();
		}
	}, 300);

	try {
		init();
	} catch (error) {
		// skip and carry on
		console.error(error);
		console.info(self.element);
	}

	return self;
};

flatpickr.init.prototype = {

	defaultConfig: {},

	l10n: {
		weekdays: {
			shorthand: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
			longhand: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
		},
		months: {
			shorthand: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
			longhand: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
		},
		daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		firstDayOfWeek: 0,
		ordinal: function ordinal(nth) {
			var s = nth % 100;
			if (s > 3 && s < 21) return "th";
			switch (s % 10) {
				case 1:
					return "st";
				case 2:
					return "nd";
				case 3:
					return "rd";
				default:
					return "th";
			}
		},
		weekAbbreviation: "Wk",
		scrollTitle: "Scroll to increment",
		toggleTitle: "Click to toggle"
	}

};

Date.prototype.fp_incr = function (days) {
	return new Date(this.getFullYear(), this.getMonth(), this.getDate() + parseInt(days, 10));
};

Date.prototype.fp_isUTC = false;
Date.prototype.fp_toUTC = function () {
	var newDate = new Date(this.getTime() + this.getTimezoneOffset() * 60000);
	newDate.fp_isUTC = true;

	return newDate;
};

Date.prototype.fp_getWeek = function () {
	var date = new Date(this.getTime());
	date.setHours(0, 0, 0, 0);

	// Thursday in current week decides the year.
	date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
	// January 4 is always in week 1.
	var week1 = new Date(date.getFullYear(), 0, 4);
	// Adjust to Thursday in week 1 and count number of weeks from date to week1.
	return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};

// classList polyfill
if (!("classList" in document.documentElement) && Object.defineProperty && typeof HTMLElement !== "undefined") {
	Object.defineProperty(HTMLElement.prototype, "classList", {
		get: function get() {
			var selfElements = this;
			function update(fn) {
				return function (value) {
					var classes = selfElements.className.split(/\s+/);
					var index = classes.indexOf(value);

					fn(classes, index, value);
					selfElements.className = classes.join(" ");
				};
			}

			var ret = {
				add: update(function (classes, index, value) {
					return ~index || classes.push(value);
				}),
				remove: update(function (classes, index) {
					return ~index && classes.splice(index, 1);
				}),
				toggle: update(function (classes, index, value) {
					if (~index) {
						classes.splice(index, 1);
					} else {
						classes.push(value);
					}
				}),
				contains: function contains(value) {
					return !! ~selfElements.className.split(/\s+/).indexOf(value);
				}
			};

			return ret;
		}
	});
}

if (typeof module !== "undefined") {
	module.exports = flatpickr;
}
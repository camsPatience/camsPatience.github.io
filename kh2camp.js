window.ondragstart = function() {return false}	

// --DEFINITIONS--
var bgImg = document.getElementById("bg");
var bgState = document.getElementById("bgState");
var barrier = document.getElementById("barrier");
var popabout = document.getElementById("popabout");
var desc = document.getElementById("desc");
var head = document.getElementById("head");

// --BACKGROUND FADE--
// Hide the fact that the viewer is loading a ridiculously-large image by fading it in after it loads.
window.onload = function() {
	setTimeout(function () {
		bgImg.style.opacity = 1;
	}, 250);
	if (localStorage.bgStop == 1) {
		bgImg.style.animationPlayState = 'paused';
		bgState.innerHTML = "OFF";
	} else {
		bgState.innerHTML = "ON";
	};
};
		
// --TOGGLES--
// Background scrolling
function toggleAnim() {
	if (localStorage.bgStop == 1) {
		localStorage.bgStop = 0;
		bgImg.style.animationPlayState = 'running';
		bgState.innerHTML = "ON";
	} else {
		localStorage.bgStop = 1;
		bgImg.style.animationPlayState = 'paused';
		bgState.innerHTML = "OFF";
	};
};

// --LISTENERS--
// Note
const notes = document.querySelectorAll(".note")
notes.forEach(note => {
	note.addEventListener("mouseover", (event) => {
		desc.innerHTML = `${note.dataset.note}`;
		event.stopPropagation();
	});
});

// Button
const buttons = document.querySelectorAll(".button")
buttons.forEach(button => {
	button.addEventListener("mouseenter", () => {
		var sndMove = new Audio(`./res/snd/move.wav`);
		sndMove.currentTime = 0;
		sndMove.play();
	});
	button.addEventListener("mousedown", () => {
		if (button.dataset.snd) {			
			var sndClick = new Audio(`./res/snd/${button.dataset.snd}.wav`);
		} else {
			var sndClick = new Audio(`./res/snd/nuhuh.wav`);
		};
		sndClick.currentTime = 0;
		sndClick.play();
	});
	button.addEventListener("mouseout", () => {
		desc.innerHTML = '(Hover an entry to view its description.)';
	});
	button.addEventListener("mouseover", () => {
		desc.innerHTML = descriptions[button.dataset.descid];
		console.log(`Show description for desc ID: ${button.dataset.descid}`);
	});
});

// -- TRANSITIONS --
// Screen transition
function screenTrans(s, d) {
	var start = document.getElementById(`${s}`);
	var dest = document.getElementById(`${d}`);
	
	barrier.style.display = "inline";
	start.style.opacity = 0;
	dest.style.display = "block";
	dest.scrollTo(0, 0);
	setTimeout(function () {
		start.style.display = "none";
		dest.style.opacity = 1;
		head.innerHTML = `${dest.dataset.title} ~ Camp Menu`;
	}, 500);
	setTimeout(function () {
		barrier.style.display = "none";
	}, 1000);
	console.log(`${start.dataset.title} -> ${dest.dataset.title}`);
};

// Pop-up opener
function popOpen(p) {
	var pop = document.getElementById(`${p}`);
	
	barrier.style.display = "inline";
	pop.style.display = "inline";
	pop.scrollTo(0, 0);
	setTimeout(function () {
		pop.style.opacity = 1;
	}, 10);
	console.log(`Opening pop-up ${pop.dataset.title}`);
};

// Pop-up closer
function popClose(p) {
	var pop = document.getElementById(`${p}`);
	
	pop.style.opacity = 0;
	setTimeout(function () {
		barrier.style.display = "none";
		pop.style.display = "none";
	}, 500);
	console.log(`Closing pop-up ${pop.dataset.title}`);
};

var descriptions = {
	// Home page
	"undefined": `(<span style="color:#c84aff">Somebody</span> forgot to define a description for this entry. Point and laugh.)`,
	"mainlist": `A sample list of entries.`,
	"sublist": `B sample list of entries.`,
	"about": `Learn more about this project.`,
	"credits": `Read the credits for all assets used.`,
	"bgscroll": `Toggle the scrolling background on or off.<br><red>Your browser's local storage will be used to save this preference.</red>`,
	"back": `Return to the previous page.`,
	"default": `(Hover an entry to view its description.)`,
	// Main list
	"entry-1": `Entry 1 description.`,
	"entry-2": `Entry 2 description, <cyan>but this one has color!</cyan> It even has <red>red</red>.`,
	"entry-3": `Entry 3 description.`,
	"entry-4": `Entry 4 description.`,
	"filler": `Exists just to demonstrate that long lists will scroll.`
};

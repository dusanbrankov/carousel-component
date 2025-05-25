const root = document.querySelector(".slide");

const container = root.querySelector(".slide-images");
const images = container.querySelectorAll("img");

const nextButton = document.querySelector(".slide-next");
const prevButton = document.querySelector(".slide-prev");

nextButton.onclick = slideNext;
prevButton.onclick = slidePrev;

const BOUNCE_DURATION = 300;
container.style.setProperty("--bounce-duration", BOUNCE_DURATION);

// Disable "next" button on first load
handleButtonState(0);

function slide(posUpdater) {
	const currentPos = parseInt(container.style.getPropertyValue("--pos") || 0);
	const newPos = posUpdater(currentPos);

	if (beyondRange(newPos)) {
		container.style.setProperty("--n", newPos < 0 ? -1 : 1);
		container.classList.add("bounce");
		setTimeout(() => {
			container.classList.remove("bounce");
		}, BOUNCE_DURATION);
		return;
	}

	handleButtonState(newPos);
	container.style.setProperty("--pos", newPos);
}

function beyondRange(pos) {
	return pos > 0 || Math.abs(pos) >= images.length
}

function handleButtonState(pos) {
	atStart = pos === 0;
	atEnd = Math.abs(pos) >= images.length - 1;

	prevButton.disabled = atStart;
	prevButton.setAttribute("aria-label", 
		atStart ? "Previous image (unavailable)" : "Previous image"
	);

	nextButton.disabled = atEnd;
	nextButton.setAttribute("aria-label", 
		atEnd ? "Next image (unavailable)" : "Next image"
	);
}

function slideNext() { slide((pos) => pos - 1); }
function slidePrev() { slide((pos) => pos + 1); }

root.onpointerdown = handleSwipeStart;
root.onpointerup = handleSwipeEnd;

const MIN_SWIPE_DISTANCE = 20;
let startX = 0;

function handleSwipeStart(e) {
	if (e.target.hasPointerCapture(e.pointerId)) {
		e.target.releasePointerCapture(e.pointerId);
	}
	startX = e.clientX;
}

function handleSwipeEnd(e) {
	const endX = e.clientX;
	const deltaX = endX - startX;
	if (Math.abs(deltaX) > MIN_SWIPE_DISTANCE) {
		deltaX < 0 ? slideNext() : slidePrev()
	}
}

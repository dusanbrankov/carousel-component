const root = document.querySelector(".slide");

const container = root.querySelector(".slide-images");
const images = container.querySelectorAll("img");

const nextButton = document.querySelector(".slide-next");
const prevButton = document.querySelector(".slide-prev");

nextButton.onclick = () => slide((pos) => pos - 1);
prevButton.onclick = () => slide((pos) => pos + 1);

function slide(posUpdater) {
	const currentPos = parseInt(container.style.getPropertyValue("--pos") || 0);
	const newPos = posUpdater(currentPos);
	handleButtonState(newPos);
	if (newPos > 0 || Math.abs(newPos) >= images.length) {
		return;
	}
	container.style.setProperty("--pos", newPos);
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

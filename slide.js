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
	if (newPos > 0 || Math.abs(newPos) >= images.length) {
		return;
	}
	container.style.setProperty("--pos", newPos);
}

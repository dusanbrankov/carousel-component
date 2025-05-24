const root = document.querySelector(".slide");

const container = root.querySelector(".slide-images");
const imagesNum = container.querySelectorAll("img").length;

const slideNext = root.querySelector(".slide-next");
const slidePrev = root.querySelector(".slide-prev");

slideNext.onclick = () => slide((i) => i - 1);
slidePrev.onclick = () => slide((i) => i + 1);

function slide(getNewIndex) {
	const currentIndex = parseInt(container.style.getPropertyValue("--i") || 0);
	const newIndex = getNewIndex(currentIndex);
	if (newIndex > 0 || Math.abs(newIndex) >= imagesNum) {
		return;
	}
	container.style.setProperty("--i", newIndex);
}

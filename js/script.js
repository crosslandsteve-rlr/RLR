const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
	if (navLinks.classList.contains("show")) {
		navLinks.classList.remove("show");
		navLinks.classList.add("hide");

		setTimeout(() => {
			navLinks.classList.remove("hide");
		}, 300);
	} else {
		navLinks.classList.add("show");
	}
});

const galleryImages = document.querySelectorAll(".media-img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let touchStartX = 0;
let touchEndX = 0;
let currentImage = 0;

galleryImages.forEach((img, index) => {
	img.addEventListener("click", () => {
		currentImage = index;
		openLightbox();
	});
});

function openLightbox() {
	lightbox.classList.add("show");
	lightboxImg.src = galleryImages[currentImage].src;
}

function closeLightbox() {
	lightbox.classList.remove("show");
}

function changeImage(direction) {
	currentImage += direction;

	if (currentImage < 0) {
		currentImage = galleryImages.length - 1;
	}

	if (currentImage >= galleryImages.length) {
		currentImage = 0;
	}

	lightboxImg.src = galleryImages[currentImage].src;
}

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", () => changeImage(-1));
lightboxNext.addEventListener("click", () => changeImage(1));

document.addEventListener("keydown", (e) => {
	if (!lightbox.classList.contains("show")) return;

	if (e.key === "Escape") closeLightbox();
	if (e.key === "ArrowLeft") changeImage(-1);
	if (e.key === "ArrowRight") changeImage(1);
});

lightbox.addEventListener("touchstart", (e) => {
	touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener("touchend", (e) => {
	touchEndX = e.changedTouches[0].screenX;
	handleSwipe();
});

function handleSwipe() {
	const swipeDistance = touchEndX - touchStartX;

	if (swipeDistance > 50) {
		changeImage(-1); // swipe right = previous
	}

	if (swipeDistance < -50) {
		changeImage(1); // swipe left = next
	}
}

function openLightbox() {
	lightbox.classList.add("show");
	lightboxImg.src = galleryImages[currentImage].src;
	document.body.style.overflow = "hidden";
}

function closeLightbox() {
	lightbox.classList.remove("show");
	document.body.style.overflow = "";
}

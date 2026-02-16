document.addEventListener("DOMContentLoaded", function () {
	var scriptSrc = document.querySelector("script[src*='backgroundcycle']").getAttribute("src");
	var basePath = scriptSrc.substring(0, scriptSrc.lastIndexOf("js/"));
	var imageNames = ["background1.jpg", "background2.jpg", "background3.webp", "background4.jpg", "background5.jpg"];
	var images = imageNames.map(function (name) { return basePath + "img/backgrounds/" + name; });
	var layers = document.querySelectorAll(".bg-layer");
	var currentImage = 0;
	var activeLayer = 0;
	var timer;

	function showImage(index) {
		var nextLayer = activeLayer === 0 ? 1 : 0;
		layers[nextLayer].style.backgroundImage = "url('" + images[index] + "')";
		layers[nextLayer].classList.add("active");
		layers[activeLayer].classList.remove("active");
		activeLayer = nextLayer;
		currentImage = index;
	}

	function advance(direction) {
		var next = (currentImage + direction + images.length) % images.length;
		showImage(next);
		resetTimer();
	}

	function resetTimer() {
		clearInterval(timer);
		timer = setInterval(function () { advance(1); }, 30000);
	}

	// Initial image
	layers[0].style.backgroundImage = "url('" + images[0] + "')";
	layers[0].classList.add("active");

	// Arrow buttons
	var leftArrow = document.createElement("button");
	leftArrow.className = "bg-arrow bg-arrow-left";
	leftArrow.innerHTML = "&#10094;";
	leftArrow.addEventListener("click", function () { advance(-1); });

	var rightArrow = document.createElement("button");
	rightArrow.className = "bg-arrow bg-arrow-right";
	rightArrow.innerHTML = "&#10095;";
	rightArrow.addEventListener("click", function () { advance(1); });

	document.body.appendChild(leftArrow);
	document.body.appendChild(rightArrow);

	// Start auto-cycle
	resetTimer();
});

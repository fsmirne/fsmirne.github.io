document.addEventListener("DOMContentLoaded", function () {
	var navToggle = document.querySelector("#mobile-nav > a");
	var navList = document.querySelector("#mobile-nav ul.primary-nav");

	if (navToggle && navList) {
		navToggle.addEventListener("click", function (e) {
			e.preventDefault();
			var isOpen = navToggle.classList.toggle("navOpen");
			navList.style.display = isOpen ? "block" : "none";
			if (!isOpen) {
				document.querySelectorAll("#mobile-nav li.selected").forEach(function (li) { li.classList.remove("selected"); });
				document.querySelectorAll("#mobile-nav .submenu-list").forEach(function (el) { el.style.display = "none"; });
			}
		});
	}

	document.querySelectorAll(".submenu-toggle").forEach(function (opener) {
		opener.addEventListener("click", function (e) {
			e.preventDefault();
			var parent = this.parentElement;
			if (parent.classList.contains("selected")) {
				parent.classList.remove("selected");
				parent.querySelectorAll(".submenu-list").forEach(function (el) { el.style.display = "none"; });
			} else {
				parent.classList.add("selected");
				Array.prototype.forEach.call(parent.children, function (child) {
					if (child.classList.contains("submenu-list")) child.style.display = "block";
				});
				window.scrollTo({ top: parent.offsetTop, behavior: "smooth" });
			}
		});
	});

	/* Drawer toggle for startpage */
	var drawerBtn = document.querySelector(".drawer-toggle");
	var drawerPanel = document.querySelector(".drawer-panel");
	if (drawerBtn && drawerPanel) {
		var drawerContent = drawerPanel.querySelector(".drawer-content");
		var scrollHeight = 0;
		var maxDrawerHeight = function () { return window.innerHeight - 200; };
		var SCROLL_STEP = 60;

		function isOpen() { return scrollHeight > 0 || drawerPanel.classList.contains("drawer-open"); }

		function collapse() {
			drawerPanel.classList.remove("drawer-open", "drawer-scrolling");
			drawerContent.style.maxHeight = "";
			scrollHeight = 0;
			drawerBtn.textContent = "+";
		}

		function enterScrollMode(height) {
			drawerPanel.classList.remove("drawer-open");
			drawerPanel.classList.add("drawer-scrolling");
			scrollHeight = height;
			drawerContent.style.maxHeight = scrollHeight + "px";
			drawerBtn.textContent = "\u2212";
		}

		drawerBtn.addEventListener("click", function (e) {
			e.preventDefault();
			if (isOpen()) {
				collapse();
			} else {
				collapse();
				drawerPanel.classList.add("drawer-open");
				drawerBtn.textContent = "\u2212";
			}
		});

		window.addEventListener("wheel", function (e) {
			if (e.deltaY > 0) {
				if (drawerPanel.classList.contains("drawer-open")) return;
				e.preventDefault();
				enterScrollMode(Math.min(scrollHeight + SCROLL_STEP, maxDrawerHeight()));
			} else if (e.deltaY < 0 && isOpen()) {
				e.preventDefault();
				if (drawerPanel.classList.contains("drawer-open")) {
					enterScrollMode(maxDrawerHeight() - SCROLL_STEP);
				} else {
					scrollHeight = Math.max(scrollHeight - SCROLL_STEP, 0);
					if (scrollHeight === 0) { collapse(); } else { drawerContent.style.maxHeight = scrollHeight + "px"; }
				}
			}
		}, { passive: false });
	}
});

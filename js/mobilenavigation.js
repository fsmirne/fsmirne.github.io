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
		drawerBtn.addEventListener("click", function (e) {
			e.preventDefault();
			var isOpen = drawerPanel.classList.toggle("drawer-open");
			drawerBtn.textContent = isOpen ? "\u2212" : "+";
		});
	}
});

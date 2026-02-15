document.addEventListener("DOMContentLoaded", function () {
	var navToggle = document.querySelector("#diyfeMobileNav > a");
	var navList = document.querySelector("#diyfeMobileNav ul.mainNav1");

	navToggle.addEventListener("click", function (e) {
		e.preventDefault();
		var isOpen = navToggle.classList.toggle("navOpen");
		navList.style.display = isOpen ? "block" : "none";
		if (!isOpen) {
			document.querySelectorAll("#diyfeMobileNav li.selected").forEach(function (li) { li.classList.remove("selected"); });
			document.querySelectorAll("#diyfeMobileNav .diyfeDropDownSubList").forEach(function (el) { el.style.display = "none"; });
		}
	});

	document.querySelectorAll(".diyfeDropDownSubOpener").forEach(function (opener) {
		opener.addEventListener("click", function (e) {
			e.preventDefault();
			var parent = this.parentElement;
			if (parent.classList.contains("selected")) {
				parent.classList.remove("selected");
				parent.querySelectorAll(".diyfeDropDownSubList").forEach(function (el) { el.style.display = "none"; });
			} else {
				parent.classList.add("selected");
				Array.prototype.forEach.call(parent.children, function (child) {
					if (child.classList.contains("diyfeDropDownSubList")) child.style.display = "block";
				});
				window.scrollTo({ top: parent.offsetTop, behavior: "smooth" });
			}
		});
	});
});

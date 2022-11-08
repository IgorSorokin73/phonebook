const search = document.querySelector(".top-input");
const contacts = document.querySelector(".phone-content");

const sortContact = items => {
	const hiddenItems = [...items].filter(item => window.getComputedStyle(item).display === "none");

	const visibleItems = [...items].filter(item => window.getComputedStyle(item).display === "flex");

	const favoriteItems = visibleItems.filter(item => {
		const heart = item.querySelector(".button-love");
		return heart.getAttribute("src") === "img/heart.png";
	})

	const commonItems = visibleItems.filter(item => {
		const heart = item.querySelector(".button-love");
		return heart.getAttribute("src") === "img/heart-none.png";
	});

	const sortedItems = [
		...favoriteItems,
		...commonItems.sort((a, b) => {
			const first = a.querySelector(".phone-item-name").innerHTML.replace(/^\s+|\s+$/g, "");
			const second = b.querySelector(".phone-item-name").innerHTML.replace(/^\s+|\s+$/g, "");
			if (first.attr < second.attr)
				return -1;
			if (first.attr > second.attr)
				return 1;
			return 0;
		}),
		...hiddenItems
	];
	contacts.replaceChildren(...sortedItems);
}
sortContact(document.querySelectorAll(".phone-item"));


const favourite = () => {
	const favoriteButtons = contacts.querySelectorAll(".button-love");
	favoriteButtons.forEach(btn => {
		btn.onclick = null;
		btn.onclick = (e) => {
			const avatar = btn.getAttribute("src");
			if (avatar.includes("heart-none")) {
				btn.setAttribute("src", "img/heart.png");
				sortContact(document.querySelectorAll(".phone-item"));
			}

			if (avatar == "img/heart.png") {
				btn.setAttribute("src", "img/heart-none.png");
				sortContact(document.querySelectorAll(".phone-item"));
			}
		}
	})
}


search.addEventListener("input", (e) => {
	const searchValue = e.target.value;
	const items = document.querySelectorAll(".phone-item");
	items.forEach(item => {
		const name = item.querySelector(".phone-item-name").innerHTML.replace(/^\s+|\s+$/g, "");
		if (!name.toLowerCase().includes(searchValue.toLowerCase())) {
			item.style.display = "none";
		}
		else {
			item.style.display = "flex";
		}
	});
	sortContact(items);
})





const removeButtons = () => {
	const deleteButtons = contacts.querySelectorAll(".phone-item-delete");
	deleteButtons.forEach(btn => {
		btn.onclick = null;
		btn.onclick = (e) => {
			const deleteItem = btn.closest(".phone-item");
			deleteItem.onclick = null;
			deleteItem.remove();
			removeButtons();
			sortContact(document.querySelectorAll(".phone-item"));
		}
	})
};

favourite();
removeButtons();


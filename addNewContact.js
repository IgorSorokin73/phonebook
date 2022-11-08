const addModal = document.querySelector(".add-modal");
const openModal = document.querySelector(".footer-btn");
const createButton = document.querySelector(".create-button");
const phoneInput = document.getElementById("add-phone");

const maskInput = () =>
{
	
	const maskOptions = {
		lazy: false,
		mask: '+{7} (000) 000-00-00'
	};

	IMask(phoneInput, maskOptions);
}

const addNewContact = (name, phoneNumber, favorite) => {
	const contactItem = `
	<div class="phone-item">
		<div class="phone-item-logo">
			<img src="img/person.png" alt="">
		</div>
		<div class="phone-item-data">
			<div class="phone-item-name">
				${name}
			</div>
			<div class="phone-item-phone">
				${phoneNumber}
			</div>
		</div>

		<div class="phone-item-buttons">
			<button class="phone-item-delete">
				<img class="button-img" src="img/close.png" alt="">
			</button>
			<button class="phone-item-favourite">
				<img class="button-love" src="${favorite ? "img/heart.png" : "img/heart-none.png"}" alt="empty">
			</button>
		</div>
</div>`;

	contacts.insertAdjacentHTML("beforeend", contactItem);
}


createButton.addEventListener("click", () => {
	const nameInput = document.getElementById("add-name");
	const phoneInput = document.getElementById("add-phone");
	const checkbox = document.getElementById("is-favorite");

	const handledPhoneNumber = phoneInput.value.replace(/\(|\)|\s|\_|\-/g, "");
	if (/(?:\+|\d)[\d\-\(\) ]{9,}\d/g.test(handledPhoneNumber) && nameInput.value !== "" && handledPhoneNumber.length === 12) {
		addNewContact(nameInput.value, phoneInput.value, checkbox.checked);
		document.body.classList.remove("modal-open");
		addModal.style.display = "none";
		checkbox.checked = false;
		nameInput.value = "";
		maskInput()
		removeButtons();
		favourite();
		sortContact(document.querySelectorAll(".phone-item"));
	}
});

openModal.addEventListener("click", () => {
	addModal.style.display = "flex";
	document.body.classList.add("modal-open");
	maskInput();
})


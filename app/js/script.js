const toggle = document.querySelectorAll("#btnToggle");
const menu = document.querySelector(".header__nav");
const overlay = document.querySelector(".overlay");
const controls = document.querySelectorAll(".controls");
const modalControls = document.querySelectorAll(".modal-controls");
const slider = document.querySelector(".slider");
const modalSlider = document.querySelector(".modal-slider");
const slides = document.querySelectorAll(".slides");
const modalSlides = document.querySelectorAll(".modal-slides");
const thumbnail = document.querySelectorAll(".thumbnail");
const modalThumbnail = document.querySelectorAll(".modal-thumbnail");
const modal = document.querySelector(".product__modal");
const modalClose = document.querySelector(".product__slider-close");
const cartToggle = document.querySelector(".header__cart");
const cart = document.querySelector(".cart");
const cartContent = document.querySelector(".cart__content");
const cartAdd = document.querySelector(".product__add-button");
let cartDelete;
const cartBadge = document.querySelector(".header__cart-number");
const quantityBtn = document.querySelectorAll(".product__quantity-change");
const quantityNumber = document.querySelector(".product__quantity-number");

let number = 0;
let cartNumber = 0;

function thumbChange(btn, images, thumbs) {
	const index = btn.alt.charAt(btn.alt.length - 1);
	for (let i = 0; i < images.length; i++) {
		if (i === index - 1) {
			images[i].classList.add("active");
			thumbs[i].classList.add("muted");
			thumbs[i].parentElement.classList.add("outline");
			images[i].style.display = "block";
		} else {
			images[i].classList.remove("active");
			thumbs[i].classList.remove("muted");
			thumbs[i].parentElement.classList.remove("outline");
			images[i].style.display = "none";
		}
	}
}

function ctrlChange(btn, images, thumbs) {
	if (btn.classList.contains("next")) {
		for (let i = 0; i < images.length; i++) {
			if (images[i].classList.contains("active")) {
				if (i === 3) {
					images[3].classList.remove("active");
					thumbs[3].classList.remove("muted");
					thumbs[3].parentElement.classList.remove("outline");
					images[3].style.display = "none";
					images[0].classList.add("active");
					thumbs[0].classList.add("muted");
					thumbs[0].parentElement.classList.add("outline");
					images[0].style.display = "block";
					return;
				}
				images[i].classList.remove("active");
				thumbs[i].classList.remove("muted");
				thumbs[i].parentElement.classList.remove("outline");
				images[i].style.display = "none";

				images[i + 1].classList.add("active");
				thumbs[i + 1].classList.add("muted");
				thumbs[i + 1].parentElement.classList.add("outline");
				images[i + 1].style.display = "block";
				return;
			}
		}
	} else {
		for (let i = 0; i < images.length; i++) {
			if (images[i].classList.contains("active")) {
				if (i === 0) {
					images[0].classList.remove("active");
					thumbs[0].classList.remove("muted");
					thumbs[0].parentElement.classList.remove("outline");
					images[0].style.display = "none";
					images[3].classList.add("active");
					thumbs[3].classList.add("muted");
					thumbs[3].parentElement.classList.add("outline");
					images[3].style.display = "block";
					return;
				}
				images[i].classList.remove("active");
				thumbs[i].classList.remove("muted");
				thumbs[i].parentElement.classList.remove("outline");
				images[i].style.display = "none";
				images[i - 1].classList.add("active");
				thumbs[i - 1].classList.add("muted");
				thumbs[i - 1].parentElement.classList.add("outline");
				images[i - 1].style.display = "block";
				return;
			}
		}
	}
}

toggle.forEach(function (btn) {
	btn.addEventListener("click", () => {
		menu.classList.toggle("show");
		menu.classList.toggle("hide-for-mobile");
		overlay.classList.toggle("open");
	});
});

cartToggle.addEventListener("click", () => {
	cart.classList.toggle("show");
});

controls.forEach(function (btn) {
	btn.addEventListener("click", () => ctrlChange(btn, slides, thumbnail));
});

modalControls.forEach(function (btn) {
	btn.addEventListener("click", () =>
		ctrlChange(btn, modalSlides, modalThumbnail)
	);
});

thumbnail.forEach(function (btn) {
	btn.addEventListener("click", () => thumbChange(btn, slides, thumbnail));
});

modalThumbnail.forEach(function (btn) {
	btn.addEventListener("click", () =>
		thumbChange(btn, modalSlides, modalThumbnail)
	);
});

slides.forEach(function (img) {
	img.addEventListener("click", () => {
		if (window.innerWidth >= 1000) {
			overlay.classList.add("open");
			modal.classList.add("show-modal");
			document.body.style.overflow = "hidden";
		}
	});
});

modalClose.addEventListener("click", () => {
	overlay.classList.remove("open");
	modal.classList.remove("show-modal");
	document.body.style.overflow = "visible";
});

quantityBtn.forEach(function (btn) {
	btn.addEventListener("click", () => {
		if (btn.classList.contains("plus")) {
			number++;
		} else {
			if (quantityNumber.innerHTML === "0") {
				return;
			} else {
				number--;
			}
		}
		quantityNumber.innerHTML = number;
	});
});

cartAdd.addEventListener("click", () => {
	if (number === 0) {
		return;
	}
	cartNumber = cartNumber + number;
	number = 0;
	quantityNumber.innerHTML = number;
	cartContent.innerHTML = `<div class="cart__product">
					<img
						src="./images/image-product-1-thumbnail.jpg"
						alt="product image thumbnail 1"
						class="cart__product-image"
					/>
					<div class="cart__product-text">
						<h3 class="cart__product-name">Fall Limited Edition Sneakers</h3>
						<p class="cart__product-price">
							$125.00 x ${cartNumber} <span class="cart__product-total">$${
		125 * cartNumber
	}</span>
						</p>
					</div>
					<button class="cart__delete">
						<img
							src="./images/icon-delete.svg"
							alt="button delete"
						/>
					</button>
				</div>
				<button class="cart__checkout button-orange">Checkout</button>`;
	cartBadge.innerHTML = cartNumber;
	cartBadge.classList.add("show");
	cartDelete = document.querySelector(".cart__delete");
});

document.addEventListener("click", () => {
	if (cartDelete) {
		cartDelete.addEventListener("click", () => {
			cartContent.innerHTML = `<p class="cart__empty">Your cart is empty.</p>`;
			cartNumber = 0;
			cartBadge.classList.remove("show");
		});
	}
});

overlay.addEventListener("click", () => {
	overlay.classList.remove("open");
	if (menu.classList.contains("show")) {
		menu.classList.remove("show");
		menu.classList.add("hide-for-mobile");
		return;
	}
	if (modal.classList.contains("show-modal")) {
		modal.classList.remove("show-modal");
		document.body.style.overflow = "visible";
	}
});

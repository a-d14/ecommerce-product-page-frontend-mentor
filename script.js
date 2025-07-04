const main = document.querySelector("main");

const btnOpen = document.getElementById("btnOpen");
const btnClose = document.getElementById("btnClose");
const linkProfile = document.getElementById("link-profile");

const navMenu = document.querySelector(".header__navigation");
const navOverlay = document.querySelector(".header__navigation-overlay");

const btnCart = document.getElementById("btnCart");

const isNotDesktop = window.matchMedia("(width < 90em)");

const setUpNav = (e) => {
  if (e.matches) {
    console.log(true);
    btnClose.setAttribute("inert", "");
    navOverlay.setAttribute("inert", "");
    navMenu.setAttribute("inert", "");
    navMenu.style.transition = "none";
  } else {
    closeMenu();
    navMenu.removeAttribute("inert");
  }
};

setUpNav(isNotDesktop);

function openMenu() {
  btnOpen.setAttribute("aria-expanded", "true");
  btnOpen.setAttribute("inert", "");
  btnCart.setAttribute("inert", "");
  linkProfile.setAttribute("inert", "");

  main.setAttribute("inert", "");

  btnClose.removeAttribute("inert");
  navMenu.removeAttribute("inert");
  navMenu.removeAttribute("style");
}

function closeMenu() {
  btnOpen.setAttribute("aria-expanded", "false");
  btnOpen.removeAttribute("inert");
  btnCart.removeAttribute("inert");
  linkProfile.removeAttribute("inert");

  btnClose.setAttribute("inert", "");
  navMenu.setAttribute("inert", "");

  main.removeAttribute("inert");

  setTimeout(() => {
    navMenu.style.transition = "none";
  }, 500);
}

btnOpen.addEventListener("click", openMenu);
btnClose.addEventListener("click", closeMenu);

isNotDesktop.addEventListener("change", (e) => {
  setUpNav(e);
});

// CART FUNCTIONALITY
const currentQuantityInCart = document.getElementById("currentQuantityInCart");
const currentQuantityInCartSmall = document.getElementById(
  "currentQuantityInCartSmall"
);

const setCartQuantity = document.getElementById("setCartQuantity");
const cart = document.querySelector(".header__cart");
const cartBody = document.querySelector(".header__cart-body");
const addItemToCart = document.getElementById("addItemToCart");
let removeItemFromCart = null;

btnCart.addEventListener("click", () => {
  const isExpanded = btnCart.getAttribute("aria-expanded") === "true";
  const nextState = !isExpanded;

  btnCart.setAttribute("aria-expanded", nextState.toString());

  if (!nextState) {
    cart.setAttribute("inert", "");
  } else {
    cart.removeAttribute("inert");
  }
});

setCartQuantity.addEventListener("click", (e) => {
  const target = e.target;
  if (
    target.parentElement.id === "decrementItemQuantity" &&
    +currentQuantityInCart.textContent > 0
  ) {
    currentQuantityInCart.textContent = +currentQuantityInCart.textContent - 1;
  } else if (target.parentElement.id === "incrementItemQuantity") {
    currentQuantityInCart.textContent = +currentQuantityInCart.textContent + 1;
  }
});

addItemToCart.addEventListener("click", () => {
  if (+currentQuantityInCart.textContent > 0) {
    cartBody.innerHTML = `
            <ul>
              <li class="cart-item">
                <img src="images/image-product-1-thumbnail.jpg" alt="product thumbnail" />
                <span class="item-name">Fall Limited Edition Sneakers</span>
                <span class="item-pricing">$125.00 x ${
                  currentQuantityInCart.textContent
                } <span>$${(125 * +currentQuantityInCart.textContent).toFixed(
      2
    )}</span></span>
                <button class="item-delete" aria-label="remove item from cart" id="removeItemFromCart">
                  <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <defs>
                      <path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/>
                    </defs>
                    <use fill-rule="nonzero" xlink:href="#a"/>
                  </svg>
                </button>
              </li>
            </ul>
        `;
    currentQuantityInCartSmall.textContent = currentQuantityInCart.textContent;

    setTimeout(() => {
      removeItemFromCart = document.getElementById("removeItemFromCart");
      removeItemFromCart.addEventListener("click", () => {
        cartBody.innerHTML = "<p>Your cart is empty.</p>";
        currentQuantityInCartSmall.textContent = 0;
        removeItemFromCart = null;
      });
    }, 0);
  }
});

// CAROUSEL
const isDesktop = window.matchMedia("(width >= calc(1440 / 16 * 1rem))");

function initCarousel(carousel, startingIndex = 0) {
    const carouselImages = carousel.querySelector(".carousel__images");
    const prev = carousel.querySelector(".carousel__prev");
    const next = carousel.querySelector(".carousel__next");
    const carouselThumbnails = carousel.querySelectorAll(".carousel__thumbnails > *");
    let currentImageIndex = startingIndex;
    const totalImages = carouselImages.children.length;

    function updateUI() {
        carouselImages.style.transform = `translateX(-${currentImageIndex * 100}%)`;
        prev.disabled = currentImageIndex === 0;
        next.disabled = currentImageIndex === totalImages - 1;

        carouselThumbnails.forEach(thumb => thumb.classList.remove('selected'));
        if (isDesktop.matches) {
            carouselThumbnails[currentImageIndex]?.classList.add('selected');
        }
    }

    prev.addEventListener('click', () => {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateUI();
        }
    });

    next.addEventListener('click', () => {
        if (currentImageIndex < totalImages - 1) {
            currentImageIndex++;
            updateUI();
        }
    });

    carouselThumbnails.forEach((thumbnail, idx) => {
        thumbnail.addEventListener('click', () => {
            const isAlreadySelected = thumbnail.classList.contains('selected');

            if (isAlreadySelected && carousel.classList.contains('carousel-non-overlay')) {
                const lightbox = document.querySelector(".lightbox");
                const lightboxCarousel = lightbox.querySelector(".carousel");

                lightbox.style.display = "flex";

                initCarousel(lightboxCarousel, idx);
                return;
            }

            currentImageIndex = idx;
            updateUI();
        });
    });

    updateUI();

    window.addEventListener('resize', () => {
        carouselThumbnails.forEach(thumb => thumb.classList.remove('selected'));
        if (isDesktop.matches) {
            carouselThumbnails[currentImageIndex]?.classList.add('selected');
        }
    });
}

document.querySelectorAll('.carousel').forEach(carousel => {
    initCarousel(carousel);
});

// LIGHTBOX
const closeLightboxButton = document.querySelector(".close__lightbox");

const closeLightBox = function () {
    const lightbox = document.querySelector('.lightbox');
    lightbox.style.display = "none";

    const lightboxCarousel = lightbox.querySelector(".carousel");
    const lightboxCarouselThumbnails = lightboxCarousel.querySelectorAll(".carousel__thumbnails > *");
    lightboxCarouselThumbnails.forEach(thumbnail => thumbnail.classList.remove('selected'));
}

closeLightboxButton.addEventListener('click', closeLightBox);

window.addEventListener("resize", () => {
    if(!isDesktop.matches) {
        closeLightBox();
    }
})
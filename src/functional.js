const headerElem = document.querySelector(".header");
const buttonShowConnWindow = document.querySelectorAll(".showConnectionBlock");
const form = document.forms.submittingTheForm;
const nameInp = form.name;
const numberInp = form.numberPhone;
const emailInp = form.email;
const closeMdlWindow = document.getElementById("closeModalWind");
const saveDataBtn = document.getElementById("saveDataUser");
const showDataUser = document.createElement("div");
showDataUser.className = "idntityConfirmResponse";

buttonShowConnWindow.forEach((buttElem) => {
  buttElem.onclick = () => {
    form.classList.add("_active");
  };
});

closeMdlWindow.onclick = () => form.classList.remove("_active");
document.onkeydown = (event) => {
  if (event.key == "Escape") {
    form.classList.remove("_active");
  }
};

saveDataBtn.onclick = () => {
  const valueName = nameInp.value;
  const valueNumberPh = numberInp.value;
  const valueEmail = emailInp.value;

  if (valueName && valueEmail && valueNumberPh) {
    showDataUser.innerHTML = `
      <p><span>${valueName}</span>, ваша заявка принята! Мы пришлем Вам сообщение на почту или позвоним на указанный Вами номер.</p>
    `;
    showDataUser.classList.add("_active");
    nameInp.value = "";
    numberInp.value = "";
    emailInp.value = "";
    headerElem.appendChild(showDataUser);
    form.classList.remove("_active");
  } else {
    showDataUser.innerHTML = `Введите данные во все поля.`;
    showDataUser.classList.add("_active");
    headerElem.appendChild(showDataUser);
  }
  setTimeout(() => showDataUser.classList.remove("_active"), 4000);
};

form.onsubmit = (event) => {
  event.preventDefault();
};

////////////////////////////////////////////////////////////////////////////////
document.addEventListener("scroll", () => {
  const advBlock = document.querySelector(".advantagesBlock");
  const targetPosition = advBlock.getBoundingClientRect();

  if (targetPosition.top >= 540) {
    advBlock.classList.add("__show");
  }
});

///////////////////////////////////////////////////////////////////////////
const imgs = document.querySelectorAll(".discountedProductsBlock__slider_img");
const controlls = document.querySelectorAll(".controlls");
let imgIndex = 0;

const show = (index) => {
  imgs[imgIndex].classList.remove("active");
  imgs[index].classList.add("active");
  imgIndex = index;
};

controlls.forEach((e) => {
  e.addEventListener("click", (event) => {
    if (event.currentTarget.classList.contains("prev")) {
      let index = imgIndex - 1;

      if (index < 0) {
        index = imgs.length - 1;
      }
      show(index);
    } else if (event.currentTarget.classList.contains("next")) {
      let index = imgIndex + 1;

      if (index >= imgs.length) {
        index = 0;
      }
      show(index);
    }
  });
});

show(imgIndex);
//////////////////////////////////////////////////////////////
const toTopBtn = document.getElementById("scrollToTop");
document.addEventListener("scroll", () => {
  const catalog = document.querySelector(".commodityPart");

  const catalogCoordination = catalog.getBoundingClientRect();
  if (catalogCoordination.top < 33) {
    toTopBtn.classList.add("active");
  } else {
    toTopBtn.classList.remove("active");
  }
});

toTopBtn.onclick = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};
/////////////////////////////////////////////////////////////
const detailsProdbtn = document.querySelectorAll(
  ".productCatalog_elem_details"
);

detailsProdbtn.forEach((button) => {
  button.onclick = () => {
    const parent = button.closest(".productCatalog_elem");
    const blockMoreInfo = parent.querySelector(".product_elem_moreInfo");
    const visibleParts = parent.querySelectorAll(".productCatalog_elem_body");

    blockMoreInfo.classList.toggle("show");
    visibleParts.forEach((part) => part.classList.toggle("show"));
  };
});

const backToMainBtn = document.querySelectorAll(
  ".product_elem_moreInfo_backToMain"
);

backToMainBtn.forEach((button) => {
  button.onclick = () => {
    const parent = button.closest(".productCatalog_elem");
    const blockMoreInfo = parent.querySelector(".product_elem_moreInfo");
    const visibleParts = parent.querySelectorAll(".productCatalog_elem_body");

    blockMoreInfo.classList.remove("show");
    visibleParts.forEach((part) => part.classList.add("show"));
  };
});

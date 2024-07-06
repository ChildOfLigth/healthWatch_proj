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

const resetForm = () => {
    nameInp.value = "";
    emailInp.value = "";
    numberInp.value = "";
};

closeMdlWindow.onclick = () => {
    form.classList.remove("_active");
    resetForm();
};
document.onkeydown = (event) => {
    if (event.key == "Escape") {
        form.classList.remove("_active");
        resetForm();
    };
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
        resetForm();
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
document.addEventListener("DOMContentLoaded", () => {
    const toTopBtn = document.getElementById("scrollToTop");
    const scopeButton = document.querySelector('.commodityPart');

    if (!toTopBtn || !scopeButton) {
        console.error("Элемент scrollToTop или commodityPart не найден.");
        return;
    }

    const callbackForButtonScroll = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                toTopBtn.classList.add('active');
            } else {
                toTopBtn.classList.remove('active');
            }
        });
    };

    let optForButton = {
        root: null,  // Будет использовать окно браузера
        rootMargin: '0px',
        threshold: 0.1  // Процент видимости элемента для срабатывания
    };

    let observer = new IntersectionObserver(callbackForButtonScroll, optForButton);
    observer.observe(scopeButton);

    toTopBtn.onclick = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    };
});
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
/////////////////////////////////////////////////////
const buyProductBtns = document.querySelectorAll(".productCatalog_elem_buyBtn");
buyProductBtns.forEach((button) => {
    button.onclick = () => {
        const form = button
            .closest(".productCatalog_elem_body")
            .querySelector(".productCatalog_elem_purchaseFormClass");

        const warningMessage = form.querySelector('.warning');
        if (warningMessage) {
            warningMessage.remove();
        }

        form.classList.add("show");
    };
});

const closeBtns = document.querySelectorAll('.closeModalWind');
closeBtns.forEach(button => {
    button.onclick = () => {
        const form = button.closest('.productCatalog_elem_purchaseFormClass');
        form.classList.remove('show');
    };
});

const purchaseForms = document.querySelectorAll('.productCatalog_elem_purchaseFormClass');
purchaseForms.forEach(form => {
    form.onsubmit = (e) => {
        e.preventDefault();
        const name = form.querySelector('[name="nameUs"]');
        const email = form.querySelector('[name="emailUs"]');
        const contactNumber = form.querySelector('[name="numberUs"]');

        if (!name || !email || !contactNumber) {
            console.error('One or more form elements not found');
            return;
        }

        let warningMessage = form.querySelector('.warning');
        if (warningMessage) {
            warningMessage.remove();
        }

        if (name.value && email.value && contactNumber.value) {
            const parentElem = form.closest('.productCatalog_elem');
            const serverResponse = document.createElement('div');
            serverResponse.classList.add('response');
            serverResponse.innerHTML = `
                <span>Ваш заказ принят!</span> 
                <p>Спасибо что выбрали наш магазин</p>
            `;
            serverResponse.classList.add('active');
            parentElem.appendChild(serverResponse);

            form.classList.remove('show');

            name.value = "";
            email.value = "";
            contactNumber.value = "";

            setTimeout(() => serverResponse.classList.remove('active'), 4000);
        } else {
            if (!form.querySelector('.warning')) {
                warningMessage = document.createElement('p');
                warningMessage.classList.add('warning');
                warningMessage.textContent = 'Вы заполнили не все поля';
                form.appendChild(warningMessage);
            }
        }
    };
});
///////////////////////////////////////////////////////////'
const callback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('hidden');
        } else {
            entry.target.classList.add('hidden');
        }
    });
};

let options = {
    root: null,
};

const listProducts = document.querySelector('.productCatalog');
if (listProducts) {
    let observer = new IntersectionObserver(callback, options);
    observer.observe(listProducts);
}
////////////////////////////////////////////
const btnForFitnes = document.getElementById("btnforFitnes");
const btnForRuning = document.getElementById("btnforRuning");
const btnAllProd = document.getElementById("allProduct");
const liElems = document.querySelectorAll(".productCatalog_elem");

btnForFitnes.onclick = () => {
    liElems.forEach((elem) => elem.classList.remove("hidden"));
    liElems.forEach((elem) => {
        if (!elem.classList.contains("forFitnes")) {
            elem.classList.add("hidden");
        }
    });

};

btnForRuning.onclick = () => {
    liElems.forEach((elem) => elem.classList.remove("hidden"));
    liElems.forEach((elem) => {
        if (!elem.classList.contains("forRuning")) {
            elem.classList.add("hidden");
        }
    });
};

btnAllProd.onclick = () => {
    liElems.forEach((elem) => elem.classList.remove("hidden"));
};
/////////////////////////////////////////////////////////////
const contactNumUser = document.querySelectorAll('.maskNum');
const maskForNumOptions = {
    mask: '+380(00)000-00-00',
    lazy: false,
}
contactNumUser.forEach(elem => {
    const mask = new IMask(elem, maskForNumOptions);
});

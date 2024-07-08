document.addEventListener("DOMContentLoaded", () => {
    form.classList.remove("_active");
});

const headerElem = document.querySelector(".header");
const buttonShowConnWindow = document.querySelectorAll(".showConnectionBlock");
const form = document.forms.submittingTheForm;
const nameInp = form.name;
const numberInp = form.numberPhone;
const emailInp = form.email;
const closeMdlWindow = document.getElementById("closeModalWind");
const saveDataBtn = document.getElementById("saveDataUser");
const showDataUser = document.createElement("div");

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
    }
};

saveDataBtn.onclick = () => {
    const valueName = nameInp.value;
    const valueNumberPh = numberInp.value;
    const valueEmail = emailInp.value;

    if (valueName && valueEmail && valueNumberPh) {
        showDataUser.className = "idntityConfirmResponse";
        showDataUser.innerHTML = `
        <div class="contentTrue">
        <h2>Успешно!</h2>
         <p><span>${valueName}</span>, заявка принята! Мы напишем Вам на почту или позвоним на указанный номер.</p>
        </div>
    `;
        showDataUser.classList.add("_active");
        resetForm();
        headerElem.appendChild(showDataUser);
        form.classList.remove("_active");
    } else {
        showDataUser.className = "idntityConfirmResponse_warning";
        showDataUser.innerHTML = `
        <div class="contentFalse">
        <p>Вы зaполнили не все поля</p>
        </div>
        `;
        showDataUser.classList.add("_active");
        headerElem.appendChild(showDataUser);
    }
    setTimeout(() => showDataUser.classList.remove("_active"), 4000);
};

form.onsubmit = (event) => {
    event.preventDefault();
};

////////////////////////////////////////////////////////////////////////////////
const advBlock = document.querySelector(".advantagesBlock");

const callbackForAdBlock = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            advBlock.classList.add('__show');
            observer.unobserve(entry.target);
        }
    });
}

let optionsForAdv = {
    root: null,
}

let observer = new IntersectionObserver(callbackForAdBlock, optionsForAdv);
observer.observe(advBlock);
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
const scopeButton = document.querySelector('.commodityPart');

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
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

let observerScrollBtn = new IntersectionObserver(callbackForButtonScroll, optForButton);
observerScrollBtn.observe(scopeButton);

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
/////////////////////////////////////////////////////
const buyProductBtns = document.querySelectorAll(".productCatalog_elem_buyBtn");

buyProductBtns.forEach((button) => {
    button.onclick = () => {
        document.querySelectorAll(".productCatalog_elem_purchaseFormClass.show").forEach((openForm) => {
            openForm.classList.remove("show");
        });

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

        let warningMessage = form.querySelector('.warning');
        if (warningMessage) {
            warningMessage.remove();
        }

        if (name.value && email.value && contactNumber.value) {
            const parentElem = form.closest('.productCatalog_elem');
            const serverResponse = document.createElement('div');
            serverResponse.classList.add('response');
            serverResponse.innerHTML = `
                <div class="content">
                    <span>Ваш заказ принят!</span>
                    <p>Спасибо что выбрали наш магазин. Мы позвоним на Ваш контактный номер в течении 5-ти часов для уточнения данных</p>
                </div>
                `;
            serverResponse.classList.add('active');
            parentElem.appendChild(serverResponse);

            form.classList.remove('show');

            name.value = "";
            email.value = "";
            contactNumber.value = "";

            setTimeout(() => {
                serverResponse.classList.remove('active');
            }, 3000);
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

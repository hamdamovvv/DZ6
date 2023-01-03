// ? TABS
const tabs = document.querySelectorAll(".tabheader__item");
const tabsParent = document.querySelector(".tabheader__items");
const tabContent = document.querySelectorAll(".tabcontent");

const hideTabContent = () => {
  tabContent.forEach((item) => {
    item.style.display = "none";
  });
  tabs.forEach((item) => {
    item.classList.remove("tabheader__item_active");
  });
};

const showTabContent = (i = 0) => {
  tabContent[i].style.display = "block";
  tabs[i].classList.add("tabheader__item_active");
};
hideTabContent();
showTabContent();

tabsParent.addEventListener("click", (event) => {
  const target = event.target;

  if (target.classList.contains("tabheader__item")) {
    tabs.forEach((item, i) => {
      if (target === item) {
        console.log(i);
        hideTabContent();
        showTabContent(i);
      }
    });
  }
});

//* SLIDER

let slideIndex = 0;
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let slides = document.querySelectorAll(".tabheader__item");
  let sliderSlide = document.querySelectorAll(".tabcontent");
  if (n > slides.length && n > sliderSlide.length) {
    slideIndex += 1;
  }
  if (n < 0) {
    slideIndex = slides.length && slideIndex === sliderSlide.length;
  }
  for (let slide of slides) {
    slide.classList.remove("tabheader__item_active");
  }
  slides[n].classList.add("tabheader__item_active");

  for (let slide of sliderSlide) {
    slide.style.display = "none";
  }
  sliderSlide[slideIndex].style.display = "block";
}

let timer = setInterval(function () {
  {
    slideIndex++;
    if (slideIndex > 3) {
      slideIndex = 0
    }
  }
  showSlides(slideIndex);
}, 3000);

//* MODAL

const modal = document.querySelector(".modal");
const modalTrigger = document.querySelectorAll("[data-modal]");

modalTrigger.forEach((item) => {
  item.addEventListener("click", openModal);
});

function openModal() {
  modal.classList.add("show");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";

  clearInterval(modalTimeout);
}

function closeModal() {
  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = "";
}

modal.addEventListener("click", (event) => {
  if (
    event.target === modal ||
    event.target.classList.contains("modal__close")
  ) {
    closeModal();
  }
});

function openModalScroll() {
  const page = document.documentElement;

  if (page.scrollTop + page.clientHeight >= page.scrollHeight) {
    openModal();

    window.removeEventListener("scroll", openModalScroll);
  }
}

window.addEventListener("scroll", openModalScroll);
const modalTimeout = setTimeout(openModal, 50000);

const open = document.querySelector(".btn_white");



open.addEventListener('click', () => {
    modal.classList.remove('close_modal')
    modal.classList.add('open_modal')
})

modal.addEventListener('click', (e) => {
    console.log(e.target)
    if(e.target.classList.contains('modal__close') || e.target.classList.contains('modal')){
        modal.classList.remove('open_modal')
        modal.classList.add('close_modal')
    }
})
const newModal= document.createElement('div')
const newModalContent= document.createElement('div')
document.body.append(newModal)
newModal.append(newModalContent)

function createModal(){
    newModal.style.position = 'fixed'
newModal.style.top = '0'
newModal.style.left = '0'
newModal.style.zIndex = '1050'
newModal.style.display = 'none'
newModal.style.width = '100%'
newModal.style.height = '100vh'
newModal.style.overflow = 'hidden'
newModal.style.background = 'rgba(0, 0, 0, 0.5)'

newModalContent.style.position = 'relative'
newModalContent.style.width = '50%';
newModalContent.style.padding = '50px';
newModalContent.style.backgroundColor ='#fff';
newModalContent.style.border = '1px solid rgba(0, 0, 0, 0.2)';
newModalContent.style.borderRadius = '4px';
newModalContent.style.maxHeight = ' 80vh'
newModalContent.style.overflowY = 'auto';
newModalContent.style.margin = '20vh auto';
newModalContent.style.fontSize = '50px';

}
createModal()

function openNewModal(){
    newModal.style.display ='block'
    setTimeout(()=>{
        newModal.style.display = 'none'

    },5000)
}



const messageText = {
    loading: 'Loading...',
    success: 'Все успешно сохранено!',
    error: 'Ошибка при запросе!'
}


//// post Request

const forms = document.querySelectorAll('form');





forms.forEach((form) => {
    postData(form);
})




function postData(form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);


        const obj = {};
        formData.forEach((value, key) => {
            obj[key] = value;
        })
        modal.classList.remove('open_modal')
        modal.classList.add('close_modal')
        openNewModal()
        newModalContent.innerHTML= messageText.loading
        fetch('server.php',{
            headers:{
                'Content-type':'application/json'
            },
            method:'POST',
            body:JSON.stringify(obj)
        }).then(resp=>{
            if(resp.status>=200 && resp.status<400){
                newModalContent.innerHTML= messageText.success
            }else{
                throw Error
            }

            }
        ).catch((e)=>{
            newModalContent.innerHTML= messageText.error
        })



    })
}


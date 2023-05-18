const Slider = function (sliderId) {
    this.container = document.getElementById(sliderId);
    this.wrapper = this.container.querySelector('.slider__wrapper');
    this.nextButton = this.container.querySelector('.slider__button-next');
    this.prevButton = this.container.querySelector('.slider__button-prev');
    this.lastSlideButton = this.container.querySelector('.lastSlide');
    this.firstSlideButton = this.container.querySelector('.firstSlide');
    this.openSlideByIndexButton = this.container.querySelector('.openSlideByIndex');
    this.addSlideButton = this.container.querySelector('.addSlide');
    this.insertSlideButton = this.container.querySelector('.insertSlide');
    this.removeLastSlideButton = this.container.querySelector('.removeLastSlide');
    this.removeSlideButton = this.container.querySelector('.removeSlide');


    this.currentSlide = 0;

    this.slideWidth = this.wrapper.children[0].offsetWidth

    this.slide = () => {
        const translate = this.currentSlide * this.slideWidth * -1;
        this.wrapper.style.transform = `translateX(${translate}px)`;
    }

    this.slideCard = () => {
        const title = prompt('Укажите название слайда');
        if (!title) {
            alert('вы ввели пустое значение');
            return;
        }
        const text = prompt('Укажите текст слайда');
        if (!text) {
            alert('вы ввели пустое значение');
            return;
        }
        const img = prompt('введите ссылку на картинку');
        if (!img) {
            alert('вы ввели пустое значение');
            return;
        }
        return {
            title: title,
            text: text,
            img: img
        }
    }

    this.slideNext = () => {
        if (this.currentSlide > this.wrapper.children.length - 2) {
            this.firstSlide();
            return
        }
        this.currentSlide++;
        this.slide();
    }

    this.slidePrev = () => {
        if (this.currentSlide <= 0) {
            this.lastSlide();
            return
        }
        this.currentSlide--;
        this.slide();
    }

    this.lastSlide = () => {
        this.currentSlide = this.wrapper.children.length - 1;
        this.slide();
    }

    this.firstSlide = () => {
        this.currentSlide = 0;
        this.slide();
    }

    this.openSlideByIndex = () => {
        const numberSlide = prompt('Какой номер слайда вам нужен?')
        if (isNaN(numberSlide)) {
            alert('Вы ввели не число!!!');
            return;
        }
        if (numberSlide < 1) {
            alert('нельзя ввести число меньше 1');
            return;
        }
        if (this.wrapper.children.length < numberSlide) {
            alert('нет такого номера слайда');
            return;
        }
        this.currentSlide = numberSlide - 1;
        this.slide();
    }

    this.addSlide = () => {
        const data = this.slideCard()

        const slideLayout = `<div class="slider__slide">
            <img src="${data.img}" alt="">
            <h2 class="slider__slide-title">
                ${data.title}
            </h2>
            <p class="slider__slide-text">
                ${data.text}
            </p>
        </div>`;

        this.wrapper.innerHTML += slideLayout;
        this.lastSlide();
    }

    this.insertSlide = () => {
        const numberSlide = prompt('На какой номер установить слайд??')
        if (isNaN(numberSlide)) {
            alert('Вы ввели не число!!!');
            return;
        }
        if (numberSlide < 1) {
            alert('нельзя ввести число меньше 1');
            return;
        }
        if (this.wrapper.children.length < numberSlide) {
            alert('данное число больше количества слайдов');
            return;
        }
        const data = this.slideCard()
        const slideLayout = `
            <img src="${data.img}" alt="">
            <h2 class="slider__slide-title">
                ${data.title}
            </h2>
            <p class="slider__slide-text">
                ${data.text}
            </p>`;
        const newSlide = document.createElement('div');
        newSlide.classList.add('slider__slide');
        newSlide.innerHTML = slideLayout;
        this.wrapper.insertBefore(newSlide, this.wrapper.children[numberSlide - 1]);
        this.currentSlide = numberSlide - 1;
        this.slide();


    }

    this.removeLastSlide = () => {
        this.wrapper.removeChild(this.wrapper.children[this.wrapper.children.length - 1]);
        alert('Удалено');
    }

    this.removeSlide = () => {
        const numberSlide = prompt('Какой номер слайда вам нужено удалить?');
        if (isNaN(numberSlide)) {
            alert('Вы ввели не число!!!');
            return;
        }
        if (numberSlide < 1) {
            alert('нельзя ввести число меньше 1');
            return;
        }
        if (this.wrapper.children.length < numberSlide) {
            alert('нет такого номера слайда');
            return;
        }
        this.wrapper.removeChild(this.wrapper.children[numberSlide - 1]);
        alert('Удалено');
    }

    this.nextButton.addEventListener('click', this.slideNext);
    this.prevButton.addEventListener('click', this.slidePrev);
    this.lastSlideButton.addEventListener('click', this.lastSlide);
    this.firstSlideButton.addEventListener('click', this.firstSlide);
    this.openSlideByIndexButton.addEventListener('click', this.openSlideByIndex);
    this.addSlideButton.addEventListener('click', this.addSlide);
    this.insertSlideButton.addEventListener('click', this.insertSlide);
    this.removeLastSlideButton.addEventListener('click', this.removeLastSlide);
    this.removeSlideButton.addEventListener('click', this.removeSlide);

}
new Slider('slider')
new Slider('slider1')



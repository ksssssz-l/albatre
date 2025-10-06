class Slider {
    constructor(target) {
        this.slider = document.querySelector(target);
        if (!this.slider) return;

        this.track = this.slider.querySelector('.m-slider-wrapper__track');
        this.slides = this.slider.querySelectorAll('.a-slider-wrapper-track__slide');
        this.dotsContainer = this.slider.querySelector('.slider-dots');

        this.currentIndex = 0;
        this.isAnimating = false;

        console.log(`Nouveau slider initialisé avec ${this.slides.length} slides`);

        this.init();
    }

    init() {
        this.setupDimensions();
        this.createDots();
        this.updateSlider();
        
        this.track.addEventListener('transitionend', () => {
            this.isAnimating = false;
        });

        window.addEventListener('resize', () => {
            this.setupDimensions();
            this.updateSlider();
        });
    }

    setupDimensions() {
        const slideCount = this.slides.length;
        const slideWidth = 100 / slideCount;
        
        this.track.style.width = `${slideCount * 100}%`;
        
        this.slides.forEach(slide => {
            slide.style.width = `${slideWidth}%`;
        });
        
        console.log(`Slider configuré pour ${slideCount} slides, largeur par slide: ${slideWidth}%`);
    }

    createDots() {
        this.slides.forEach((slide, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => this.goTo(index));
            this.dotsContainer.appendChild(dot);
        });
    }

    updateSlider() {
        const slidePercentage = 100 / this.slides.length;
        const translateX = -this.currentIndex * slidePercentage;
        
        this.track.style.transform = `translateX(${translateX}%)`;
        
        console.log(`Slide ${this.currentIndex}/${this.slides.length - 1} - Transform: ${translateX}%`);
        
        this.updateDots();
    }

    updateDots() {
        const dots = this.dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            if (index === this.currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    goTo(index) {
        if (this.isAnimating) return;
        if (index < 0 || index >= this.slides.length) return;
        
        this.isAnimating = true;
        this.currentIndex = index;
        this.updateSlider();
    }

    prevSlide() {
        const newIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.slides.length - 1;
        this.goTo(newIndex);
    }

    nextSlide() {
        const newIndex = this.currentIndex < this.slides.length - 1 ? this.currentIndex + 1 : 0;
        this.goTo(newIndex);
    }
}

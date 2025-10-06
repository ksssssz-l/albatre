class Header {
    constructor(target) {
        this.target = document.querySelector(target);
        if (!this.target) return;

        this.newHeader = document.querySelector('.o-header-nav.fixed');
        if (!this.newHeader) return;
        
        this.scrollTrigger = 90;
        this.isScrolled = false;
        this.ticking = false;

        this.init();
    }

    init() {
        console.log('Header initialisé');
        this.visible();
    }

    visible() {
        const handleScroll = () => {
            if (!this.ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY;

                    if (scrollY >= this.scrollTrigger && !this.isScrolled) {
                        this.showFixedHeader();
                    } else if (scrollY < this.scrollTrigger && this.isScrolled) {
                        this.hideFixedHeader();
                    }

                    this.ticking = false;
                });
                this.ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    showFixedHeader() {
        this.isScrolled = true;
        
        this.target.style.transition = 'all 0.3s ease';
        this.target.classList.add('hidden');
        
        this.newHeader.classList.remove('hidden');        
        requestAnimationFrame(() => {
            this.newHeader.classList.add('scrolled');
        });
    }

    hideFixedHeader() {
        this.isScrolled = false;
        this.newHeader.classList.remove('scrolled');
        setTimeout(() => {
            if (!this.isScrolled) {
                this.newHeader.classList.add('hidden');
                this.target.classList.remove('hidden');
            }
        }, 400);
    }
}
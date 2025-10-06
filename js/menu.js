class Menu {
    constructor(target) {
        this.target = document.querySelector(target);
        this.target2 = document.querySelector('.a-header-nav-item__link.fixed');
        this.menu = document.querySelector('.o-menu');
        

        this.hideTimeout = null;
        this.currentMode = 'normal';
        
        if (!this.target) {
            console.error('Target element not found:', target);
            return;
        }
        
        if (!this.menu) {
            console.error('Menu element (.o-menu) not found');
            return;
        }

        this.init();
    }

    init() {
        console.log("Menu initialized");
        
        this.target.addEventListener('mouseenter', this.handleNormalEnter.bind(this));
        this.target.addEventListener('mouseleave', this.handleNormalLeave.bind(this));

        if (this.target2) {
            this.target2.addEventListener('mouseenter', this.handleFixedEnter.bind(this));
            this.target2.addEventListener('mouseleave', this.handleFixedLeave.bind(this));
        }

        this.menu.addEventListener('mouseenter', this.handleMenuEnter.bind(this));
        this.menu.addEventListener('mouseleave', this.handleMenuLeave.bind(this));
    }

    handleNormalEnter() {
        this.cancelHideTimer();
        this.currentMode = 'normal';
        this.showMenu();
    }

    handleFixedEnter() {
        this.cancelHideTimer();
        this.currentMode = 'fixed';
        this.showMenuFixed();
    }

    handleMenuEnter() {
        this.cancelHideTimer();
        if (this.currentMode === 'fixed') {
            this.showMenuFixed();
        } else {
            this.showMenu();
        }
    }

    handleNormalLeave() {
        this.delayHide();
    }

    handleFixedLeave() {
        this.delayHide();
    }

    handleMenuLeave() {
        this.delayHide();
    }

    showMenu() {
        this.menu.classList.add('active');
        this.menu.classList.remove('fixed-position');
        console.log("Menu shown");
    }

    showMenuFixed() {
        this.menu.classList.add('active');
        this.menu.classList.add('fixed-position');
        console.log("Menu shown from fixed");
    }

    hideMenu() {
        this.menu.classList.remove('active');
        this.menu.classList.remove('fixed-position');
        console.log("Menu hidden");
    }

    delayHide() {
        this.hideTimeout = setTimeout(() => {
            if (!this.isMouseOverMenuArea()) {
                this.hideMenu();
            }
        }, 300);
    }

    cancelHideTimer() {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
    }

    isMouseOverMenuArea() {
        return false;
    }
}
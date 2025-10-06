class SliderPubli {
    constructor(target) {
        this.slider = document.querySelector(target);
        if (!this.slider) return;

        this.currentIndex = 0;
        this.publications = this.slider.querySelectorAll('.a-publication-card');
        this.prevBtn = this.slider.querySelector('.a-publication-control.prev');
        this.nextBtn = this.slider.querySelector('.a-publication-control.next');
        this.titleElement = this.slider.querySelector('.a-publication-title');
        this.textElement = this.slider.querySelector('.a-publication-text');
        this.publicationsData = [
            {
                title: "Magazine Côte d'Albâtre et Vous n°11",
                description: "Découvrez votre magazine communautaire avec toute l'actualité locale."
            },
            {
                title: "Magazine Côte d'Albâtre et Vous n°10", 
                description: "Retrouvez les dernières nouvelles de votre territoire."
            },
            {
                title: "Mémo Infos Rentrée 2024-2025",
                description: "Toutes les informations pratiques pour bien préparer la rentrée scolaire."
            },
            {
                title: "Guide des déchets ménagers",
                description: "Votre guide complet pour le tri sélectif."
            }
        ];
        this.init();
    }

    init() {
        console.log('Nouveau slider publi initialisé');

        if (this.publications.length === 0) {
            console.warn('Aucune publication trouvée dans le slider.');
            return;
        }

        this.setupInitialPositions();
        this.bindEvents();
        this.updateContent();
    }


    setupInitialPositions() {
        this.publications.forEach((pub, index) => {
            pub.classList.remove('position-1', 'position-2', 'position-3', 'position-4', "active");

            const positions = ['position-1', 'position-2', 'position-3', 'position-4'];
            if (positions[index]) {
                pub.classList.add(positions[index]);
            }
        });

        if (this.publications[0]) {
            this.publications[0].classList.add('active');
        }
    }

    bindEvents() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.goToPrevious());
            console.log('Nouveau slider publi initialisé');

        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.goToNext());
            console.log('Nouveau slider publi initialisé');
        }

    }

    goToPrevious() {
        this.currentIndex = this.currentIndex === 0 ? this.publications.length - 1 : this.currentIndex - 1;
        this.updateSlider();
    }

    goToNext(){
        this.currentIndex = this.currentIndex === this.publications.length -1 ? 0 : this.currentIndex + 1;
        this.updateSlider();
    }

    updateSlider() {
        this.publications.forEach((pub, index) => {
            const relativePosition = (index - this.currentIndex + this.publications.length) % this.publications.length;

            pub.classList.remove('position-1', 'position-2', 'position-3', 'position-4', 'active');

            const positionClasses = ['position-1', 'position-2', 'position-3', 'position-4'];
            if (positionClasses[relativePosition]) {
                pub.classList.add(positionClasses[relativePosition]);
            }
        });

        if (this.publications[this.currentIndex]) {
            this.publications[this.currentIndex].classList.add('active');
        }

        this.updateContent();
    }

    updateContent() {
        const activePublication = this.publicationsData[this.currentIndex];

        if (!activePublication) return;

        if (this.titleElement) {
            this.titleElement.textContent = activePublication.title;
        }

        if (this.textElement) {
            this.textElement.textContent = activePublication.description;
        }
    }
}

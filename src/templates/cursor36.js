import { curs_Span1, curs_SpanNoDelay } from "../creator.js";
import Template from "./template.js";

// CSS Needed
const cursorCSS = {
    name: 'cjs-36',
    cssString: `
    .cjs-36 {
        position: absolute;
        display: block;
        top: 0;
        bottom: 0;
        pointer-events: none;
        mix-blend-mode: difference;
    }

    .cjs-36-trail-span {
        width: 40px;
        height: 40px;
        background-color: var(--bg-color);
        border-radius: 50%;
        
        transform: translate(-50%, -50%) scale(var(--scale));
    }

    .cjs-36-trail-span.cjs-normal {
        transition: transform 0.2s ease;
    }

    .cjs-36-trail-span.cjs-delay {
        transition: transform 0.2s ease, translate 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }

    
    `,
}

class cursor extends Template {
    constructor() {
        super();
        this.css = cursorCSS;

        // Trail
        this.zIndex;
        this.color;
        this.trailContainer;
        this.trailElements = [];

        this.trailScaleFactor = 1;

        // Animation
        this.isAnimating = false;

        // Client X
        this.clientX = 0;
        this.clientY = 0;
    }

    // Animations
    // Animation logic for intervals etc
    animateTrail() {
        if (!this.isActive) return;        
        
        if (!this.isAnimating) {
            this.isAnimating = true;

            let trailElementsX = this.clientX;
            let trailElementsY = this.clientY;
    
            this.trailElements.forEach((trailElement, index) => {
                trailElement.style.translate = `${trailElementsX}px ${trailElementsY}px`;

                trailElement.style.setProperty('--x', trailElementsX);
                trailElement.style.setProperty('--y', trailElementsY);

                const scalVal = (index / this.trailElements.length);
                trailElement.style.setProperty('--scale', scalVal * this.trailScaleFactor);

                const nextIndex = (index + 1) % this.trailElements.length;
                const nextTrailElement = this.trailElements[nextIndex];
                const nextTrailElementX = nextTrailElement.style.getPropertyValue('--x');
                const nextTrailElementY = nextTrailElement.style.getPropertyValue('--y');

                trailElementsX += (nextTrailElementX - trailElementsX) * 25/100;
                trailElementsY += (nextTrailElementY - trailElementsY) * 25/100;
    
            })
    
            this.isAnimating = false;
            requestAnimationFrame(() => this.animateTrail())
        }
    }

    createTrailElements(delay) {
        this.trailContainer = curs_Span1({zIndex: this.zIndex, classes: 'cjs-36'})

        for (let i = 0; i < 10; i++) {
            // let trailSpan = curs_SpanNoDelay({color: this.color, classes: 'cjs-span cjs-36-trail-span', parent: this.trailContainer});
            let trailSpan = curs_Span1({color: this.color, zIndex: this.zIndex, classes: 'cjs-span cjs-36-trail-span', parent: this.trailContainer, delay: delay})

            trailSpan.style.setProperty('--x', 0);
            trailSpan.style.setProperty('--y', 0);
    
            this.trailElements.push(trailSpan);
        }
    }

    create({color, zIndex, delay}) {
        color = color ? color[0] : "#FFF";
        this.color = color;
        this.zIndex = zIndex;
        this.createTrailElements(delay);
    }

    activate(event) {
        this.trailContainer.style.display = '';

        this.trailElements.forEach(element => {
            element.style.translate = `${event.clientX}px ${event.clientY}px`;
            element.style.display = '';
            element.style.transition = '';

            element.style.setProperty('--x', event.clientX);
            element.style.setProperty('--y', event.clientY);
        })

        this.clientX = event.clientX;
        this.clientY = event.clientY;

        this.isActive = true;
        this.animateTrail(event);
    }

    deactivate() {
        this.trailContainer.style.display = 'none';

        this.trailElements.forEach(element => {
            element.style.display = 'none';
            element.style.transition = 'none';
        })

        this.isActive = false;
    }

    onMouseMove(event) {
        this.clientX = event.clientX;
        this.clientY = event.clientY;
    
        clearTimeout(this.stopAnimationTimeout);
        this.isActive = true;

        this.stopAnimationTimeout = setTimeout(() => {
            this.isActive = false;
        }, 100);
    }
    
    // On Mouse down 
    onButtonOver() {
        this.trailElements.forEach((element, index) => {
            const scalVal = (index / this.trailElements.length);
            this.trailScaleFactor = 0.5;
            element.style.setProperty('--scale', scalVal * this.trailScaleFactor);
        });
    }

    onButtonOut() {
        this.trailElements.forEach((element, index) => {
            const scalVal = (index / this.trailElements.length);
            this.trailScaleFactor = 1;
            element.style.setProperty('--scale', scalVal * this.trailScaleFactor);
        });
    }

    onImageOver() {
        this.trailElements.forEach((element, index) => {
            const scalVal = (index / this.trailElements.length);
            this.trailScaleFactor = 0.5;
            element.style.setProperty('--scale', scalVal * this.trailScaleFactor);
        });
    }

    onImageOut() {
        this.trailScaleFactor = 1;
    }

    onMouseDown() {
        this.trailElements.forEach((element, index) => {
            const scalVal = (index / this.trailElements.length);
            this.trailScaleFactor = 1.5;
            element.style.setProperty('--scale', scalVal * this.trailScaleFactor);
        });
    }

    onMouseUp() {
        this.trailElements.forEach((element, index) => {
            const scalVal = (index / this.trailElements.length);
            this.trailScaleFactor = 1;
            element.style.setProperty('--scale', scalVal * this.trailScaleFactor);
        });
    }

    deleteTrailElements() {
        this.trailElements.forEach(element => {
            element.remove();
        });

        this.trailElements.length = 0;

        this.trailContainer.remove();
        this.trailContainer = null;
    }

    // User functions
    delete() {
        this.deactivate();
        this.css = null;

        this.deleteTrailElements();
        this.trailElements = null;
        this.zIndex = null;
        this.color = null;
        this.trailElements = null;
        this.trailScaleFactor = null;

        this.isAnimating = null;

        this.clientX = null;
        this.clientY = null;
        this.isActive = null;
        delete this;
    }
}


export {cursor}
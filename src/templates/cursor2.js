import { curs_Span1 } from "../creator.js";
import Template from "./template.js";


// CSS Needed
const cursorCSS = {
    name: 'cjs-2',
    cssString: `
    .cjs-2 {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 1px solid var(--bg-color);
    }

    .cjs-2.cjs-normal {
        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease;
    }

    .cjs-2.cjs-delay {
        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease, translate 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .cjs-2.button {
        transform: translate(-50%, -50%) scale(0.5);
    }

    .cjs-2.image {
        transform: translate(-50%, -50%) scale(0.5);
    }

    .cjs-2.click {
        transform: translate(-50%, -50%) scale(1.5);
    }
    `,
}

export class cursor extends Template {
    constructor() {
        super();
        this.css = cursorCSS;
        this.cursor1 = null;
    }

    create({color, zIndex, delay}) {
        color = color ? color[0] : "#000";
        this.cursor1 = curs_Span1({zIndex, color, classes: 'cjs-span cjs-2', delay});
    }

    activate(event) {
        this.cursor1.style.translate = `${event.clientX}px ${event.clientY}px`;
        this.cursor1.style.display = '';
        this.cursor1.style.transition = '';
        this.isActive = true;
    }

    deactivate() {
        this.cursor1.style.display = 'none';
        this.cursor1.style.transition = 'none';
        this.isActive = false;
    }

    onMouseMove(event) {
        this.cursor1.style.translate = `${event.clientX}px ${event.clientY}px`;
    }
    
    // On Mouse down 
    onButtonOver() {
        this.cursor1.classList.add('button');
    }

    onButtonOut() {
        this.cursor1.classList.remove('button');
    }

    onImageOver() {
        this.cursor1.classList.add('image');
    }

    onImageOut () {
        this.cursor1.classList.remove('image');
    }

    onMouseDown () {
        this.cursor1.classList.add('click');
    }

    onMouseUp () {
        this.cursor1.classList.remove('click');
    }
    
    // Delete function
    delete() {
        this.deactivate();
        this.cursor1.remove();
        this.cursor1 = null;
        this.css = null;
        this.isActive = null;
    }
}
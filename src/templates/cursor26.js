import { curs_Span1 } from "../creator.js";
import Template from "./template.js";

// CSS Needed
const cursorCSS = {
    name: 'cjs-26',
    cssString: `
    .cjs-26 {
        background-color: var(--bg-color);
        width: 20px;
        height: 20px;
        border-top-right-radius: 50%;
        border-bottom-left-radius: 50%;
        border-bottom-right-radius: 50%;
        transform-origin: top left;

    }

    .cjs-26.cjs-normal {
        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease;
    }

    .cjs-26.cjs-delay {
        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease, translate 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .cjs-26.button {
        transform: rotate(45deg);
    }

    .cjs-26.image {
        transform: scale(1.2);
    }

    .cjs-26.click {
        transform: rotate(45deg) scale(1.2);
    }
    `,
}

export class cursor extends Template {
    constructor(){
        super();
        this.css = cursorCSS;
        this.isActive = false;
        this.cursor1 = null;    
    }

    create({color, zIndex, delay}) {
        color = color ? color[0] : "#000";
        this.cursor1 = curs_Span1({zIndex, color: color, classes: 'cjs-span-no-center cjs-26', delay});
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

    onImageOut() {
        this.cursor1.classList.remove('image');
    }

    onMouseDown() {
        this.cursor1.classList.add('click');
    }

    onMouseUp() {
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
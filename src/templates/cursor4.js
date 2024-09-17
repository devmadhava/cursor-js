import { curs_Span1 } from "../creator.js";
import Template from "./template.js";


// CSS Needed
const cursorCSS = {
    name: 'cjs-4',
    cssString: `
    .cjs-4 {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 1px dashed var(--bg-color);
    }

    .cjs-4.cjs-normal {
        transition: width 0.2s ease, height 0.2s ease;
    }

    .cjs-4.cjs-delay {
        transition: width 0.2s ease, height 0.2s ease, translate 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .cjs-4.button {
        width: 75px;
        height: 75px;
        animation: cjs-4-rotating-animation 4s infinite linear;
    }

    .cjs-4.image {
        animation: cjs-4-rotating-animation 0.4s infinite linear;
    }

    .cjs-4.click {
        width: 45px;
        height: 45px;
    }

    @keyframes cjs-4-rotating-animation {
        0% {
            transform: translate(-50%, -50%) rotate(0deg);
        }

        100% {
            transform: translate(-50%, -50%) rotate(360deg);
        }
    }
    `,
}


export class cursor extends Template {
    constructor(){
        super()
        this.css = cursorCSS
        this.isActive = false
        this.pause = false
        this.cursor1 = null
    }

    create({color, zIndex, delay}) {
        color = color ? color[0] : "#000";
        this.cursor1 = curs_Span1({zIndex, color, classes: 'cjs-span cjs-4', delay});
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
        if (this.pause) return;
        this.cursor1.style.translate = `${event.clientX}px ${event.clientY}px`;
    }
    
    // On Mouse down 
    onButtonOver(event) {
        this.cursor1.classList.add('button');

        const targetRect = event.target.getBoundingClientRect();
        const size = Math.max(parseInt(targetRect.width), parseInt(targetRect.height)) + 20;

        this.cursor1.style.width = size + 'px';
        this.cursor1.style.height = size + 'px';

        const x = targetRect.left + targetRect.width / 2;
        const y = targetRect.top + targetRect.height / 2;
        this.cursor1.style.translate = `${x}px ${y}px`;

        this.pause = true;
    }

    onButtonOut() {
        this.cursor1.classList.remove('button');

        this.cursor1.style.width = '';
        this.cursor1.style.height = '';

        this.pause = false;
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
        this.pause = null;
    }
}
import { curs_SpanNoDelay } from "../creator.js";
import Template from "./template.js";


// CSS Needed
const cursorCSS = {
    name: 'cjs-5',
    cssString: `
    .cjs-5-1 {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 1px solid var(--bg-color);
        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease, translate 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .cjs-5-1.button {
        transform: translate(-50%, -50%) scale(1.25);
    }

    .cjs-5-1.image {
        transform: translate(-50%, -50%) scale(1.25);
    }

    .cjs-5-1.click {
        transform: translate(-50%, -50%) scale(0.8);
    }

    .cjs-5-2 {
        background-color: var(--bg-color);
        width: 10px;
        height: 10px;
        border-radius: 50%;
        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease;
    }

    .cjs-5-2.button {
        transform: translate(-50%, -50%) scale(0.5);
    }

    .cjs-5-2.image {
        transform: translate(-50%, -50%) scale(0.5);
    }

    .cjs-5-2.click {
        transform: translate(-50%, -50%) scale(1.5);
    }
    `,
}


export class cursor extends Template {

    constructor(){
        super();
        this.css = cursorCSS
        this.isActive = false
        this.cursor1 = null
        this.cursor2 = null
    }
    create({color, zIndex}) {
        const [color1, color2] = color || ["#000", "#000"];
        this.cursor1 = curs_SpanNoDelay({zIndex, color: color1 || "#000", classes: 'cjs-span cjs-5-1'});
        this.cursor2 = curs_SpanNoDelay({zIndex, color: color2 || "#000", classes: 'cjs-span cjs-5-2'});
    }

    activate(event) {
        this.cursor1.style.translate = `${event.clientX}px ${event.clientY}px`;
        this.cursor1.style.display = '';
        this.cursor1.style.transition = '';

        this.cursor2.style.translate = `${event.clientX}px ${event.clientY}px`;
        this.cursor2.style.display = '';
        this.cursor2.style.transition = '';

        this.isActive = true;
    }

    deactivate() {
        this.cursor1.style.display = 'none';
        this.cursor1.style.transition = 'none';

        this.cursor2.style.display = 'none';
        this.cursor2.style.transition = 'none';

        this.isActive = false;
    }

    onMouseMove(event) {
        this.cursor1.style.translate = `${event.clientX}px ${event.clientY}px`;
        this.cursor2.style.translate = `${event.clientX}px ${event.clientY}px`;
    }
    
    // On Mouse down 
    onButtonOver() {
        this.cursor1.classList.add('button');
        this.cursor2.classList.add('button');
    }

    onButtonOut() {
        this.cursor1.classList.remove('button');
        this.cursor2.classList.remove('button');
    }

    onImageOver() {
        this.cursor1.classList.add('image');
        this.cursor2.classList.add('image');
    }

    onImageOut() {
        this.cursor1.classList.remove('image');
        this.cursor2.classList.remove('image');
    }

    onMouseDown() {
        this.cursor1.classList.add('click');
        this.cursor2.classList.add('click');
    }

    onMouseUp() {
        this.cursor1.classList.remove('click');
        this.cursor2.classList.remove('click');
    }
    
    // Delete function
    delete() {
        this.deactivate();
        this.cursor1.remove();
        this.cursor2.remove();
        this.cursor1 = null;
        this.cursor2 = null;
        this.css = null;
        this.isActive = null;
    }
}
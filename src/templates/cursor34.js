import { curs_Span1 } from "../creator.js";
import { curs_centerAnElementToTarget } from "../helper.js";
import Template from "./template.js";


// CSS Needed
const cursorCSS = {
    name: 'cjs-34',
    cssString: `
    .cjs-34 {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: var(--bg-color);
        filter: blur(30px);
    }

    .cjs-34.cjs-normal {
        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease;
    }

    .cjs-34.cjs-delay {
        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease, translate 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .cjs-34.button {
        transform: translate(-50%, -50%) scale(1.25);
    }

    .cjs-34.image {
        transform: translate(-50%, -50%) scale(1.25);
    }

    .cjs-34.click {
        transform: translate(-50%, -50%) scale(0.8);
    }
    `,
}


export class cursor extends Template {
    constructor(){
        super();
        this.css = cursorCSS;
        this.cursor1 = null;
        this.pause = false;
    }

    create({color, zIndex, delay}) {
        color = color ? color[0] : "#FFF";
        this.cursor1 = curs_Span1({zIndex, color, classes: 'cjs-span cjs-34', delay});
    }

    activate (event) {
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
        if (!this.pause) {
            this.cursor1.style.translate = `${event.clientX}px ${event.clientY}px`;
        }
    }
    
    // On Mouse down 
    onButtonOver(event) {
        this.cursor1.classList.add('button');

        curs_centerAnElementToTarget(this.cursor1, event.target)

        this.pause = true;

    }

    onButtonOut() {
        this.cursor1.classList.remove('button');

        // Unpause
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
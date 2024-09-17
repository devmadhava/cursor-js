import { curs_SpanNoDelay } from "../creator.js";
import { curs_centerAnElementToTarget } from "../helper.js";
import Template from "./template.js";


// CSS Needed
const cursorCSS = {
    name: 'cjs-31',
    cssString: `
    .cjs-31-1 {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: var(--bg-color);

        mix-blend-mode: difference;

        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease, translate 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .cjs-31-1.image {
        transform: translate(-50%, -50%) scale(1.25);
    }

    .cjs-31-1.click {
        transform: translate(-50%, -50%) scale(0.8);
    }

    .cjs-31-2 {
        background-color: var(--bg-color);
        width: 10px;
        height: 10px;
        border-radius: 50%;

        mix-blend-mode: difference;

        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease;
    }

    .cjs-31-2.button {
        transform: translate(-50%, -50%) scale(0.5);
    }

    .cjs-31-2.image {
        transform: translate(-50%, -50%) scale(0.5);
    }

    .cjs-31-2.click {
        transform: translate(-50%, -50%) scale(1.5);
    }
    `,
}


class cursor extends Template {
    constructor() {
        super();
        this.css = cursorCSS;
        this.cursor1 = null;
        this.cursor2 = null;
        this.pause = false;
    }

    create({color, zIndex}) {
        const [color1, color2] = color || ["#FFF", "#FFF"];
        this.cursor1 = curs_SpanNoDelay({zIndex, color: color1 || "#000", classes: 'cjs-span cjs-31-1'});
        this.cursor2 = curs_SpanNoDelay({zIndex, color: color2 || "#000", classes: 'cjs-span cjs-31-2'});
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
        if (!this.pause) {
            this.cursor1.style.translate = `${event.clientX}px ${event.clientY}px`;
        }

        this.cursor2.style.translate = `${event.clientX}px ${event.clientY}px`;
    }
    
    // On Mouse down 
    onButtonOver(event) {
        this.cursor2.classList.add('button');

        curs_centerAnElementToTarget(this.cursor1, event.target);

        this.pause = true;
    }

    onButtonOut(event) {
        this.cursor2.classList.remove('button');

        // Unpause
        this.cursor1.style.width = '';
        this.cursor1.style.height = '';

        this.pause = false;
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
        this.pause = null;
    }
}


export {cursor}
import { curs_Span1, curs_SpanNoBGNoDelay } from "../creator.js";
import { curs_colorToRGB } from "../helper.js";
import Template from "./template.js";


// CSS Needed
const cursorCSS = {
    name: 'cjs-25',
    cssString: `
    .cjs-25-2 {
        background-color: var(--bg-color);
        width: 60px;
        height: 60px;
        border-radius: 50%;

        backdrop-filter: blur(5px);
        background: rgba(var(--r), var(--g), var(--b), 0.3);
        border: 1px solid rgba(var(--r), var(--g), var(--b), 0.4);

        -webkit-box-shadow: 0px 10px 15px -1px rgba(0,0,0,0.21);
        -moz-box-shadow: 0px 10px 15px -1px rgba(0,0,0,0.21);
        box-shadow: 0px 10px 15px -1px rgba(0,0,0,0.21);

        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease, translate 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .cjs-25-2.button {
        transform: translate(-50%, -50%) scale(0.8);
    }

    .cjs-25-2.image {
        transform: translate(-50%, -50%) scale(1.2);
    }

    .cjs-25-2.click {
        transform: translate(-50%, -50%) scale(0.6);
    }

    .cjs-25-2.click > .cjs-25-2-span {
        animation-play-state: paused;
    }

    .cjs-25-1 {
        background-color: var(--bg-color);
        width: 10px;
        height: 10px;
        border-radius: 50%;
    }

    .cjs-25-1.cjs-normal {
        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease;
    }

    .cjs-25-1.cjs-delay {
        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease, translate 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .cjs-25-1.button {
        transform: translate(-50%, -50%) scale(0.5);
    }

    .cjs-25-1.image {
        transform: translate(-50%, -50%) scale(0.5);
    }

    .cjs-25-1.click {
        transform: translate(-50%, -50%) scale(1.5);
    }

    @keyframes cjs-25-2-expand-anim {
        0% {
            width: 0%;
            height: 0%;
        }

        100% {
            width: 100%;
            height: 100%;
        }
    }
    `,
}

export class cursor extends Template {
    constructor() {
        super();
        this.css = cursorCSS;
        this.isActive = false;
        this.cursor1 = null;
        this.cursor2 = null;
    }

    create({color, zIndex}) {
        const [color1, color2] = color || ["#000", "#FFF"];
        this.cursor1 = curs_Span1({zIndex, color: color1 || '#000', classes: 'cjs-span cjs-25-1'});
        this.cursor2 = curs_SpanNoBGNoDelay({zIndex, classes: 'cjs-span cjs-25-2'});

        const [r, g, b] = curs_colorToRGB(color2 || '#FFF');
        this.cursor2.style.setProperty('--r', r);
        this.cursor2.style.setProperty('--g', g);
        this.cursor2.style.setProperty('--b', b);
    }

    activate(event) {
        this.cursor2.style.translate = `${event.clientX}px ${event.clientY}px`;
        this.cursor2.style.display = '';
        this.cursor2.style.transition = '';

        this.cursor1.style.translate = `${event.clientX}px ${event.clientY}px`;
        this.cursor1.style.display = '';
        this.cursor1.style.transition = '';

        this.isActive = true;
    }

    deactivate() {
        this.cursor2.style.display = 'none';
        this.cursor2.style.transition = 'none';

        this.cursor1.style.display = 'none';
        this.cursor1.style.transition = 'none';

        this.isActive = false;
    }

    onMouseMove(event) {
        this.cursor2.style.translate = `${event.clientX}px ${event.clientY}px`;
        this.cursor1.style.translate = `${event.clientX}px ${event.clientY}px`;
    }
    
    // On Mouse down 
    onButtonOver() {
        this.cursor2.classList.add('button');
        this.cursor1.classList.add('button');
    }

    onButtonOut() {
        this.cursor2.classList.remove('button');
        this.cursor1.classList.remove('button');
    }

    onImageOver() {
        this.cursor2.classList.add('image');
        this.cursor1.classList.add('image');
    }

    onImageOut() {
        this.cursor2.classList.remove('image');
        this.cursor1.classList.remove('image');
    }

    onMouseDown() {
        this.cursor2.classList.add('click');
        this.cursor1.classList.add('click');
    }

    onMouseUp() {
        this.cursor2.classList.remove('click');
        this.cursor1.classList.remove('click');
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
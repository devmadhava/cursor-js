import { curs_Span1 } from "../creator.js";
import { curs_invertColorRGBFormat } from "../helper.js";

// CSS Needed
const cursorCSS = {
    name: 'cjs-28',
    cssString: `
    .cjs-28 {
        width: 20px;
        height: 20px;

        pointer-events: none;
        z-index: 20;

        border-top-right-radius: 50%;
        border-top-left-radius: 0%;
        border-bottom-right-radius: 50%;
        border-bottom-left-radius: 50%;
    
        background-color: var(--invert-color);
        border: 1px solid var(--invert-color);

        transform-origin: top left;
    }

    .cjs-28::after {
        content: '';
        display: block;
        position: absolute;

        background-color: var(--bg-color);

        width: 20px;
        height: 20px;
        border-top-right-radius: 50%;
        border-bottom-left-radius: 50%;
        border-bottom-right-radius: 50%;
    }

    .cjs-28.cjs-normal {
        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease;
    }

    .cjs-28.cjs-delay {
        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease, translate 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .cjs-28.button {
        transform: rotate(45deg);
    }

    .cjs-28.image {
        transform: scale(1.2);
    }

    .cjs-28.click {
        transform: rotate(45deg) scale(1.2);
    }
    `,
}

export const cursor = {

    css: cursorCSS,

    isActive: false,

    cursor1: null,

    create: function ({color, zIndex, delay}) {
        color = color ? color[0] : "#000";
        const invertColor = curs_invertColorRGBFormat(color, 0.2);

        this.cursor1 = curs_Span1({zIndex, color: color, classes: 'cjs-span-no-center cjs-28', delay});
        this.cursor1.style.setProperty('--invert-color', invertColor);

    },

    activate: function (event) {
        this.cursor1.style.translate = `${event.clientX}px ${event.clientY}px`;
        this.cursor1.style.display = '';
        this.cursor1.style.transition = '';

        this.isActive = true;
    },

    deactivate: function () {
        this.cursor1.style.display = 'none';
        this.cursor1.style.transition = 'none';
        this.isActive = false;
    },

    onMouseMove: function (event) {
        this.cursor1.style.translate = `${event.clientX}px ${event.clientY}px`;
    },
    
    // On Mouse down 
    onButtonOver: function () {
        this.cursor1.classList.add('button');
    },

    onButtonOut: function () {
        this.cursor1.classList.remove('button');
    },

    onImageOver: function () {
        this.cursor1.classList.add('image');
    },

    onImageOut: function () {
        this.cursor1.classList.remove('image');
    },

    onMouseDown: function () {
        this.cursor1.classList.add('click');
    },

    onMouseUp: function () {
        this.cursor1.classList.remove('click');
    }
}
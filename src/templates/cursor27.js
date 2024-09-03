import { curs_SpanNoBGWithDelay } from "../creator.js";
import { curs_colorToRGB } from "../helper.js";

// CSS Needed
const cursorCSS = {
    name: 'cjs-27',
    cssString: `
    .cjs-27 {
        width: 20px;
        height: 20px;
        border-top-right-radius: 50%;
        border-bottom-left-radius: 50%;
        border-bottom-right-radius: 50%;
        transform-origin: top left;

        backdrop-filter: blur(5px);
        background: rgba(var(--r), var(--g), var(--b), 0.3);
        border: 1px solid rgba(var(--r), var(--g), var(--b), 0.4);

        -webkit-box-shadow: 0px 10px 15px -1px rgba(0,0,0,0.21);
        -moz-box-shadow: 0px 10px 15px -1px rgba(0,0,0,0.21);
        box-shadow: 0px 10px 15px -1px rgba(0,0,0,0.21);

    }

    .cjs-27.cjs-normal {
        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease;
    }

    .cjs-27.cjs-delay {
        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease, translate 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .cjs-27.button {
        transform: rotate(45deg);
    }

    .cjs-27.image {
        transform: scale(1.2);
    }

    .cjs-27.click {
        transform: rotate(45deg) scale(1.2);
    }
    `,
}

export const cursor = {

    css: cursorCSS,

    isActive: false,

    cursor1: null,

    create: function ({color, zIndex, delay}) {
        color = color ? color[0] : "#FFF";
        this.cursor1 = curs_SpanNoBGWithDelay({zIndex, classes: 'cjs-span-no-center cjs-27', delay});
        const [r, g, b] = curs_colorToRGB(color);
        this.cursor1.style.setProperty('--r', r);
        this.cursor1.style.setProperty('--g', g);
        this.cursor1.style.setProperty('--b', b);
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
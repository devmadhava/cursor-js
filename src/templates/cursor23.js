import { curs_SpanNoBGWithDelay } from "../creator.js";
import { curs_colorToRGB } from "../helper.js";


// CSS Needed
const cursorCSS = {
    name: 'cjs-23',
    cssString: `
    .cjs-23 {
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
    }

    .cjs-23.cjs-normal {
        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease;
    }

    .cjs-23.cjs-delay {
        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease, translate 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .cjs-23.button {
        transform: translate(-50%, -50%) scale(0.8);
    }

    .cjs-23.image {
        transform: translate(-50%, -50%) scale(1.2);
    }

    .cjs-23.click {
        transform: translate(-50%, -50%) scale(0.6);
    }

    .cjs-23.click > .cjs-23-span {
        animation-play-state: paused;
    }

    @keyframes cjs-23-expand-anim {
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

export const cursor = {

    css: cursorCSS,

    isActive: false,

    cursor1: null,

    create: function ({color, zIndex, delay}) {
        color = color ? color : ["#FFF"];
        this.cursor1 = curs_SpanNoBGWithDelay({zIndex, classes: 'cjs-span cjs-23', delay});
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
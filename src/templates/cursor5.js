import { curs_SpanNoDelay } from "../creator.js";


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


export const cursor = {

    css: cursorCSS,

    isActive: false,

    cursor1: null,

    cursor2: null,

    create: function ({color, zIndex}) {
        const [color1, color2] = color || ["#000", "#000"];
        this.cursor1 = curs_SpanNoDelay({zIndex, color: color1 || "#000", classes: 'cjs-span cjs-5-1'});
        this.cursor2 = curs_SpanNoDelay({zIndex, color: color2 || "#000", classes: 'cjs-span cjs-5-2'});
    },

    activate: function (event) {
        this.cursor1.style.translate = `${event.clientX}px ${event.clientY}px`;
        this.cursor1.style.display = '';
        this.cursor1.style.transition = '';

        this.cursor2.style.translate = `${event.clientX}px ${event.clientY}px`;
        this.cursor2.style.display = '';
        this.cursor2.style.transition = '';

        this.isActive = true;
    },

    deactivate: function () {
        this.cursor1.style.display = 'none';
        this.cursor1.style.transition = 'none';

        this.cursor2.style.display = 'none';
        this.cursor2.style.transition = 'none';

        this.isActive = false;
    },

    onMouseMove: function (event) {
        this.cursor1.style.translate = `${event.clientX}px ${event.clientY}px`;
        this.cursor2.style.translate = `${event.clientX}px ${event.clientY}px`;
    },
    
    // On Mouse down 
    onButtonOver: function () {
        this.cursor1.classList.add('button');
        this.cursor2.classList.add('button');
    },

    onButtonOut: function () {
        this.cursor1.classList.remove('button');
        this.cursor2.classList.remove('button');
    },

    onImageOver: function () {
        this.cursor1.classList.add('image');
        this.cursor2.classList.add('image');
    },

    onImageOut: function () {
        this.cursor1.classList.remove('image');
        this.cursor2.classList.remove('image');
    },

    onMouseDown: function () {
        this.cursor1.classList.add('click');
        this.cursor2.classList.add('click');
    },

    onMouseUp: function () {
        this.cursor1.classList.remove('click');
        this.cursor2.classList.remove('click');
    }
}
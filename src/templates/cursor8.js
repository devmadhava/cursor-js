import { curs_Span1 } from "../creator.js";


// CSS Needed
const cursorCSS = {
    name: 'cjs-8',
    cssString: `
    .cjs-8 {
        background-color: var(--bg-color);
        width: 10px;
        height: 10px;
        border-radius: 50%;

        -webkit-box-shadow: 0px 10px 15px -1px rgba(0,0,0,0.21);
        -moz-box-shadow: 0px 10px 15px -1px rgba(0,0,0,0.21);
        box-shadow: 0px 10px 15px -1px rgba(0,0,0,0.21);
    }

    .cjs-8.cjs-normal {
        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease;
    }

    .cjs-8.cjs-delay {
        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease, translate 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .cjs-8.button {
        transform: translate(-50%, -50%) scale(0.5);
    }

    .cjs-8.image {
        transform: translate(-50%, -50%) scale(0.5);
    }

    .cjs-8.click {
        transform: translate(-50%, -50%) scale(1.5);
    }
    `,
}


export const cursor = {

    css: cursorCSS,

    isActive: false,

    cursor1: null,

    create: function ({color, zIndex, delay}) {
        color = color ? color[0] : "#FFF";
        this.cursor1 = curs_Span1({zIndex, color, classes: 'cjs-span cjs-8', delay});
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
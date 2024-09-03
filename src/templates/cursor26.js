import { curs_Span1 } from "../creator.js   ";

// CSS Needed
const cursorCSS = {
    name: 'cjs-26',
    cssString: `
    .cjs-26 {
        background-color: var(--bg-color);
        width: 20px;
        height: 20px;
        border-top-right-radius: 50%;
        border-bottom-left-radius: 50%;
        border-bottom-right-radius: 50%;
        transform-origin: top left;

    }

    .cjs-26.cjs-normal {
        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease;
    }

    .cjs-26.cjs-delay {
        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease, translate 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .cjs-26.button {
        transform: rotate(45deg);
    }

    .cjs-26.image {
        transform: scale(1.2);
    }

    .cjs-26.click {
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
        this.cursor1 = curs_Span1({zIndex, color: color, classes: 'cjs-span-no-center cjs-26', delay});
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
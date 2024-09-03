import {  curs_SpanNoBGWithDelay } from "../creator.js   ";
import { curs_getRandomColor, curs_getRandomElementFromArray } from "../helper.js   ";


// CSS Needed
const cursorCSS = {
    name: 'cjs-22',
    cssString: `
    .cjs-22 {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }

    .cjs-22.cjs-normal {
        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease;
    }

    .cjs-22.cjs-delay {
        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease, translate 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .cjs-22.button {
        transform: translate(-50%, -50%) scale(0.8);
    }

    .cjs-22.image {
        transform: translate(-50%, -50%) scale(1.2);
    }

    .cjs-22.click {
        transform: translate(-50%, -50%) scale(0.6);
    }

    .cjs-22.click > .cjs-22-span {
        animation-play-state: paused;
    }

    .cjs-22-span {
        width: 20%;
        height: 20%;

        position: absolute;
        top: 50%;
        left: 50%;

        translate: -50% -50%;
        border-radius: 50%;
        animation: cjs-22-expand-anim 0.8s linear infinite;
    }

    @keyframes cjs-22-expand-anim {
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

/**
 * 
 * @param {HTMLElement} element 
 * @param {HTMLElement} spanElement 
 * @param {Array} arr 
 */

const randomCursorColor = (element, spanElement, arr) => {
    if (typeof arr === "object" && arr.length > 1 ) {
        spanElement.addEventListener('animationiteration', () => {
            const lastColor = spanElement.style.backgroundColor || 'transparent';
            element.style.backgroundColor = lastColor;
            spanElement.style.backgroundColor = curs_getRandomElementFromArray(arr, lastColor);
        });

    } else {
        spanElement.addEventListener('animationiteration', () => {
            const lastColor = getComputedStyle(spanElement).backgroundColor;
            element.style.backgroundColor = lastColor;
            spanElement.style.background = curs_getRandomColor(lastColor);
        });
    }
}

export const cursor = {

    css: cursorCSS,

    isActive: false,

    cursor1: null,

    spanElement: null,

    create: function ({color, zIndex, delay}) {
        color = color ? color : ["#FFF"];
        this.cursor1 = curs_SpanNoBGWithDelay({zIndex, classes: 'cjs-span cjs-22', delay});

        const spanElement = document.createElement('span');
        spanElement.classList.add('cjs-22-span');
        this.cursor1.appendChild(spanElement);

        spanElement.style.background = color[0]
        randomCursorColor(this.cursor1, spanElement, color);

        this.spanElement = spanElement;
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
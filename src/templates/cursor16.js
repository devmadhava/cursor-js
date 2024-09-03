import { curs_SpanTextWithDelay } from "../creator.js";
import { curs_centerAnElementToTarget, curs_circularText, curs_getScaleRelativeToTarget } from "../helper.js";

// CSS Needed
const cursorCSS = {
    name: "cjs-16",
    cssString: `
    .cjs-16 {
        font-family: var(--font);
        color: var(--color);
        width: 120px;
        height: 120px;
        border-radius: 50%;

        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1rem;

        animation: cjs-16-para-rotate-anim 10s linear infinite;
    }

    .cjs-16.cjs-normal {
        transition: width 0.2s ease, height 0.2s ease, background-color 0.4s ease, color 0.4s ease;
    }

    .cjs-16.cjs-delay {
        transition: width 0.2s ease, height 0.2s ease, background-color 0.4s ease, color 0.4s ease, translate 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .cjs-16.button > .cjs-16-para{
        transform: scale(0.8);
    }

    .cjs-16.click {
        animation-play-state: paused;
    }

    .cjs-16.click > .cjs-16-para {
        transform: scale(1.2);
    }

    .cjs-16-para {
        width: 100px;
        height: 100px;
        position: relative;
        border-radius: 50%;
        font-size: 0.8em;
        transition: transform 0.2s ease;
    }

    @keyframes cjs-16-para-rotate-anim {
        0% {
            transform: translate(-50%, -50%) rotate(0deg);
        }

        100% {
            transform: translate(-50%, -50%) rotate(360deg);
        }
    }
    `,
};


export const cursor = {

    css: cursorCSS,

    isActive: false,

    pause: false,

    cursor1: null,

    textElement: null,

    text: null,

    imageText: null,

    color: null,

    textColor: null,

    create: function ({color, textColor, zIndex, text, imageText, delay}) {
        textColor = textColor ? textColor[0] : "#000";
        text = text || 'Only 25 chars with space.';
    
        this.cursor1 = curs_SpanTextWithDelay({zIndex, color: 'transparent', textColor: textColor, font: "Monospace", classes: "cjs-span cjs-16", delay});

        const textElement = document.createElement('p');
        textElement.classList.add('cjs-16-para')
        textElement.innerText = text;
        this.cursor1.appendChild(textElement);
        curs_circularText({size: 100, element: textElement, spacing: 14});
    
        this.textElement = textElement;
        this.text = text;
        this.imageText = imageText || "Yep! 25 chars are allowed";
        this.color = color;
        this.textColor = textColor;
    },

    activate: function (event) {
        this.cursor1.style.translate = `${event.clientX}px ${event.clientY}px`;
        this.cursor1.style.display = "";
        this.cursor1.style.transition = "";

        this.isActive = true;
    },

    deactivate: function () {
        this.cursor1.style.display = "none";
        this.cursor1.style.transition = "none";
        this.isActive = false;
    },

    onMouseMove: function (event) {
        if (this.pause) return;
        this.cursor1.style.translate = `${event.clientX}px ${event.clientY}px`;
    },
    
    // On Mouse down 
    onButtonOver: function (event) {
        this.cursor1.classList.add("button");

        curs_centerAnElementToTarget(this.cursor1, event.target);
        
        const scale = curs_getScaleRelativeToTarget(this.textElement, event.target);
        this.textElement.style.transform = `scale(${1.2})`;


        this.pause = true;
    },

    onButtonOut: function () {
        this.cursor1.classList.remove("button");

        // Unpause
        this.cursor1.style.width = '';
        this.cursor1.style.height = '';

        // DeScale
        this.textElement.style.transform = '';


        this.pause = false;
    },

    onImageOver: function () {
        this.textElement.innerText = this.imageText;
        curs_circularText({size: 100, element: this.textElement, spacing: 14});

    },

    onImageOut: function () {
        this.textElement.innerText = this.text;
        curs_circularText({size: 100, element: this.textElement, spacing: 14});
    },

    onMouseDown: function () {
        this.cursor1.classList.add("click");
    },

    onMouseUp: function () {
        this.cursor1.classList.remove("click");
    }
}
import { curs_SpanTextWithDelay } from "../creator.js";
import { curs_circularText } from "../helper.js";

// CSS Needed
const cursorCSS = {
    name: "cjs-17",
    cssString: `
    .cjs-17 {
        font-family: var(--font);
        color: var(--color);
        width: 120px;
        height: 120px;
        border-radius: 50%;
        transition: width 0.2s ease, height 0.2s ease, background-color 0.4s ease, color 0.4s ease, transform 0.2s ease;

        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        font-size: 1rem;
    }

    .cjs-17.cjs-normal {
        transition: width 0.2s ease, height 0.2s ease, background-color 0.4s ease, color 0.4s ease, transform 0.2s ease;
    }

    .cjs-17.cjs-delay {
        transition: width 0.2s ease, height 0.2s ease, background-color 0.4s ease, color 0.4s ease, transform 0.2s ease, translate 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .cjs-17.button {
        transform: translate(-50%, -50%) scale(0.8);
    }

    .cjs-17.image {
        transform: translate(-50%, -50%) scale(1.2);
    }

    .cjs-17.click > .cjs-17-para {
        animation-play-state: paused;
    }

    .cjs-17-para {
        width: 100px;
        height: 100px;
        position: relative;
        border-radius: 50%;
        font-size: 0.8em;
        transition: transform 0.2s ease;
        animation: cjs-17-para-rotate-anim 10s linear infinite;
    }

    .cjs-17-span {
        background-color: var(--bg-color);
        width: 10px;
        height: 10px;
        border-radius: 50%;
        position: absolute;
        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease;
    }

    .cjs-17.button > .cjs-17-span {
        transform: scale(0.5);
    }

    .cjs-17.image > .cjs-17-span {
        transform: scale(0.5);
    }

    .cjs-17.click > .cjs-17-span {
        transform: scale(1.5);
    }

    @keyframes cjs-17-para-rotate-anim {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
    `,
};


export const cursor = {

    css: cursorCSS,

    isActive: false,

    cursor1: null,

    textElement: null,

    spanElement: null,

    text: null,

    imageText: null,

    color: null,

    textColor: null,

    create: function ({color, textColor, zIndex, text, imageText, delay}) {
        color = color ? color[0] : "#FFF";
        textColor = textColor ? textColor[0] : "#000";
        text = text || 'Only 25 chars with space.';
    
        this.cursor1 = curs_SpanTextWithDelay({zIndex, color: 'transparent', textColor: textColor, font: "Monospace", classes: "cjs-span cjs-17", delay});

        const textElement = document.createElement('p');
        textElement.classList.add('cjs-17-para')
        textElement.innerText = text;
        this.cursor1.appendChild(textElement);
        curs_circularText({size: 100, element: textElement, spacing: 14});

        const spanElement = document.createElement('span');
        spanElement.classList.add('cjs-17-span');
        spanElement.style.setProperty('--bg-color', color);
        this.cursor1.appendChild(spanElement);

        
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
        this.cursor1.style.translate = `${event.clientX}px ${event.clientY}px`;
    },
    
    // On Mouse down 
    onButtonOver: function () {
        this.cursor1.classList.add("button");
    },

    onButtonOut: function () {
        this.cursor1.classList.remove("button");
    },

    onImageOver: function () {
        this.textElement.innerText = this.imageText;
        curs_circularText({size: 100, element: this.textElement, spacing: 14});
        
        this.cursor1.classList.add("image");
    },

    onImageOut: function () {
        this.textElement.innerText = this.text;
        curs_circularText({size: 100, element: this.textElement, spacing: 14});
        
        this.cursor1.classList.remove("image");
    },

    onMouseDown: function () {
        this.cursor1.classList.add("click");
    },

    onMouseUp: function () {
        this.cursor1.classList.remove("click");
    }
}
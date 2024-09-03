import { curs_SpanTextNoDelay, curs_SpanNoDelay } from "../creator.js";
import { curs_circularText } from "../helper.js";

// CSS Needed
const cursorCSS = {
    name: "cjs-14",
    cssString: `
    .cjs-14-1 {
        background-color: var(--bg-color);
        font-family: var(--font);
        color: var(--color);
        width: 120px;
        height: 120px;
        border-radius: 50%;
        transition: width 0.2s ease, height 0.2s ease, background-color 0.4s ease, color 0.4s ease, transform 0.2s ease, translate 0.4s cubic-bezier(0.22, 1, 0.36, 1);

        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        font-size: 1rem;

        -webkit-box-shadow: 0px 10px 15px -1px rgba(0,0,0,0.21);
        -moz-box-shadow: 0px 10px 15px -1px rgba(0,0,0,0.21);
        box-shadow: 0px 10px 15px -1px rgba(0,0,0,0.21);

    }

    .cjs-14-1.button {
        transform: translate(-50%, -50%) scale(0.5);
    }

    .cjs-14-1-para {
        width: 100px;
        height: 100px;
        position: relative;
        border-radius: 50%;
        font-size: 0.8em;
        animation: cjs-14-para-rotate-anim 10s linear infinite;
    }

    .cjs-14-1.click > .cjs-14-1-para {
        animation-play-state: paused;
    }

    .cjs-14-2 {
        background-color: var(--bg-color);
        width: 10px;
        height: 10px;
        border-radius: 50%;
        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease;
    }

    .cjs-14-2.button {
        transform: translate(-50%, -50%) scale(0.5);
    }

    .cjs-14-2.image {
        transform: translate(-50%, -50%) scale(0.5);
    }

    .cjs-14-2.click {
        transform: translate(-50%, -50%) scale(1.5);
    }

    @keyframes cjs-14-para-rotate-anim {
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

    cursor2: null,

    text: null,

    imageText: null,

    color: null,

    textColor: null,

    create: function ({color, textColor, zIndex, text, imageText}) {
        color = color ? color[0] : "#FFF";
        textColor = textColor ? textColor[0] : "#000";
        text = text || 'Only 25 chars with space.';
    
        this.cursor1 = curs_SpanTextNoDelay({zIndex, color: color, textColor: textColor, font: "Monospace", classes: "cjs-span cjs-14-1"});
        this.cursor2 = curs_SpanNoDelay({zIndex, color: textColor, classes: "cjs-span cjs-14-2"});

        const textElement = document.createElement('p');
        textElement.classList.add('cjs-14-1-para')
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

        this.cursor2.style.translate = `${event.clientX}px ${event.clientY}px`;
        this.cursor2.style.display = '';
        this.cursor2.style.transition = '';

        this.isActive = true;
    },

    deactivate: function () {
        this.cursor1.style.display = "none";
        this.cursor1.style.transition = "none";

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
        this.cursor1.classList.add("button");
        this.cursor2.classList.add('button');
    },

    onButtonOut: function () {
        this.cursor1.classList.remove("button");
        this.cursor2.classList.remove('button');
    },

    onImageOver: function () {
        this.textElement.innerText = this.imageText;
        curs_circularText({size: 100, element: this.textElement, spacing: 14});

        this.cursor1.style.backgroundColor = this.textColor;
        this.cursor1.style.color = this.color;

        this.cursor2.classList.add('image');
        this.cursor2.style.backgroundColor = this.color;
    },

    onImageOut: function () {
        this.textElement.innerText = this.text;
        curs_circularText({size: 100, element: this.textElement, spacing: 14});

        this.cursor1.style.backgroundColor = "";
        this.cursor1.style.color = "";

        this.cursor2.classList.remove('image');
        this.cursor2.style.backgroundColor = "";
    },

    onMouseDown: function () {
        this.cursor1.classList.add("click");
        this.cursor2.classList.add('click');
    },

    onMouseUp: function () {
        this.cursor1.classList.remove("click");
        this.cursor2.classList.remove('click');
    }
}
import { curs_SpanNoDelay, curs_SpanTextNoDelay } from "../creator.js";
import { curs_centerAnElementToTarget, curs_circularText, curs_getScaleRelativeToTarget } from "../helper.js";

// CSS Needed
const cursorCSS = {
    name: "cjs-18",
    cssString: `
    .cjs-18-1 {
        font-family: var(--font);
        color: var(--color);
        width: 120px;
        height: 120px;
        border-radius: 50%;

        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1rem;

        transition: width 0.2s ease, height 0.2s ease, background-color 0.4s ease, color 0.4s ease, translate 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        animation: cjs-18-1-para-rotate-anim 10s linear infinite;
    }

    .cjs-18-1.cjs-normal {
        transition: width 0.2s ease, height 0.2s ease, background-color 0.4s ease, color 0.4s ease;
    }

    .cjs-18-1.cjs-delay {
        transition: width 0.2s ease, height 0.2s ease, background-color 0.4s ease, color 0.4s ease, translate 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .cjs-18-1.button > .cjs-18-1-para{
        transform: scale(0.8);
    }

    .cjs-18-1.click {
        animation-play-state: paused;
    }

    .cjs-18-1.click > .cjs-18-1-para {
        transform: scale(1.2);
    }

    .cjs-18-1-para {
        width: 100px;
        height: 100px;
        position: relative;
        border-radius: 50%;
        font-size: 0.8em;
        transition: transform 0.2s ease;
    }

    .cjs-18-2 {
        background-color: var(--bg-color);
        width: 10px;
        height: 10px;
        border-radius: 50%;
        transition: transform 0.2s ease;
    }

    .cjs-18-2.button {
        transform: translate(-50%, -50%) scale(0.5);
    }

    .cjs-18-2.image {
        transform: translate(-50%, -50%) scale(0.5);
    }

    .cjs-18-2.click {
        transform: translate(-50%, -50%) scale(1.5);

    }

    @keyframes cjs-18-1-para-rotate-anim {
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

    cursor2: null,

    text: null,

    imageText: null,

    color: null,

    textColor: null,

    create: function ({color, textColor, zIndex, text, imageText}) {
        color = color ? color[0] : "#000";
        textColor = textColor ? textColor[0] : "#000";
        text = text || 'Only 25 chars with space.';
    
        this.cursor1 = curs_SpanTextNoDelay({zIndex, color: 'transparent', textColor: textColor, font: "Monospace", classes: "cjs-span cjs-18-1"});
        this.cursor2 = curs_SpanNoDelay({zIndex, color: color, classes: 'cjs-span cjs-18-2'});


        const textElement = document.createElement('p');
        textElement.classList.add('cjs-18-1-para')
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
        this.cursor2.style.translate = `${event.clientX}px ${event.clientY}px`;

        if (this.pause) return;
        this.cursor1.style.translate = `${event.clientX}px ${event.clientY}px`;
    },
    
    // On Mouse down 
    onButtonOver: function (event) {
        this.cursor1.classList.add("button");
        curs_centerAnElementToTarget(this.cursor1, event.target);
        
        const scale = curs_getScaleRelativeToTarget(this.textElement, event.target);
        this.textElement.style.transform = `scale(${1.2})`;
        
        this.cursor2.classList.add('button');

        this.pause = true;
    },

    onButtonOut: function () {
        this.cursor1.classList.remove("button");

        // Unpause
        this.cursor1.style.width = '';
        this.cursor1.style.height = '';

        // DeScale
        this.textElement.style.transform = '';
        
        this.cursor2.classList.remove('button');

        this.pause = false;
    },

    onImageOver: function () {
        this.textElement.innerText = this.imageText;
        curs_circularText({size: 100, element: this.textElement, spacing: 14});
        
        this.cursor2.classList.add('image');
    },

    onImageOut: function () {
        this.textElement.innerText = this.text;
        curs_circularText({size: 100, element: this.textElement, spacing: 14});
        
        this.cursor2.classList.remove('image');
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
import { curs_SpanTextWithDelay } from "../creator.js";
import { curs_circularText } from "../helper.js";
import Template from "./template.js";

// CSS Needed
const cursorCSS = {
    name: "cjs-13",
    cssString: `
    .cjs-13 {
        background-color: var(--bg-color);
        font-family: var(--font);
        color: var(--color);
        width: 120px;
        height: 120px;
        border-radius: 50%;

        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        font-size: 1rem;

        -webkit-box-shadow: 0px 10px 15px -1px rgba(0,0,0,0.21);
        -moz-box-shadow: 0px 10px 15px -1px rgba(0,0,0,0.21);
        box-shadow: 0px 10px 15px -1px rgba(0,0,0,0.21);

    }

    .cjs-13.cjs-normal {
        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease, background-color 0.4s ease, color 0.4s ease;
    }

    .cjs-13.cjs-delay {
        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease, background-color 0.4s ease, color 0.4s ease, translate 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .cjs-13.button {
        transform: translate(-50%, -50%) scale(0.5);
    }

    .cjs-13-para {
        width: 100px;
        height: 100px;
        position: relative;
        border-radius: 50%;
        font-size: 0.8em;
        animation: cjs-13-para-rotate-anim 10s linear infinite;
    }

    .cjs-13.click > .cjs-13-para {
        animation-play-state: paused;
    }

    @keyframes cjs-13-para-rotate-anim {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
    `,
};


export class cursor extends Template {
    constructor() {
        super();
        this.css =  cursorCSS;
        this.isActive =  false;
        this.cursor1 =  null;
        this.textElement =  null;
        this.text =  null;
        this.imageText =  null;
        this.color =  null;
        this.textColor =  null;    
    }


    create({color, textColor, zIndex, text, imageText, clickText, delay}) {
        color = color ? color[0] : "#FFF";
        textColor = textColor ? textColor[0] : "#000";
        text = text || 'Only 25 chars with space.';

        this.cursor1 = curs_SpanTextWithDelay({zIndex, color: color, textColor: textColor, font: "Monospace", classes: "cjs-span cjs-13", delay});

        const textElement = document.createElement('p');
        textElement.classList.add('cjs-13-para')
        textElement.innerText = text;
        this.cursor1.appendChild(textElement);
        curs_circularText({size: 100, element: textElement, spacing: 14});
    
        this.textElement = textElement;
        this.text = text;
        this.imageText = imageText || "Yep! 25 chars are allowed";
        this.color = color;
        this.textColor = textColor;
    }

    activate(event) {
        this.cursor1.style.translate = `${event.clientX}px ${event.clientY}px`;
        this.cursor1.style.display = "";
        this.cursor1.style.transition = "";

        this.isActive = true;
    }

    deactivate() {
        this.cursor1.style.display = "none";
        this.cursor1.style.transition = "none";
        this.isActive = false;
    }

    onMouseMove(event) {
        this.cursor1.style.translate = `${event.clientX}px ${event.clientY}px`;
    }
    
    // On Mouse down 
    onButtonOver() {
        this.cursor1.classList.add("button");
    }

    onButtonOut() {
        this.cursor1.classList.remove("button");
    }

    onImageOver() {
        this.textElement.innerText = this.imageText;
        curs_circularText({size: 100, element: this.textElement, spacing: 14});

        this.cursor1.style.backgroundColor = this.textColor;
        this.cursor1.style.color = this.color;
    }

    onImageOut() {
        this.textElement.innerText = this.text;
        curs_circularText({size: 100, element: this.textElement, spacing: 14});

        this.cursor1.style.backgroundColor = "";
        this.cursor1.style.color = "";
    }

    onMouseDown() {
        this.cursor1.classList.add("click");
    }

    onMouseUp() {
        this.cursor1.classList.remove("click");
    }
    
    // Delete function
    delete() {
        this.deactivate();
        this.cursor1.remove();
        this.cursor1 = null;
        this.css = null;
        this.isActive = null;

        this.textElement =  null;
        this.text =  null;
        this.imageText =  null;
        this.color =  null;
        this.textColor =  null;  
    }
}
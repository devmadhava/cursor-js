import { curs_SpanTextNoDelay, curs_SpanNoDelay } from "../creator.js";
import { curs_circularText } from "../helper.js";
import Template from "./template.js";

// CSS Needed
const cursorCSS = {
    name: "cjs-12",
    cssString: `
    .cjs-12-1 {
        background-color: var(--bg-color);
        font-family: var(--font);
        color: var(--color);
        width: 120px;
        height: 120px;
        border-radius: 50%;
        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease, background-color 0.4s ease, color 0.4s ease, translate 0.6s cubic-bezier(0.22, 1, 0.36, 1);

        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        font-size: 1rem;

        -webkit-box-shadow: 0px 10px 15px -1px rgba(0,0,0,0.21);
        -moz-box-shadow: 0px 10px 15px -1px rgba(0,0,0,0.21);
        box-shadow: 0px 10px 15px -1px rgba(0,0,0,0.21);
    }

    .cjs-12-1.button {
        transform: translate(-50%, -50%) scale(0.5);
    }

    .cjs-12-1.click {
        transform: translate(-50%, -50%) scale(0.4);
    }

    .cjs-12-1-para {
        width: 100px;
        height: 100px;
        position: relative;
        border-radius: 50%;
        font-size: 0.8em;
    }

    .cjs-12-1.button > .cjs-12-1-para {
        opacity: 0
    }

    .cjs-12-1.click > .cjs-12-1-para {
        opacity: 0
    }

    .cjs-12-2 {
        background-color: var(--bg-color);
        width: 10px;
        height: 10px;
        border-radius: 50%;
        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease;
    }

    .cjs-12-2.button {
        transform: translate(-50%, -50%) scale(0.5);
    }

    .cjs-12-2.image {
        transform: translate(-50%, -50%) scale(0.5);
    }

    .cjs-12-2.click {
        transform: translate(-50%, -50%) scale(1.5);
    }
    `,
};

export class cursor extends Template {

    constructor() {
        super()
        this.css =  cursorCSS;
        this.cursor1 =  null;
        this.textElement =  null;
        this.cursor2 =  null;
        this.text =  null;
        this.imageText =  null;
        this.color =  null;
        this.textColor =  null;
    }


    create({color, textColor, zIndex, font, text, imageText}) {
        color = color ? color[0] : "#FFF";
        textColor = textColor ? textColor[0] : "#000";
        text = text || 'Only 25 chars with space.';
    
        this.cursor1 = curs_SpanTextNoDelay({zIndex, color, textColor: textColor, font: font || "Monospace", classes: "cjs-span cjs-12-1"});
        this.cursor2 = curs_SpanNoDelay({zIndex, color: textColor, classes: "cjs-span cjs-12-2"});

        const textElement = document.createElement('p');
        textElement.classList.add('cjs-12-1-para')
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

        this.cursor2.style.translate = `${event.clientX}px ${event.clientY}px`;
        this.cursor2.style.display = '';
        this.cursor2.style.transition = '';

        this.isActive = true;
    }

    deactivate() {
        this.cursor1.style.display = "none";
        this.cursor1.style.transition = "none";

        this.cursor2.style.display = 'none';
        this.cursor2.style.transition = 'none';

        this.isActive = false;
    }

    onMouseMove(event) {
        this.cursor1.style.translate = `${event.clientX}px ${event.clientY}px`;
        this.cursor2.style.translate = `${event.clientX}px ${event.clientY}px`;

    }
    
    // On Mouse down 
    onButtonOver() {
        this.cursor1.classList.add("button");
        this.cursor2.classList.add('button');
    }

    onButtonOut() {
        this.cursor1.classList.remove("button");
        this.cursor2.classList.remove('button');
    }

    onImageOver() {
        this.textElement.innerText = this.imageText;
        curs_circularText({size: 100, element: this.textElement, spacing: 14});

        this.cursor1.style.backgroundColor = this.textColor;
        this.cursor1.style.color = this.color;

        this.cursor2.classList.add('image');
        this.cursor2.style.backgroundColor = this.color;

    }

    onImageOut() {
        this.textElement.innerText = this.text;
        curs_circularText({size: 100, element: this.textElement, spacing: 14});

        this.cursor1.style.backgroundColor = "";
        this.cursor1.style.color = "";

        this.cursor2.classList.remove('image');
        this.cursor2.style.backgroundColor = "";
    }

    onMouseDown() {
        this.cursor1.classList.add("click");
        this.cursor2.classList.add('click');
    }

    onMouseUp() {
        this.cursor1.classList.remove("click");
        this.cursor2.classList.remove('click');
    }
    
    // Delete function
    delete() {
        this.deactivate();
        this.cursor1.remove();
        this.cursor2.remove();
        this.cursor1 = null;
        this.cursor2 = null;
        this.css = null;
        this.isActive = null;

        this.textElement =  null;
        this.text =  null;
        this.imageText =  null;
        this.color =  null;
        this.textColor =  null;
    }
}
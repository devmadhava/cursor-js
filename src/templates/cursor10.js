import { curs_SpanTextWithDelay } from "../creator.js";
import Template from "./template.js";

// CSS Needed
const cursorCSS = {
    name: "cjs-10",
    cssString: `
    .cjs-10 {
        background-color: var(--bg-color);
        font-family: var(--font);
        color: var(--color);
        width: 10px;
        height: 10px;
        border-radius: 50%;

        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 1rem;

        -webkit-box-shadow: 0px 10px 15px -1px rgba(0,0,0,0.21);
        -moz-box-shadow: 0px 10px 15px -1px rgba(0,0,0,0.21);
        box-shadow: 0px 10px 15px -1px rgba(0,0,0,0.21);
    }

    .cjs-10.cjs-normal {
        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease;
    }

    .cjs-10.cjs-delay {
        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease, translate 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .cjs-10.button {
        width: 60px;
        height: 60px;
        padding: 1em;
    }

    .cjs-10.image {
        width: 70px;
        height: 70px;
        padding: 1em;
    }

    .cjs-10.click {
        width: 35px;
        height: 35px;
    }
    `,
};


export class cursor extends Template {
    constructor() {
        super();
        this.css =  cursorCSS;
        this.isActive =  false;
        this.cursor1 =  null;
        this.imageText =  null;
        this.buttonText =  null;
    }

    create({color, textColor, zIndex, font, imageText, buttonText, delay}) {
        color = color ? color[0] : "#FFF";
        textColor = textColor ? textColor[0] : "#000";
        this.cursor1 = curs_SpanTextWithDelay({zIndex, color, textColor, font: font || "Monospace", classes: "cjs-span cjs-10", delay});
    
        this.imageText = imageText || "Image";
        this.buttonText = buttonText || "Click";
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
        this.cursor1.innerText = this.buttonText || "Button";
    }

    onButtonOut() {
        this.cursor1.classList.remove("button");
        this.cursor1.innerText = "";
    }

    onImageOver() {
        this.cursor1.classList.add("image");
        this.cursor1.innerText = this.imageText || "Image";
    }

    onImageOut() {
        this.cursor1.classList.remove("image");
        this.cursor1.innerText = "";
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
        this.imageText =  null;
        this.buttonText =  null;
    }
}
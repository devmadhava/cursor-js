import {  curs_SpanNoBGWithDelay } from "../creator.js";
import { curs_getRandomColor, curs_getRandomElementFromArray } from "../helper.js";
import Template from "./template.js";


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

export class cursor extends Template {
    constructor() {
        super();
        this.css = cursorCSS;
        this.isActive = false;
        this.cursor1 = null;
        this.spanElement = null;

        // Animation Specific
        this.animationOnIteration = null;
        this.lastColor = null;
    }

    create({color, zIndex, delay}) {
        color = color ? color : ["#FFF"];
        this.cursor1 = curs_SpanNoBGWithDelay({zIndex, classes: 'cjs-span cjs-22', delay});

        const spanElement = document.createElement('span');
        spanElement.classList.add('cjs-22-span');
        this.cursor1.appendChild(spanElement);

        spanElement.style.background = color[0]
        // handleAnimation(this.cursor1, spanElement, color);
        this.spanElement = spanElement;

        // After everything is set get which type of animation will be played on iteration
        // This is done so the event can removed when cursor is deleted
        this.animationOnIteration = this.#setRandomAnimation(this.cursor1, spanElement, color);
        this.spanElement.addEventListener('animationiteration', this.animationOnIteration);
    }

    activate(event) {
        this.cursor1.style.translate = `${event.clientX}px ${event.clientY}px`;
        this.cursor1.style.display = '';
        this.cursor1.style.transition = '';
        this.isActive = true;
    }

    deactivate() {
        this.cursor1.style.display = 'none';
        this.cursor1.style.transition = 'none';
        this.isActive = false;
    }

    onMouseMove(event) {
        this.cursor1.style.translate = `${event.clientX}px ${event.clientY}px`;
    }
    
    // On Mouse down 
    onButtonOver() {
        this.cursor1.classList.add('button');
    }

    onButtonOut() {
        this.cursor1.classList.remove('button');
    }

    onImageOver() {
        this.cursor1.classList.add('image');
    }

    onImageOut() {
        this.cursor1.classList.remove('image');
    }

    onMouseDown() {
        this.cursor1.classList.add('click');
    }

    onMouseUp() {
        this.cursor1.classList.remove('click');
    }

    // Random Animation - Why so rigid? So it can be easily removed whenever is needed
    // Prepare the function that is to be run when animation iteration happens
    #setRandomAnimation = (element, innerElement, colors) => {
        if (typeof colors === "object" && colors.length > 1 ) {

            return () => {
                const lastColor = innerElement.style.backgroundColor || 'transparent';
                element.style.backgroundColor = lastColor;
                innerElement.style.backgroundColor = curs_getRandomElementFromArray(colors, lastColor);
            }

        } else {

            return () => {
                const lastColor = this.lastColor ? this.lastColor : getComputedStyle(innerElement).backgroundColor;
                element.style.backgroundColor = lastColor;
                const newColor = curs_getRandomColor(lastColor);

                this.lastColor = newColor;
                innerElement.style.background = newColor;
            }

        }
    }
    
    // Delete function
    delete() {
        this.deactivate();
        // Removes the event Listener
        this.spanElement.removeEventListener('animationiteration', this.animationOnIteration);
        this.cursor1.remove();
        this.cursor1 = null;
        this.css = null;
        this.activate = null;
    }
}
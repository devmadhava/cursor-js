import { cursor as cursor1 } from "./templates/cursor1.js";
import { cursor as cursor2 } from "./templates/cursor2.js";
import { cursor as cursor3 } from "./templates/cursor3.js";
import { cursor as cursor4 } from "./templates/cursor4.js";
import { cursor as cursor5 } from "./templates/cursor5.js";
import { cursor as cursor6 } from "./templates/cursor6.js";
import { cursor as cursor7 } from "./templates/cursor7.js";
import { cursor as cursor8 } from "./templates/cursor8.js";
import { cursor as cursor9 } from "./templates/cursor9.js";
import { cursor as cursor10 } from "./templates/cursor10.js";
import { cursor as cursor11 } from "./templates/cursor11.js";
import { cursor as cursor12 } from "./templates/cursor12.js";
import { cursor as cursor13 } from "./templates/cursor13.js";
import { cursor as cursor14 } from "./templates/cursor14.js";
import { cursor as cursor15 } from "./templates/cursor15.js";
import { cursor as cursor16 } from "./templates/cursor16.js";
import { cursor as cursor17 } from "./templates/cursor17.js";
import { cursor as cursor18 } from "./templates/cursor18.js";
import { cursor as cursor19 } from "./templates/cursor19.js";
import { cursor as cursor20 } from "./templates/cursor20.js";
import { cursor as cursor21 } from "./templates/cursor21.js";
import { cursor as cursor22 } from "./templates/cursor22.js";
import { cursor as cursor23 } from "./templates/cursor23.js";
import { cursor as cursor24 } from "./templates/cursor24.js";
import { cursor as cursor25 } from "./templates/cursor25.js";
import { cursor as cursor26 } from "./templates/cursor26.js";
import { cursor as cursor27 } from "./templates/cursor27.js";
import { cursor as cursor28 } from "./templates/cursor28.js";

const cursorMap = {
    'cursor1': cursor1,
    'cursor2': cursor2,
    'cursor3': cursor3,
    'cursor4': cursor4,
    'cursor5': cursor5,
    'cursor6': cursor6,
    'cursor7': cursor7,
    'cursor8': cursor8,
    'cursor9': cursor9,
    'cursor10': cursor10,
    'cursor11': cursor11,
    'cursor12': cursor12,
    'cursor13': cursor13,
    'cursor14': cursor14,
    'cursor15': cursor15,
    'cursor16': cursor16,
    'cursor17': cursor17,
    'cursor18': cursor18,
    'cursor19': cursor19,
    'cursor20': cursor20,
    'cursor21': cursor21,
    'cursor22': cursor22,
    'cursor23': cursor23,
    'cursor24': cursor24,
    'cursor25': cursor25,
    'cursor26': cursor26,
    'cursor27': cursor27,
    'cursor28': cursor28
}

class Cursor {
    constructor({
        type, 
        selector, 
        section, 
        color, 
        imageColor, 
        buttonColor, 
        image, 
        font, 
        text, 
        imageText, 
        buttonText,
        clickText, 
        textColor,
        delay,
    }) {
        if (!type) return;
        this.type = type;

        this.cursor;

        this.color = this.#extractArrayFromValues(color);
        this.textColor = this.#extractArrayFromValues(textColor);
        this.imageColor = this.#extractArrayFromValues(imageColor);
        this.buttonColor = this.#extractArrayFromValues(buttonColor);

        this.image = image;
        this.font = font;
        this.zIndex;

        this.text = text;
        this.imageText = imageText;
        this.buttonText = buttonText;
        this.clickText = clickText;

        this.delay = delay;
        this.section = this.#createSection(section, selector);
        this.#findCursorSectionInAncestors(section);
    }

    #createSection(section, selector) {
        if (section instanceof HTMLElement) {
            return section;
        }

        const sectionFromSelector = selector && document.body.querySelector(selector);
        if (sectionFromSelector instanceof HTMLElement) {
            return sectionFromSelector;
        }

        throw new Error("Sorry no valid selector or section has been provided");
    }

    #init() {
        // this.module = await import(`./templates/cursor${this.type}.js`);
        // this.cursor = this.module.cursor;
        this.cursor = cursorMap[`cursor${this.type}`];

        if (!this.cursor) return;
        this.cursor.create({
            color: this.color,
            image: this.image,
            section: this.section,
            font: this.font,
            zIndex: this.zIndex,
            text: this.text,
            clickText: this.clickText,
            imageText: this.imageText,
            buttonText: this.buttonText,
            textColor: this.textColor,
            delay: this.delay,
        });

        this.#injectCSS(this.cursor.css);
    }

    #setEventListener() {
        // Events
        this.section.addEventListener('mousemove', (event) => this.#handleMouseMove(event));
        this.section.addEventListener('mouseover', (event) => this.#handleMouseOver(event));
        this.section.addEventListener('mouseout', (event) => this.#handleMouseOut(event));
        this.section.addEventListener('mousedown', (event) => this.#handleMouseDown(event));
        this.section.addEventListener('mouseup', (event) => this.#handleMouseUp(event));

        // Single Event Listener Only in clase of Cursor being at a target on
        this.section.addEventListener('mousemove', (event) => this.#handleMouseOver(event), {once: true});

        // The deactivate should only run when mouseleaves as oppose to mouseout
        this.section.addEventListener('mouseleave', (event) => this.cursor.deactivate(event));
    }

    load() {
        this.#init();
        this.#setEventListener();
    }

    #findCursorSectionInAncestors(section) {
        const ancestor = section.parentElement?.closest("[data-cursor-type]");
        const zIndex = ancestor
            ? Number(ancestor.getAttribute("data-cursor-index")) - 1
            : 9999;

        section.setAttribute("data-cursor-index", zIndex);
        this.zIndex = zIndex;
    }

    #injectCSS({name, cssString}) {
        let styleElement = document.head.querySelector('[data-curs-essential-styles]');
        const stylesApplied = styleElement.getAttribute('data-curs-essential-styles');
        if (stylesApplied.includes(name)) return;
    
        styleElement.innerHTML += cssString;
        styleElement.setAttribute('data-curs-essential-styles', stylesApplied + ' ' + name);
    }

    #handleMouseMove(event) {
        if (!this.cursor.isActive) {
            this.cursor.activate(event);
        }

        this.cursor.onMouseMove(event);
    }

    #handleMouseOver(event) {
        if (!this.cursor.isActive) {
            this.cursor.activate(event);
        }

        const target = event.target;
        if (target.matches('button, a')) {
            this.cursor.onButtonOver(event);

        } else if (target.matches('img')) {
            this.cursor.onImageOver(event);

        }
    }

    #handleMouseOut(event) {
        const target = event.target;
        if (target.matches('button, a')) {
            this.cursor.onButtonOut(event);

        } else if (target.matches('img')) {
            this.cursor.onImageOut(event);
        }
    }

    #handleMouseDown(event) {
        this.cursor.onMouseDown(event);
    }

    #handleMouseUp(event) {
        this.cursor.onMouseUp(event);
    }

    // Helper
    #extractArrayFromValues(string) {
        if (!string) return;
        const arr = string.trim().split(" ");
        return arr;
    }
}

export default Cursor;

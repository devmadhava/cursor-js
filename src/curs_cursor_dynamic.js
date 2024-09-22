class Cursor {
    #cursor;
    #type;
    #module;

    #color;
    #textColor;

    #text
    #imageText;
    #buttonText;
    #clickText;
    #font;

    #delay;
    #section;
    #sendToBack;
    #zIndex;

    #onMouseMove;
    #onMouseOver;
    #onMouseOut;
    #onMouseDown;
    #onMouseUp;
    #onMouseLeave;

    #hidden;
    #isDragging;
    #state;
    #previousState;

    #buttonTarget;
    #imageTarget;

    constructor({
        type, 
        selector,
        section, 
        
        color,
        textColor,

        text, 
        imageText, 
        buttonText,
        clickText,
        font,

        delay,
        pointer, 
        zIndex,
        sendToBack,

        buttonTarget,
        imageTarget,
    }) {
        if (!type) return;
        this.#type = type;

        this.#cursor;
        this.#color = this.#extractArrayFromValues(color);
        this.#textColor = this.#extractArrayFromValues(textColor);

        this.#text = text;
        this.#imageText = imageText;
        this.#buttonText = buttonText;
        this.#clickText = clickText;
        this.#font = font;

        this.#delay = delay;
        this.#section = this.#createSection(section, selector);

        this.#sendToBack = sendToBack || false;
        this.#zIndex = this.#setZIndex(zIndex);

        this.#buttonTarget = typeof buttonTarget === 'string' ? buttonTarget : 'button, a';
        this.#imageTarget = typeof imageTarget === 'string' ? imageTarget : 'img';

        pointer === false && this.#hidePointer();

        // Event
        // Bind methods
        this.#onMouseMove = this.#handleMouseMove.bind(this);
        this.#onMouseOver = this.#handleMouseOver.bind(this);
        this.#onMouseOut = this.#handleMouseOut.bind(this);
        this.#onMouseDown = this.#handleMouseDown.bind(this);
        this.#onMouseUp = this.#handleMouseUp.bind(this);
        this.#onMouseLeave = this.#handleMouseLeave.bind(this);

        // Load Function is here
        // this.#init();
        // this.#setEventListener();

        // User Specific
        this.#hidden = false;
        this.#isDragging = false;
        this.#state = 'idle';
        this.#previousState = '';
    }

    #createSection(section, selector) {
        if (section instanceof HTMLElement) {
            return section;
        }

        const sectionFromSelector = selector && document.querySelector(selector);
        if (sectionFromSelector instanceof HTMLElement) {
            return sectionFromSelector;
        }

        throw new Error("Sorry no valid selector or section has been provided");
    }

    #hidePointer() {
        this.#section.classList.add('cjs-hide-pointer');
    }

    async #init() {
        // this.#cursor = new cursorMap[`cursor${this.#type}`];
        this.#module = await import(`./templates/cursor${this.#type}.js`);
        this.#cursor = new this.#module.cursor();

        if (!this.#cursor) return;
        this.#cursor.create({
            color: this.#color,
            section: this.#section,
            font: this.#font,
            zIndex: this.#zIndex,
            text: this.#text,
            clickText: this.#clickText,
            imageText: this.#imageText,
            buttonText: this.#buttonText,
            textColor: this.#textColor,
            delay: this.#delay,
        });

        this.#injectCSS(this.#cursor.css);
    }

    #setEventListener() {
        // Events
        this.#section.addEventListener('mousemove', this.#onMouseMove);
        this.#section.addEventListener('mouseover', this.#onMouseOver);
        this.#section.addEventListener('mouseout', this.#onMouseOut);
        this.#section.addEventListener('mousedown', this.#onMouseDown);
        this.#section.addEventListener('mouseup', this.#onMouseUp);
        this.#section.addEventListener('mousemove', this.#onMouseOver, {once: true});
        this.#section.addEventListener('mouseleave', this.#onMouseLeave);
    }

    async load() {
        await this.#init();
        this.#setEventListener();
    }

    #setZIndex(index) {
        let zIndex;
        if (index && typeof index === 'number') {
            zIndex = index;

        } else {
            zIndex = this.#getZIndexFromAncestors(this.#section, this.#sendToBack);
        }

        this.#section.setAttribute("data-cursor-index", zIndex);
        return zIndex;
    }

    #getZIndexFromAncestors(section, sendToBack) {
        const ancestor = section.parentElement?.closest("[data-cursor-index]");
        let zIndex;

        if (!sendToBack) {
            zIndex = ancestor
            ? Number(ancestor.getAttribute("data-cursor-index")) + 1
            : 9999;

        } else {
            zIndex = ancestor
            ? Number(ancestor.getAttribute("data-cursor-index")) - 1
            : 9999;
        }
        return zIndex;
    }

    #injectCSS({name, cssString}) {
        let styleElement = document.head.querySelector('[data-curs-essential-styles]');
        const stylesApplied = styleElement.getAttribute('data-curs-essential-styles');

        const namePattern = new RegExp(`\\b${name}\\b`, 'g');
        if (namePattern.test(stylesApplied)) return;
    
        styleElement.innerHTML += cssString;
        styleElement.setAttribute('data-curs-essential-styles', stylesApplied + ' ' + name);
    }

    #handleMouseMove(event) {
        if (!this.#cursor.isActive) {
            this.#cursor.activate(event);
        }

        // Helps the dragging not interrup the animation
        if (this.#isDragging) {
            this.#handleMouseUp(event);
        }

        this.#cursor.onMouseMove(event);
    }

    #handleMouseOver(event) {
        if (!this.#cursor.isActive) {
            this.#cursor.activate(event);
        }

        const target = event.target;
        if (this.#buttonTarget !== "" && target.matches(this.#buttonTarget)) {
            this.#cursor.onButtonOver(event);

            this.#previousState = this.#state;
            this.#state = 'button';
        }
        
        if (this.#imageTarget !== "" && target.matches(this.#imageTarget)) {
            this.#cursor.onImageOver(event);

            this.#previousState = this.#state;
            this.#state = 'image';
        }
    }

    #handleMouseOut(event) {
        const target = event.target;
        if (this.#buttonTarget !== "" && target.matches(this.#buttonTarget)) {
            this.#cursor.onButtonOut(event);

            this.#previousState = this.#state;
            this.#state = 'idle';
        }
        
        if (this.#imageTarget !== "" && target.matches(this.#imageTarget)) {
            this.#cursor.onImageOut(event);

            this.#previousState = this.#state;
            this.#state = 'idle';
        }
    }

    #handleMouseDown(event) {
        this.#isDragging = true;

        this.#previousState = this.#state;
        this.#state = 'clicked';

        this.#cursor.onMouseDown(event);
    }

    #handleMouseUp(event) {
        this.#isDragging = false;

        if (this.#state === 'clicked') {
            this.#cursor.onMouseUp(event);

            if (this.#previousState === 'button') {
                this.#cursor.onButtonOver(event);
                this.#previousState = this.#state;
                this.#state = 'button';
    
            } else if (this.#previousState === 'image') {
                this.#cursor.onImageOver(event);
                this.#previousState = this.#state;
                this.#state = 'image';

            } else {
                this.#previousState = this.#state;
                this.#state = 'idle';
            }
        }

    }

    #handleMouseLeave(event) {
        this.#cursor.deactivate();
    }

    // Helper
    #extractArrayFromValues(string) {
        if (!string) return;
        const arr = string.trim().split(" ");
        return arr;
    }

    // User Methods
    hide() {
        if (!this.#hidden) {
            this.#removeEventListener();
            this.#cursor.hide && console.log("hide");
            this.#cursor.deactivate();
            this.#hidden = true;
        }
    }

    show() {
        if (this.#hidden) {
            this.#setEventListener();
            this.#cursor.show && this.#cursor.show();
            this.#hidden = false;
        }
    }

    delete() {
        this.#removeEventListener();
        this.#cursor.delete();
        this.#type = null;

        this.#cursor = null;
        this.#color = null;
        this.#textColor = null;
        this.#font = null;

        this.#zIndex = null
        this.#sendToBack = null;

        this.#text = null;
        this.#imageText = null;
        this.#buttonText = null;
        this.#clickText = null;

        this.#delay = null;
        this.#section = null;

        this.#onMouseMove = null;
        this.#onMouseOver = null;
        this.#onMouseOut = null;
        this.#onMouseDown = null;
        this.#onMouseUp = null;
        this.#onMouseLeave = null;
        this.#hidden = null;
        this.#isDragging = null;
        this.#state = null;
        this.#previousState = null;
        delete this;
    }

    // User Reviews
    #removeEventListener() {
        this.#section.removeEventListener('mousemove', this.#onMouseMove);
        this.#section.removeEventListener('mouseover', this.#onMouseOver);
        this.#section.removeEventListener('mouseout', this.#onMouseOut);
        this.#section.removeEventListener('mousedown', this.#onMouseDown);
        this.#section.removeEventListener('mouseup', this.#onMouseUp);
        this.#section.removeEventListener('mousemove', this.#onMouseOver, {once: true});
        this.#section.removeEventListener('mouseleave', this.#onMouseLeave);
    }
}

export default Cursor;
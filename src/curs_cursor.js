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
        this.text = text;
        this.font = font;
        this.zIndex;

        this.imageText = imageText;
        this.buttonText = buttonText;

        this.delay = delay;
        this.selector = selector;
        this.section = section;

        this.#findCursorSectionInAncestors(section);
    }

    async #init() {
        this.module = await import(`./templates/cursor${this.type}.js`);
        this.cursor = this.module.cursor;

        if (!this.cursor) return;
        this.cursor.create({
            color: this.color,
            image: this.image,
            section: this.section,
            font: this.font,
            zIndex: this.zIndex,
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

    async load() {
        await this.#init();
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

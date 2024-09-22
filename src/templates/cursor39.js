import { curs_Span1 } from "../creator.js";
import Template from "./template.js";


// CSS Needed
const cursorCSS = {
    name: 'cjs-39',
    cssString: `
    .cjs-39 {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }

    .cjs-39.cjs-normal {
        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease;
    }

    .cjs-39.cjs-delay {
        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease, translate 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .cjs-39.button {
        transform: translate(-50%, -50%) scale(1.25);
    }

    .cjs-39.image {
        transform: translate(-50%, -50%) scale(1.25);
    }

    .cjs-39.click {
        transform: translate(-50%, -50%) scale(0.8);
    }
    `,
}


export class cursor extends Template {
    constructor(){
        super();
        this.css = cursorCSS;
        this.cursor1 = null;
        this.svgElement;
        this.pathElement;
        this.animateElement;

        this.animatedValues = [
            "M61.6,-16C70.9,8.5,63.3,42.6,44,55.4C24.7,68.2,-6.3,59.8,-28.7,42.8C-51.1,25.8,-64.8,0.1,-58.5,-20.2C-52.3,-40.4,-26.2,-55.4,0,-55.4C26.2,-55.4,52.4,-40.5,61.6,-16Z",
            "M48,-19.7C53,-0.2,41.5,20.5,23.6,33.8C5.7,47.1,-18.6,53.1,-38.3,41.4C-58,29.8,-73.1,0.5,-66,-21.9C-58.8,-44.3,-29.4,-59.9,-3.9,-58.7C21.5,-57.4,43,-39.2,48,-19.7Z",
            "M50.7,-14.6C60.3,13.1,59,46.3,41.6,59.4C24.2,72.5,-9.2,65.6,-29.4,49C-49.6,32.3,-56.5,5.9,-49.3,-18.4C-42.2,-42.6,-21.1,-64.6,-0.3,-64.5C20.5,-64.4,41.1,-42.2,50.7,-14.6Z",
            "M62.6,-21.3C67.9,-4.3,49.6,19.5,25.9,37C2.2,54.5,-26.9,65.8,-40.7,55.8C-54.5,45.8,-53,14.5,-43.7,-8.1C-34.4,-30.8,-17.2,-44.9,5.8,-46.8C28.7,-48.6,57.4,-38.3,62.6,-21.3Z",
            "M44.3,-13.1C50.8,5.7,44.9,29.7,28.8,42C12.7,54.3,-13.7,54.8,-28.4,43.2C-43,31.6,-45.9,7.9,-39.2,-11.1C-32.5,-30.1,-16.2,-44.5,1.3,-44.9C18.9,-45.3,37.8,-31.9,44.3,-13.1Z",
            "M51.9,-14.7C59.5,6.3,52.3,34.3,31.8,50.9C11.2,67.5,-22.7,72.8,-40.6,59.1C-58.5,45.3,-60.3,12.6,-50.9,-11.1C-41.4,-34.7,-20.7,-49.3,0.7,-49.5C22.2,-49.7,44.4,-35.7,51.9,-14.7Z",
            "M61.6,-16C70.9,8.5,63.3,42.6,44,55.4C24.7,68.2,-6.3,59.8,-28.7,42.8C-51.1,25.8,-64.8,0.1,-58.5,-20.2C-52.3,-40.4,-26.2,-55.4,0,-55.4C26.2,-55.4,52.4,-40.5,61.6,-16Z"
        ];
    }

    create({color, zIndex, delay}) {
        color = color ? color[0] : "#000";
        this.cursor1 = curs_Span1({zIndex, color, classes: 'cjs-span cjs-39', delay});

        this.svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svgElement.style.width = '100%';
        this.svgElement.style.height = '100%';
        this.svgElement.style.position = 'absolute';
        this.svgElement.setAttribute('viewBox', '0 0 200 200');
        this.svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        this.cursor1.appendChild(this.svgElement);

        this.pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.pathElement.setAttribute('id', 'blob');
        this.pathElement.setAttribute('fill', color);
        this.pathElement.setAttribute('stroke', color)
        this.pathElement.setAttribute('stroke-width', 2)
        this.pathElement.setAttribute('transform', 'translate(100 100)');
        this.svgElement.appendChild(this.pathElement);

        this.animateElement = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        this.animateElement.setAttribute('attributeName','d');
        this.animateElement.setAttribute('dur', '4s');
        this.animateElement.setAttribute('repeatCount', 'indefinite');
        this.animateElement.setAttribute('values', this.animatedValues.join(';'));
        this.pathElement.appendChild(this.animateElement);
    }

    activate (event) {
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
     
    // Delete function
    delete() {
        this.deactivate();
        this.cursor1.remove();
        this.svgElement.remove();
        this.pathElement.remove();
        this.animateElement.remove();

        this.cursor1 = null;
        this.svgElement = null;
        this.pathElement = null;
        this.animateElement = null;

        this.css = null;
        this.isActive = null;

        this.animatedValues = null;
        delete this;
    }
}
import { curs_Span1 } from "../creator.js";


// CSS Needed
const cursorCSS = {
    name: 'cjs-21',
    cssString: `
    .cjs-21 {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        transition: width 0.2s ease, height 0.2s ease;
    }

    .cjs-21.cjs-normal {
        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease;
    }

    .cjs-21.cjs-delay {
        transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease, translate 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .cjs-21.button {
        transform: translate(-50%, -50%) scale(0.5);
    }

    .cjs-21.image {
        transform: translate(-50%, -50%) scale(1.5);
    }

    .cjs-21.click {
        transform: translate(-50%, -50%) scale(1.2);
    }

    .cjs-21-span {
        width: 20%;
        height: 20%;

        position: absolute;
        top: 50%;
        left: 50%;

        background-color: var(--bg-color);
        translate: -50% -50%;
        border-radius: 50%;
        animation: cjs-21-expand-anim 0.8s linear infinite;
    }

    .cjs-21.click > .cjs-21-span {
        animation-play-state: paused;
    }

    .cjs-21.button > .cjs-21-span {
        animation-duration: 0.4s;
    }

    @keyframes cjs-21-expand-anim {
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


export const cursor = {

    css: cursorCSS,

    isActive: false,

    cursor1: null,

    spanElement: null,

    create: function ({color, zIndex, delay}) {
        color = color ? color[0] : "#FFF";
        this.cursor1 = curs_Span1({zIndex, color, classes: 'cjs-span cjs-21', delay});

        const spanElement = document.createElement('span');
        spanElement.classList.add('cjs-21-span');
        this.cursor1.appendChild(spanElement);

        this.spanElement = spanElement;
    },

    activate: function (event) {
        this.cursor1.style.translate = `${event.clientX}px ${event.clientY}px`;
        this.cursor1.style.display = '';
        this.cursor1.style.transition = '';
        this.isActive = true;
    },

    deactivate: function () {
        this.cursor1.style.display = 'none';
        this.cursor1.style.transition = 'none';
        this.isActive = false;
    },

    onMouseMove: function (event) {
        this.cursor1.style.translate = `${event.clientX}px ${event.clientY}px`;
    },
    
    // On Mouse down 
    onButtonOver: function () {
        this.cursor1.classList.add('button');
    },

    onButtonOut: function () {
        this.cursor1.classList.remove('button');
    },

    onImageOver: function () {
        this.cursor1.classList.add('image');
    },

    onImageOut: function () {
        this.cursor1.classList.remove('image');
    },

    onMouseDown: function () {
        this.cursor1.classList.add('click');
    },

    onMouseUp: function () {
        this.cursor1.classList.remove('click');
    }
}
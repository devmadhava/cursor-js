import Cursor from "./curs_cursor.js";
import { curs_injectCSS } from "./helper.js";

window.Cursor = Cursor;

// Run a render instance
// const render = new Curs_Renderer();
curs_injectCSS({
    name: 'cjs-span',
    cssString: `
    .cjs-span {
        top : 0;
        left: 0;
        position: fixed;
        transform: translate(-50%, -50%);
        pointer-events: none;
    }
    
    .cjs-span-no-center {
        top : 0;
        left: 0;
        position: fixed;
        pointer-events: none;
    }
    `
})

const curs_allSections = document.querySelectorAll('[data-cursor-type]');

curs_allSections?.forEach(async curs_section => {
    const type = curs_section.getAttribute('data-cursor-type');
    const color = curs_section.getAttribute('data-cursor-color');
    const image = curs_section.getAttribute('data-cursor-image');
    const font = curs_section.getAttribute('data-cursor-font');

    const textColor = curs_section.getAttribute('data-cursor-text-color');
    const text = curs_section.getAttribute('data-cursor-text');
    const imageText = curs_section.getAttribute('data-cursor-text-image');
    const buttonText = curs_section.getAttribute('data-cursor-text-button');
    const clickText = curs_section.getAttribute('data-cursor-text-click');

    const delayAttribute = curs_section.getAttribute('data-cursor-delay');
    const delay = delayAttribute !== 'false' && delayAttribute !== null;

    const cursor = new Cursor({
        type,
        color,
        image,
        font,

        textColor,
        text,
        imageText,
        buttonText,
        clickText,

        delay,

        section: curs_section,
    });

    cursor.load();    
});
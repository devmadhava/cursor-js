import Cursor from "./curs_cursor_dynamic.js";
import { curs_injectCSS } from "./helper.js";

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
});

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

    const pointerAttribute = curs_section.getAttribute('data-cursor-hide');
    // If pointer attribute is not used or is set to false than pointer should be true meaning it will be shown, 
    //however if the user has used pointer attribute and uses any value for it than hide the pointer by turning pointer to true
    const pointer = pointerAttribute === null || pointerAttribute === 'false' ? true : false;

    const zIndexAttribute = curs_section.getAttribute('data-cursor-z-index');
    const zIndex = Number(zIndexAttribute);

    const sendToBackAttribute = curs_section.getAttribute('data-cursor-send-to-back');
    const sendToBack = sendToBackAttribute !== 'false' && sendToBackAttribute !== null;

    const buttonTarget = curs_section.getAttribute('data-cursor-target-button');
    const imageTarget = curs_section.getAttribute('data-cursor-target-image');


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
        pointer,

        zIndex,
        sendToBack,

        buttonTarget,
        imageTarget,

        section: curs_section,
    });

    // Will be needed in case of dynamic imports
    await cursor.load();
});



export default Cursor;
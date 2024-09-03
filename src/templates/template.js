import { curs_Span1 } from "../creator.js   ";
import { curs_injectCSS, curs_renderElementWithTranslate } from "../helper.js   ";


// CSS Needed
const cursorCSS = {
    name: 'cjs-1',
    cssString: `
    
    

    `,
}




// export const create = ({image, section, color, font, zIndex}) => {
//     let isActive = false;
//     curs_injectCSS(cursorCSS);

//     // Create Span Cursors


//     // Active and Deactivate Logic
//     const activate  = (event) => {
//         // Write activate Logic


//         isActive = true;
//     }

//     const deactivate  = () => {
//         // Write de activate logic


//         isActive = false;
//     }


//     // Handlers
//     const handleMouseMove = (event) => {
//         if (!isActive) return;
//         curs_renderElementWithTranslate(cursor1, event.clientX, event.clientY);
//     }

//     const handleMouseOver = (event) => {
//         activate(event);

//         const target = event.target;
//         if (target.matches('button, a')) {
//             handleMouseonButtonOver(event);
//         } else if (target.matches('img')) {
//             handleMouseOnImageOver(event);
//         }
//     }

//     const handleMouseOut = (event) => {
//         deactivate();
        
//         const target = event.target;
//         if (target.matches('button, a')) {
//             handleMouseonButtonOut(event);
//         } else if (target.matches('img')) {
//             handleMouseOnImageOut(event);
//         }
//     }


//     // Cursor Change
//     // On Hovering over button and anchor tag
//     const handleMouseonButtonOver = () => {

//     }
 
//     const handleMouseonButtonOut = () => {
 
//     }
 
//     // On Hovering over img tag
//     const handleMouseOnImageOver = () => {
 
//     }
 
//     const handleMouseOnImageOut = () => {
 
//     }
 
//     // On MouseDown
//     const handleMouseDown = () => {
         
//     }
 
//     const handleMouseUp = () => {
         
//     }


//     // Events
//     section.addEventListener('mousemove', handleMouseMove);
//     section.addEventListener('mouseover', handleMouseOver);
//     section.addEventListener('mouseout', handleMouseOut);
//     section.addEventListener('mousedown', handleMouseDown);
//     section.addEventListener('mouseup', handleMouseUp);

// }


export const cursor = {

    css: cursorCSS,

    isActive: false,

    cursor1: null,

    create: function ({color, zIndex}) {
        color = color ? color[0] : "#000";
    },

    activate: function (event) {
    },

    deactivate: function () {
    },

    onMouseMove: function (event) {
    },
    
    // On Mouse down 
    onButtonOver: function () {
    },

    onButtonOut: function () {
    },

    onImageOver: function () {
    },

    onImageOut: function () {
    },

    onMouseDown: function () {
    },

    onMouseUp: function () {
    }
}
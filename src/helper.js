export const curs_createStyleElement = () => {
    const styleElement  = document.createElement('style');
    styleElement.setAttribute('data-curs-essential-styles', '');
    document.head.appendChild(styleElement);
    return styleElement;
}

export const curs_injectCSS = ({name, cssString}) => {
    let styleElement = document.head.querySelector('[data-curs-essential-styles]');
    if (!styleElement) {
        styleElement = curs_createStyleElement();
    }

    const stylesApplied = styleElement.getAttribute('data-curs-essential-styles');
    if (stylesApplied.includes(name)) return;

    styleElement.innerHTML += cssString;
    styleElement.setAttribute('data-curs-essential-styles', stylesApplied + ' ' + name);
}


/**
 * Creates a cursor block element and appends it to the document body.
 * 
 * @param {string} string
 * @param {number} minimumLength
 * @returns {Array}
 */
export const extractArray = (string, minimumLength = 2) => {
    const arr = string.split(' ');
    
    // If the array is already the required length or longer, return it as is
    if (arr.length >= minimumLength) {
        return arr;
    }

    // Otherwise, keep adding elements to the array from itself until it reaches the required length
    let index = 0;
    while (arr.length < minimumLength) {
        arr.push(arr[index % arr.length]);
        index++;
    }

    return arr;
}


export const curs_renderElementWithTranslate = (element, x, y) => {
    element.style.translate = `${x}px ${y}px`;
}


export const curs_centerAnElementToTarget = (element, target) => {
    const targetRect = target.getBoundingClientRect();
    const size = Math.max(parseInt(targetRect.width), parseInt(targetRect.height)) + 20;

    element.style.width = size + 'px';
    element.style.height = size + 'px';

    const x = targetRect.left + targetRect.width / 2;
    const y = targetRect.top + targetRect.height / 2;
    element.style.translate = `${x}px ${y}px`;
}


export const curs_getScaleRelativeToTarget = (element, target, scaleFactor = 1.2) => {
    // Get the dimensions of the target element
    const targetRect = target.getBoundingClientRect();
    const targetMaxSize = Math.max(targetRect.width, targetRect.height);

    // Get the dimensions of the span element
    const spanRect = element.getBoundingClientRect();
    const spanMaxSize = Math.max(spanRect.width, spanRect.height);

    // Calculate the scale factor based on the maximum dimension
    const scale = (targetMaxSize / spanMaxSize) * scaleFactor;

    // Apply the uniform scale transformation to the span element
    return scale.toFixed(2);
};





// Create Circular Text
export const curs_circularText = ({size, spacing, element}) => {
    const radius = size / 2 || element.offsetWidth / 2;
    element.innerHTML = element.innerText.split("").map((char, index) => `<span style="position: absolute; left: 50%; transform-origin:0 ${radius}px; transform:rotate(${index * spacing}deg)">${char}</span>`).join("");
}

// Generate random colors using hex
export const curs_getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Get random element from an array and even use last element to make sure the prev element is not repeated
export const curs_getRandomElementFromArray = (arr, lastElement) => {
    let element;
    do {
        const randomIndex = Math.floor(Math.random() * arr.length);
        element = arr[randomIndex];
    } while (element === lastElement);
    return element;        
}

// Covert color to RGB
// Deprecated
// export const curs_colorToRGB = (string) => {
//     if (!string) return;

//     let span = document.createElement('span');
//     span.style.backgroundColor = string;
//     document.body.appendChild(span);

//     let color = getComputedStyle(span).backgroundColor;
//     document.body.removeChild(span);

//     if (color.startsWith('rgba')) {
//         color = color.substring(5, color.length - 1);
//     } else {
//         color = color.substring(4, color.length - 1);
//     }

//     color = color.split(',');
//     return color;
// }

// Doesnt interfere with DOM
export const curs_colorToRGB = (string = 'red') => {
    let canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    let ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = string;
    ctx.fillRect(0, 0, 1, 1);

    let col = ctx.getImageData(0, 0, 1, 1).data;
    canvas.remove();
    return col;
}

// Invert Color
export const curs_invertColorRGBFormat = (string, factor) => {
    const [r, g, b] = curs_colorToRGB(string);
    const invertedR = Math.round(255 - (r * factor));
    const invertedG = Math.round(255 - (g * factor));
    const invertedB = Math.round(255 - (b * factor));
    // return [invertedR, invertedG, invertedB];
    return `rgb(${invertedR}, ${invertedG}, ${invertedB})`;
}
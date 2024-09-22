// Classes to make default, Zindex

/**
 * 
 * @returns {[element: string, classes: string]} 
 */
export const curs_Span1 = ({zIndex, color, classes, delay, parent = document.body}) => {
    const element = Object.assign(document.createElement('span'), {
        style: `--bg-color: ${color}; z-index: ${zIndex}; display: none;`,
        className: `${classes} ${delay ? 'cjs-delay' : 'cjs-normal'}`.trim(),
    });

    // document.body.appendChild(element);
    parent.appendChild(element);

    return element;
}

export const curs_SpanNoDelay = ({zIndex, color, classes, parent = document.body}) => {
    const element = Object.assign(document.createElement('span'), {
        style: `--bg-color: ${color}; z-index: ${zIndex}; display: none;`,
        className: `${classes}`,
    });

    // document.body.appendChild(element);
    parent.appendChild(element);

    return element;
}


// Text
export const curs_SpanTextWithDelay = ({zIndex, color, textColor, font, classes, delay }) => {
    const element = Object.assign(document.createElement('span'), {
        style: `--bg-color: ${color}; --color: ${textColor}; --font: ${font}; z-index: ${zIndex}; display: none;`,
        className: `${classes} ${delay ? 'cjs-delay' : 'cjs-normal'}`.trim(),
    });
    document.body.appendChild(element);

    return element;
}

export const curs_SpanTextNoDelay = ({zIndex, color, textColor, font, classes }) => {
    const element = Object.assign(document.createElement('span'), {
        style: `--bg-color: ${color}; --color: ${textColor}; --font: ${font}; z-index: ${zIndex}; display: none;`,
        className: `${classes}`,
    });
    document.body.appendChild(element);

    return element;
}


// BG
// export const curs_SpanNoBGWithDelay = ({zIndex, classes, delay}) => {
//     const element = document.createElement('span');
//     element.style.zIndex = zIndex;
//     element.style.display = 'none';
//     element.className = classes;
//     document.body.appendChild(element);

//     // return [element, classes];
//     return element;
// }

export const curs_SpanNoBGWithDelay = ({zIndex, classes, delay}) => {
    const element = Object.assign(document.createElement('span'), {
        style: `z-index: ${zIndex}; display: none;`,
        className: `${classes} ${delay ? 'cjs-delay' : 'cjs-normal'}`.trim(),
    });

    document.body.appendChild(element);
    return element;
}


export const curs_SpanNoBGNoDelay = ({zIndex, classes}) => {
    const element = Object.assign(document.createElement('span'), {
        style: `z-index: ${zIndex}; display: none;`,
        className: `${classes}`,
    });

    document.body.appendChild(element);
    return element;
}



// With Text inside Para
export const curs_SpanWithParaSet = ({zIndex, color, classes, font, textColor}) => {
    const element = document.createElement('span');
    element.style.setProperty('--bg-color', color);
    element.style.setProperty('--color', textColor);
    element.style.setProperty('--font', font);
    element.style.zIndex = zIndex;
    element.style.display = 'none';
    element.className = classes;
    document.body.appendChild(element);

    return [element, classes];
}
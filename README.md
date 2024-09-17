# Cursor JS

**Cursor.js** is a JavaScript library that allows you to create and customize cursors with various templates and properties. You can apply these custom cursors to any `div` or `section` element on your webpage, with support for dynamic effects and state-based text content. Cursors can be created using either HTML **data attributes** or the JavaScript **Cursor** class. You can see all the cursor effects and templates _here_.

<br>

## Basic Use

Insert this CDN in your website at the end of the `<body>`. Right above the `</body>` tag.

```
<script src="https://cdn.jsdelivr.net/npm/@vogelweb/cursor-js@1.0.6/dist/min/cursor.js"></script>
```

After including the CDN tag, use the `data-cursor-type` attribute on the `div`, `section`, `body`, or any other tag, and set its value to the cursor type you want. You can change the value from 1 to any number between **1 and 34** for different cursors. Here's the code for setting the cursor on the body:

```
<body data-cursor-type="1"> Your Body Content is here.... </body>
```

You can check all cursor types available [here](https://www.vogelweb.io/cursor-js).

<br>

### Using with JavaScript

While this is not required, if you want more control over the cursor or prefer to write this in JavaScript, you can do that too. Just use the provided `Cursor` class to create new instances. The cursor mentioned above is recreated in JS using the code below:

```
const cursor = new Cursor({
    type: 1,
    selector: "body"                 
})
```

<br><br>

## Different Ways to Install

You can either download the JavaScript file, place it in your project, and use the `script` tag with the JavaScript file as the source, or you can use the CDN link provided.

<br>

### 1\. Using Script Tag

```
<script src="https://cdn.jsdelivr.net/npm/@vogelweb/cursor-js@1.0.5/dist/min/cursor.js"></script>
```

Just copy and paste the above script tag at the end of the `body`.

<br>

### 2\. Using NPM

```
npm i @vogelweb/cursor-js
```

This will install the node module which will contain dist/esm.js file. You can use the esm.js directly by using import statement in your JavaScript file.

```
import Cursor from '/path-to-node_modules/@vogelweb/cursor-js/dist/esm.js
```

<br>

### 3\. Downloading Files

You can download the files directly from our website. [Here](https://www.vogelweb.io/cursor-js/how-to-use). This will also allow you to use dynamic imports. You can also use dynamic imports if you used NPM. Learn how to use Dynamic Imports [here](https://www.vogelweb.io/cursor-js/dynamic-imports).


<br><br>
## Types of Cursors

There are currently over thirty cursor templates available in the library. Each template is identified by a number rather than a name, starting from 1 and going up to 34. This numbering system simplifies the identification and management of templates. See all the cursors [here](https://www.vogelweb.io/cursor-js/).


<br><br>
## Customizing cursors

### Each cursor template follows a certain structure and supports four distinct states:

1.  **Idle**: The default state of the cursor.
2.  **Image**: The state when the cursor is hovering over `<img>` tags.
3.  **Button**: The state when the cursor is hovering over `<button>` or `<a>` tags.
4.  **Click**: The state when the mouse button is pressed.

You can customize each cursor according to its abilities and your preferences. You can even change the targets of the **Image** and **Button** states so these states will trigger on elements provided by you, or you can even remove these two states completely.

As mentioned above there are two ways to create a cursor and as such there are two ways to customize too. One way is to use `data-attributes` and the other is to pass custom values when using `Cursor` class instance to create Cursor.

<br>

1.  **Basic Cursor Setup**: Add the `data-cursor-type` attribute to your target `div`, `section`, or any tag to apply a cursor:
    
    ```
    <div data-cursor-type="1">... This is a Section ...</div>
    ```

    You can create the same cursor in JavaScript using `Cursor` class. You just need to pass the following key-value pairs:
    *   **type**: Specifies which cursor template to load.
    *   **selector**: Indicates the element or section where the cursor will be applied.
    
    ```
    const cursor = new Cursor({
        type: 1,
        selector: '.class' or '#id'
    });
    
    ```
    
    <br>
    
2.  **Adding a Delay**: Add a slight delay effect with the `data-cursor-delay` attribute:
    
    ```
    <div data-cursor-type="number" data-cursor-delay="true">Hover over me</div>
    ```
    You can create the above using the `delay` property.
    
    ```
    const cursor = new Cursor({
        type: number,
        selector: '.section',
        delay: true,
    });
    ```

    Note: Not all cursors have the delay effect, as some templates include this effect by default.
    
    <br>
    
3.  **Changing the Color**: Change the color of the cursor element(s) with the `data-cursor-color` attribute:
    
    ```
    <div data-cursor-type="number" data-cursor-color="#ff0000">Hover over me</div>
    ```
    Or in JavaScript using `color` property.
    ```
    const cursor = new Cursor({
        type: number,
        selector: '.section',
        color: '#ff0000',
    });
    ```
    
    You can use various color conventions for cursor customization, including _RGB_, _Hexadecimal Values_, or _Color names_. Additionally, if the cursor effect or template supports it, you can specify multiple colors by separating them with a space.
    
    ```
    <div data-cursor-type="number" data-cursor-color="#ff0000 red #fff">Hover over me</div>
    ```

    And similarly in JavaScript: 
    ```
    const cursor = new Cursor({
        type: number,
        selector: '.section',
        color: '#ff0000 red #fff',
    });
    ```
    
    In this example, the cursor will use the specified colors (`#ff0000`, `red`, and `#fff`) as allowed by the cursor's effect or template.
    
    <br>
    
4.  **Adding Text**: Some cursor templates allow you to add text to the cursor. This text can be displayed in any of the four states: **idle**, **button**, **image**, or **click**, depending on the cursor's effect or template. The following data attributes can be used to specify text for different states:
    *   **Idle Text**: Added using the `data-cursor-text` attribute:
        
        ```
        <div data-cursor-type="number" data-cursor-text="Idle Text Statement">Hover over me</div>
        ```

        Or Using `text` property with JavaScript:
        
         ```
        const cursor = new Cursor({
            type: number,
            selector: '.section',
            text: 'Idle Text Statement',
        });
        ```

        
    <br>
        
        
    *   **Button Text**: Added using the `data-cursor-text-button` attribute:
        
        ```
        <div data-cursor-type="number" data-cursor-text-button="Button Text Statement">Hover over me</div>
        ```
         
        Or Using `buttonText` property with JavaScript:
        
        ```
        const cursor = new Cursor({
            type: number,
            selector: '.section',
            buttonText: 'Button Text Statement',
        });
        ```
        
    <br>
        
        
    *   **Image Text**: Added using the `data-cursor-text-image` attribute:
        
        ```
        <div data-cursor-type="number" data-cursor-text-image="Image Text Statement">Hover over me</div>
        ```
        
        
        Or Using `imageText` property with JavaScript:
        
        ```
        const cursor = new Cursor({
            type: number,
            selector: '.section',
            imageText: 'Image Text Statement',
        });
        ```
        
        
    <br>
        
        
    *   **Click Text**: Added using the `data-cursor-text-click` attribute:
        
        ```
        <div data-cursor-type="number" data-cursor-text-click="Click Text Statement">Hover over me</div>
        ```
        
        Or Using `clickText` property with JavaScript:
        
        ```
        const cursor = new Cursor({
            type: number,
            selector: '.section',
            clickText: 'Click Text Statement',
        });
        ```
        
    <br>
        
5.  **Changing Text Color**: Change the color of text with the `data-cursor-text-color` attribute:
    
    ```
    <div data-cursor-type="number" data-cursor-text-color="#ff0000">Hover over me</div>
    ```

    Or Using `textColor` property with JavaScript:
    
    ```
    const cursor = new Cursor({
        type: number,
        selector: '.section',
        textColor: '#ff0000',
    });
    ```
    
    Similar to the `data-cursor-color`, you can use various color conventions for text customization, including _RGB_, _Hexadecimal Values_, or _Color names_.
    
    <br>
    
6.  **Changing Font Family**: Change the font family of text with the `data-cursor-font` attribute:
    
    ```
    <div data-cursor-type="number" data-cursor-font="Monospace">Hover over me</div>
    ```

    Or Using `font` property with JavaScript:
    
    ```
    const cursor = new Cursor({
        type: number,
        selector: '.section',
        font: 'Monospace',
    });
    ```
    
    <br>
    
    Here's a complete example of a `div` with various cursor customizations:
    
    ```
    <div 
        data-cursor-type="number"
        data-cursor-delay="true"
        data-cursor-color="#ff0000"
        data-cursor-text="Idle Text Statement"
        data-cursor-text-button="Button Text Statement"
        data-cursor-text-image="Image Text Statement"
        data-cursor-text-click="Click Text Statement"
        data-cursor-text-color="#ff0000"
        data-cursor-font="Monospace"
    >
        Your Content...
    </div>
    ```
    
    
    And similarly a complete `Cursor` Class Instance with every property available is given below:
    
    ```
    const cursor = new Cursor({
        type: number,
        selector: '.section',
        delay: true,
        color: '#ff0000',
        text: 'Idle Text Statement',
        buttonText: 'Button Text Statement',
        imageText: 'Image Text Statement',
        clickText: 'Click Text Statement',
        textColor: '#ff0000',
        font: 'Monospace',
    });
    ```
    
    <br>
    
7.  **Changing State Targets**: You can change when the state change or state effect will take place in case of **Button** and **Image** states. By default these trigger when you enter any `button` / `a` tag and `img` tag respectively but you can change when these elements with the help of `data-cursor-target-button="selector"` and `data-cursor-target-image="selector"`, where selector refers to any **tag**, **.class** or **#id**:
    
    ```
    <div data-cursor-type="number" data-cursor-target-button=".classname" data-cursor-target-image="#id">Hover over me</div>
    ```

    Or Using `buttonTarget` and `imageTarget` properties with JavaScript:
    
    ```
    const cursor = new Cursor({
        type: number,
        selector: '.section',
        buttonTarget: '.class',
        imageTarget: '#id'
    });
    ```
    
    <br>
    
8.  **Hide the actual pointer**: To hide the default / actual pointer in the section you can use `data-cursor-hide`, this will hide the actual cursor in the section you selected:
    
    ```
    <div data-cursor-type="number" data-cursor-hide>Hover over me</div>
    ```

    Or Using `pointer` property with JavaScript:
    
    ```
    const cursor = new Cursor({
        type: number,
        selector: '.section',
        pointer: false,
    });
    ```
    
    <br>
    
9.  **Customize Z-Index**: By default when you apply a cursor to a **Section** the cursor you apply has `z-index` value of **9999**. You can change this by using `data-cursor-z-index="value"`:
    
    ```
    <div data-cursor-type="number" data-cursor-z-index="4">Hover over me</div>
    ```

    Or Using `zIndex` property with JavaScript:
    
    ```
    const cursor = new Cursor({
        type: number,
        selector: '.section',
        zIndex: 4,
    });
    ```
    
    <br>
    
    When a cursor is applied to any child of this **Section**, its `z-index` will be **value + 1**, making the child's cursor appear above the parent's cursor. Eg:- lets take the above cursor for example, you have set the `z-index` value to **4**, so if you apply cursor to its child, that new cursor to child will have `z-index` value of **4 + 1 = 5**. You can change this by using data-cursor-send-to-back, which will set the child's cursor z-index to Parent's `z-index` **value - 1**. Lets Look at an example.
    
    Without applying `data-cursor-send-to-back`:
    
    Cursor applied to a section:
    
    ```
    <div class="section" data-cursor-type="1" data-cursor-z-index="4">...</div>
    ```
    The Cursor applied to it will have the `z-index` value of **4**. We apply Cursor to a child of this **Section**:
    
    ```
    <div class="section" data-cursor-type="1" data-cursor-z-index="4">
        <div class="child" data-cursor-type="7">
        </div>
    </div>
    ```
    
    Now here the Cursor of Parent **Section** will have `z-index` value of **4** and the child will have a Cursor with `z-index` value of **5**.
    
    
    If we were to use `data-cursor-send-to-back` like this:
    ```
    <div class="section" data-cursor-type="1" data-cursor-z-index="4" data-cursor-send-to-back>
        <div class="child" data-cursor-type="7">
        </div>
    </div>
    ```
    Then the child will have the `z-index` value of **3**.
    
    In JavaScript you can use `sendToBack` for the same effect:
    ```
    const cursor = new Cursor({
        type: number,
        selector: '.section',
        sendToBack: true,
    });
    ```
    
    Note: - If you decide to put custom `z-index` value then the custom z-index value take precedence. Example:
    
    ```
    <div class="section" data-cursor-type="1" data-cursor-z-index="4">
        <div class="child" data-cursor-type="7" data-cursor-z-index="55">
        </div>
    </div>
    ```
    
    Here it is of no matter if you use `send-to-back` functionality or not the Parent **Section** will have `z-index` value of **4** and the child will have `z-index` value of **55**.
    
    
    
    
<br><br>
## Limitations

Any kind of top-layer elements like **Dialogs, Modals, Select, etc.** exist in the top layer of the browser and cannot be manipulated using Cursor JS, as z-index values do not affect them. The Cursor Element will always be beneath these elements.


<br><br>

## A Complete list of options available to you
| Customization           | HTML Data Attributes                                                                                   | JavaScript (Cursor Class)                                                   |
|-------------------------|--------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| Basic Setup             | data-cursor-type="1"                                                                                   | type: 1                                                                     |
| Add Delay               | data-cursor-delay="true"                                                                               | delay: true                                                                 |
| Change Color            | data-cursor-color="red"                                                                            | color: "red"                                                            |
| Multiple Colors         | data-cursor-color="red blue green"                                                                   | color: "red blue green"                                                   |
| Idle Text               | data-cursor-text="Idle Text Statement"                                                                 | text: "Idle Text Statement"                                                 |
| Button Text             | data-cursor-text-button="Button Text Statement"                                                        | buttonText: "Button Text Statement"                                         |
| Image Text              | data-cursor-text-image="Image Text Statement"                                                          | imageText: "Image Text Statement"                                           |
| Click Text              | data-cursor-text-click="Click Text Statement"                                                          | clickText: "Click Text Statement"                                           |
| Change Text Color       | data-cursor-text-color="red"                                                                       | textColor: "red"                                                        |
| Change Font             | data-cursor-font="Monospace"                                                                           | font: "Monospace"                                                           |
| Changing State Targets  | data-cursor-target-button=".classname"<br>        data-cursor-target-image="#id"<br>       | buttonTarget: '.class',<br>        imageTarget: '#id'<br>       |
| Hide the Actual Pointer | data-cursor-hide                                                                                       | pointer: false                                                              |
| Customize Z-Index       | data-cursor-z-index="9999"                                                                                | zIndex: 9999                                                                   |
| Send to Back            | data-cursor-send-to-back                                                                               | sendToBack: true                                                            |



<br><br>
## License

MIT

# Cursor JS

**Cursor.js** is a JavaScript library that allows you to create and customize cursors with various templates and properties. You can apply these custom cursors to any `div` or `section` element on your webpage, with support for dynamic effects and state-based text content. The Cursors can be easily be created using either HTML **data attributes** or JavaScript **Cursor** class. You can see all the cursor effects and templates *here*.

## How to Use?
You can either download the JavaScript File, place it in the project and use __script tag__ with the JavaScript file as source. Or you can use the cdn link provided.

### 1. Using Script Tag

`<script type="module" src="../cursorwebmin.js"></script>`

Add the above tag at the end of `body` but replace the src with the appropriate path to your downloaded file. If you decide to use this method, please make sure you have `type="module"` enabled.

### 2. Using CDN

`<script src="https://cdn.jsdelivr.net/npm/@vogelweb/cursor-js@1.0.0/dist/min/cursor.js"></script>`

Just copy and paste the above script tag at the end of the `body`.

## Type of Cursors
There are currently over thirty cursor templates available in the library. Given the increasing number of cursor templates, each template is identified by a number rather than a name. The numbering starts from 1 and goes up to the current total, which is 28. This numbering system simplifies identification and management of the templates.

### Each cursor template follows a certain structure and supports four distinct states:
1. __Idle__: The default state of the cursor.
2. __Image__: The state when the cursor is hovering over button or a (anchor) tags.
3. __Button__: The default state when the cursor is at rest.
4. __Click__: The state when the mouse button is pressed.
You can customize each cursor according to its abilities and your preferences.

## Using HTML Data Attributes to create Cursor
1. __Basic Cursor Setup__: Add the `data-cursor-type` attribute to your target `div`, `section` or any tag for that matter to apply a cursor:

`<div data-cursor-type="1">... This is a Section ...</div>`

2. __Adding a delay__: Add a slight delay effect with the `data-cursor-delay` attribute:

`<div data-cursor-type="number" data-cursor-delay="true">Hover over me</div>`

Note - Not all Cursors have the delay effect since in some templates this effect is added and needed by default.

3. __Changing the color__: Change the color of cursor element(s) with the `data-cursor-color` attribute:

`<div data-cursor-type="number" data-cursor-color="#ff0000">Hover over me</div>`

You can use various color conventions for cursor customization, including _RGB_, _Hex_, or even _Color names_. Additionally, if the cursor effect or template supports it, you can specify multiple colors by separating them with a space.

`<div data-cursor-type="number" data-cursor-color="#ff0000 red #fff">Hover over me</div>`

In this example, the cursor will use the specified colors (_#ff0000_, _red_, and _#fff_) as allowed by the cursor's effect or template.

4. __Adding Text__: Some cursor templates allow you to add text to the cursor. This text can be displayed in any of the four states: __idle__, __button__, __image__, or __click__, depending on the cursor's effect or template. The following data attributes can be used to specify text for different states:
    1. __Idle Text__: This can be added using the `data-cursor-text` attribute:
    `<div data-cursor-type="number" data-cursor-text="Idle Text Statement">Hover over me</div>`

    2. __Button Text__: This can be added using `data-cursor-text-button` attribute:
    `<div data-cursor-type="number" data-cursor-text-button="Button Text Statement">Hover over me</div>`

    3. __Image Text__: This can be added using `data-cursor-text-image` attribute:
    `<div data-cursor-type="number" data-cursor-text-image="Image Text Statement">Hover over me</div>`

    4. __Click Text__: This can be added using `data-cursor-text-click` attribute:
    `<div data-cursor-type="number" data-cursor-text-click="Click Text Statement">Hover over me</div>`

5. __Changing Text Color__: Change the color of text with the `data-cursor-color` attribute:

`<div data-cursor-type="number" data-cursor-color="#ff0000">Hover over me</div>`

Similar to the __data-cursor-color__, you can use various color conventions for cursor customization, including _RGB_, _Hex_, or even _Color names_.

6. __Changing Font Family__: Change the font family of text with the `data-cursor-font` attribute:

`<div data-cursor-type="number" data-cursor-font="Monospace">Hover over me</div>`

Here's a complete example of a div with various cursor customizations:

```
<div data-cursor-type="number"
     data-cursor-delay="true"
     data-cursor-color="#ff0000"
     data-cursor-text="Idle Text Statement"
     data-cursor-text-button="Button Text Statement"
     data-cursor-text-image="Image Text Statement"
     data-cursor-text-click="Click Text Statement"
     data-cursor-text-color="#ff0000"
     data-cursor-font="Monospace">
  Hover over me
</div>
```

## Using JavaScript Cursor Class to create Cursor

It is pretty much similar to the method above the only difference is how you are sending the information. Rather than use `data` attributes, you will be utilizing the globaly available __Cursor__ class to create instances with specific templates. 

1. __Basic Cursor Setup__: To create a custom cursor, instantiate the Cursor class and pass an object as a parameter. This object requires at least two key-value pairs:

    - __`type`__:  Specifies which cursor template to load.
    - __`selector`__: ndicates the element or section where the cursor will be applied.

```
    const cursor = new Cursor({
        type: 1,
        selector: '.section'
    });

    await cursor.load();
```

Note - After creating an instance of the __Cursor__ class, it is necessary to run `await cursor.load()` where the cursor is the name of the cursor instance created.

2. __Adding a delay__: Add a slight delay effect with the `delay` property:

```
    const cursor = new Cursor({
        type: number,
        selector: '.section',
        delay: true,
    });

    await cursor.load();
```

Note - Not all Cursors have the delay effect since in some templates this effect is added and needed by default.

3. __Changing the color__: Change the color of cursor element(s) with the `color` property, its value is a string of color(s):

```
    const cursor = new Cursor({
        type: number,
        selector: '.section',
        color: '#ff0000',
    });

    await cursor.load();
```

You can use various color conventions for cursor customization, including _RGB_, _Hex_, or even _Color names_. Additionally, if the cursor effect or template supports it, you can specify multiple colors by separating them with a space.

```
    const cursor = new Cursor({
        type: number,
        selector: '.section',
        color: '#ff0000 red #fff',
    });

    await cursor.load();
```

In this example, the cursor will use the specified colors (_#ff0000_, _red_, and _#fff_) as allowed by the cursor's effect or template.

4. __Adding Text__: Similar to above, the text also here is sent for different states which are: __idle__, __button__, __image__, and __click__, depending on the cursor's effect or template. The following key-value properties can be used to specify text for different states:
    1. __Idle Text__: This can be added using the `text` property:
    ```
        const cursor = new Cursor({
            type: number,
            selector: '.section',
            text: 'Idle Text Statement',
        });

        await cursor.load();
    ```

    2. __Button Text__: This can be added using `buttonText` property:
    ```
        const cursor = new Cursor({
            type: number,
            selector: '.section',
            buttonText: 'Button Text Statement',
        });

        await cursor.load();
    ```

    3. __Image Text__: This can be added using `imageText` property:
    ```
        const cursor = new Cursor({
            type: number,
            selector: '.section',
            imageText: 'Image Text Statement',
        });

        await cursor.load();
    ```
    
    4. __Click Text__: This can be added using `clickText` property:
    ```
        const cursor = new Cursor({
            type: number,
            selector: '.section',
            clickText: 'Click Text Statement',
        });

        await cursor.load();
    ```

5. __Changing Text Color__: Change the color of text with the `textColor` property:
```
    const cursor = new Cursor({
        type: number,
        selector: '.section',
        textColor: '#ff0000',
    });

    await cursor.load();
```

Similar to the __color__ property, you can use various color conventions for cursor customization, including _RGB_, _Hex_, or even _Color names_.

6. __Changing Font Family__: Change the font family of the text with the `font` property:
```
    const cursor = new Cursor({
        type: number,
        selector: '.section',
        font: 'Monospace',
    });

    await cursor.load();
```

Here's a complete example of a __Cursor__ class instance with various cursor customizations:

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

    await cursor.load();
```

## Lincese MIT
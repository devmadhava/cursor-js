
declare module '@vogelweb/cursor-js' {

    enum pointerVisibility {
        hidden = 'hidden',
        show = 'show'
    }

    interface CursorBaseOptions {
        type?: number;
        selector?: string | null;
        section?: HTMLElement | null;
        color?: string;
        image?: string;
        font?: string;
        text?: string;
        imageText?: string;
        buttonText?: string;
        clickText?: string;
        textColor?: string;
        delay?: boolean;
        pointer?: pointerVisibility;

    }

    class Cursor {
        constructor(options: CursorBaseOptions);

        type: number;
        color: string[];
        textColor: string[];
        imageColor: string[];
        buttonColor: string[];
        image: string;
        font: string;
        zIndex: number;
        text: string;
        imageText: string;
        buttonText: string;
        clickText: string;
        delay: boolean;
        section: HTMLElement;
        cursor: any; // Replace `any` with the specific type if known

        load(): void;
        // Add other methods if they are public
    }

    export default Cursor;
}
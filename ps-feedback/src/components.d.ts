/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface PsFeedback {
        "audioUpload": boolean;
        "imageUpload": boolean;
        "inputLabel": string;
        "options": any;
    }
}
declare global {
    interface HTMLPsFeedbackElement extends Components.PsFeedback, HTMLStencilElement {
    }
    var HTMLPsFeedbackElement: {
        prototype: HTMLPsFeedbackElement;
        new (): HTMLPsFeedbackElement;
    };
    interface HTMLElementTagNameMap {
        "ps-feedback": HTMLPsFeedbackElement;
    }
}
declare namespace LocalJSX {
    interface PsFeedback {
        "audioUpload"?: boolean;
        "imageUpload"?: boolean;
        "inputLabel"?: string;
        "onPsFeedbackEvent"?: (event: CustomEvent<any>) => void;
        "options"?: any;
    }
    interface IntrinsicElements {
        "ps-feedback": PsFeedback;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "ps-feedback": LocalJSX.PsFeedback & JSXBase.HTMLAttributes<HTMLPsFeedbackElement>;
        }
    }
}

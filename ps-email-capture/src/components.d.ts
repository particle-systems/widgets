/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface PsEmailCapture {
        "heading": string;
        "inputPlaceholderText": string;
        "integrationKey": string;
        "spinnerUrl": string;
        "submitButtonText": string;
        "subtext": string;
        "successMessage": string;
        "tags": string;
    }
}
declare global {
    interface HTMLPsEmailCaptureElement extends Components.PsEmailCapture, HTMLStencilElement {
    }
    var HTMLPsEmailCaptureElement: {
        prototype: HTMLPsEmailCaptureElement;
        new (): HTMLPsEmailCaptureElement;
    };
    interface HTMLElementTagNameMap {
        "ps-email-capture": HTMLPsEmailCaptureElement;
    }
}
declare namespace LocalJSX {
    interface PsEmailCapture {
        "heading"?: string;
        "inputPlaceholderText"?: string;
        "integrationKey"?: string;
        "spinnerUrl"?: string;
        "submitButtonText"?: string;
        "subtext"?: string;
        "successMessage"?: string;
        "tags"?: string;
    }
    interface IntrinsicElements {
        "ps-email-capture": PsEmailCapture;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "ps-email-capture": LocalJSX.PsEmailCapture & JSXBase.HTMLAttributes<HTMLPsEmailCaptureElement>;
        }
    }
}

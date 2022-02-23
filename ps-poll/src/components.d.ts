/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface PsPoll {
        "emitEvents": boolean;
        "errorMsg": string;
        "explicitSubmit": boolean;
        "name": string;
        "options": any;
        "selection": string;
        "submitButtonLabel": string;
        "submittedMsg": string;
    }
}
declare global {
    interface HTMLPsPollElement extends Components.PsPoll, HTMLStencilElement {
    }
    var HTMLPsPollElement: {
        prototype: HTMLPsPollElement;
        new (): HTMLPsPollElement;
    };
    interface HTMLElementTagNameMap {
        "ps-poll": HTMLPsPollElement;
    }
}
declare namespace LocalJSX {
    interface PsPoll {
        "emitEvents"?: boolean;
        "errorMsg"?: string;
        "explicitSubmit"?: boolean;
        "name"?: string;
        "onPsPollEvent"?: (event: CustomEvent<any>) => void;
        "options"?: any;
        "selection"?: string;
        "submitButtonLabel"?: string;
        "submittedMsg"?: string;
    }
    interface IntrinsicElements {
        "ps-poll": PsPoll;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "ps-poll": LocalJSX.PsPoll & JSXBase.HTMLAttributes<HTMLPsPollElement>;
        }
    }
}

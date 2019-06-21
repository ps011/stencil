/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  CarData,
} from './car-list/car-data';

export namespace Components {
  interface AppRoot {}
  interface CarDetail {
    'car': CarData;
  }
  interface CarList {
    'cars': CarData[];
    'selected': CarData;
  }
  interface DomApi {}
  interface DomInteraction {}
  interface DomVisible {}
  interface ElementCmp {}
  interface EventCmp {
    'methodThatFiresEventWithOptions': () => Promise<void>;
    'methodThatFiresMyDocumentEvent': () => Promise<void>;
    'methodThatFiresMyWindowEvent': (value: number) => Promise<void>;
  }
  interface ListenCmp {
    'opened': boolean;
  }
  interface MethodCmp {
    'someMethod': () => Promise<number>;
    'someMethodWithArgs': (unit: string, value: number) => Promise<string>;
    'someProp': number;
  }
  interface PropCmp {
    'first': string;
    'lastName': string;
  }
  interface StateCmp {}
}

declare global {


  interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {}
  var HTMLAppRootElement: {
    prototype: HTMLAppRootElement;
    new (): HTMLAppRootElement;
  };

  interface HTMLCarDetailElement extends Components.CarDetail, HTMLStencilElement {}
  var HTMLCarDetailElement: {
    prototype: HTMLCarDetailElement;
    new (): HTMLCarDetailElement;
  };

  interface HTMLCarListElement extends Components.CarList, HTMLStencilElement {}
  var HTMLCarListElement: {
    prototype: HTMLCarListElement;
    new (): HTMLCarListElement;
  };

  interface HTMLDomApiElement extends Components.DomApi, HTMLStencilElement {}
  var HTMLDomApiElement: {
    prototype: HTMLDomApiElement;
    new (): HTMLDomApiElement;
  };

  interface HTMLDomInteractionElement extends Components.DomInteraction, HTMLStencilElement {}
  var HTMLDomInteractionElement: {
    prototype: HTMLDomInteractionElement;
    new (): HTMLDomInteractionElement;
  };

  interface HTMLDomVisibleElement extends Components.DomVisible, HTMLStencilElement {}
  var HTMLDomVisibleElement: {
    prototype: HTMLDomVisibleElement;
    new (): HTMLDomVisibleElement;
  };

  interface HTMLElementCmpElement extends Components.ElementCmp, HTMLStencilElement {}
  var HTMLElementCmpElement: {
    prototype: HTMLElementCmpElement;
    new (): HTMLElementCmpElement;
  };

  interface HTMLEventCmpElement extends Components.EventCmp, HTMLStencilElement {}
  var HTMLEventCmpElement: {
    prototype: HTMLEventCmpElement;
    new (): HTMLEventCmpElement;
  };

  interface HTMLListenCmpElement extends Components.ListenCmp, HTMLStencilElement {}
  var HTMLListenCmpElement: {
    prototype: HTMLListenCmpElement;
    new (): HTMLListenCmpElement;
  };

  interface HTMLMethodCmpElement extends Components.MethodCmp, HTMLStencilElement {}
  var HTMLMethodCmpElement: {
    prototype: HTMLMethodCmpElement;
    new (): HTMLMethodCmpElement;
  };

  interface HTMLPropCmpElement extends Components.PropCmp, HTMLStencilElement {}
  var HTMLPropCmpElement: {
    prototype: HTMLPropCmpElement;
    new (): HTMLPropCmpElement;
  };

  interface HTMLStateCmpElement extends Components.StateCmp, HTMLStencilElement {}
  var HTMLStateCmpElement: {
    prototype: HTMLStateCmpElement;
    new (): HTMLStateCmpElement;
  };
  interface HTMLElementTagNameMap {
    'app-root': HTMLAppRootElement;
    'car-detail': HTMLCarDetailElement;
    'car-list': HTMLCarListElement;
    'dom-api': HTMLDomApiElement;
    'dom-interaction': HTMLDomInteractionElement;
    'dom-visible': HTMLDomVisibleElement;
    'element-cmp': HTMLElementCmpElement;
    'event-cmp': HTMLEventCmpElement;
    'listen-cmp': HTMLListenCmpElement;
    'method-cmp': HTMLMethodCmpElement;
    'prop-cmp': HTMLPropCmpElement;
    'state-cmp': HTMLStateCmpElement;
  }
}

declare namespace LocalJSX {
  interface AppRoot extends JSXBase.HTMLAttributes<HTMLAppRootElement> {}
  interface CarDetail extends JSXBase.HTMLAttributes<HTMLCarDetailElement> {
    'car'?: CarData;
  }
  interface CarList extends JSXBase.HTMLAttributes<HTMLCarListElement> {
    'cars'?: CarData[];
    'onCarSelected'?: (event: CustomEvent<CarData>) => void;
    'selected'?: CarData;
  }
  interface DomApi extends JSXBase.HTMLAttributes<HTMLDomApiElement> {}
  interface DomInteraction extends JSXBase.HTMLAttributes<HTMLDomInteractionElement> {}
  interface DomVisible extends JSXBase.HTMLAttributes<HTMLDomVisibleElement> {}
  interface ElementCmp extends JSXBase.HTMLAttributes<HTMLElementCmpElement> {}
  interface EventCmp extends JSXBase.HTMLAttributes<HTMLEventCmpElement> {
    'onMy-event-with-options'?: (event: CustomEvent<{ mph: number }>) => void;
    'onMyDocumentEvent'?: (event: CustomEvent<any>) => void;
    'onMyWindowEvent'?: (event: CustomEvent<number>) => void;
  }
  interface ListenCmp extends JSXBase.HTMLAttributes<HTMLListenCmpElement> {
    'opened'?: boolean;
  }
  interface MethodCmp extends JSXBase.HTMLAttributes<HTMLMethodCmpElement> {
    'someProp'?: number;
  }
  interface PropCmp extends JSXBase.HTMLAttributes<HTMLPropCmpElement> {
    'first'?: string;
    'lastName'?: string;
  }
  interface StateCmp extends JSXBase.HTMLAttributes<HTMLStateCmpElement> {}

  interface IntrinsicElements {
    'app-root': AppRoot;
    'car-detail': CarDetail;
    'car-list': CarList;
    'dom-api': DomApi;
    'dom-interaction': DomInteraction;
    'dom-visible': DomVisible;
    'element-cmp': ElementCmp;
    'event-cmp': EventCmp;
    'listen-cmp': ListenCmp;
    'method-cmp': MethodCmp;
    'prop-cmp': PropCmp;
    'state-cmp': StateCmp;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


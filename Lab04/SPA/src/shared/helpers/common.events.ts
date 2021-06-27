import React from 'react';

/** An alias type. Should be used instead of `React.ChangeEvent<HTMLInputElement>` parameter. */
export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

/** An alias type. Should be used only instead of `React.ChangeEventHandler<HTMLInputElement>` parameter. */
export type InputChangeEventHandler = React.ChangeEventHandler<HTMLInputElement>;

/** An alias type. Should be used only instead of `React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>` parameter. */
export type InputSelectChangeEventHandler = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

/** An alias type. Should be used instead of `React.MouseEvent<HTMLButtonElement, MouseEvent>` parameter. */
export type MouseClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;

/** An alias type. Should be used instead of `React.KeyboardEvent<HTMLDivElement>` parameter. */
export type KeyPressEvent = React.KeyboardEvent<HTMLDivElement>

/** An alias type. Should be used instead of `React.FormEvent<HTMLFormElement>` parameter. */
export type FormSubmitEvent = React.FormEvent<HTMLFormElement>

/** An alias type. Should be used instead of `React.MouseEvent<SVGElement, MouseEvent>` parameter. */
export type SVGMouseEvent = React.MouseEvent<SVGElement, MouseEvent>;


/** An alias type. Should be used instead of `React.TouchEvent<SVGElement>` parameter. */
export type SVGTouchEvent = React.TouchEvent<SVGElement>;

/** An alias type. Should be used instead of `React.WheelEvent<SVGSVGElement>` parameter. */
export type SVGMouseWheelEvent = React.WheelEvent<SVGSVGElement>;

/** Extension of PointerEvent. Should be used instead of `React.PointerEvent<SVGSVGElement>` parameter. */
export type SVGPointerEvent = React.PointerEvent<SVGSVGElement>;

/** Extension of PointerEvent. Should be used instead of `React.PointerEvent<HTMLDivElement>` parameter. */
export type HTMLPointerEvent = React.PointerEvent<HTMLDivElement>
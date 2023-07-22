// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { expect } from 'vitest'

// import { handleKeydown } from '../useKeyboardShortcut'

// describe('handleKeydown', () => {
//   it('handleKeydown should handle keydown events', () => {
//     const key = 'a'
//     const modifierKey: string | undefined = 'ctrlKey'
//     const isDisabled = false
//     const handleEvent = vitest.fn()
//     const preventDefault = vitest.fn()
//     const stopPropagation = vitest.fn()
//     const e: KeyboardEvent = {
//       code: 'KeyA',
//       key: 'A',
//       ctrlKey: true,
//       preventDefault,
//       stopPropagation,
//       altKey: false,
//       charCode: 0,
//       isComposing: false,
//       keyCode: 0,
//       location: 0,
//       metaKey: false,
//       repeat: false,
//       shiftKey: false,
//       getModifierState(keyArg: string): boolean {
//         throw new Error('Function not implemented.')
//       },
//       initKeyboardEvent(
//         typeArg: string,
//         bubblesArg?: boolean | undefined,
//         cancelableArg?: boolean | undefined,
//         viewArg?: Window | null | undefined,
//         keyArg?: string | undefined,
//         locationArg?: number | undefined,
//         ctrlKey?: boolean | undefined,
//         altKey?: boolean | undefined,
//         shiftKey?: boolean | undefined,
//         metaKey?: boolean | undefined
//       ): void {
//         throw new Error('Function not implemented.')
//       },
//       DOM_KEY_LOCATION_LEFT: 0,
//       DOM_KEY_LOCATION_NUMPAD: 0,
//       DOM_KEY_LOCATION_RIGHT: 0,
//       DOM_KEY_LOCATION_STANDARD: 0,
//       detail: 0,
//       view: null,
//       which: 0,
//       initUIEvent(
//         typeArg: string,
//         bubblesArg?: boolean | undefined,
//         cancelableArg?: boolean | undefined,
//         viewArg?: Window | null | undefined,
//         detailArg?: number | undefined
//       ): void {
//         throw new Error('Function not implemented.')
//       },
//       bubbles: false,
//       cancelBubble: false,
//       cancelable: false,
//       composed: false,
//       currentTarget: null,
//       defaultPrevented: false,
//       eventPhase: 0,
//       isTrusted: false,
//       returnValue: false,
//       srcElement: null,
//       target: null,
//       timeStamp: 0,
//       type: '',
//       composedPath(): EventTarget[] {
//         throw new Error('Function not implemented.')
//       },
//       initEvent(
//         type: string,
//         bubbles?: boolean | undefined,
//         cancelable?: boolean | undefined
//       ): void {
//         throw new Error('Function not implemented.')
//       },
//       stopImmediatePropagation(): void {
//         throw new Error('Function not implemented.')
//       },
//       AT_TARGET: 0,
//       BUBBLING_PHASE: 0,
//       CAPTURING_PHASE: 0,
//       NONE: 0,
//     }

//     handleKeydown(key, handleEvent, modifierKey, isDisabled)(e)

//     expect(handleEvent).toHaveBeenCalled()
//     expect(preventDefault).toHaveBeenCalled()
//     expect(stopPropagation).toHaveBeenCalled()
//   })

//   it('handleKeydown should not handle keydown events when disabled', () => {
//     const key = 'a'
//     const modifierKey: string | undefined = 'ctrlKey'
//     const handleEvent = vitest.fn()
//     const preventDefault = vitest.fn()
//     const stopPropagation = vitest.fn()
//     const isDisabled = true

//     const e: KeyboardEvent = {
//       code: 'KeyA',
//       key: 'A',
//       ctrlKey: true,
//       preventDefault,
//       stopPropagation,
//       altKey: false,
//       charCode: 0,
//       isComposing: false,
//       keyCode: 0,
//       location: 0,
//       metaKey: false,
//       repeat: false,
//       shiftKey: false,
//       getModifierState(keyArg: string): boolean {
//         throw new Error('Function not implemented.')
//       },
//       initKeyboardEvent(
//         typeArg: string,
//         bubblesArg?: boolean | undefined,
//         cancelableArg?: boolean | undefined,
//         viewArg?: Window | null | undefined,
//         keyArg?: string | undefined,
//         locationArg?: number | undefined,
//         ctrlKey?: boolean | undefined,
//         altKey?: boolean | undefined,
//         shiftKey?: boolean | undefined,
//         metaKey?: boolean | undefined
//       ): void {
//         throw new Error('Function not implemented.')
//       },
//       DOM_KEY_LOCATION_LEFT: 0,
//       DOM_KEY_LOCATION_NUMPAD: 0,
//       DOM_KEY_LOCATION_RIGHT: 0,
//       DOM_KEY_LOCATION_STANDARD: 0,
//       detail: 0,
//       view: null,
//       which: 0,
//       initUIEvent(
//         typeArg: string,
//         bubblesArg?: boolean | undefined,
//         cancelableArg?: boolean | undefined,
//         viewArg?: Window | null | undefined,
//         detailArg?: number | undefined
//       ): void {
//         throw new Error('Function not implemented.')
//       },
//       bubbles: false,
//       cancelBubble: false,
//       cancelable: false,
//       composed: false,
//       currentTarget: null,
//       defaultPrevented: false,
//       eventPhase: 0,
//       isTrusted: false,
//       returnValue: false,
//       srcElement: null,
//       target: null,
//       timeStamp: 0,
//       type: '',
//       composedPath(): EventTarget[] {
//         throw new Error('Function not implemented.')
//       },
//       initEvent(
//         type: string,
//         bubbles?: boolean | undefined,
//         cancelable?: boolean | undefined
//       ): void {
//         throw new Error('Function not implemented.')
//       },
//       stopImmediatePropagation(): void {
//         throw new Error('Function not implemented.')
//       },
//       AT_TARGET: 0,
//       BUBBLING_PHASE: 0,
//       CAPTURING_PHASE: 0,
//       NONE: 0,
//     }

//     handleKeydown(key, handleEvent, modifierKey, isDisabled)(e)
//     expect(handleEvent).not.toHaveBeenCalled()
//     expect(preventDefault).not.toHaveBeenCalled()
//     expect(stopPropagation).not.toHaveBeenCalled()
//   })

//   it('handleKeydown should not handle keydown events when event is undefined', () => {
//     const key = 'a'
//     const modifierKey: string | undefined = 'ctrlKey'
//     const handleEvent = vitest.fn()
//     const preventDefault = vitest.fn()
//     const stopPropagation = vitest.fn()
//     const isDisabled = false

//     const e: KeyboardEvent | undefined = undefined

//     handleKeydown(key, handleEvent, modifierKey, isDisabled)(e)
//     expect(handleEvent).not.toHaveBeenCalled()
//     expect(preventDefault).not.toHaveBeenCalled()
//     expect(stopPropagation).not.toHaveBeenCalled()
//   })

//   it('handleKeydown should not handle keydown events when event is corrupt', () => {
//     const key = 'a'
//     const modifierKey: string | undefined = 'ctrlKey'
//     const handleEvent = vitest.fn()
//     const preventDefault = vitest.fn()
//     const stopPropagation = vitest.fn()
//     const isDisabled = false

//     const e: KeyboardEvent = {
//       code: 'KeyA',
//       key: 'B',
//       ctrlKey: true,
//       preventDefault,
//       stopPropagation,
//       altKey: false,
//       charCode: 0,
//       isComposing: false,
//       keyCode: 0,
//       location: 0,
//       metaKey: false,
//       repeat: false,
//       shiftKey: false,
//       getModifierState(keyArg: string): boolean {
//         throw new Error('Function not implemented.')
//       },
//       initKeyboardEvent(
//         typeArg: string,
//         bubblesArg?: boolean | undefined,
//         cancelableArg?: boolean | undefined,
//         viewArg?: Window | null | undefined,
//         keyArg?: string | undefined,
//         locationArg?: number | undefined,
//         ctrlKey?: boolean | undefined,
//         altKey?: boolean | undefined,
//         shiftKey?: boolean | undefined,
//         metaKey?: boolean | undefined
//       ): void {
//         throw new Error('Function not implemented.')
//       },
//       DOM_KEY_LOCATION_LEFT: 0,
//       DOM_KEY_LOCATION_NUMPAD: 0,
//       DOM_KEY_LOCATION_RIGHT: 0,
//       DOM_KEY_LOCATION_STANDARD: 0,
//       detail: 0,
//       view: null,
//       which: 0,
//       initUIEvent(
//         typeArg: string,
//         bubblesArg?: boolean | undefined,
//         cancelableArg?: boolean | undefined,
//         viewArg?: Window | null | undefined,
//         detailArg?: number | undefined
//       ): void {
//         throw new Error('Function not implemented.')
//       },
//       bubbles: false,
//       cancelBubble: false,
//       cancelable: false,
//       composed: false,
//       currentTarget: null,
//       defaultPrevented: false,
//       eventPhase: 0,
//       isTrusted: false,
//       returnValue: false,
//       srcElement: null,
//       target: null,
//       timeStamp: 0,
//       type: '',
//       composedPath(): EventTarget[] {
//         throw new Error('Function not implemented.')
//       },
//       initEvent(
//         type: string,
//         bubbles?: boolean | undefined,
//         cancelable?: boolean | undefined
//       ): void {
//         throw new Error('Function not implemented.')
//       },
//       stopImmediatePropagation(): void {
//         throw new Error('Function not implemented.')
//       },
//       AT_TARGET: 0,
//       BUBBLING_PHASE: 0,
//       CAPTURING_PHASE: 0,
//       NONE: 0,
//     }

//     handleKeydown(key, handleEvent, modifierKey, isDisabled)(e)
//     expect(handleEvent).not.toHaveBeenCalled()
//     expect(preventDefault).not.toHaveBeenCalled()
//     expect(stopPropagation).not.toHaveBeenCalled()
//   })

//   it('handleKeydown should handle keydown events when modifierkey is not defined', () => {
//     const key = 'a'
//     const modifierKey: string | undefined = undefined
//     const handleEvent = vitest.fn()
//     const preventDefault = vitest.fn()
//     const stopPropagation = vitest.fn()
//     const isDisabled = false

//     const e: KeyboardEvent = {
//       code: 'KeyA',
//       key: 'A',
//       ctrlKey: true,
//       preventDefault,
//       stopPropagation,
//       altKey: false,
//       charCode: 0,
//       isComposing: false,
//       keyCode: 0,
//       location: 0,
//       metaKey: false,
//       repeat: false,
//       shiftKey: false,
//       getModifierState(keyArg: string): boolean {
//         throw new Error('Function not implemented.')
//       },
//       initKeyboardEvent(
//         typeArg: string,
//         bubblesArg?: boolean | undefined,
//         cancelableArg?: boolean | undefined,
//         viewArg?: Window | null | undefined,
//         keyArg?: string | undefined,
//         locationArg?: number | undefined,
//         ctrlKey?: boolean | undefined,
//         altKey?: boolean | undefined,
//         shiftKey?: boolean | undefined,
//         metaKey?: boolean | undefined
//       ): void {
//         throw new Error('Function not implemented.')
//       },
//       DOM_KEY_LOCATION_LEFT: 0,
//       DOM_KEY_LOCATION_NUMPAD: 0,
//       DOM_KEY_LOCATION_RIGHT: 0,
//       DOM_KEY_LOCATION_STANDARD: 0,
//       detail: 0,
//       view: null,
//       which: 0,
//       initUIEvent(
//         typeArg: string,
//         bubblesArg?: boolean | undefined,
//         cancelableArg?: boolean | undefined,
//         viewArg?: Window | null | undefined,
//         detailArg?: number | undefined
//       ): void {
//         throw new Error('Function not implemented.')
//       },
//       bubbles: false,
//       cancelBubble: false,
//       cancelable: false,
//       composed: false,
//       currentTarget: null,
//       defaultPrevented: false,
//       eventPhase: 0,
//       isTrusted: false,
//       returnValue: false,
//       srcElement: null,
//       target: null,
//       timeStamp: 0,
//       type: '',
//       composedPath(): EventTarget[] {
//         throw new Error('Function not implemented.')
//       },
//       initEvent(
//         type: string,
//         bubbles?: boolean | undefined,
//         cancelable?: boolean | undefined
//       ): void {
//         throw new Error('Function not implemented.')
//       },
//       stopImmediatePropagation(): void {
//         throw new Error('Function not implemented.')
//       },
//       AT_TARGET: 0,
//       BUBBLING_PHASE: 0,
//       CAPTURING_PHASE: 0,
//       NONE: 0,
//     }

//     handleKeydown(key, handleEvent, modifierKey, isDisabled)(e)
//     expect(handleEvent).toHaveBeenCalled()
//     expect(preventDefault).toHaveBeenCalled()
//     expect(stopPropagation).toHaveBeenCalled()
//   })
// })

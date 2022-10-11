

/*
 * Utilities
 *
 * Usage:
 * import { aFunction } from "@/utils";
 * aFunction()
 *
 */

import mutateState from "./mutateState";
import resizeEnd from "./resizeEnd";
import userContext from "./userContext";
import typeCheck from "./typeCheck";
const isTouch = "ontouchstart" in document.documentElement;

export {
    isTouch,
    mutateState,
    resizeEnd,
    userContext,
    typeCheck,
};

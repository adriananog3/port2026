// Substituto leve do framer-motion só para o app dos cases: renderiza o conteúdo
// direto (sempre visível), sem animação. Economiza ~110 KB de JavaScript.
import { createElement, forwardRef } from "react";

const MOTION_PROPS = new Set(["initial", "animate", "exit", "transition", "variants", "whileInView", "whileHover",
  "whileTap", "whileFocus", "whileDrag", "viewport", "layout", "layoutId", "custom", "onAnimationComplete", "onAnimationStart"]);

const cache: Record<string, any> = {};
export const motion: any = new Proxy({}, {
  get(_t, tag: string) {
    if (!cache[tag]) {
      cache[tag] = forwardRef((props: any, ref) => {
        const clean: any = { ref };
        for (const k in props) if (!MOTION_PROPS.has(k)) clean[k] = props[k];
        return createElement(tag, clean);
      });
    }
    return cache[tag];
  },
});
export const useInView = () => true;
export const AnimatePresence = ({ children }: any) => children;
export type Variant = any;

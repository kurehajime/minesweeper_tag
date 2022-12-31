import { defineCustomElement } from 'vue'
import GameElement from './components/GameElement.vue';
const getStylesRecursively = (
    component: Component & {
      components?: Record<string, Component>;
      styles?: string[];
    }
  ): string[] => {
    const customElementStyles: string[] = [];
  
    if (component.styles) {
      customElementStyles.push(...component.styles);
    }
  
    const childComponents = component.components;
    if (childComponents) {
      Object.keys(childComponents).forEach((name) => {
        const childComponent = childComponents[name];
        const styles = this._getStylesRecursively(childComponent);
        customElementStyles.push(...styles);
      });
    }
  
    return customElementStyles;
  };

export default defineCustomElement(GameElement)

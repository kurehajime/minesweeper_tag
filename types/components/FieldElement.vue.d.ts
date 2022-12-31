import { BUTTON_TYPE } from '../model/ButtonType';
import { Field } from '../model/Field';
declare const _default: import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<{
    field: Field;
    clicked: (index: number, button_type: BUTTON_TYPE) => void;
    cellSize: number;
    index: number;
    selected: boolean;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<{
    field: Field;
    clicked: (index: number, button_type: BUTTON_TYPE) => void;
    cellSize: number;
    index: number;
    selected: boolean;
}>>>, {}>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
//# sourceMappingURL=FieldElement.vue.d.ts.map
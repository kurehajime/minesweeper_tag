import { Cell } from '../model/State';
declare const _default: import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<{
    cell: Cell;
    x: number;
    y: number;
    cellSize: number;
    selected: boolean;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<{
    cell: Cell;
    x: number;
    y: number;
    cellSize: number;
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
//# sourceMappingURL=CellElement.vue.d.ts.map
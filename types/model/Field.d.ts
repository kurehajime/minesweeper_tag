import { Random } from "./Random";
import { Cell } from "./State";
export declare class Field {
    private _Cells;
    get Cells(): Readonly<Cell[]>;
    constructor(Cells: Cell[]);
    Copy(): Field;
    Open(index: number): Field;
    ToggleFlag(index: number): Field;
    IsComplete(): boolean;
    IsGameOver(): boolean;
    Size(): number;
    OpenCount(): number;
    BombCount(): number;
    static GetRandomField(size: number, bomb: number, random?: Random): Field;
    private static getBombCount;
    private static xyToIndex;
    private static xyToIndexOrNaN;
    static indexToXy(index: number, size: number): [number, number];
    private fillOpen;
    private static getOpenableAdjacentIndex;
}
//# sourceMappingURL=Field.d.ts.map
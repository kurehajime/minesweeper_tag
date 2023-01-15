export declare class Random {
    private x;
    private y;
    private z;
    private w;
    private _w;
    constructor(seed?: number | null);
    seedNumber(): number;
    next(): number;
    nextInt(min: number, max: number): number;
    random(): number;
    clone(): Random;
}
//# sourceMappingURL=Random.d.ts.map
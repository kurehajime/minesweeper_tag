export class Random {
    private x: number;
    private y: number;
    private z: number;
    private w: number;

    constructor(seed: number | null = null) {
        this.x = 199011210; // Famicom Release Date
        this.y = 198904210; // GameBoy Release Date
        this.z = 199606230; // Nintendo64 Release Date
        this.w = (seed ? seed : Date.now()) % 0x100000000;
    }

    next(): number {
        const t = this.x ^ (this.x << 11);
        this.x = this.y; this.y = this.z; this.z = this.w;
        return this.w = (this.w ^ (this.w >>> 19)) ^ (t ^ (t >>> 8));
    }

    random(): number {
        return Math.abs(this.next() / 0x100000000);
    }
}
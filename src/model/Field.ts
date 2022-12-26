import { Random } from "./Random"
import { Cell } from "./State"

export class Field {
    private _Cells: Cell[]
    // セルの一覧
    public get Cells(): Readonly<Cell[]> { return Object.freeze(this._Cells.map(cell => Object.freeze(cell))) }

    constructor(Cells: Cell[]) {
        this._Cells = Cells.map(cell => { return { ...cell } })
    }

    // 盤面をコピーする
    public Copy(): Field {
        return new Field(this._Cells)
    }

    // マスを開ける
    public Open(index: number): Field {
        let returnField = this.Copy();
        returnField = this.fillOpen(index);
        if (returnField.IsGameOver()) {
            returnField._Cells.forEach((cell, i) => {
                if (cell.Bomb) {
                    returnField._Cells[i].Open = true;
                    returnField._Cells[i].Flag = false;
                }
            })
        }
        return returnField;
    }

    // 旗を立てる/消す
    public ToggleFlag(index: number): Field {
        const returnField = this.Copy();
        if (!returnField._Cells[index].Open) {
            returnField._Cells[index].Flag = !returnField._Cells[index].Flag
        }
        return returnField;
    }

    // 駆除成功したか
    public IsComplete(): boolean {
        for (const state of this._Cells) {
            if (!state.Bomb && !state.Open) {
                return false;
            }
        }
        return true
    }

    // 爆死したか
    public IsGameOver(): boolean {
        for (const state of this._Cells) {
            if (state.Bomb && state.Open) {
                return true;
            }
        }
        return false
    }

    // 縦横の幅
    public Size(): number {
        return Math.sqrt(this._Cells.length);
    }

    // 開いた数
    public OpenCount(): number {
        return this._Cells.filter(cell => cell.Open).length
    }

    // 爆弾の数
    public BombCount(): number {
        return this._Cells.filter(cell => cell.Bomb).length
    }

    // ランダムなマップを取得
    public static GetRandomField(size: number, bomb: number, random = new Random()): Field {
        const len = size * size;
        const opens = Array(len).fill(false);
        const flags = Array(len).fill(false);
        const bombs = Array(len).fill(false);
        for (let i = 0; i < bomb; i++) {
            bombs[i] = true;
        }
        for (let i = len - 1; i >= 0; i--) {
            const r = Math.floor(random.random() * (i + 1))
            const tmp = bombs[i]
            bombs[i] = bombs[r]
            bombs[r] = tmp
        }
        return new Field(Array(len).fill(null).map((_, i) => {
            return {
                Open: opens[i],
                Flag: flags[i],
                Bomb: bombs[i],
                Count: Field.getBombCount(i, bombs, size)
            }
        }));
    }

    private static getBombCount(index: number, bombs: number[], size: number): number {
        const [x, y] = Field.indexToXy(index, size);
        let count = 0;
        [
            Field.xyToIndexOrNaN(x - 1, y + 0, size),
            Field.xyToIndexOrNaN(x + 1, y + 0, size),
            Field.xyToIndexOrNaN(x + 0, y - 1, size),
            Field.xyToIndexOrNaN(x + 0, y + 1, size),
            Field.xyToIndexOrNaN(x + 1, y + 1, size),
            Field.xyToIndexOrNaN(x - 1, y - 1, size),
            Field.xyToIndexOrNaN(x + 1, y - 1, size),
            Field.xyToIndexOrNaN(x - 1, y + 1, size),
        ].filter((i) => {
            return !isNaN(i);
        }).forEach((i) => {
            if (bombs[i]) {
                count++;
            }
        })

        return count;
    }

    private static xyToIndex(x: number, y: number, size: number): number {
        if (x < 0 || x >= size || y < 0 || y >= size) {
            throw 'Fail to convert xy to index';
        }
        return x + y * size;
    }

    private static xyToIndexOrNaN(x: number, y: number, size: number): number {
        if (x < 0 || x >= size || y < 0 || y >= size) {
            return NaN;
        }
        return Field.xyToIndex(x, y, size);
    }
    public static indexToXy(index: number, size: number): [number, number] {
        return [index % size, Math.floor(index / size)];
    }

    private fillOpen(index: number): Field {
        const returnField = this.Copy();
        const queue: number[] = [];
        queue.push(index)
        returnField._Cells[index].Open = true;
        returnField._Cells[index].Flag = false;
        while (queue.length > 0) {
            const i = queue.pop();
            if (i !== undefined) {
                if (returnField._Cells[i].Count === 0) {
                    Field.getOpenableAdjacentIndex(returnField, i).forEach((j) => {
                        returnField._Cells[j].Open = true;
                        returnField._Cells[j].Flag = false;
                        queue.push(j);
                    })
                }
            }
        }
        return returnField
    }

    private static getOpenableAdjacentIndex(field: Field, index: number): number[] {
        const [x, y] = Field.indexToXy(index, field.Size());
        return [
            Field.xyToIndexOrNaN(x - 1, y + 0, field.Size()),
            Field.xyToIndexOrNaN(x + 1, y + 0, field.Size()),
            Field.xyToIndexOrNaN(x + 0, y - 1, field.Size()),
            Field.xyToIndexOrNaN(x + 0, y + 1, field.Size()),
        ].filter((i) => {
            return !isNaN(i);
        }).filter((i) => {
            return !field._Cells[i].Bomb &&
                !field._Cells[i].Flag &&
                !field._Cells[i].Open;
        });
    }
}

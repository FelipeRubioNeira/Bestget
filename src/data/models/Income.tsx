export class Income {
    constructor(
        private name: string,
        private amount: number,
    ) { }

    get getName() {
        return this.name
    }

    get getAmount() {
        return this.amount
    }

}
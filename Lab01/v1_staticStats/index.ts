class StatsApp {
    //The HTMLInputElement interface provides special properties and methods for manipulating the options, layout, and presentation of <input> elements.
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement
    num1: HTMLInputElement;
    num2: HTMLInputElement;
    num3: HTMLInputElement;
    num4: HTMLInputElement;
    sum: HTMLInputElement;
    avg: HTMLInputElement;
    min: HTMLInputElement;
    max: HTMLInputElement;

    constructor() {
        this.startApp();
    }
    startApp() {
        this.getInputs();
        this.watchInputValues();
    }
    getInputs() {
        this.num1 = document.querySelector('#num1');
        this.num2 = document.querySelector('#num2');
        this.num3 = document.querySelector('#num3');
        this.num4 = document.querySelector('#num4');

        this.sum = document.querySelector('#sum');
        this.avg = document.querySelector('#avg');
        this.min = document.querySelector('#min');
        this.max = document.querySelector('#max');
    }
    watchInputValues() {
        this.num1.addEventListener('input', () => this.computeData())
        this.num2.addEventListener('input', () => this.computeData())
        this.num3.addEventListener('input', () => this.computeData())
        this.num4.addEventListener('input', () => this.computeData())
    }
    computeData() {
        const data1 = +this.num1.value;
        const data2 = +this.num2.value;
        const data3 = +this.num3.value; // how does THIS works? tututu check
        const data4 = +this.num4.value; // DUNNO why +this?

        const sum = data1 + data2 + data3 + data4;
        const avg = sum/ 4;
        const min = Math.min(data1, data2, data3, data4);
        const max = Math.max(data1, data2, data3, data4);

        this.showStats(sum, avg, min, max)
    }

    showStats(sum: number, avg:number, min:number, max:number) { //why vars are here with type declarations? 
        this.sum.value = sum.toString();
        this.avg.value = avg.toString();
        this.min.value = min.toString();
        this.max.value = max.toString();
    }
}

const statsApp = new StatsApp();
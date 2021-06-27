var StatsApp = /** @class */ (function () {
    function StatsApp() {
        this.startApp();
    }
    StatsApp.prototype.startApp = function () {
        this.getInputs();
        this.watchInputValues();
    };
    StatsApp.prototype.getInputs = function () {
        this.num1 = document.querySelector('#num1');
        this.num2 = document.querySelector('#num2');
        this.num3 = document.querySelector('#num3');
        this.num4 = document.querySelector('#num4');
        this.sum = document.querySelector('#sum');
        this.avg = document.querySelector('#avg');
        this.min = document.querySelector('#min');
        this.max = document.querySelector('#max');
    };
    StatsApp.prototype.watchInputValues = function () {
        var _this = this;
        this.num1.addEventListener('input', function () { return _this.computeData(); });
        this.num2.addEventListener('input', function () { return _this.computeData(); });
        this.num3.addEventListener('input', function () { return _this.computeData(); });
        this.num4.addEventListener('input', function () { return _this.computeData(); });
    };
    StatsApp.prototype.computeData = function () {
        var data1 = +this.num1.value;
        var data2 = +this.num2.value;
        var data3 = +this.num3.value; // how does THIS works? tututu check
        var data4 = +this.num4.value; // DUNNO why +this?
        var sum = data1 + data2 + data3 + data4;
        var avg = sum / 4;
        var min = Math.min(data1, data2, data3, data4);
        var max = Math.max(data1, data2, data3, data4);
        this.showStats(sum, avg, min, max);
    };
    StatsApp.prototype.showStats = function (sum, avg, min, max) {
        this.sum.value = sum.toString();
        this.avg.value = avg.toString();
        this.min.value = min.toString();
        this.max.value = max.toString();
    };
    return StatsApp;
}());
var statsApp = new StatsApp();

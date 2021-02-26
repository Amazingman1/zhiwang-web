export default{
      // 加
      adds:  Number.prototype['adds'] = function (...arg) {
        var r1, r2, m, result = this;
        arg.forEach(value => {
            try { r1 = result.toString().split(".")[1].length } catch (e) { r1 = 0 }
            try { r2 = value.toString().split(".")[1].length } catch (e) { r2 = 0 }
            m = Math.pow(10, Math.max(r1, r2));
            result = Math.round(result * m + value * m) / m;
        });
        return result;
    },
    // 减
    sub: Number.prototype['sub'] = function (...arg) {
        var r1, r2, m, result = this;
        arg.forEach(value => {
            try { r1 = result.toString().split(".")[1].length } catch (e) { r1 = 0 }
            try { r2 = value.toString().split(".")[1].length } catch (e) { r2 = 0 }
            m = Math.pow(10, Math.max(r1, r2));
            var n = (r1 >= r2) ? r1 : r2;
            result = (Math.round(result * m - value * m) / m).toFixed(n);
        });
        return result;
    },
    // 乘
    mul: Number.prototype['mul'] = function (...arg) {
        var result = this;
        arg.forEach(value => {
            var m = 0, s1 = result.toString(), s2 = value.toString();
            try { m += s1.split(".")[1].length } catch (e) { }
            try { m += s2.split(".")[1].length } catch (e) { }
            result = Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
        });
        return result;
    },
    // 除
    divide: Number.prototype['divide'] = function (...arg) {
        var result = this;
       
        arg.forEach(value => {
            var t1 = 0, t2 = 0, r1, r2;
            try { t1 = result.toString().split(".")[1].length } catch (e) { }
            try { t2 = value.toString().split(".")[1].length } catch (e) { }
            r1 = Number(result.toString().replace(".", ""));
            r2 = Number(value.toString().replace(".", ""));
            result = (r1 / r2) * Math.pow(10, t2 - t1);
        });
        return result;
    }
}
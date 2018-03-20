(function(w) {
    /**
     * 食物构造函数
     * @param {div} map 游戏地图 div 
     */
    function Food(map) {
        this.left = 0;
        this.top = 0;

        this.div = document.createElement('div');
        map.appendChild(this.div);

        this.div.className = 'food';

        // 设置随机位置
        this.random();
    }

    Food.prototype.random = function() {
        var maxX = 800 / 20 - 1;
        var maxY = 600 / 20 - 1;

        this.left = getRandom(0, maxX) * 20;
        this.top = getRandom(0, maxY) * 20;

        // 设置位置
        this.div.style.left = this.left + 'px';
        this.div.style.top = this.top + 'px';
    }

    /**
     * 生成 min 和 max 之间的随机数
     * @param {*} min 最小整数
     * @param {*} max 最大整数
     */
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    w.Food = Food;
})(window);
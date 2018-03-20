(function(w) {

    /**
     * 贪吃蛇构造函数
     * @param {div} map 游戏地图 div 
     */
    function Snake(map) {
        this.direction = 'right'; // 默认运动方向
        this.body = []; // 蛇身体数组

        // 创建蛇的初始身体
        for (let i = 0; i < 3; i++) {
            this.insertHead(map, this.headLocation());
        }
    }

    /** 在 map 的 location 位置插入蛇头 */
    Snake.prototype.insertHead = function(map, location) {
        // 1. 从 body[0] 取出当前蛇头 div
        var currentHead = this.body[0] || {};
        currentHead.className = 'snake-body';

        // 2. 创建身体 div 
        var newHead = document.createElement('div');
        newHead.className = 'snake-head';
        newHead.style.left = location.left + 'px';
        newHead.style.top = location.top + 'px';

        map.appendChild(newHead);
        this.body.unshift(newHead);
    }

    /** 蛇头的下一个位置 */
    Snake.prototype.headLocation = function() {

        // 1. 判断是否有身体记录
        if (this.body.length === 0) {
            return { left: 0, top: 0 };
        }

        // 2. 从 body[0] 取出当前蛇头 div
        var currentHead = this.body[0];
        var left = currentHead.offsetLeft;
        var top = currentHead.offsetTop;
        var step = 20;

        // 3. 根据运动方向计算下一位置
        switch (this.direction) {
            case 'right':
                left += step;
                break;
            case 'left':
                left -= step;
                break;
            case 'top':
                top -= step;
                break;
            case 'bottom':
                top += step;
                break;
        }

        return { left: left, top: top };
    }

    /**
     * 蛇移动，由定时器事件调用。
     * @param {map} 地图 div
     * @param {food} 食物对象
     * @returns 游戏是否结束（如果撞到墙壁，返回 true，否则返回 false）
     */
    Snake.prototype.move = function(map, food) {
        // 1. 计算蛇头新位置
        var location = this.headLocation();

        // 判断新位置是否超出窗口
        if (this.isDead(location)) {
            console.log('蛇死了');

            return true;
        }

        // 判断是否吃到食物
        if (location.left === food.left && location.top === food.top) {
            console.log('吃到食物');

            // 增加蛇头
            this.insertHead(map, location);

            // 重新设置食物位置
            food.random();

            // 后面的队形保持不变
            return false;
        }

        // 2. 获取当前蛇头，修改样式
        var currentHead = this.body[0];
        currentHead.className = 'snake-body';

        // 3. 找到蛇尾，移动在数组中的位置，并且修改位置
        var currentTail = this.body.pop();
        currentTail.className = 'snake-head';
        currentTail.style.left = location.left + 'px';
        currentTail.style.top = location.top + 'px';
        this.body.unshift(currentTail);

        return false;
    }

    /** 判断蛇是否死亡 */
    Snake.prototype.isDead = function(location) {
        return (location.left < 0 ||
            location.left >= 800 ||
            location.top < 0 ||
            location.top >= 600
        );
    }

    // 将 Snake 添加给 window
    w.Snake = Snake;
})(window);
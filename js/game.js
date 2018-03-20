(function(w) {

    /** 游戏构造函数 */
    function Game(map) {
        this.map = map; // 游戏地图
        this.snake = new w.Snake(map); // 贪吃蛇对象
        this.food = new w.Food(map); // 食物对象
    }

    /** 开始游戏 */
    Game.prototype.start = function() {
        console.log('开始贪吃蛇游戏' + this.map);

        var game = this; // 记录当前对象，在时钟函数中使用

        // 定时器事件
        var timerId = setInterval(function() {
            var gameOver = game.snake.move(game.map, game.food);

            if (gameOver) {
                alert('游戏结束');
                clearInterval(timerId);
            }
        }, 150);

        // 监听键盘事件
        document.addEventListener('keydown', function(ev) {
            switch (ev.keyCode) {
                case 37:
                    game.snake.direction = 'left';
                    break;
                case 38:
                    game.snake.direction = 'top';
                    break;
                case 39:
                    game.snake.direction = 'right';
                    break;
                case 40:
                    game.snake.direction = 'bottom';
                    break;
            }
        }, false);
    }

    // 游戏启动代码
    var game = new Game(document.getElementById('game-map'));
    game.start();
})(window);
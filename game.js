var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var game;
(function (game) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image('preload-bar', 'assets/loading.png');
        };
        Boot.prototype.create = function () {
            this.game.stage.backgroundColor = 0xFFFFFF;
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            this.game.state.start('preload');
        };
        return Boot;
    })(Phaser.State);
    game.Boot = Boot;
})(game || (game = {}));
var game;
(function (game) {
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            _super.apply(this, arguments);
            this.nbClick = 0;
        }
        Main.prototype.create = function () {
            var thing = 'v3 !';
            this.text = this.add.text(10, 10, "Let's " + thing, { font: '65px Arial' });
            this.input.onDown.add(this.onDown, this);
            this.stage.backgroundColor = '#CCCCCC';
            this.game['touchControl'] = this.game.plugins.add(game.TouchControl);
            this.game['touchControl'].inputEnable();
        };
        Main.prototype.onDown = function (pointer) {
            this.nbClick++;
            this.text.text = "You clicked " + this.nbClick + " times";
        };
        Main.prototype.update = function () {
            this.text.position.x += 1;
            if (this.text.position.x > this.scale.bounds.width) {
                this.text.position.x = 10;
            }
        };
        Main.prototype.render = function () {
            _super.prototype.render.call(this);
        };
        return Main;
    })(Phaser.State);
    game.Main = Main;
})(game || (game = {}));
var game;
(function (game) {
    var Preload = (function (_super) {
        __extends(Preload, _super);
        function Preload() {
            _super.apply(this, arguments);
        }
        Preload.prototype.preload = function () {
            this.preloadBar = this.add.sprite(290, 290, 'preload-bar');
            this.load.setPreloadSprite(this.preloadBar);
            this.load.image('compass', 'assets/compass_rose.png');
            this.load.image('touch_segment', 'assets/touch_segment.png');
            this.load.image('touch', 'assets/touch.png');
        };
        Preload.prototype.create = function () {
            this.game.state.start('main');
        };
        return Preload;
    })(Phaser.State);
    game.Preload = Preload;
})(game || (game = {}));
var game;
(function (game_1) {
    var TouchControl = (function (_super) {
        __extends(TouchControl, _super);
        function TouchControl(game, parent) {
            _super.call(this, game, parent);
            this.settings = {
                maxDistanceInPixels: 100
            };
            this.cursors = {
                up: false, down: false, left: false, right: false
            };
            this.inputEnable = function () {
                this.input.onDown.add(this.createCompass, this);
                this.input.onUp.add(this.removeCompass, this);
            };
            this.inputDisable = function () {
                this.input.onDown.remove(this.createCompass, this);
                this.input.onUp.remove(this.removeCompass, this);
            };
            this.input = this.game.input;
            this.speed = new Phaser.Point();
            this.imageGroup = [];
            this.imageGroup.push(this.game.add.sprite(0, 0, 'compass'));
            this.imageGroup.push(this.game.add.sprite(0, 0, 'touch_segment'));
            this.imageGroup.push(this.game.add.sprite(0, 0, 'touch'));
            this.imageGroup.forEach(function (e) {
                e.anchor.set(0.5);
                e.visible = false;
                e.fixedToCamera = true;
            });
        }
        TouchControl.prototype.createCompass = function () {
            for (var _i = 0, _a = this.imageGroup; _i < _a.length; _i++) {
                var e = _a[_i];
                e.visible = true;
                e.bringToTop();
                e.cameraOffset.x = this.input.worldX;
                e.cameraOffset.y = this.input.worldY;
            }
            this.preUpdate = this.setDirection.bind(this);
            this.initialPoint = this.input.activePointer.position.clone();
        };
        ;
        TouchControl.prototype.removeCompass = function () {
            this.imageGroup.forEach(function (e) {
                e.visible = false;
            });
            this.cursors.up = false;
            this.cursors.down = false;
            this.cursors.left = false;
            this.cursors.right = false;
            this.speed.x = 0;
            this.speed.y = 0;
            this.preUpdate = this.empty;
        };
        ;
        TouchControl.prototype.empty = function () { };
        TouchControl.prototype.setDirection = function () {
            var _this = this;
            var d = this.initialPoint.distance(this.input.activePointer.position);
            var maxDistanceInPixels = this.settings.maxDistanceInPixels;
            var deltaX = this.input.activePointer.position.x - this.initialPoint.x;
            var deltaY = this.input.activePointer.position.y - this.initialPoint.y;
            var angle = this.initialPoint.angle(this.input.activePointer.position);
            if (d > maxDistanceInPixels) {
                deltaX = Math.cos(angle) * maxDistanceInPixels;
                deltaY = Math.sin(angle) * maxDistanceInPixels;
            }
            this.speed.x = (deltaX / maxDistanceInPixels) * 100 * -1;
            this.speed.y = (deltaY / maxDistanceInPixels) * 100 * -1;
            this.cursors.up = (deltaY < 0);
            this.cursors.down = (deltaY > 0);
            this.cursors.left = (deltaX < 0);
            this.cursors.right = (deltaX > 0);
            this.imageGroup.forEach(function (e, i) {
                e.cameraOffset.x = _this.initialPoint.x + (deltaX) * i / 3;
                e.cameraOffset.y = _this.initialPoint.y + (deltaY) * i / 3;
            });
        };
        ;
        TouchControl.prototype.preUpdate = function () { };
        return TouchControl;
    })(Phaser.Plugin);
    game_1.TouchControl = TouchControl;
})(game || (game = {}));
/// <reference path="./defs/definitions.d.ts"/>
/// <reference path="./state/Boot.ts"/>
/// <reference path="./state/Main.ts"/>
/// <reference path="./state/Preload.ts"/>
/// <reference path="./touch/TouchControl.ts"/>
var game;
(function (game) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, {
                width: 768,
                height: 432,
                enableDebug: true,
                state: new game.Boot()
            });
            this.state.add('preload', game.Preload);
            this.state.add('main', game.Main);
        }
        Game.prototype.boot = function () {
            _super.prototype.boot.call(this);
            if (this.device.desktop === false) {
                this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.scale.forceOrientation(true, false);
            }
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
        };
        return Game;
    })(Phaser.Game);
    game.Game = Game;
})(game || (game = {}));

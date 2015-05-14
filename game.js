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
        }
        Main.prototype.create = function () {
            var thing = 'celebrate !';
            this.text = this.add.text(10, 10, "Let's " + thing, { font: '65px Arial' });
        };
        Main.prototype.update = function () {
            this.text.position.x += 1;
            if (this.text.position.x > this.scale.bounds.width) {
                this.text.position.x = 10;
            }
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
        };
        Preload.prototype.create = function () {
            this.game.state.start('main');
        };
        return Preload;
    })(Phaser.State);
    game.Preload = Preload;
})(game || (game = {}));
/// <reference path="./defs/definitions.d.ts"/>
/// <reference path="./state/Boot.ts"/>
/// <reference path="./state/Main.ts"/>
/// <reference path="./state/Preload.ts"/>
var game;
(function (game) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, {
                width: 800,
                height: 600,
                transparent: false,
                enableDebug: true
            });
            this.state.add('boot', game.Boot);
            this.state.add('preload', game.Preload);
            this.state.add('main', game.Main);
            this.state.start('boot');
        }
        return Game;
    })(Phaser.Game);
    game.Game = Game;
})(game || (game = {}));

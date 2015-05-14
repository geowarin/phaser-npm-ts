module game {

  export class TouchControl extends Phaser.Plugin {

    input: Phaser.Input;
    imageGroup: Phaser.Sprite[];
    initialPoint: Phaser.Point;
    speed: Phaser.Point;

    settings = {
      maxDistanceInPixels: 100
    };

    cursors = {
      up: false, down: false, left: false, right: false
    };

    constructor(game: Phaser.Game, parent: PIXI.DisplayObject) {
      super(game, parent);
      this.input = this.game.input;

      this.speed = new Phaser.Point();
      this.imageGroup = [];

      this.imageGroup.push(this.game.add.sprite(0, 0, 'compass'));
      this.imageGroup.push(this.game.add.sprite(0, 0, 'touch_segment'));
      //this.imageGroup.push(this.game.add.sprite(0, 0, 'touch_segment'));
      this.imageGroup.push(this.game.add.sprite(0, 0, 'touch'));

      this.imageGroup.forEach(function(e) {
        e.anchor.set(0.5);
        e.visible = false;
        e.fixedToCamera = true;
      });
    }

    inputEnable = function() {
      this.input.onDown.add(this.createCompass, this);
      this.input.onUp.add(this.removeCompass, this);
    };

    inputDisable = function() {
      this.input.onDown.remove(this.createCompass, this);
      this.input.onUp.remove(this.removeCompass, this);
    };

    createCompass() {
      for (let e of this.imageGroup) {
        e.visible = true;
        e.bringToTop();

        e.cameraOffset.x = this.input.worldX;
        e.cameraOffset.y = this.input.worldY;
      }
      this.preUpdate = this.setDirection.bind(this);

      this.initialPoint = this.input.activePointer.position.clone();
    };

    removeCompass() {
      this.imageGroup.forEach(function(e) {
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

    empty() { }

    setDirection() {
      var d = this.initialPoint.distance(this.input.activePointer.position);
      var maxDistanceInPixels = this.settings.maxDistanceInPixels;

      var deltaX: number = this.input.activePointer.position.x - this.initialPoint.x;
      var deltaY: number = this.input.activePointer.position.y - this.initialPoint.y;

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

      this.imageGroup.forEach((e, i) => {
        e.cameraOffset.x = this.initialPoint.x + (deltaX) * i / 3;
        e.cameraOffset.y = this.initialPoint.y + (deltaY) * i / 3;
      });
    };

    preUpdate() { }
  }
}


var TheMath = Math;

module Phaser {

  export class VirtualJoystick extends Plugin {
    constructor(game: Phaser.Game, parent: PIXI.DisplayObject) {
      super(game, parent);
    }

    addJoystick(x: number, y: number): Joystick {
      var joystick = new Joystick(this.game, 40, 280);
      this.game.add.existing(joystick);
      return joystick;
    }

    addButton(x: number, y: number, text: string): VButton {
      var button = new VButton(this.game, x, y, text);
      this.game.add.existing(button);
      return button;
    }
  }

  export class VButton extends Sprite {
    innerText: Text;

    constructor(game: Game, x: number, y: number, text: string) {
      var bmd = game.add.bitmapData(64, 64);

      bmd.ctx.beginPath();
      bmd.ctx.arc(32, 32, 32, 0, Math.PI2);
      bmd.ctx.fillStyle = '#0088ff';
      bmd.ctx.fill();

      super(game, x, y, bmd);
      this.inputEnabled = true;
      this.innerText = new Text(game, 0, 0, text, '');
      this.fixedToCamera = true;
      this.addChild(this.innerText);
    }
  }

  export class Joystick extends Sprite {
    initialPos: Point;
    speed: Point;
    pad: Pad;
    pointer:Pointer;

    constructor(game: Game, x: number, y: number) {
      var bmd = game.add.bitmapData(128, 128);

      bmd.ctx.beginPath();
      bmd.ctx.arc(64, 64, 64, 0, Math.PI2);
      bmd.ctx.lineWidth = 15;
      bmd.ctx.strokeStyle = 'black';
      bmd.ctx.stroke();

      super(game, x, y, bmd);
      this.inputEnabled = true;
      this.events.onInputDown.add(this.onDown, this);
      this.events.onInputUp.add(this.onUp, this);

      this.pad = new Pad(game, 32, 32);
      this.addChild(this.pad);

      this.fixedToCamera = true;
      this.speed = new Point();
    }

    onDown(sprite: Sprite, pointer: Pointer) {
      this.initialPos = pointer.position.clone();
      this.pointer = pointer;
    }

    onUp(sprite: Sprite, pointer: Pointer) {
      this.initialPos = null;
      this.pointer = null;
      this.pad.cameraOffset.x = 32;
      this.pad.cameraOffset.y = 32;
      this.speed = new Point();
    }

    preUpdate() {
      super.preUpdate();
      if (this.initialPos) {
        var d = this.initialPos.distance(this.pointer.position);
        var maxDistanceInPixels = 40;

        var pointerPos = this.pointer.position;
        var deltaX = pointerPos.x - this.initialPos.x;
        var deltaY = pointerPos.y - this.initialPos.y;


        var angle = this.initialPos.angle(this.pointer.position);
        if (d > maxDistanceInPixels) {
          deltaX = TheMath.cos(angle) * maxDistanceInPixels;
          deltaY = TheMath.sin(angle) * maxDistanceInPixels;
        }

        this.speed.x = (deltaX / maxDistanceInPixels) * 100;
        this.speed.y = (deltaY / maxDistanceInPixels) * 100;

        this.pad.cameraOffset.x = deltaX + 32;
        this.pad.cameraOffset.y = deltaY + 32;
        // this.cursors.up = deltaY < 0;
        // this.cursors.down = deltaY > 0;
        // this.cursors.left = deltaX < 0;
        // this.cursors.right = deltaX > 0;
      }
    }
  }

  class Pad extends Sprite {

    constructor(game: Game, x: number, y: number) {
      var bmd = game.add.bitmapData(64, 64);

      bmd.ctx.beginPath();
      bmd.ctx.arc(32, 32, 32, 0, Math.PI2);
      bmd.ctx.fillStyle = '#ff0000';
      bmd.ctx.fill();

      super(game, x, y, bmd);
      this.fixedToCamera = true;
    }
  }
}

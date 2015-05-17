
module game {

  export class Main extends Phaser.State {
    text: Phaser.Text;
    nbClick: number = 0;
    touchControl:TouchControl;
    joystick:Phaser.Joystick;

    create() {
      var thing: String = 'v3 !';
      this.text = this.add.text(10, 10, `Let's ${thing}`, {font: '65px Arial'});
      this.stage.backgroundColor = '#CCCCCC';

      // this.touchControl = <TouchControl>this.game.plugins.add(TouchControl);
      // this.touchControl.inputEnable();
      this.joystick = new Phaser.Joystick(this.game, 40, 280);
      this.add.existing(this.joystick);
    }

    update() {
      this.text.position.x += this.joystick.speed.x / 4;
      this.game.world.wrap(this.text, 0, true);
    }

    render() {
      super.render();

      //this.game.debug.pointer(this.input.mousePointer);
      //this.game.debug.pointer(this.input.pointer1);
      //this.game.debug.pointer(this.input.pointer2);
    }
  }
}

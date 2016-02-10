import {Joystick, VirtualJoystick} from '../touch/Joystick';

export default class Main extends Phaser.State {
  text:Phaser.Text;
  nbClick:number = 0;
  touchControl:VirtualJoystick;
  joystick:Joystick;

  create() {
    var thing:String = 'go !';
    this.text = this.add.text(10, 200, `Let's ${thing}`, {font: '65px Arial'});
    this.stage.backgroundColor = '#CCCCCC';

    this.touchControl = <VirtualJoystick>this.game.plugins.add(VirtualJoystick);
    this.joystick = this.touchControl.addJoystick(40, 280);

    var jumpButton = this.touchControl.addButton(500, 280, 'jump');
    jumpButton.events.onInputDown.add(this.onJump, this);
  }

  onJump() {
    var tween = this.game.add.tween(this.text)
      .to({y: this.text.y - 20}, 100, Phaser.Easing.Elastic.Out)
      .start();
    // this.game.time.slowMotion = 2.0;
  }

  update() {
    this.text.position.x += this.joystick.speed.x / 4;
    this.text.position.y += this.joystick.speed.y / 4;
    this.game.world.wrap(this.text, 0, true);
  }

  render() {
    super.render();

    //this.game.debug.pointer(this.input.mousePointer);
    //this.game.debug.pointer(this.input.pointer1);
    //this.game.debug.pointer(this.input.pointer2);
  }
}

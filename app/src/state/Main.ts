module game {

  export class Main extends Phaser.State {
    text:Phaser.Text;
    nbClick:number = 0;

    create() {
      var thing:String = 'v3 !';
      this.text = this.add.text(10, 10, `Let's ${thing}`, {font: '65px Arial'});
      this.input.onDown.add(this.onDown, this);
      this.stage.backgroundColor = '#CCCCCC';
    }

    onDown(pointer:Phaser.Pointer) {
      this.nbClick++;
      this.text.text = `You clicked ${this.nbClick} times`;
    }

    update() {
      this.text.position.x += 1;
      if (this.text.position.x > this.scale.bounds.width) {
        this.text.position.x = 10;
      }
    }

    render() {
      super.render();

      //this.game.debug.pointer(this.input.mousePointer);
      //this.game.debug.pointer(this.input.pointer1);
      //this.game.debug.pointer(this.input.pointer2);
    }
  }
}

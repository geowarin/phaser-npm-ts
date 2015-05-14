/// <reference path="./defs/definitions.d.ts"/>
/// <reference path="./state/Boot.ts"/>
/// <reference path="./state/Main.ts"/>
/// <reference path="./state/Preload.ts"/>

module game {

  export class Game extends Phaser.Game {
    constructor() {
      super({
        width: 800,
        height: 600,
        transparent: false,
        enableDebug: true
      });

      this.state.add('boot', Boot);
      this.state.add('preload', Preload);
      this.state.add('main', Main);

      this.state.start('boot');
    }
  }
}

/// <reference path="./defs/definitions.d.ts"/>
/// <reference path="./state/Boot.ts"/>
/// <reference path="./state/Main.ts"/>
/// <reference path="./state/Preload.ts"/>

module game {

  export class Game extends Phaser.Game {
    constructor() {
      super({
        width: 768,
        height: 432,
        enableDebug: false,
        state: new Boot()
      });

      this.state.add('preload', Preload);
      this.state.add('main', Main);
    }

    boot() {
      super.boot();
      if (this.device.desktop === false) {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.forceOrientation(true, false);
      }
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
    }
  }
}

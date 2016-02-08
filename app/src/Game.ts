/// <reference path="./defs/definitions.d.ts"/>
import Boot from './state/Boot';
import Main from './state/Main';
import Preload from './state/Preload';

export default class Game extends Phaser.Game {
  constructor() {
    super({
      width: 768,
      height: 432,
      enableDebug: true,
      state: new Boot(),
      renderer: Phaser.AUTO
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

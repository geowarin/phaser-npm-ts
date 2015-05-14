module game {
  export class Preload extends Phaser.State {
    private preloadBar: Phaser.Sprite;

    preload() {
      this.preloadBar = this.add.sprite(290, 290, 'preload-bar');
      this.load.setPreloadSprite(this.preloadBar);

      this.load.image('compass', 'assets/compass_rose.png');
      this.load.image('touch_segment', 'assets/touch_segment.png');
      this.load.image('touch', 'assets/touch.png');
    }

    create() {
      this.game.state.start('main');
    }
  }
}

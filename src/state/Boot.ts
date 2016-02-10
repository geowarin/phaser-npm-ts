export default class Boot extends Phaser.State {
  preload() {
    this.load.image('preload-bar', 'assets/loading.png');
  }

  create() {
    this.game.stage.backgroundColor = 0xFFFFFF;

    this.input.maxPointers = 2;
    this.stage.disableVisibilityChange = true;

    this.game.state.start('preload');
  }
}

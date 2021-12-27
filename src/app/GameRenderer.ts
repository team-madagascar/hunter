import {Point} from './Point';
import {
  BG_COLOR,
  FIELD_HEIGHT,
  FIELD_WIDTH,
  GRID_COUNT,
  GRID_WIDTH,
  SCALE,
} from './constants';
import {FrameRenderingContext} from './FrameRenderingContext';
import {GameContext} from './GameContext';
import {MouseListener} from './MouseListener';
import {Hunter} from './Hunter';

export class GameRenderer {
  constructor(
    private readonly ctx: CanvasRenderingContext2D,
    private readonly canvas: HTMLCanvasElement,
    private readonly gameContext: GameContext,
    private readonly mouseListener: MouseListener
  ) {}

  private drawLine(start: Point, end: Point) {
    this.ctx?.moveTo(start.x, start.y);
    this.ctx?.lineTo(end.x, end.y);
  }

  draw() {
    const hunter = this.gameContext.hunter;
    this.drawBackground();
    this.alignToPlayerPosition(hunter);
    this.drawGrid();
    this.renderDrawables();
    this.drawCrossline();
    this.drawInfo(hunter);
  }

  private alignToPlayerPosition(hunter: Hunter) {
    this.ctx.save();
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.scale(SCALE, SCALE);
    this.ctx.translate(-hunter.position.x, -hunter.position.y);
  }

  private drawBackground() {
    this.ctx.fillStyle = BG_COLOR;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawGrid() {
    this.ctx.beginPath();

    for (let i = -GRID_COUNT; i <= GRID_COUNT; i++) {
      this.ctx.moveTo(i * GRID_WIDTH, -(FIELD_WIDTH / 2));
      this.ctx.lineTo(i * GRID_WIDTH, FIELD_WIDTH / 2);
      this.ctx.moveTo(-FIELD_HEIGHT / 2, i * GRID_WIDTH);
      this.ctx.lineTo(FIELD_HEIGHT / 2, i * GRID_WIDTH);
    }
    this.ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    this.ctx.stroke();
  }

  private drawCrossline() {
    this.ctx.restore();
    this.ctx.font = '20px Arial';
    this.ctx.fillStyle = 'white';

    this.ctx.fillStyle = 'red';
    this.ctx.beginPath();
    this.ctx.fill();

    this.ctx.save();

    const mousePos = this.mouseListener.currentMousePosition;

    this.ctx.beginPath();
    this.ctx.translate(mousePos.x, mousePos.y);
    this.ctx.strokeStyle = 'red';
    const len = 20;
    this.drawLine(Point.of(-len, 0), Point.of(len, 0));
    this.drawLine(Point.of(0, -len), Point.of(0, len));
    this.ctx.stroke();
    this.ctx.restore();
  }

  private drawInfo(hunter: Hunter) {
    this.ctx.font = '25px Arial';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(
      `Bullets: ${hunter.bulletsCount}, Animals: ${this.gameContext.animals.length}`,
      10,
      30
    );
  }

  gameOver() {
    alert(this.gameContext.gameResult);
  }

  private renderDrawables() {
    this.gameContext.drawables.forEach(d =>
      d.render(new FrameRenderingContext(this.ctx))
    );
  }
}

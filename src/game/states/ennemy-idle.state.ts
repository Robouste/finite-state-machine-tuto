import { SpriteWithDynamicBody } from "../helpers/types";
import { GameScene } from "../scenes/game.scene";
import { State } from "./state";

export class EnnemyIdleState extends State<SpriteWithDynamicBody> {
	public enter(scene: GameScene, object: SpriteWithDynamicBody): void {}
	public update(scene: GameScene, object: SpriteWithDynamicBody): void {}
}

import { SpriteWithDynamicBody } from "../helpers/types";
import { GameScene } from "../scenes/game.scene";
import { State } from "./state";

export class BeingHitState extends State<SpriteWithDynamicBody> {
	public enter(scene: GameScene, object: SpriteWithDynamicBody): void {
		object.setTint(0xff0000);
		scene.time.delayedCall(500, () => object.clearTint());
	}

	public update(scene: GameScene, object: SpriteWithDynamicBody): void {}
}

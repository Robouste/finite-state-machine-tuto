import { Hero } from "../classes/hero.class";
import { Keys } from "../helpers/keys";
import { Tools } from "../helpers/tools";
import { Animation, AnimationFrame } from "../helpers/types";
import { GameScene } from "../scenes/game.scene";
import { State } from "./state";

export class AttackingState extends State<Hero> {
	public enter(scene: GameScene, hero: Hero): void {
		const animationKey = Tools.swingMapping.get(hero.direction)!;
		const swordHitBox = scene.swordHitBox;

		hero.sprite.setVelocity(0);
		hero.sprite.anims.play(animationKey);

		const startHit = (anim: Animation, frame: AnimationFrame): void => {
			hero.sprite.off(Phaser.Animations.Events.ANIMATION_UPDATE, startHit);

			switch (hero.direction) {
				case "right":
					swordHitBox.x = hero.sprite.x + hero.sprite.width * 0.25;
					swordHitBox.y = hero.sprite.y + hero.sprite.height * 0.2;
					break;
				case "left":
					swordHitBox.x = hero.sprite.x - hero.sprite.width * 0.25;
					swordHitBox.y = hero.sprite.y + hero.sprite.height * 0.2;
					break;
				case "up":
					swordHitBox.x = hero.sprite.x;
					swordHitBox.y = hero.sprite.y - hero.sprite.height * 0.25;
					break;
				case "down":
					swordHitBox.x = hero.sprite.x;
					swordHitBox.y = hero.sprite.y + hero.sprite.height * 0.35;
					break;
			}

			swordHitBox.body.enable = true;
			scene.physics.world.add(swordHitBox.body);
		};

		hero.sprite.on(Phaser.Animations.Events.ANIMATION_UPDATE, startHit);

		hero.sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
			this.stateMachine.transition(Keys.States.Idle);
			swordHitBox.body.enable = false;
			scene.physics.world.remove(swordHitBox.body);
		});
	}

	public update(scene: GameScene, hero: Hero): void {}
}

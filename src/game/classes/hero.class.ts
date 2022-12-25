import { Direction, SpriteWithDynamicBody } from "../helpers/types";

export interface Hero extends SpriteWithDynamicBody {
	direction: Direction;
}

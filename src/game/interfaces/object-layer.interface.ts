export declare type ObjectLayerPropertyValue = "Spawn" | "Room" | "Ladder" | "Chest" | "Interaction" | any;
export declare type ObjectLayerPropertyType = "bool" | "color" | "float" | "file" | "int" | "object" | "string";
export declare type InteractionType = "OpenText" | "Dialog";

export interface ObjectLayerProperty {
	name: string;
	type: ObjectLayerPropertyType;
	value: ObjectLayerPropertyValue;
}

export interface ObjectLayer {
	id: number;
	height: number;
	name: string;
	point: boolean;
	properties: ObjectLayerProperty[];
	rotation: number;
	visible: boolean;
	width: number;
	x: number;
	y: number;
}

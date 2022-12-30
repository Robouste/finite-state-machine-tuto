export declare type ObjectLayerValue = "Spawn" | "Room" | any;
export declare type ObjectLayerType = "bool" | "color" | "float" | "file" | "int" | "object" | "string";

export interface ObjectLayerProperty {
	name: string;
	type: ObjectLayerType;
	value: ObjectLayerValue;
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

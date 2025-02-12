export type SelectItemType<V = any> = {
	label: string
	value: V
};

export class SelectItem<V = any> {
	public label: string;
	public value: V;

	constructor(base: SelectItemType<V>) {
		this.label = base.label;
		this.value = base.value;
	}
}

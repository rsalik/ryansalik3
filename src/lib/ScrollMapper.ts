export type ScrollInstruction = {
	a: number;
	b: number;
	fromPos: number;
	toPos: number;
	listener: (val: number) => void;
};

export class ScrollMapper {
	registry: ScrollInstruction[] = [];
	onScroll: undefined | ((e: Event) => void);

	constructor() {
		this.registry = [];
	}

	listen() {
		window.addEventListener('scroll', this.updateAll.bind(this));
	}

	stop() {
		window.removeEventListener('scroll', this.updateAll.bind(this));
	}

	updateAll(e: Event) {
		const pos = window.scrollY;

		this.registry.forEach((key) => {
			const val = this.update(pos, key);
			key.listener(val);
		});

		this.onScroll?.(e);
	}

	register(a: number, b: number, fromPos: number, toPos: number, listener: (val: number) => void) {
		this.registry.push({ a, b, fromPos, toPos, listener });
	}

	update(pos: number, key: ScrollInstruction) {
		const { a, b, fromPos, toPos } = key;

		if (pos <= fromPos) return a;
		if (pos >= toPos) return b;

		return a + (b - a) * ((pos - fromPos) / (toPos - fromPos));
	}
}

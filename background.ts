// class for image background color


export class Background {
	public size: number = 64
	public dark: boolean = false
	public name: string
	public path: string
	public color: { r: number, g: number, b: number }
	constructor(name: string, path: string, color: { r: number, g: number, b: number, a?: number }, dark?: boolean) {
		this.name = name
		this.path = path
		this.color = color
		if (dark) {
			this.dark = dark
		}
	}
}

export class Backgrounds {
	public list: Background[] = []
	constructor(public images: Set<string>) {}
	add(background: Background) {
		this.images.add(background.path)
		this.list.push(background)
		return this
	}
	create(
		name: string,
		path: string,
		color: { r: number; g: number; b: number; a?: number },
		dark?: boolean
	) {
		this.images.add(path)
		this.list.push(new Background(name, path, color, dark))
		return this
	}
	private static getColor(color: { r: number; g: number; b: number; a?: number }): string {
		if (color.a) {
			return `{${color.r},${color.g},${color.b},${color.a}}`
		}
		return `{${color.r},${color.g},${color.b}}`
	}
	export() {
		const list = this.list.map((x) => `{"${x.name}",${Backgrounds.getColor(x.color)},${x.dark?1:0}}`)
		return `{${list.join(",")}}`
	}
}
// class for image foreground color

export class Foreground {
	public size: number = 64
	public name: string
	public path: string
	public spaceOnly: boolean
	constructor(name: string, spaceOnly: boolean = false) {
		this.name = name
		this.path = `${name}.png`
		this.spaceOnly = spaceOnly
	}
}

export class Foregrounds {
	public list: Foreground[] = []
	constructor(public images: Set<string>) {}
	add(...foreground: Foreground[]) {
		foreground.forEach((fg) => this.images.add(fg.path))
		this.list.push(...foreground)
		return this
	}
	create(name: string, spaceOnly: boolean = false) {
		const fg = new Foreground(name, spaceOnly)
		this.images.add(fg.path)
		this.list.push(fg)
		return this
	}
	createMultiple(spaceOnly: boolean, ...names: string[]) {
		for (const name of names) {
			const fg = new Foreground(name, spaceOnly)
			this.images.add(fg.path)
			this.list.push(fg)
		}
		return this
	}
	export() {
		const list = this.list.map((x) => `{"${x.name}", ${x.spaceOnly ? 1 : 0}}`)
		return `{${list.join(",")}}`
	}
}

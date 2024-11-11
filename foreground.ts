// class for image foreground color


export class Foreground {
	public size: number = 64
	public name: string
	public path: string
	constructor(name: string, path: string) {
		this.name = name
		this.path = path
	}
}

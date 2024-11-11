// class for image background color


export class Background {
	public size: number = 64
	public dark: boolean = false
	public name: string
	public path: string
	public color: { r: number, g: number, b: number }
	constructor(name: string, path: string, color: { r: number, g: number, b: number }, dark?: boolean) {
		this.name = name
		this.path = path
		this.color = color
		if (dark) {
			this.dark = dark
		}
	}
}
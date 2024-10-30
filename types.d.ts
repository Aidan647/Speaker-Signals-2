declare module "lua-format" {
	type settings = {
		RenameVariables?: boolean
		RenameGlobals?: boolean
		SolveMath?: boolean
	}
	const Beautify: (code: string, settings: settings) => string
	const Minify: (code: string, settings: settings) => string
	const Uglify: (code: string, settings: settings) => string

}

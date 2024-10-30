import { path7za as zip } from "7zip-bin"
import { $ } from "bun"
import path from "path"
import fs from "fs/promises"
import lua from "lua-format"
import { getColors, getIcons, processImages } from "./helpers"

const version = "2.0.1"
const modid = "speaker-signals-2"

const tempFolder = path.join("build", "temp", modid)

const imagesFolder = path.join(tempFolder, "graphics")
const backgroundFolder = path.join(imagesFolder, "back")
const iconFolder = path.join(imagesFolder, "black")
const iconNegativeFolder = path.join(imagesFolder, "white")

console.log("Clearing temp folder")
await fs.rm(tempFolder, { recursive: true, force: true })
console.log("Creating temp folder")

await fs.mkdir(tempFolder, { recursive: true })
await fs.mkdir(backgroundFolder, { recursive: true })
await fs.mkdir(iconFolder, { recursive: true })
await fs.mkdir(iconNegativeFolder, { recursive: true })

console.log("Copy images")

await processImages(iconFolder, iconNegativeFolder, backgroundFolder)

console.log("Generate files")

await fs.copyFile("files/thumbnail.png", path.join(tempFolder, "thumbnail.png"))
await fs.copyFile("files/changelog.txt", path.join(tempFolder, "changelog.txt"))
await fs.readFile("files/info.json", "utf8").then(async (data) => {
	const json = JSON.parse(data)
	json.version = version
	json.name = modid
	await fs.writeFile(path.join(tempFolder, "info.json"), JSON.stringify(json))
})

let data = [
	"local ssm = {",
	`colors = ${getColors()},`,
	`icons = ${getIcons()}`,
	"}",
	await fs.readFile("files/data.lua"),
].join("\n")
data = lua
	.Minify(data, { RenameGlobals: false, RenameVariables: true, SolveMath: true })
	.replace(
		`--[[\n\tCode generated using github.com/Herrtt/luamin.js\n\tAn open source Lua beautifier and minifier.\n--]]\n\n\n\n`,
		""
	)
await fs.writeFile(path.join(tempFolder, "data.lua"), data)

console.log("Optimizing images")

await $`pingo -s4 -lossless ${tempFolder}`.quiet()

console.log("Packaging")

await $`cd ${tempFolder}/.. && ${zip} a -tzip -mx=9 ../${modid}_${version}.zip ${modid}`.quiet()

console.log()
console.log("Done.")

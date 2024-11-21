import { path7za as zip } from "7zip-bin"
import { $ } from "bun"
import path from "path"
import fs from "fs/promises"
import lua from "lua-format"
import { getColors, getIcons, processImages } from "./helpers"
import { Background, Backgrounds } from "./background"
import { Foreground, Foregrounds } from "./foreground"

const version = "2.0.2"
const modid = "speaker-signals-2"

const tempFolder = path.join("build", "temp", modid)

const imagesFolder = path.join(tempFolder, "graphics")

console.log("Clearing temp folder")
await fs.rm(tempFolder, { recursive: true, force: true })
console.log("Creating temp folder")

await fs.mkdir(tempFolder, { recursive: true })

console.log("Copy images")
const images: Set<string> = new Set()
const backgrounds = new Backgrounds(images)
	.create("red", "background.png", { r: 255, g: 57, b: 47 })
	.create("yellow", "background.png", { r: 255, g: 197, b: 0 })
	.create("green", "background.png", { r: 79, g: 234, b: 57 })
	.create("blue", "background.png", { r: 0, g: 207, b: 255 })
	.create("purple", "background.png", { r: 132, g: 0, b: 247 })
	.create("black", "background.png", { r: 0, g: 0, b: 0 }, true)
	.create("gray", "background.png", { r: 122, g: 122, b: 122 })
	.create("white", "background.png", { r: 255, g: 255, b: 255 })
	.create("transparent", "background.png", { r: 0, g: 0, b: 0, a: 0 }, true)
	.create("transparent2", "background.png", { r: 0, g: 0, b: 0, a: 0 })

const foregrounds = new Foregrounds(images).createMultiple(
	"ammo",
	"armor",
	"asteroid-collector-path-blocked-icon",
	"cargo-pod",
	"cubes",
	"danger",
	"destination-full",
	"destroyed",
	"download",
	"empty-trash-slot",
	"energy",
	"fluid",
	"food",
	"frozen",
	"fuel",
	"gas",
	"ghost",
	"grid",
	"gun",
	"hand",
	"history",
	"inserter",
	"lightning",
	"logistic-delivery",
	"marker",
	"misaligned",
	"module",
	"no-building-material",
	"no-path",
	"no-storage-space",
	"not-enough-construction-robots",
	"not-enough-repair-packs",
	"nuclear",
	"nutrients",
	"pipeline",
	"plus",
	"recharge",
	"resources",
	"roboport",
	"robot-material",
	"skull",
	"stack",
	"steam",
	"technology",
	"too-far-from-roboport",
	"train",
	"unplugged"
)
await processImages(imagesFolder, images)
// virtual-signal-description.speaker-signals-2-danger-vellow
console.log("Generate files")


let data = [
	"local ssm={",
	`bg=${backgrounds.export()},`,
	`fg=${foregrounds.export()}`,
	"}",
	await fs.readFile("files/data.lua"),
].join("\n")
// data = lua
// 	.Minify(data, { RenameGlobals: false, RenameVariables: true, SolveMath: true })
// 	.replace(
// 		`--[[\n\tCode generated using github.com/Herrtt/luamin.js\n\tAn open source Lua beautifier and minifier.\n--]]\n\n\n\n`,
// 		""
// 	)
await fs.writeFile(path.join(tempFolder, "data.lua"), data)

await fs.copyFile("files/thumbnail.png", path.join(tempFolder, "thumbnail.png"))
await fs.copyFile("files/changelog.txt", path.join(tempFolder, "changelog.txt"))
await fs.readFile("files/info.json", "utf8").then(async (data) => {
	const json = JSON.parse(data)
	json.version = version
	json.name = modid
	await fs.writeFile(path.join(tempFolder, "info.json"), JSON.stringify(json))
})

// let data = [
// 	"local ssm = {",
// 	`colors = ${getColors()},`,
// 	`icons = ${getIcons()}`,
// 	"}",
// 	await fs.readFile("files/data.lua"),
// ].join("\n")
// data = lua
// 	.Minify(data, { RenameGlobals: false, RenameVariables: true, SolveMath: true })
// 	.replace(
// 		`--[[\n\tCode generated using github.com/Herrtt/luamin.js\n\tAn open source Lua beautifier and minifier.\n--]]\n\n\n\n`,
// 		""
// 	)
// await fs.writeFile(path.join(tempFolder, "data.lua"), data)

console.log("Optimizing images")

await $`pingo -s4 -lossless ${tempFolder}`.quiet()

console.log("Packaging")

await $`cd ${tempFolder}/.. && ${zip} a -tzip -mx=9 ../${modid}_${version}.zip ${modid}`.quiet()

console.log()
console.log("Done.")

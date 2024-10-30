import { path7za as zip } from "7zip-bin"
import { $ } from "bun"
import sharp from "sharp"
import path from "path"
import fs from "fs/promises"

const tempFolder = path.normalize("build/temp")

const imagesFolder = path.join(tempFolder, "g")
const backgroundFolder = path.join(imagesFolder, "b")
const iconFolder = path.join(imagesFolder, "i")
const iconNegativeFolder = path.join(iconFolder, "n")

console.log("Clearing temp folder")
await fs.rm(tempFolder, { recursive: true, force: true })
console.log("Creating temp folder")

await fs.mkdir(tempFolder, { recursive: true })
await fs.mkdir(backgroundFolder, { recursive: true })
await fs.mkdir(iconFolder, { recursive: true })
await fs.mkdir(iconNegativeFolder, { recursive: true })


console.log("Extracting images")

const pngOptions: sharp.PngOptions = {
	compressionLevel: 9,
	palette: true,
	effort: 10,
}
const icons: string[] = []
const backgrounds: string[] = []
await fs.readdir("images/icons").then(async (files) => {
	for (const file of files) {
		const name = file.split(".")[0]
		const image = sharp(path.join("images/icons", file))
		await image
			.clone()
			.png(pngOptions)
			.toFile(path.join(iconFolder, file))
		await image
			.clone()
			.negate({ alpha: false })
			.png(pngOptions)
			.toFile(path.join(iconFolder, "n", file))
		icons.push(name)
	}
})
await fs.readdir("images/background").then(async (files) => {
	let i = 0
	for (const file of files) {
		const name = file.split(".")[0]
		await sharp(path.join("images/background", file))
			.png(pngOptions)
			.toFile(path.join(backgroundFolder, file))
		backgrounds.push(name)
		
	}
})

console.log(backgrounds)
console.log(icons)
// console.log(zip);
// const { stdout, stderr } = await $`${zip} a -tzip -mx=9 build/test.zip out`

// console.log(stdout.toString());
// console.log(stderr.toString())
console.log()
console.log("Done.")

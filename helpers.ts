import sharp from "sharp"
import fs from "fs/promises"
import path from "path"

export function getColors() {
	const x = [
		["red", "black", "a"],
		["yellow", "black", "b"],
		["green", "black", "c"],
		["blue", "black", "d"],
		["purple", "black", "e"],
		["black", "white", "f"],
		["gray", "black", "g"],
		["white", "black", "h"],
		["none", "black", "j"],
		["none", "white", "i"],
	]

	return `{${x.map((i) => `{"${i[0]}","${i[1]}","${i[2]}"}`).join(",")}}`
}
export function getIcons() {
	const x = [
		["danger", "Danger", "00", 0],
		["energy", "Energy", "01", 0],
		["unplugged", "Unplugged", "02", 0],
		["destroyed", "Destroyed", "03", 0],
		["fluid", "Fluid", "04", 0],
		["fuel", "Fuel", "05", 0],
		["no-storage-space", "No storage space", "06", 0],
		["no-building-material", "No building material", "07", 0],
		["not-enough-construction-robots", "Not enough construction robots", "08", 0],
		["not-enough-repair-packs", "Not enough repair packs", "09", 0],
		["robot-material", "Robot material", "10", 0],
		["recharge", "Recharge", "11", 0],
		["too-far-from-roboport", "Too far from roboport", "12", 0],
		["module", "Module", "13", 0],
		["ammo", "Ammo", "14", 0],
		["gun", "Gun", "15", 0],
		["armor", "Armor", "16", 0],
		["misaligned", "Misaligned", "17", 0],
		["train", "Train", "18", 0],
		["plus", "Plus", "19", 0],
		["marker", "Marker", "20", 0],
		["destination-full", "Destination full", "21", 0],
		["download", "Download", "22", 0],
		// ["drop-cargo", "Drop cargo", "23", 0],
		["cargo-pod", "Cargo pod", "24", 1],
		["food", "Food", "25", 0],
		["inserter", "Inserter", "26", 0],
		["nutrients", "Nutrients", "27", 1],
		["lightning", "Lightning", "28", 1],
		["grid", "Grid", "29", 0],
		["frozen", "Frozen", "30", 1],
		["history", "History", "31", 0],
		["no-path", "No path", "32", 0],
		["roboport", "Roboport", "33", 0],
		["pipeline", "Pipeline", "34", 0],
		["resources", "Resources", "35", 0],
		["ghost", "Ghost", "36", 0],
		["skull", "Skull", "37", 0],
		["hand", "Hand", "38", 0],
		["stack", "Stack", "39", 0],
		["technology", "Technology", "40", 0],
		["gas", "Gas", "41", 0],
		["nuclear", "Nuclear", "42", 0],
		["steam", "Steam", "43", 0],
	]
	let str = "{"
	str += x
		.map((y) => {
			return `{"${y[0]}","${y[1]}","${y[2]}", ${y[3]}}`
		})
		.join(",")
	str += "}"
	return str
}

export async function processImages(outputFolder: string, images: Set<string>) {
	const pngOptions: sharp.PngOptions = {
		compressionLevel: 9,
		palette: true,
		effort: 10,
	}
	for (const image in images) {
		await sharp("images/" + image)
			.toColorspace("b-w")
			.png(pngOptions)
			.toFile(path.join(outputFolder, path.basename(image)))
	}
}

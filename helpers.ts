export function getColors() {
	const x = [
		["red", "black","a"],
		["yellow", "black","b"],
		["green", "black","c"],
		["blue", "black","d"],
		["purple", "black","e"],
		["black", "white","f"],
		["gray", "black","g"],
		["white", "black","h"],
		["none", "black","j"],
		["none", "white","i"],
	]

	return `{${x.map((i) => `{"${i[0]}","${i[1]}","${i[2]}"}`).join(",")}}`
}
export function getIcons() {
	const x = [
		["danger", "Danger", "00"],
		["energy", "Energy", "01"],
		["unplugged", "Unplugged", "02"],
		["destroyed", "Destroyed", "03"],
		["fluid", "Fluid", "04"],
		["fuel", "Fuel", "05"],
		["no-storage-space", "No storage space", "06"],
		["no-building-material", "No building material", "07"],
		["not-enough-construction-robots", "Not enough construction robots", "08"],
		["not-enough-repair-packs", "Not enough repair packs", "09"],
		["robot-material", "Robot material", "10"],
		["recharge", "Recharge", "11"],
		["too-far-from-roboport", "Too far from roboport", "12"],
		["module", "Module", "13"],
		["ammo", "Ammo", "14"],
		["gun", "Gun", "15"],
		["armor", "Armor", "16"],
		["misaligned", "Misaligned", "17"],
		["train", "Train", "18"],
		["plus", "Plus", "19"],
		["marker", "Marker", "20"],
		["destination-full", "Destination full", "21"],
		["download", "Download", "22"],
		// ["drop-cargo", "Drop cargo", "23"],
		["cargo-pod", "Cargo pod", "24"],
		["food", "Food", "25"],
		["inserter", "Inserter", "26"],
		["nutrients", "Nutrients", "27"],
		["lightning", "Lightning", "28"],
		["grid", "Grid", "29"],
		["frozen", "Frozen", "30"],
		["history", "History", "31"],
		["no-path", "No path", "32"],
		["roboport", "Roboport", "33"],
		["pipeline", "Pipeline", "34"],
		["resources", "Resources", "35"],
		["ghost", "Ghost", "36"],
		["skull", "Skull", "37"],
		["hand", "Hand", "38"],
		["stack", "Stack", "39"],
		["technology", "Technology", "40"],
		["gas", "Gas", "41"],
		["nuclear", "Nuclear", "42"],
		["steam", "Steam", "43"],
	]
	let str = "{"
	str += x
		.map((y) => {
			return `{"${y[0]}","${y[1]}","${y[2]}"}`
		})
		.join(",")
	str += "}"
	return str
}

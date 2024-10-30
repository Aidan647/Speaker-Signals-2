local id = "speaker-signals-2"
local vs = "virtual-signal"
local g = "__/graphics/"

local function create(v, y, name)
	if mods["space-age"] or y[4] == 0 then
		data:extend({{
			type = vs,
			name = name,
			icons = {	{icon = "__" .. id .. g .. "back/" .. v[1] .. ".png"},
						{icon = "__" .. id .. g .. v[2] .."/" .. y[1] .. ".png"}},
			subgroup = id .. "-" .. y[1],
			localised_name = y[2],
			order = v[3]
		}})
		if v[2] == "black" and v[1] == "none" then
			data.raw[vs][name].name = name .. "_"
			data.raw[vs][name .. "_"] = data.raw[vs][name]
		end
	end
end

for i,y in ipairs(ssm.icons) do
	data:extend({{
		type = "item-subgroup",
		name = id .. "-" .. y[1],
		group = "signals",
		order = "zzz"..y[3],
	}})
	for _,v in ipairs(ssm.colors) do
		local name = id .. "-" .. y[1] .. "-".. v[1]
		create(v, y, name)
	end
end

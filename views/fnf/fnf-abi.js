var trait = [
	"Casting Time",
	"Duration",
	"Range",
	"Area of Effect",
	"Components",
	"Source"
];

var stunt_menus = [];

stuntcount = 0;

function init_abi() {
	abi_addstunt();
	abi_addstunt();
	abi_addstunt();
}

function abi_addstunt() {
	function space() {
		var tr_spacing = document.createElement("tr");
		tr_spacing.innerHTML = "<td>&nbsp;</td>";
		return tr_spacing;
	}
	
	var new_stunt_menus = [];
	
	var type = ["Instant", "Passive"];
	
	var stuntlist = document.getElementById("abi_stunts");
	var tr_entry = document.createElement("tr");
	var td_main = document.createElement("td");
	
	var table_main = document.createElement("table");
	
	var tr_name = document.createElement("tr");
	tr_name.innerHTML = "<tr><td>Name:</td>\
	<td><h1 id='input_stunt_name_" + stuntcount + 
		"' class='h1_input' contenteditable='true'></h1></td></tr>";
	var tr_type = document.createElement("tr");
	type_content = "<tr><td>Type:</td>\
	<td class='td_table_container'><select id='input_stunt_type_" + 
		stuntcount + "'>";
	
	for(var i = 0; i < type.length; i++) {
		type_content += "<option>" + type[i] + "</option>";
	}
	type_content += "</select></td><td>";
	type_content += "<button  id='input_stunt_open_" + stuntcount + 
		"' class='button_incr' onclick='open_stunt(" + stuntcount + 
		")'>&rarr;</button>";
	type_content += "<button  id='input_stunt_close_" + stuntcount + 
		"' class='hide' onclick='close_stunt(" + stuntcount + 
		")'>&larr;</button>"
	type_content += "</td>"
	
	tr_type.innerHTML = type_content;
	
	var tr_desc = document.createElement("tr");
	tr_desc.innerHTML = "<tr><td>Description:</td>\
	<td><p id='input_stunt_desc_" + stuntcount + 
		"' class='p_input' contenteditable='true'></p></td></tr>";
	
	var td_menu = document.createElement("td");
	
	var table_menu = document.createElement("table");
	
	for(var i = 0; i < trait.length; i++) {
		var tr_trait = document.createElement("tr");
		tr_trait.innerHTML += "<td>" + trait[i] + 
			"</td><td><p id='input_stunt_" + stuntcount + "_trait_" + i + 
			"' class='p_input' contenteditable='true'></p></td>";
		tr_trait.className = "hide";
		new_stunt_menus.push(tr_trait);
		table_menu.appendChild(tr_trait);
	}
	
	var td_del = document.createElement("td");
	td_del.innerHTML = "<button id='input_stunt_del_" + stuntcount + 
		"' class='button_incr' onclick='delete_stunt(" + stuntcount + 
		")'>X</button>";
	
	stunt_menus.push(new_stunt_menus);
	
	td_main.className = "td_table_container";
	td_menu.className = "td_table_container";
	td_del.className = "td_table_container";
	
	table_main.appendChild(tr_name);
	table_main.appendChild(tr_type);
	table_main.appendChild(tr_desc);
	
	td_main.appendChild(table_main);
	td_menu.appendChild(table_menu);
	tr_entry.appendChild(td_main);
	tr_entry.appendChild(td_menu);
	tr_entry.appendChild(td_del);
	
	tr_entry.id = "input_stunt_" + stuntcount;
	
	stuntlist.appendChild(tr_entry);
	
	stuntcount++;
}

function open_stunt(id) {
	document.getElementById("input_stunt_open_" + id).className = "hide";
	document.getElementById("input_stunt_close_" + id).className = 
		"button_incr";
	for(var i = 0; i < stunt_menus[id].length; i++) {
		stunt_menus[id][i].className = "show";
	}
}

function close_stunt(id) {
	document.getElementById("input_stunt_open_" + id).className = "button_incr";
	document.getElementById("input_stunt_close_" + id).className = "hide";
	for(var i = 0; i < stunt_menus[id].length; i++) {
		var eid = "input_stunt_" + id + "_trait_" + i;
		if(document.getElementById(eid).innerText == "")
			stunt_menus[id][i].className = "hide";
	}
}

function delete_stunt(id) {
	del(document.getElementById("input_stunt_" + id));
}

function del(e) {
	e.parentNode.removeChild(e);
}
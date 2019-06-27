var detail = ["Weight", "Uses", "Source"];

var equip_menus = [];

equipcount = 0;

function init_gea() {
	gea_addequip();
}

function gea_addequip() {
	var new_equip_menus = [];
	
	var type = ["Armor", "Weapon", "Tool"];
	
	var equiplist = document.getElementById("gea_equip");
	var tr_entry = document.createElement("tr");
	var td_main = document.createElement("td");
	
	var table_main = document.createElement("table");
	
	var tr_name = document.createElement("tr");
	tr_name.innerHTML = "<tr><td>Name:</td>\
	<td><h1 id='input_equip_name_" + equipcount + 
		"' class='h1_input' contenteditable='true'></h1></td></tr>";
	var tr_type = document.createElement("tr");
	type_content = "<tr><td>Type:</td>\
	<td class='td_table_container'><select id='input_equip_type_" + equipcount + "'>";
	
	for(var i = 0; i < type.length; i++) {
		type_content += "<option>" + type[i] + "</option>";
	}
	type_content += "</select></td><td>";
	type_content += "<button  id='input_equip_open_" + equipcount + 
		"' class='button_incr' onclick='open_equip(" + equipcount + 
		")'>&rarr;</button>";
	type_content += "<button  id='input_equip_close_" + equipcount + 
		"' class='hide' onclick='close_equip(" + equipcount + ")'>&larr;</button>"
	type_content += "</td>"
	
	tr_type.innerHTML = type_content;
	
	var tr_desc = document.createElement("tr");
	tr_desc.innerHTML = "<tr><td>Description:</td>\
	<td><p id='input_equip_desc_" + equipcount + 
		"' class='p_input' contenteditable='true'></p></td></tr>";
	
	var td_menu = document.createElement("td");
	
	var table_menu = document.createElement("table");
	
	for(var i = 0; i < detail.length; i++) {
		var tr_detail = document.createElement("tr");
		tr_detail.innerHTML += "<td>" + detail[i] + 
			"</td><td><p id='input_equip_" + equipcount + "_detail_" + i + 
			"' class='p_input' contenteditable='true'></p></td>";
		tr_detail.className = "hide";
		new_equip_menus.push(tr_detail);
		table_menu.appendChild(tr_detail);
	}
	
	var td_del = document.createElement("td");
	td_del.innerHTML = "<button id='input_equip_del_" + equipcount + 
		"' class='button_incr' onclick='delete_equip(" + equipcount + 
		")'>X</button>";
	
	equip_menus.push(new_equip_menus);
	
	td_main.className = "td_table_container";
	td_menu.className = "td_table_container";
	
	table_main.appendChild(tr_name);
	table_main.appendChild(tr_type);
	table_main.appendChild(tr_desc);
	
	td_main.appendChild(table_main);
	td_menu.appendChild(table_menu);
	tr_entry.appendChild(td_main);
	tr_entry.appendChild(td_menu);
	tr_entry.appendChild(td_del);
	
	tr_entry.id = "input_equip_" + equipcount;
	
	equiplist.appendChild(tr_entry);
	
	equipcount++;
}

function open_equip(id) {
	document.getElementById("input_equip_open_" + id).className = "hide";
	document.getElementById("input_equip_close_" + id).className = 
		"button_incr";
	for(var i = 0; i < equip_menus[id].length; i++) {
		equip_menus[id][i].className = "show";
	}
}

function close_equip(id) {
	document.getElementById("input_equip_open_" + id).className = "button_incr";
	document.getElementById("input_equip_close_" + id).className = "hide";
	for(var i = 0; i < equip_menus[id].length; i++) {
		var eid = "input_equip_" + id + "_detail_" + i;
		if(document.getElementById(eid).innerText == "")
			equip_menus[id][i].className = "hide";
	}
}

function delete_equip(id) {
	del(document.getElementById("input_equip_" + id));
}

function del(e) {
	e.parentNode.removeChild(e);
}
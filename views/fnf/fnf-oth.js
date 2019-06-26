attribcount = 0;

function init_oth() {
	oth_addattrib();
}

function oth_addattrib() {
	var attriblist = document.getElementById("oth_attrib");
	var tr_entry = document.createElement("tr");
	var td_main = document.createElement("td");
	
	var table_main = document.createElement("table");
	
	var tr_name = document.createElement("tr");
	tr_name.innerHTML = "<tr><td>Name:</td>\
	<td><h1 id='input_attrib_name_" + attribcount + 
		"' class='h1_input' contenteditable='true'></h1></td></tr>";
	
	var tr_desc = document.createElement("tr");
	tr_desc.innerHTML = "<tr><td>Description:</td>\
	<td><p id='input_attrib_desc_" + attribcount + 
		"' class='p_input' contenteditable='true'></p></td></tr>";
	
	var td_del = document.createElement("td");
	td_del.innerHTML = "<button id='input_attrib_del_" + attribcount + 
		"' class='button_incr' onclick='delete_attrib(" + attribcount + 
		")'>X</button>";
	
	td_main.className = "td_table_container";
	
	table_main.appendChild(tr_name);
	table_main.appendChild(tr_desc);
	
	td_main.appendChild(table_main);
	tr_entry.appendChild(td_main);
	tr_entry.appendChild(td_del);
	
	tr_entry.id = "input_attrib_" + attribcount;
	
	attriblist.appendChild(tr_entry);
	
	attribcount++;
}

function delete_attrib(id) {
	del(document.getElementById("input_attrib_" + id));
}

function del(e) {
	e.parentNode.removeChild(e);
}
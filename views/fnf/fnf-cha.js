var stats = [
	{
		"name" : "Strength",
		"nick" : "Str",
		"init" : 10,
		"min" : 0,
		"max" : 99
	},
	{
		"name" : "Dexterity",
		"nick" : "Dex",
		"init" : 10,
		"min" : 0,
		"max" : 99
	},
	{
		"name" : "Constitution",
		"nick" : "Con",
		"init" : 10,
		"min" : 0,
		"max" : 99
	},
	{
		"name" : "Intelligence",
		"nick" : "Int",
		"init" : 10,
		"min" : 0,
		"max" : 99
	},
	{
		"name" : "Wisdom",
		"nick" : "Wis",
		"init" : 10,
		"min" : 0,
		"max" : 99
	},
	{
		"name" : "Charisma",
		"nick" : "Cha",
		"init" : 10,
		"min" : 0,
		"max" : 99
	},
/* 	{
		"name" : "Resource",
		"nick" : "Res",
		"init" : 3,
		"min" : 0,
		"max" : 99
	},
	{
		"name" : "Fate Points",
		"nick" : "Fpt",
		"init" : 3,
		"min" : 0,
		"max" : 99
	},
	{
		"name" : "Refresh",
		"nick" : "Ref",
		"init" : 2,
		"min" : 0,
		"max" : 99
	} */
];

var aspects = [
	"",
	"Background",
	"Quest",
	"Social",
	"Specialization",
	"Bond",
	"Fixation",
	"Fear",
	"Contradiction",
	"Lie",
	"Other"
];

var aspectcount = 0;

function init_cha() {
    /* var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

	request.onload = function() {
	  db = request.response;
	} */
	for(var i = 0; i < stats.length; i++) {
		cha_addstat(stats[i].name, stats[i].nick, 
			stats[i].init, stats[i].min, stats[i].max);
	}
	for(var i = 0; i < 5; i++) {
		cha_addaspect(i);
	}
}

function increment(target, max) {
	if(parseInt(document.getElementById(target).value) < max)
		document.getElementById(target).value = 
			parseInt(document.getElementById(target).value) + 1;
}

function deincrement(target, min) {
	if(parseInt(document.getElementById(target).value) > min)
		document.getElementById(target).value = 
			parseInt(document.getElementById(target).value) - 1;
}

function cha_addstat(name, nick, init, min, max) {
	var statlist = document.getElementById("cha_stats");
	var tr = document.createElement("tr");
	var td_h1 = document.createElement("td");
	td_h1.innerHTML = "<h1 class='h1_stat'>" + nick + "</h1>" + name;
	var td_input = document.createElement("td");
	td_input.innerHTML = "<input id='input_stat_" + nick + 
		"' class='input_stat' value='" + init + "'></input>";
	var td_incr = document.createElement("td");
	
	incrbutton = "<tr><td><button class='button_incr' onclick='increment(\
		\"input_stat_" + nick + "\", " + max + "\
		)'>&uarr;</button></td></tr>";
	deincrbutton = "<tr><td><button class='button_incr' onclick='deincrement(\
		\"input_stat_" + nick + "\", " + min + "\
		)'>&darr;</button></td></tr>";
	
	td_incr.innerHTML = "<table>" + incrbutton + deincrbutton + "</table>";
	tr.appendChild(td_h1);
	tr.appendChild(td_input);
	tr.appendChild(td_incr);
	statlist.appendChild(tr);
}

function cha_addaspect(selected) {
	var aspectlist = document.getElementById("cha_aspects");
	var tr = document.createElement("tr");
	var td_select = document.createElement("td");
	
	if(selected == 0) {
		options = "<span>High Concept<span>";
	} else if(selected == 1) {
		options = "<span>Trouble<span>";
	} else {
		options = "<select id='input_aspect_type_" + aspectcount + "'>";
		for(var i = 0; i < aspects.length; i++) {
			options += "<option value='" + i + "'";
			if(i == 0)
				options += " selected disabled";
			options += ">" + aspects[i] + "</option>"
		}
		options += "</select>"
		
	}
	
	td_select.innerHTML = options;
	
	var td_name = document.createElement("td");
	td_name.innerHTML = "<div id='input_aspect_name_" + aspectcount + 
		"' class='div_input' contenteditable='true'></div>"
	
	tr.appendChild(td_select);
	tr.appendChild(td_name);
	
	if(selected > 1) {
		var td_del = document.createElement("td");
		td_del.innerHTML = "<button id='input_aspect_del_" + aspectcount + 
			"' class='button_incr' onclick='delete_aspect(" + aspectcount + 
			")'>X</button>";
		tr.appendChild(td_del);
	}
	
	tr.id = "input_aspect_" + aspectcount;
	
	aspectlist.appendChild(tr);
	aspectcount++;
}

function delete_aspect(id) {
	del(document.getElementById("input_aspect_" + id));
}

function del(e) {
	e.parentNode.removeChild(e);
}
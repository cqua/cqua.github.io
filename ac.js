const NEWROOMSCORE = 2;
const NEWITEMSCORE = 6;
const USEITEMSCORE = 10;
const ITEMDROPSCORE = 2;
const ITEMLOSSSCORE = 3;
const VICTORYSCORE = 10;

var MAP_XMIN = 25565;
var MAP_XMAX = -25565;
var MAP_YMIN = 25565;
var MAP_YMAX = -25565;
	
const IGNORABLES = ["the", "a", "to", "fucking", "on", "with", "for", "small", "about", "it", "from", "in", "at"];
var inventory = [];
var explored = {};
var touched = [];
var places_gone = [];

//var requestURL = 'https://jequatot.github.io/home/views/games/ac/ac.json';
var requestURL = 'ac.json';

var parsed = [];

var kingship = false;

var state = 0;

var here = 0;

var score = 0;
var max_score = 0;

var name = "player";

var verboseness = "brief";

window.onload = init;

var db;
var request;

var map_loaded = false;
var inv_loaded = false;
var music_loaded = false;

class exp_token {
	constructor(val) {
		this.times_entered = 1;
		this.item = [];
		this.lock = {};
		this.coord = val.coord.x + "x" + val.coord.y;
		for(var i = 0; i < val.item.length; i++) {
			this.item.push(dbSearch("object", val.item[i]));
		}
		for(var i = 0; i < val.exit.length; i++) {
			this.lock[val.exit[i].dir] = val.exit[i].locked;
		}
	}
}

function init() {
	clear();
	print("welcome to " + span("ACTION CASTLE V1.2"));
	print("now with more bugs than 1.1!");
	print("<br/>")
	print('enter ' + span("help") + ' for a list of commands');
	print('enter ' + span('help &ltCOMMAND&gt') + ' for info on a specific command.');
	print("<br/>")
	print("no saves found");
	print("enter your " + span("NAME") + " to start a new save");
	//print("or type " + span("LOAD") + " to bring up a previous save");
	state = 17;
	
	document.getElementById("map_button").disabled = true;
	document.getElementById("inv_button").disabled = true;
	
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

	request.onload = function() {
	  db = request.response;
	}
	
}

function enter() {
	var val = document.getElementById("box").value;
	document.getElementById("box").value = "";
	
	if(val == "") return;
	
	document.getElementById("map_dropdown").style.display = "none";
	document.getElementById("inv_dropdown").style.display = "none";
	document.getElementById("music_dropdown").style.display = "none";
	
	print("> " + val);
	
	if(state == 17 && !val.toLowerCase().includes("help") && !dbSearch("command", "help").synonym.includes(val.toLowerCase())) {
		if(dbSearch("command", val) != -1) {
			print("please enter a " + span("NAME") + " before you try to " + span(val));
			print("please enter a " + span("NAME") + " that is not already a command- i get confused easily");
			return;
		}
		if(val.toLowerCase() == "load") {
			if(!load())
				return;
			print("welcome back " + name);
		} else {
			name = val;
			print("hello " + name);
		}
		
		getMaxScore();
		document.getElementById("scr").innerHTML = "SCORE: " + score + "/" + max_score;
		
		inventory.push(dbSearch("object", "i00"));
		go("r00");
		state = 0;
		document.getElementById("map_button").disabled = false;
		document.getElementById("inv_button").disabled = false;
		return;
	}
	
	if(parse(val.split(" ")) == 1)
		parse2();
	try {
	} catch(e) {
		print("sorry, i lack the intelligence to understand your refined way of speaking- please speak more simply")
	}
	if(state == 17) {
		print("enter your " + span("NAME") + " to start a new save");
	}
}

function parse(inp) {
	
	// compare two words. if one is a phrase that includes the other, ????
	function word_compare(phrase, input) {
		input = input.toLowerCase();
		phrase_arr = phrase.split(" ");
		if(phrase_arr[0] == input) {
			if(phrase_arr.length == 1)
				return 0;
			return phrase_arr;
		}
		return -1;
	}
	
	var count = 0;
	parsed = [];
	var i = 0;
	for(i = 0; i < inp.length; i++) {
		if(inp[i] != "") {
			for(var j = 0; j < db.dictionary.length; j++) {
				var res = word_compare(db.dictionary[j].name, inp[i]);
				if(res == 0) {
					if(db.dictionary[j] != parsed[parsed.length - 1]) {
						parsed.push(db.dictionary[j]);
					}
				} else if(res != -1 && res.length <= inp.length - i) {
					var minires = 0;
					for(var k = 1; k < res.length; k++) {
						if(word_compare(res[k], inp[i + k]) == -1) {
							minires = -1;
							break;
						}
					}
					if(minires == 0) {
						if(db.dictionary[j] != parsed[parsed.length - 1]) {
							parsed.push(db.dictionary[j]);
						}
					}
				}
				if(parsed.length <= count) {
					for(var js = 0; js < db.dictionary[j].synonym.length; js++) {
						var res = word_compare(db.dictionary[j].synonym[js], inp[i]);
						if(res == 0) {
							parsed.push(db.dictionary[j]);
						} else if(res != -1 && res.length <= inp.length - i) {
							var minires = 0;
							for(var k = 1; k < res.length; k++) {
								if(word_compare(res[k], inp[i + k]) == -1) {
									minires = -1;
									break;
								}
							}
							if(minires == 0) {
								if(db.dictionary[j] != parsed[parsed.length - 1]) {
									parsed.push(db.dictionary[j]);
									i+=k;
								}
							}
						}
					}
				}
			}
			
			if(parsed.length <= count) {
				for(j = 0; j < IGNORABLES.length; j++) {
					if(inp[i].toLowerCase() == IGNORABLES[j]) {
						j = IGNORABLES.length + 20;
						count--;
					}
				}
				if(j <= IGNORABLES.length) {
					print("I don't know \"" + inp[i] + "\".");
					return 0;
				}
			}
			count++;
		}
	}
	parsed.push("#");
	return 1;
}


function parse2() {
	t1 = parsed[0]
	if(t1.name == "help") {
			if(state != 17)
				state = 0;
			help(parsed[1]);
	} else if(t1.name == "clear") {
			state = 0;
			clear();
	} else if(t1.name == "look") {
			state = 0;
			look(parsed[1]);
	} else if(t1.name == "take") {
			state = 0;
			if(parsed[1] == '#')
				drop('#', '#');
			else take(parsed[1], parsed[2]);
	} else if(t1.name == "inventory") {
			state = 0;
			if(inventory.length == 0)
				print("you have nothing");
			else {
				print("you have:");
				for(var i = 0; i < inventory.length; i++) {
					print(inventory[i].name);
				}
			}
	} else if(t1.name == "drop") {
			state = 0;
			if(parsed[1] == '#')
				drop('#', '#');
			else drop(parsed[1], parsed[2]);
	} else if(t1.name == "use") {
			state = 0;
			use(parsed[1]);
	} else if(t1.name == "go") {
			state = 0;
			go(parsed[1]);
	} else if(t1.type == "direction") {
			state = 0;
			go(parsed[0]);
	} else if(t1.name == "save") {
			save();
	} else if(t1.name == "load") {
			if(load())
				look('#');
	} else if(t1.name == "sit") {
			if(here.rid == "r12")
				if(kingship) {
					print("YOU WIN!!");
					score += VICTORYSCORE;
				} else print("only the crowned may sit here");
			else print("nothing here looks made-for-sitting...");
	} else if(t1.name == "talk") {
		if(parsed[1] == '#')
			talk('#', '#');
		else talk(parsed[1], parsed[2]);
	} else if(["verbose", "brief", "superbrief"].includes(t1.name)) {
		verboseness = t1.name;
		print(t1.desc);
	} else if(t1.name == "score") {
		scored();
	} else if(t1.name == "health") {
		diagnostic();
	} else {
		if(state == 1)
			take(parsed[0], "#");
		else if(state == 2)
			drop(parsed[0], "#");
		else if(state == 3)
			use(parsed[0]);
		else if(state == 4)
			go(parsed[0]);
		else if(state == 5) {
			talk(parsed[0], parsed[1]);
		}
		else {
			print("i don't understand");
		}
	}
	
	document.getElementById("scr").innerHTML = "SCORE: " + score + "/" + max_score;
}

function print(val) {
	var np = document.createElement("p");
	var scrn = document.getElementById("text");
	
	bracket = val.indexOf('$')
	while(bracket != -1) {
		var id = val.substr(bracket, 4);
		val = val.replace(id, span(dbSearch("object", id.substr(1, 3)).name));
		bracket = val.indexOf('$');
	}
	
	if(val[0] == '>') np.innerHTML = '<br>';
	np.innerHTML += val;
	scrn.appendChild(np);
	scrn.scrollTo(0, scrn.scrollHeight);
}

function help(val) {
	if(val != "#") {
		print(span(val.name) + ": " + val.desc);
		print("SYNONYMS:")
		for(var j = 0; j < val.synonym.length; j++) {
			print(span(val.synonym[j]));
		}
	}
	else {
		help(dbSearch("command", "help"));
		print("COMMANDS:");
		var commlist = []
		for(var i = 0; i < db.dictionary.length; i++) {
			if(db.dictionary[i].type == "command")
				print(span(db.dictionary[i].name));
		}
	}
}

function clear() {
	var bar = document.getElementById("text");
	while(bar.hasChildNodes()) {
		bar.removeChild(bar.lastChild);
	}
}

function look(val) {
	if(val != "#") {
		if(val.name == "all") {
			for(var i = 0; i < explored[here.rid].item.length; i++)
				look(explored[here.rid].item[i]);
			return;
		}
		if(val.name == "health") {
			diagnostic();
			return;
		}
		if(val.type == "object" && (inventory.includes(val) || explored[here.rid].item.includes(val))) {
			print(val.desc);
			if(val.subtype == "container") {
				if(val.contents.length == 0) {
					print("it is currently empty");
				} else {
					print("contents:");
					for(var i = 0; i < val.contents.length; i++) {
						print(span(dbSearch("object", val.contents[i]).name));
					}
					/* if(val.capacity == val.contents.length)
						print("it is stuffed to the brim")
					else
						print("it looks like it could fit " + (val.capacity - val.contents.length) + " more things"); */
				}
			}
		} else {
			for(var i = 0; i < explored[here.rid].item.length; i++)
				if(explored[here.rid].item[i].subtype == "container"){
					if(explored[here.rid].item[i].contents.includes(val.iid)) {
						print(val.desc);
						state = 0;
						return;
					}
				}
			print("you can't see that right now");
		}
	} else {
		print("you are in the " + span(here.name));
		print(here.desc);
		for(var i = 0; i < explored[here.rid].item.length; i++)
			print("there is a " + span(explored[here.rid].item[i].synonym[0]));
		print("exits: ");
		for(var i = 0; i < here.exit.length; i++)
			if(explored[here.rid].lock[here.exit[i].dir] == 0)
				print(span(here.exit[i].dir) + ": " + here.exit[i].desc);
	}
}

function take(val, container) {
	if(val != "#") {
		if(container != "#") {
			if(container.subtype != "container") {
				print("the " + span(container.name) + " taken from; it is not a container");
				state = 0;
				return;
			}
			if(val.name == "all") {
				for(var i = container.contents.length - 1; i >= 0; i--)
					take(dbSearch("object", container.contents[i]), container);
				state = 0;
				return;
			}
			if(container.contents.includes(val.iid)) {
				if(val.subtype == "tool") {
					print("you got the " + span(val.name) + "!");
					inventory.push(val);
					container.contents.splice(container.contents.indexOf(val.iid), 1);
					if(!touched.includes(val.iid)) {
						score += NEWITEMSCORE;
						touched.push(val.iid);
					}
				} else {
					print("the " + span(val.name) + " is too big to take<br/>" + 
					val.fail_msg);
				}
			} else
				print("there is no " + span(val.name) + " here");
		} else {
			if(val.name == "all") {
				for(var i = explored[here.rid].item.length - 1; i >= 0; i--)
					take(explored[here.rid].item[i], "#");
				return;
			}
			if(explored[here.rid].item.includes(val)) {
				if(val.subtype == "tool") {
					print("you got the " + span(val.name) + "!");
					inventory.push(val);
					explored[here.rid].item.splice(explored[here.rid].item.indexOf(val), 1);
					if(!touched.includes(val.iid)) {
						score += NEWITEMSCORE;
						touched.push(val.iid);
					}
				} else {
					print("the " + span(val.name) + " is too big to take<br/>" + 
					val.fail_msg);
				}
			} else
				print("there is no " + span(val.name) + " here");
		}
		
		state = 0;
	} else {
		print("what would you like to take?");
		state = 1;
	}
	inv_loaded = false;
}

function drop(val, container) {
	if(val != "#") {
		var c = -1;
		if(container != "#") {
			if(container.subtype == "container") {
				if(val.name == "all") {
					for(var i = inventory.length - 1; i >= 0; i--)
						drop(inventory[i], container);
					return;
				} else {
					if(inventory.includes(val)) {
						if(container.capacity <= container.contents.length) {
							print("the " + span(container.name) + " is full- your " + span(val.name) + " has no chance of fitting");
						} else {
							print("you put the " + span(val.name) + " inside of the " + span(container.name));
							inventory.splice(inventory.indexOf(val), 1);
							container.contents.push(val.iid);
						}
					} else
						print("you don't have a " + span(val.name));
				}
			} else {
				print("the " + span(val.name) + " does not fit in the " + span(container.name) + "; it is not a container");
			}
		} else {
			if(val.name == "all") {
				for(var i = inventory.length - 1; i >= 0; i--)
					drop(inventory[i], "#");
				return;
			} else {
				if(inventory.includes(val)) {
					print("you lost the " + span(val.name));
					inventory.splice(inventory.indexOf(val), 1);
					explored[here.rid].item.push(val);
				} else
					print("you don't have a " + span(val.name));
			}
		}
		state = 0;
	} else {
		print("what would you like to drop?");
		state = 2;
	}
	inv_loaded = false;
}

function use(val) {
	if(val != "#") {
		if(val.name == "all") {
			print("please have some restraint");
			return;
		}
		if(inventory.includes(val)) {
			if(val.subtype != "tool") {
				print("you dont know how to use a " + span(val.name));
			} else {
				for(var i = 0; i < val.use.length; i++) {
					target = dbSearch("object", val.use[i].target);
					if(explored[here.rid].item.includes(target)) {
						room = explored[here.rid];
						print(val.use[i].msg);
						if(val.use[i].destroys_target == 1)
							room.item.splice(room.item.indexOf(target));
						if(val.use[i].unlock == "kingship") {
							kingship = true;
							print("you are granted KINGSHIP!");
						} else if(val.use[i].unlock != -1) {
							room.lock[val.use[i].unlock] = 0;
							print("the way " + span(val.use[i].unlock) + " is now open");
						}
						if(val.use[i].drop != -1) {
							var drop = dbSearch("object", val.use[i].drop);
							room.item.push(drop);
							print("there is now a " + span(drop.name) + " before you");
							score += ITEMDROPSCORE;
						}
						if(val.use[i].consumes_item == 1) {
							inventory.splice(inventory.indexOf(val), 1);
							print("but your " + span(val.name) + " was lost");
							score += ITEMLOSSSCORE;
						}
						state = 0;
						return;
					}
				}
				print("it's no use<br/>" + val.fail_msg);
			}
		} else
			print("you don't have a " + span(val.name));
		state = 0;
	} else {
		print("what will you use?");
		state = 3;
	}
}

function go(val) {
	if(val != "#") {
		map_loaded = false;
		if(val.name == "all") {
			print("please have some restraint");
			return;
		}
		var temp = -1;
		
		if(val == "r00") {
			here = dbSearch("room", "r00")
			temp = 0;
		}
		else {
			for(var i = 0; i < here.exit.length; i++) {
				//if this exit is in the direction you chose && it isnt locked
				if(here.exit[i].dir == val.name && explored[here.rid].lock[here.exit[i].dir] == 0) {
					temp = here.exit[i];
					break;
				}
			}
			if(temp != -1) {
				print("you go " + span(val.name));
				here = dbSearch("room", temp.dest)
			}
		}
		if(temp != -1) {
			document.getElementById("loc").innerHTML = here.name;
			try {
				// you have been here before
				explored[here.rid].times_entered++;
				if(verboseness != "verbose")
					print("you are at the " + span(here.name));
			} catch(e) {
				// you have NOT been here before
				places_gone.push(here.rid);
				explored[here.rid] = new exp_token(here);
				if(here.rid != "r00") score += NEWROOMSCORE;
				if(verboseness == "brief")
					look("#");
				if(verboseness == "superbrief")
					print("you are at the " + span(here.name));
			}
			if(verboseness == "verbose")
					look("#");
			
		} else {
			print("there is no exit " + span(val.name));
			state = 0;
		}
	} else {
		print("where will you go?");
		state = 4;
	}
}

function save() {
	deleteAllCookies();
	document.cookie =  here + '##' + JSON.stringify(inventory) + '##' + JSON.stringify(ITEMDEFS) + '##' + JSON.stringify(ROOMDEFS) + '##' + SYNONYMS[ROOMID + here][0] + '##' + name + '##' + score;
	print("Saved!");
}

function load() {
	if(document.cookie.length < 2) {
		print("no save found");
		return false;
	}
	inventory = (document.cookie).split('##');
	here = parseInt(inventory[0]);
	ITEMDEFS = JSON.parse(inventory[2]);
	ROOMDEFS = JSON.parse(inventory[3]);
	name = inventory[5];
	score = parseInt(inventory[6]);
	inventory =  JSON.parse(inventory[1]);
	return true;
}

function talk(to, about) {
	if(to != '#') {
		if(explored[here.rid].item.includes(to)) {
			if(to.subtype == "npc") {
				print(to.dialogue[Math.floor(Math.random() * to.dialogue.length)]);
			}
			else print("the " + span(to.name) + " doesnt really seem up for conversation");
		} else print("they can't hear you right now");
	} else {
		print("to whom are you talking?");
		state = 5;
	}
}

function scored() {
	var ranks = ["Serf", "Page", "Knight", "Baron", "Count", "Duke", "Monarch", "Emperor"];
	print("your current score is " + score + " out of " + max_score);
	for(var i = ranks.length; i >= 0; i--) {
		if(score >= max_score*(i)/(ranks.length - 1)) {
			print("your rank is: " + span(ranks[i]));
			console.log(max_score*(i)/(ranks.length - 1));
			return;
		}
	}
}

function diagnostic() {
	print("you feel alright");
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    }
}

function dbSearch(type, id) {
	for(var i = 0; i < db.dictionary.length; i++) {
		if(db.dictionary[i].type == type) {
			if(type == "room") {
				if(db.dictionary[i].rid == id) {
					return db.dictionary[i];
				}
			} else if(type == "object") {
				if(db.dictionary[i].iid == id) {
					return db.dictionary[i];
				}
			} else if(db.dictionary[i].name == id) {
					return db.dictionary[i];
			}
		}
	}
	//console.log("id search failed!!");
	return -1;
}

// gets maximum score and also the map coordinates
function getMaxScore() {	
	max_score = - NEWROOMSCORE - NEWITEMSCORE;
	for(var i = 0; i < db.dictionary.length; i++) {
		var term = db.dictionary[i];
		if(term.type == "room") {
			max_score += NEWROOMSCORE;
			if(term.coord.x < MAP_XMIN)
				MAP_XMIN = term.coord.x;
			if(term.coord.y < MAP_YMIN)
				MAP_YMIN = term.coord.y;
			if(term.coord.x > MAP_XMAX)
				MAP_XMAX = term.coord.x;
			if(term.coord.y > MAP_YMAX)
				MAP_YMAX = term.coord.y;
		}
		if(term.type == "object") {
			if(term.subtype == "tool") {
				max_score += NEWITEMSCORE;
				if(term.use.length > 0) {
					if(term.use[0].drop != -1)
						max_score += ITEMDROPSCORE;
					if(term.use[0].consumes_item == 1)
						max_score += ITEMLOSSSCORE;
				}
			}
		}
	}
	max_score += VICTORYSCORE;
}

function span(val) {
	return "<span>" + val + "</span>"
}

function menutoggle(menu) {
	var x = document.getElementById(menu);
	if(menu == "map_dropdown") {
		if(!map_loaded && MAP_XMAX > 0) {
			x.innerHTML = "";
			if(document.getElementById("map_table") == null) {
				var t = document.createElement("table");
				t.id = "map_table";
				for(var cy = MAP_YMIN; cy <= MAP_YMAX; cy++) {
					var tr = document.createElement("tr");
					for(var cx = MAP_XMIN; cx <= MAP_XMAX; cx++) {
						var td = document.createElement("td");
						td.id = "map_" + cx + "x" + cy;
						tr.appendChild(td);
					}
					t.appendChild(tr);
				}
				x.appendChild(t);
			}
			for(var i = 0; i < places_gone.length; i++) {
				if(here.rid == places_gone[i])
					document.getElementById("map_" + explored[places_gone[i]].coord).className = "maploc";
				else
					document.getElementById("map_" + explored[places_gone[i]].coord).className = "visited";
			}
			map_loaded = true;
		}
		document.getElementById("music_dropdown").style.display = "none";
		document.getElementById("inv_dropdown").style.display = "none";
	} else if(menu == "inv_dropdown") {
		if(!inv_loaded) {
			x.innerHTML = "<span>" + name + "'s knapsack</span><br/>";
			if(inventory.length == 0)
				x.innerHTML += "nothing";
			else {
				for(var i = 0; i < inventory.length; i++) {
					x.innerHTML += inventory[i].name + "<br/>";
				}
			}
			inv_loaded = true;
		}
		document.getElementById("map_dropdown").style.display = "none";
		document.getElementById("music_dropdown").style.display = "none";
	} else if(menu == "music_dropdown") {
		if(!music_loaded) {
			x.innerHTML = '<iframe style="border: 0; width: 170px; height: 170px;" src="https://bandcamp.com/EmbeddedPlayer/album=517238578/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/" seamless><a href="http://chillhop.bandcamp.com/album/chillhop-essentials-summer-2019">Chillhop Essentials Summer 2019 by Chillhop Music</a></iframe><br/>\
			<iframe style="border: 0; width: 170px; height: 170px;" src="https://bandcamp.com/EmbeddedPlayer/album=4065251593/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/" seamless><a href="http://michaelklein.bandcamp.com/album/over-the-waves">Over the Waves by Mike Klein</a></iframe><br/>\
			<iframe style="border: 0; width: 170px; height: 170px;" src="https://bandcamp.com/EmbeddedPlayer/album=3869938552/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/" seamless><a href="http://tubaskinny.bandcamp.com/album/some-kind-a-shake">Some Kind-a-Shake by Tuba Skinny</a></iframe>';
			music_loaded = true;
		}
		document.getElementById("map_dropdown").style.display = "none";
		document.getElementById("inv_dropdown").style.display = "none";
	}
	if (x.style.display === "block") {
		x.style.display = "none";
	} else {
		x.style.display = "block";
	}
}

/*
function encode(val) {
	val = val.toLowerCase();
	var result = "";
	for(var i = 0; i < val.length; i++) {
		if(val[i].charCodeAt(0) > 96 && val[i].charCodeAt(0) < 123)
			result += ((val[i].charCodeAt(0) + i - 97)%26).toString(26);
		else result += val[i];
	}
	return result;
}

function decode(val) {
	var result = "";
	for(var i = 0; i < val.length; i++) {
		if(val[i].charCodeAt(0) > 96 && val[i].charCodeAt(0) < 123)
			result += ((val[i].charCodeAt(0) + i - 97)%26).toString(26);
		else result += val[i];
	}
	return result;
} */
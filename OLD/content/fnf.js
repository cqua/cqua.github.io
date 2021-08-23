//containers
//room object arrays

var h;
var music_loaded = false;
var die_loaded = false;
var currentsrce = "";

window.onload = init;

function init() {	
	gothere("views/fnf/fnf.html");
}

function menutoggle(menu) {
	var x = document.getElementById(menu);
	if(menu == "music_dropdown") {
		if(!music_loaded) {
			x.innerHTML = '<iframe style="border: 0; width: 170px; height: 170px;" src="https://bandcamp.com/EmbeddedPlayer/album=517238578/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/" seamless><a href="http://chillhop.bandcamp.com/album/chillhop-essentials-summer-2019">Chillhop Essentials Summer 2019 by Chillhop Music</a></iframe><br/><iframe style="border: 0; width: 170px; height: 170px;" src="https://bandcamp.com/EmbeddedPlayer/album=2322633469/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/" seamless><a href="http://maxoisnuts.bandcamp.com/album/fakebit-2010">FAKEBIT 2010 by Maxo</a></iframe>';
			music_loaded = true;
		}
		document.getElementById("die_dropdown").style.display = "none";
	} else {
		if(!die_loaded) {
			x.innerHTML = 
			'<button id="roller" onclick="roll();">roll!</button>\
			<input type="text" id="dieout1"> +\
			Modifier:\
			<input type="text" id="diemod"> =\
			<input type="text" id="dieoutf">';
			die_loaded = true;
		}
		document.getElementById("music_dropdown").style.display = "none";
	}
	if (x.style.display === "block") {
		x.style.display = "none";
	} else {
		x.style.display = "block";
	}
}

function changemenu(kind) {
	var bar = document.getElementById("leftbar");
	var names;
	while(bar.hasChildNodes()) {
		bar.removeChild(bar.lastChild);
	}

	if(kind == "home") {
		var np = document.createElement("p");
		var node = document.createTextNode("Home");
		np.appendChild(node);
		bar.appendChild(np);

		makebutton("New", "changemenu('new')");
		makebutton("Load", "");
	} else {
		makebutton("&lt==", "changemenu('home')");

		if(kind == "new") {
			var np = document.createElement("p");
			var node = document.createTextNode("New");
			np.appendChild(node);
			bar.appendChild(np);

			names = [
				"Blank", "fnf/fnf.html",
				"Dungeons & Dragons 5e", "fnf/fnf.html",
				"Fate Core", "fnf/fnf.html",
				"Fate & Fantasy", "fnf/fnf.html"
			];
		}

		if(kind == "game") {
			var np = document.createElement("p");
			var node = document.createTextNode("games");
			np.appendChild(node);
			bar.appendChild(np);

			names = [
				"Action Castle <br/><span class='subtitle'>Fall 2018</span>", "games/action_castle.html", 
				"The Spinward Marches <br/><span class='subtitle'>Fall 2018</span>", "games/diaspora.html"
			];
		}

		for(var i = 0; i < names.length; i+=2) {
			makebutton(names[i].replace(/_/g, " "), "gothere('views/" + names[i+1] + "')");
		}
	}
}

function makebutton(name, action) {
	var bar = document.getElementById("leftbar");
	var nb = document.createElement("button");
	nb.innerHTML = name;
	nb.setAttribute( "onClick", "javascript: " + action + ";");
	bar.appendChild(nb);
}

function gothere(srce) {
	if(currentsrce != srce) {
		currentsrce = srce;
		document.getElementById("frame").src = srce;
	}
}

function roll() {
	h = setInterval(rollsub,40);
	setTimeout(endroll, 1000);
}

function rollsub() {
	document.getElementById("dieout1").value
		= Math.floor(Math.random() * 20)+1;
	document.getElementById("dieoutf").value =
		Number(document.getElementById("dieout1").value) +
		Number(document.getElementById("diemod").value);
}

function endroll() {
	window.clearInterval(h);
}

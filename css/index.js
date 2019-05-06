//containers
//room object arrays

var h;

function diemenutoggle() {
	var x = document.getElementById("diedropdown");
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

		makebutton("About Me", "gothere('about_me.html')");
		makebutton("Work Experience", "gothere('work_experience.html')");
		var np = document.createElement("p");
		var node = document.createTextNode("Projects");
		np.appendChild(node);
		bar.appendChild(np);
		makebutton("Schoolwork", "changemenu('school')");
		makebutton("Games", "changemenu('game');");


		makebutton('&lt;3', "gothere('ship_map.html')");
	} else {
		makebutton("Back", "changemenu('home')");

		if(kind == "school") {
			var np = document.createElement("p");
			var node = document.createTextNode("Schoolwork");
			np.appendChild(node);
			bar.appendChild(np);

			names = ["GUI I", "https://jequatot.github.io/gui-a4/", "Pathfinder Character Builder", "https://jequatot.github.io/gui2-pathfinder/"];
		}

		if(kind == "game") {
			var np = document.createElement("p");
			var node = document.createTextNode("Games");
			np.appendChild(node);
			bar.appendChild(np);

			names = [
				"the spinward marches <br/><span class='subtitle'>Fall 2018</span>", "games/diaspora.html", 
				"Action Castle <br/><span class='subtitle'>Fall 2018</span>", "games/action_castle.html"
			];
		}
	}

	for(var i = 0; i < names.length; i+=2) {
		makebutton(names[i].replace(/_/g, " "), "gothere('" + names[i+1] + "')");
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
	document.getElementById("frame").src = srce;
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

//containers
//room object arrays

var h;

var pc = 'D:/Github/Web Projects/home/'
var work_laptop = 'C:/Users/JQUATTROCIOCCHI/Documents/GitHub/cqua.github.io/'
var personal_lappy = '/home/cia/Documents/GitHub/web/cqua.github.io/'

function loadmenu(menu, page) {
	var bar = document.getElementById("sidebar");
	var i = -1;
	var m;

	while(bar.hasChildNodes()) {
		bar.removeChild(bar.lastChild);
	}

	var environment = 'prod'

	if(window.location.href.substring(0, 5) == 'file:') {
		environment = 'local'
	}

	bar.innerHTML = '<div class="sidebar-header"><a href="https://cqua.github.io/rp/requiem/">REQUIEM IN DUSKWALL</a></div>'

	var ul = document.createElement("ul");
	ul.classList.add("list-unstyled")
	ul.classList.add("components")

	do {
		i++
		m = menu_content[i];
	} while(menu != m.name);

	for(i = 0; i < m.content.length; i++) {
		if(m.content[i].action == "NODE") {
			var np = document.createElement("p");
			if(m.content[i].title == "DATE") {
				var d = new Date(document.lastModified);
				np.innerHTML = d.getMonth()+1 + "." + d.getDate() + "." + (parseInt(d.getYear()) - 100);
				//np.innerHTML = d.toDateString();
			} else
				np.innerHTML = m.content[i].title;
			np.className = "p_menunode"
			ul.appendChild(np);
		} else {
			var np = document.createElement("li");
			if(environment == 'local') {
				np.innerHTML = "<a href='" + 'file:///' + personal_lappy + 'rp/requiem/' + m.content[i].action + "index.html'>" + m.content[i].title + "</a>";
			} else {
				np.innerHTML = "<a href='" + "https://cqua.github.io/rp/requiem/" + m.content[i].action + "'>" + m.content[i].title + "</a>";
			}
			if(m.content[i].action == page) {
				np.childNodes[0].classList.add("active");
				np.childNodes[0].href = "#";
			}
			ul.appendChild(np);
		}
	}

	bar.appendChild(ul);
}

function changemenu(new_menu) {
	var bar = document.getElementById("leftbar");
	var i = -1;
	var m;

	while(bar.hasChildNodes()) {
		bar.removeChild(bar.lastChild);
	}

	do {
		i++
		m = menu_content[i];
	} while(new_menu != m.name);

	for(i = 0; i < m.content.length; i++) {
		if(m.content[i].action == "NODE") {
			var np = document.createElement("p");
			if(m.content[i].title == "DATE") {
				var d = new Date(document.lastModified);
				np.innerHTML = d.getMonth()+1 + "." + d.getDate() + "." + (parseInt(d.getYear()) - 100);
				//np.innerHTML = d.toDateString();
			} else
				np.innerHTML = m.content[i].title;
			np.className = "p_menunode"
			bar.appendChild(np);
		} else {
			makebutton(m.content[i].title, m.content[i].action);
		}
	}
}

function makebutton(name, action) {
	var bar = document.getElementById("leftbar");
	var nb = document.createElement("a");
	nb.innerHTML = name;

	var href = 'cqua.github.io/rp/requiem/' + action;
	console.log(href);

	nb.setAttribute( "href", href);
	nb.setAttribute( "class", "btn btn-primary");
	bar.appendChild(nb);
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

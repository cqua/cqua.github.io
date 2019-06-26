var requestURL = 'fnf.json';

window.onload = init;

var db;
var request;

function init() {
    /* var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

	request.onload = function() {
	  db = request.response;
	} */
	init_cha();
	init_abi();
	init_gea();
	init_oth();
}

function showtable(name) {
	var pages = ['cha', 'abi', 'gea', 'oth'];
	for(var i = 0; i < pages.length; i++) {
		if(name == pages[i])
			document.getElementById(pages[i]).className='show';
		else
			document.getElementById(pages[i]).className='hide';
	}
}

function load(val) {
	document.getElementById('name').value = db.pc[val].name;
	for(var i = 0; i < db.pc[val].stat.length; i++) {
		console.log(db.pc[val].stat[i].nick)
		document.getElementById(db.pc[val].stat[i].nick.toLowerCase()).value = 
			db.pc[val].stat[i].val;
	}
}
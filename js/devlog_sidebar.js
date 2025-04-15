function fill_sidebar(postyear, postdate) {
	var sidebar_innerhtml = "";

	var sidebar_content = [
		{"id":0412,
			"year":2025,
		"title":'[GaW23 Collection] progress report',
		'subtitle':'april 12, 2025',
		'link':'../2025/april12.html'},
		{'id':0330,
			"year":2025,
		"title":'[CritterCatch] first look',
		'subtitle':'march 30, 2025',
		'link':'../2025/march.html'},
		{'id':1121,
			"year":2024,
		"title":"<img src='../2024/media/icon_neko.png' style='max-height:1em' alt='nekojiru mining'/>",
		'subtitle':'november 21, 2024',
		'link':'../2024/november21.html'},
		{'id':1107,
			"year":2024,
		"title":"experimenting with taxis",
		'subtitle':'november 7, 2024',
		'link':'../2024/november.html'},
		{'id':1024,
			"year":2024,
		"title":"experimenting with real time strategy",
		'subtitle':'october 24, 2024',
		'link':'../2024/october24.html'},
		{'id':1003,
			"year":2024,
		"title":"project hopping",
		'subtitle':'october 3, 2024',
		'link':'../2024/october.html'},
		{'id':901,
			"year":2024,
		"title":"Orbital Terminus",
		'subtitle':'september 1, 2024',
		'link':'../2024/september.html'},
		{'id':723,
			"year":2024,
		"title":"[Silver Key] Phase II release",
		'subtitle':'july 23, 2024',
		'link':'../2024/july.html'},
		{'id':621,
			"year":2024,
		"title":"[Silver Key] discrete actions",
		'subtitle':'june 21, 2024',
		'link':'../2024/june.html'},
		{'id':515,
			"year":2024,
		"title":"[Silver Key] pathfinding",
		'subtitle':'may 15, 2024',
		'link':'../2024/may.html'},
		{'id':430,
			"year":2024,
		"title":"[Silver Key] state machines",
		'subtitle':'april 30, 2024',
		'link':'../2024/april.html'},
		{'id':224,
			"year":2024,
		"title":"february status",
		'subtitle':'february 24, 2024',
		'link':'../2024/february.html'},
		{'id':126,
			"year":2024,
		"title":"PLAY BOXIBAN",
		'subtitle':'january 26, 2024',
		'link':'../2024/january.html'},
	]

	var year=0
	
	for (i = 0; i < sidebar_content.length; i++) {
		if(year!=sidebar_content[i].year) {
			if(year!=0) {
				sidebar_innerhtml += "</div>"
			}
			year=sidebar_content[i].year
			sidebar_innerhtml += "<button class='sidebar-section collapse-button"
			if(postyear==year) {
				sidebar_innerhtml +=  " active"
			}
			sidebar_innerhtml += "'><h5>" + year + "</h5></button><div class='collapse-content"
			if(postyear==year) {
				sidebar_innerhtml +=  " open"
			}
			sidebar_innerhtml += "'>"
		}
		
		if(postyear==year && postdate==sidebar_content[i].id) {
			sidebar_innerhtml += "<div class='post-link active'>" + 
				sidebar_content[i].title + "<div class='date-subtitle'>" + sidebar_content[i].subtitle + "</div>" + 
				"</div>"
		} else {
			sidebar_innerhtml += "<a class='post-link' href='" + sidebar_content[i].link + "'>" + 
				sidebar_content[i].title + "<div class='date-subtitle'>" + sidebar_content[i].subtitle + "</div>" + 
				"</a>"
		}
	}
	sidebar_innerhtml += "</div>"

	document.getElementById('sidebar').innerHTML=sidebar_innerhtml
}
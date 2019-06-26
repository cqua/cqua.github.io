var menu_content = [
	{
		"name" : "home",
		"content" : [
			{
				"title" : "home",
				"action" : "NODE"
			},
			{
				"title" : "about me",
				"action" : "gothere('views/about_me.html')"
			},
			{
				"title" : "work experience",
				"action" : "gothere('views/work_experience.html')"
			},
			{
				"title" : "interests",
				"action" : "gothere('views/interests.html')"
			},
			{
				"title" : "projects",
				"action" : "NODE"
			},
			{
				"title" : "schoolwork",
				"action" : "changemenu('school')"
			},
			{
				"title" : "games",
				"action" : "changemenu('games')"
			},
			{
				"title" : "&#9829",
				"action" : "window.location.href = 'views/games/ac/ac.html'"
			}
		]
	},
	{
		"name" : "school",
		"content" : [
			{
				"title" : "&lt==",
				"action" : "changemenu('home')"
			},
			{
				"title" : "schoolwork",
				"action" : "NODE"
			},
			{
				"title" : "Pathfinder Character Builder <br/><span class='subtitle'>Spring 2019</span>",
				"action" : "gothere('views/school/gui_ii.html')"
			},
			{
				"title" : "x86 Compiler<br/><span class='subtitle'>Spring 2019</span>",
				"action" : "gothere('views/school/compilers.html')"
			},
			{
				"title" : "GUI I <br/><span class='subtitle'>Fall 2018</span>",
				"action" : "gothere('views/school/gui_i.html')"
			}
		]
	},
	{
		"name" : "games",
		"content" : [
			{
				"title" : "&lt==",
				"action" : "changemenu('home')"
			},
			{
				"title" : "games",
				"action" : "NODE"
			},
			{
				"title" : "Fate & Fantasy <br/><span class='subtitle'>Summer 2019</span>",
				"action" : "gothere('views/games/fate_n_fantasy.html')"
			},
			{
				"title" : "Action Castle <br/><span class='subtitle'>Fall 2018</span>",
				"action" : "gothere('views/games/action_castle.html')"
			},
			{
				"title" : "The Spinward Marches <br/><span class='subtitle'>Fall 2018</span>",
				"action" : "gothere('views/games/diaspora.html')"
			}
		]
	}
];

var music_content = [
	'<iframe style="border: 0; width: 170px; height: 170px;" src="https://bandcamp.com/EmbeddedPlayer/album=517238578/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/" seamless><a href="http://chillhop.bandcamp.com/album/chillhop-essentials-summer-2019">Chillhop Essentials Summer 2019 by Chillhop Music</a></iframe>',
	'<iframe style="border: 0; width: 170px; height: 170px;" src="https://bandcamp.com/EmbeddedPlayer/album=2322633469/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/" seamless><a href="http://maxoisnuts.bandcamp.com/album/fakebit-2010">FAKEBIT 2010 by Maxo</a></iframe>'
];
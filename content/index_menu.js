var menu_content = [
	{
		"name" : "home",
		"content" : [
			{
				"title" : "<span>home</span>",
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
				"title" : "<span>projects</span>",
				"action" : "NODE"
			},
			{
				"title" : "Fate & Fantasy <br/><span class='span_subtitle'>Summer 2019</span>",
				"action" : "gothere('views/games/fate_n_fantasy.html')"
			},
			{
				"title" : "Action Castle <br/><span class='span_subtitle'>Fall 2018</span>",
				"action" : "gothere('views/games/action_castle.html')"
			},
			{
				"title" : "The Spinward Marches <br/><span class='span_subtitle'>Fall 2018</span>",
				"action" : "gothere('views/games/diaspora.html')"
			},
			{
				"title" : "view all projects...",
				"action" : "changemenu('projects')"
			},
			{
				"title" : "&#9829",
				"action" : "gothere('https://jequatot.github.io/gui-a4/css/mario_dance.gif')"
			},
			{
				"title" : "DATE",
				"action" : "NODE"
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
				"title" : "Pathfinder Character Builder <br/><span class='span_subtitle'>Spring 2019</span>",
				"action" : "gothere('views/school/gui_ii.html')"
			},
			{
				"title" : "x86 Compiler<br/><span class='span_subtitle'>Spring 2019</span>",
				"action" : "gothere('views/school/compilers.html')"
			},
			{
				"title" : "GUI I <br/><span class='span_subtitle'>Fall 2018</span>",
				"action" : "gothere('views/school/gui_i.html')"
			},
			{
				"title" : "Earlier Work <br/><span class='span_subtitle'>Pre 2018</span>",
				"action" : "gothere('views/school/history.html')"
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
				"title" : "Fate & Fantasy <br/><span class='span_subtitle'>Summer 2019</span>",
				"action" : "gothere('views/games/fate_n_fantasy.html')"
			},
			{
				"title" : "Action Castle <br/><span class='span_subtitle'>Fall 2018</span>",
				"action" : "gothere('views/games/action_castle.html')"
			},
			{
				"title" : "The Spinward Marches <br/><span class='span_subtitle'>Fall 2018</span>",
				"action" : "gothere('views/games/diaspora.html')"
			},
			{
				"title" : "Earlier Work <br/><span class='span_subtitle'>Pre 2018</span>",
				"action" : "gothere('views/games/history.html')"
			}
		]
	},
	{
		"name" : "projects",
		"content" : [
			{
				"title" : "&lt==",
				"action" : "changemenu('home')"
			},
			{
				"title" : "<span>projects</span>",
				"action" : "NODE"
			},
			{
				"title" : "Fate & Fantasy <br/><span class='span_subtitle'>Summer 2019</span>",
				"action" : "gothere('views/games/fate_n_fantasy.html')"
			},
			{
				"title" : "Pathfinder Character Builder <br/><span class='span_subtitle'>Spring 2019</span>",
				"action" : "gothere('views/school/gui_ii.html')"
			},
			{
				"title" : "x86 Compiler<br/><span class='span_subtitle'>Spring 2019</span>",
				"action" : "gothere('views/school/compilers.html')"
			},
			{
				"title" : "Action Castle <br/><span class='span_subtitle'>Winter 2018</span>",
				"action" : "gothere('views/games/action_castle.html')"
			},
			{
				"title" : "The Spinward Marches <br/><span class='span_subtitle'>Fall 2018</span>",
				"action" : "gothere('views/games/diaspora.html')"
			},
			{
				"title" : "GUI I <br/><span class='span_subtitle'>Fall 2018</span>",
				"action" : "gothere('views/school/gui_i.html')"
			},
			{
				"title" : "Earlier Work <br/><span class='span_subtitle'>Pre 2018</span>",
				"action" : "gothere('views/school/history.html')"
			}
		]
	}
];

var music_content = [
	'<iframe style="border: 0; width: 170px; height: 170px;" src="https://bandcamp.com/EmbeddedPlayer/album=1251308296/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/" seamless><a href="http://mortgarson.bandcamp.com/album/mother-earths-plantasia">Mother Earth&#39;s Plantasia by Mort Garson</a></iframe>',
	'<iframe style="border: 0; width: 170px; height: 170px;" src="https://bandcamp.com/EmbeddedPlayer/album=517238578/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/" seamless><a href="http://chillhop.bandcamp.com/album/chillhop-essentials-summer-2019" >Chillhop Essentials Summer 2019 by Chillhop Music</a></iframe>',
	'<iframe style="border: 0; width: 170px; height: 170px;" src="https://bandcamp.com/EmbeddedPlayer/album=2322633469/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/" seamless><a href="http://maxoisnuts.bandcamp.com/album/fakebit-2010">FAKEBIT 2010 by Maxo</a></iframe>',
	'<iframe style="border: 0; width: 170px; height: 170px;" src="https://bandcamp.com/EmbeddedPlayer/album=3261100776/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/" seamless><a href="http://viennateng.bandcamp.com/album/aims">Aims by Vienna Teng</a></iframe>'
];
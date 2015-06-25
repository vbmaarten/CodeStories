Storage structuur:

* Alles in de map .CodeStories
* .CodeStories/narratives.json bevat narratives

narratives.json:
{
	<cast path>: [
		{
			name:<narrative title>,
			type:'FS|Code',
			items:[
				{type:<item type>,content:<content>}, 
				{type:<item type>,content:<content>}, 
				...
			]
		},
		...	
	]
}

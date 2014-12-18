$(document).ready(function () {
        var key = 'dde9adc3-4873-4b47-bf2a-49bbcb7de999'
	var summonerName = 'harley'
	var id

	//call to get summoner ID
	$.ajax({
	  url: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + summonerName + '?api_key=' + key,
	  success: function(data, status) {
	  id = data[summonerName].id
	  
	  	//call to get match history
	  	 $.ajax({
			  url: 'https://na.api.pvp.net/api/lol/na/v2.2/matchhistory/' + id + '?api_key=' + key,
			  success: function(data, status) {
				test = data.matches[0].queueType
				$( "span" ).text(id).show();
			  }
			});
	  }
	});
	
	
	$( "form" ).submit(function( event ) {

	  if ( $( "input:first" ).val() != null ) {
		//
		
			var num = $( "input:first" ).val()
			var myChart=
				{
				"graphset":[
					{
						"type":"bar",
						"title":{
							"text":"Bar"
						},
						"series":[
							{
								"values":[11,26,7,44,11,28,42,26,13,10]
							},
						]
					}
				]
				}
				zingchart.render({
			id:"myChartDiv",
			data:myChart,
			height:400,
			width:"100%"
		});
		return;
	  }
	 
	  $( "span" ).text( "Not valid!" ).show().fadeOut( 1000 );
	  event.preventDefault();
	});
  });

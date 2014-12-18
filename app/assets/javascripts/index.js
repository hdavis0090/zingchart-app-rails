$(document).ready(function () {
  var key = 'dde9adc3-4873-4b47-bf2a-49bbcb7de999'
	//id 25028183
	var summonerName = null
	var id = null

	$( "#buttony" ).click(function( event ) {
		summonerName = $( "input:first" ).val().toLowerCase();
	  if ( summonerName != null ) {

			
			//call to get summoner ID
			$.ajax({
				url: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + summonerName + '?api_key=' + key,
				success: function(data, status) {
					id = data[summonerName].id
			
					//call to get match history
					 $.ajax({
						url: 'https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/' + id + '/recent?api_key=' + key,
						success: function(data, status) {
							damage0 = data.games[0].stats.totalDamageDealt
							damage1 = data.games[1].stats.totalDamageDealt
							damage2 = data.games[2].stats.totalDamageDealt
							damage3 = data.games[3].stats.totalDamageDealt
							damage4 = data.games[4].stats.totalDamageDealt
							$( "span" ).text(damage0).show();
	
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
													"values":[damage0, damage1, damage2, damage3, damage4]
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
					});
				}
			});
    }
	});
});

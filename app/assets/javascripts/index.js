

$(document).ready(function() {
  //hide error
  $(".alert").css("opacity", "0");
  var $btn = $("#buttony")
  //challenger dropbox logic
  $("#challengerDropdown li a").click(function(event) {
	rawSummonerName = this.text;
	renderChart(rawSummonerName);
  })

  //submit name logic
  $("#buttony").click(function(event) {
    //format name
    $btn.button('loading');
    rawSummonerName = document.getElementById("summonerIn").value;
    renderChart(rawSummonerName);
  });
  
  $( document ).ajaxStop(function() {
  	  $btn.button('reset')
  });
});


//renders the chart with the given summoner name
function renderChart(rawSummonerName)
{
  summonerName = decodeURIComponent(rawSummonerName.replace(/\s+/g, '')).toLowerCase();
  //call to get summoner ID
  $.ajax({ 
	url: '/apiCalls/id?summonerName=' + summonerName,
	success: function(data, status) {
	  summonerId = data[summonerName].id
	  var summonerLevel = data[summonerName].summonerLevel
	  
	  //call to get match history
	  $.ajax({
		url: '/apiCalls/matches?summonerId=' + summonerId,
		success: function(data, status) {
		  damage0 = data.games[0].stats.totalDamageDealt
		  damage1 = data.games[1].stats.totalDamageDealt
		  damage2 = data.games[2].stats.totalDamageDealt
		  damage3 = data.games[3].stats.totalDamageDealt
		  damage4 = data.games[4].stats.totalDamageDealt
		  
		  //fill info
		  $('.infoContainer span').html("Summoner Name: " + rawSummonerName + "<br>Summoner Level: " + summonerLevel);
			//empty chart div
		  $('.chartContainer span').text('');
		  //populate damage chart data
		  var damageChart = {
			  "graphset": [{
				"type": "bar",
				"background-color": "#fff",
				"title": {
				  "text": "Total Damage Dealt",
				  "background-color": "#33446A"
				},
				"scale-x": {
				  "labels": ["Game 1", "Game 2", "Game 3", "Game 4", "Game 5"]
				},
				"scale-y": {
				  "label": {
					"text": "Damage Dealt"
				  }
				},
				"plotarea": {
				  "background-color": "#fff"
				},
				"series": [{
				  "values": [damage0, damage1,
					damage2, damage3, damage4
				  ],
				  "background-color": "#33446A"
				}, ]
			  }]
			}
			//show chart
		  zingchart.render({
			id: "damageChartDiv",
			data: damageChart,
			height: 400,
			width: "100%"
		  });
		}
	  });

	},
	//display error message for invalid summoner names
	error: function(data) {
	  //alert('error');
	  $("#alert").css('opacity', '1').fadeTo(5000, 0);
	},
  });
  
 }
 

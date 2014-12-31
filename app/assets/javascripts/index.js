

$(document).ready(function() {
  //hide error
  $(".alert").css("opacity", "0");
  $('#homeTab a[href="#home"]').tab('show');
  $('#game1 a[href="#game1"]').tab('show');
  
  var rawSummonerName = '';
  
 /** $.ajax({
	url: '/apiCalls/challengers',
	success: function(data, status) {
	  //fill dropdown
	  $("#challengerDropdown li a").each(function(index,value) {
		  $(this).text(data.entries[index].playerOrTeamName);
	  });
    }
  });**/
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
	  var profileIconId = data[summonerName].profileIconId
	  
	  //call to get match history
	  $.ajax({
		url: '/apiCalls/matches?summonerId=' + summonerId,
		success: function(data, status) {
		  
		  var damage = [];
		  var magicDamage = [];
		  for(i=0; i<10; i++) {
			  damage.push(data.games[i].stats.totalDamageDealtToChampions);
		  }
		  var detailChart1 = createDetailChart([1,2,3]);
		  //fill info
		  $('.infoContainer span').html("Summoner Name: " + rawSummonerName + 
		  "<br>Summoner Level: " + summonerLevel + 
		  "<br>" + "<img src=\"http://ddragon.leagueoflegends.com/cdn/4.21.5/img/profileicon/" + 
		  profileIconId +".png\">" );
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
					"values":"1:10:1"
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
				  "values": damage,
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
		  zingchart.render({
			id: "detailsChart1",
			data: detailChart1,
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
 
 function createDetailChart(data)
 {
	  var chart = {
	  "graphset": [{
		"type": "bar",
		"background-color": "#fff",
		"title": {
		  "text": "Total Damage Dealt",
		  "background-color": "#33446A"
		},
		"scale-x": {
			"values":"1:10:1"
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
		  "values": data,
		  "background-color": "#33446A"
		}, ]
	  }]
	}
	return chart;
}
	
 

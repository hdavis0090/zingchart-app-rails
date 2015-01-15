
var champNames = [];
$(document).ready(function() {
  //hide error
  $(".alert").css("opacity", "0");
  $('#homeTab a[href="#home"]').tab('show');
  $('#game1 a[href="#game1"]').tab('show');
  
  var rawSummonerName = '';
  
  
  var $btn = $("#buttony")
  //challenger dropbox logic
  $("#challengerDropdown li a").click(function(event) {
	rawSummonerName = this.text;
	renderChart(rawSummonerName);
  });

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
  
  $("#navTabs").children().click(function(event) {
	  index = $(this).index();
	  if(index == 0) {
		$(".matchDetails").text('');
	  } else {
	    $(".matchDetails").text("Champion: " + champNames[index - 1]);
	  }
  });
	  
});


//renders the chart with the given summoner name
function renderChart(rawSummonerName)
{
  //format name
  summonerName = decodeURIComponent(rawSummonerName.replace(/\s+/g, '')).toLowerCase();
  //call to get summoner ID
  $.ajax({ 
	url: '/apiCalls/id?summonerName=' + summonerName,
	success: function(data, status) {
	  summonerId = data[summonerName].id
	  var summonerLevel = data[summonerName].summonerLevel
	  var profileIconId = data[summonerName].profileIconId
	  getMatchHistory(summonerId, summonerLevel, profileIconId, rawSummonerName)
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
		"scale-x":{
		"labels":["Total Damage","Physical Damage", "Magic Damage", "True Damage"]
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
	
function getChampion(championId, index) {
  var name;
  $.ajax({
	url: '/apiCalls/champions?championId=' + championId,
	success: function(data, status) {
		champNames[index] = data.name;
	}
  });
}

function getMatchHistory(summonerId, summonerLevel, profileIconId, rawSummonerName) {
	  //call to get match history 
	  $.ajax({
		url: '/apiCalls/matches?summonerId=' + summonerId,
		success: function(data, status) {
		  //on success, fill in charts
		  var damage = [];
		  var chartData = [];
		  var championNames = [];
		  var detailCharts = [];
		  var chartParent = $('.chartContainer');
		  var chartHeight = chartParent.height();
		  var chartWidth = chartParent.width();
		  
		  //total damage, physical damage, magic damage, true damage, champion ID
		  for(i=0; i<10; i++) {
			  chartData[i] = [];
			  damage.push(data.games[i].stats.totalDamageDealtToChampions);
			  chartData[i][0] = data.games[i].stats.totalDamageDealtToChampions;
			  chartData[i][1] = data.games[i].stats.physicalDamageDealtToChampions;
			  chartData[i][2] = data.games[i].stats.magicDamageDealtToChampions;
			  chartData[i][3] = data.games[i].stats.trueDamageDealtToChampions;
              getChampion(data.games[i].championId, i);
			  detailCharts[i] = createDetailChart(chartData[i]);
		  }	  
		  
		  //show detailed charts
		  $("#matchTabs").children(".tab-pane").each(function(index,value) {
			var currentDiv = this.firstElementChild.id
			if(index != 0) {
				zingchart.render({
					id: currentDiv,
					data: detailCharts[index-1],
					height: chartHeight,
					width: chartWidth
				  });
				 }
	      });

		  //fill info
		  $('.infoContainer span').html("Summoner Name: " + rawSummonerName + 
		  "<br>Summoner Level: " + summonerLevel + 
		  "<br>" + "<img src=\"https://ddragon.leagueoflegends.com/cdn/4.21.5/img/profileicon/" + 
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
			height: chartHeight,
			width: chartWidth
		  });
		}
	  });
}

 /** $.ajax({
	url: '/apiCalls/challengers',
	success: function(data, status) {
	  //fill dropdown
	  $("#challengerDropdown li a").each(function(index,value) {
		  $(this).text(data.entries[index].playerOrTeamName);
	  });
    }
  });**/

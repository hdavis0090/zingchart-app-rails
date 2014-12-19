$(document).ready(function() {
  var key = 'dde9adc3-4873-4b47-bf2a-49bbcb7de999'
    //id 25028183
  var summonerName = null
  var id = null
  $("#buttony").click(function(event) {
    //format name
    input = document.getElementById("summonerIn").value.toLowerCase();
    summonerName = decodeURIComponent(input.replace(/\s+/g, ''));
    if (summonerName != null) {
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
                //empty chart div
              $('.chartContainer span').text('');
              //populate damage chart datat
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
          $(".textbox span").text("Invalid summoner name").show().fadeOut(5000);
        },
      });
    }
  });
});

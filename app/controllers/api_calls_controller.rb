class ApiCallsController < ApplicationController
    include HTTParty
	def getSummonerId
		summonerName = params['summonerName']
		url = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/#{summonerName}?api_key=#{ENV['KEY']}"
		apiCall(url)
	end
	
	def getMatchHistory
		summonerId = params['summonerId']
		url = "https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/#{summonerId}/recent?api_key=#{ENV['KEY']}"
		apiCall(url)
	end
	
	def getChallengers
		url = "https://na.api.pvp.net/api/lol/na/v2.5/league/challenger?type=RANKED_SOLO_5x5&api_key=#{ENV['KEY']}"
		apiCall(url)
	end
	
	private
	
	def apiCall(url)
		begin
		  response = HTTParty.get(url)
		  render json: response.body, status: response.code
		rescue Exception
		  render json: "Internal server error", status: 500
		end	
	end
end

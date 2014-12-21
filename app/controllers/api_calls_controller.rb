class ApiCallsController < ApplicationController
    include HTTParty
	def getSummonerId
		summonerName = params['summonerName']
		url = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/#{summonerName}?api_key=#{ENV['KEY']}"


        begin
			response = HTTParty.get(url)
			render :json => response.body
        rescue Exception => e
          render :json => { :rawr => e.message }
        end

		#render :json => { :message => 123 }
	end
end

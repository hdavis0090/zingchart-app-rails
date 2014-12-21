require 'net/http'

class ApiCallsController < ApplicationController
	def getSummonerId
		key = 'dde9adc3-4873-4b47-bf2a-49bbcb7de999'
		summonerName = params['summonerName']
		url = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/#{summonerName}?api_key=#{key}"
 #url: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + summonerName + '?api_key=' + key,

		
        #resp = Net::HTTP.get_response(URI.parse(url)) 
        begin
          #data = Net::HTTP.get_response(URI.parse(url))
          render :json => { :message => URI.parse(url) } 
        rescue Exception => e
          render :json => { :rawr => url }
        end

		#render :json => { :message => 123 }
	end
end

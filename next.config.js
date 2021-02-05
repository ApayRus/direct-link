module.exports = {
	async headers() {
		return [
			{
				source: '/api/video/:videoId',
				headers: [
					{
						key: 'Access-Control-Allow-Origin',
						value: '*'
					},
					{
						key: 'Access-Control-Allow-Methods',
						value: 'GET'
					},
					{
						key: 'Access-Control-Allow-Headers',
						value: 'Origin, X-Requested-With, Content-Type, Accept'
					}
				]
			}
		]
	}
}

// Alt-Svc: http/1.1= "http2.example.com:8001"; ma=7200

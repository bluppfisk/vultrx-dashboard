<?php

class Downloader
{
	static function download($uri, $headers = []): string
	{
		$curl = curl_init($uri);
		curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		$exec = curl_exec($curl);
		curl_close($curl);

		return $exec;
	}
}

class LambdaAPI
{
	private $locations = [
		'Tokyo' => 'https://39jlxwfigh.execute-api.ap-northeast-1.amazonaws.com/prod/checkVPN',
		'Frankfurt' => 'https://ws6rqmchk0.execute-api.eu-central-1.amazonaws.com/prod/checkVPN'
	];

	public function __construct($apiKeys)
	{
		$this->apiKeys = $apiKeys;
	}

	public function getLocations(): array
	{
		return array_keys($this->locations);
	}

	public function execute(): stdClass
	{
		$headers = array("X-Api-Key: ".$this->apiKey);
		$result = Downloader::download($this->url, $headers);
		return json_decode($result);
	}

	public function testVPNFrom($location, $ip): stdClass
	{
		if (array_key_exists($location, $this->locations)) {
			$this->url = $this->locations[$location] . "?ip=".$ip;
			$this->apiKey = $this->apiKeys[$location];
			return $this->execute();
		}
		return new stdClass();
	}
}

class VultrAPI
{
	public function __construct($apiKey, $serverId, $url = null)
	{
		$this->apiKey = $apiKey;
		$this->serverId = $serverId;
		$this->url = $url ?: "https://api.vultr.com/v1/server/";
	}

	private function execute($endpoint): stdClass
	{
		$headers = array("API-Key: ".$this->apiKey);
		$uri = $this->url.$endpoint.'?SUBID='.$this->serverId;
		
		$result = Downloader::download($uri, $headers);
		return json_decode($result);
	}

	public function getIPs(): array
	{
		$result = $this->execute('list_ipv4');
		$ips = [];
		$ipInfo = $result->{$this->serverId};
		foreach ($ipInfo as $ipItem) {
			array_push($ips, $ipItem->ip);
		}

		return $ips;
	}

	public function getBasicInfo(): stdClass
	{
		$result = $this->execute('list');

		$basicInfo = new stdClass();
		$basicInfo->main_ip = $result->main_ip;
		$basicInfo->location = $result->location;
		$basicInfo->usage_current = $result->current_bandwidth_gb;
		$basicInfo->usage_allowed = $result->allowed_bandwidth_gb;
		$basicInfo->usage_percentage = round(($basicInfo->usage_current/$basicInfo->usage_allowed)*100,2);
		$basicInfo->usage_percentage_left = round((100-$basicInfo->usage_percentage),2);

		if ($result->power_status == "running" && $result->server_state == "ok") {
			$basicInfo->online = true;
		}

		$basicInfo->ips = $this->getIPs();


		return $basicInfo;
	}

	public function getUsage($numberOfDays = 7): stdClass
	{
		$result = $this->execute('bandwidth');

		$down = array_slice($result->incoming_bytes, -$numberOfDays);
		$up = array_slice($result->outgoing_bytes, -$numberOfDays);

		$days = [];
		$max = 0;

		for ($i=0;$i<$numberOfDays;$i++) {
			$days[$i][0] = $down[$i][0];
			$days[$i][1] = $down[$i][1];
			$days[$i][2] = $up[$i][1];
			$max = max($days[$i][1], $days[$i][2], $max);
		}

		$usageInfo = new stdClass();
		$usageInfo->days = $days;
		$usageInfo->max = $max;

		return $usageInfo;
	}
}

?>
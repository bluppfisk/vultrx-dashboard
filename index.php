<?php

include ('apis.php');  # API classes
include ('secrets.php');  # API Keys etc

$vultrApi = new VultrAPI(VULTR_API_KEY, VULTR_SERVER_ID);
$lambdaApi = new LambdaAPI(LAMBDA_API_KEYS);

# Send CORS headers
header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: X-Requested-With");


# Routing
switch ($_GET['action']) {
	case "bandwidth":
		echo(json_encode($vultrApi->getUsage()));
		break;

	case "basic":
		echo(json_encode($vultrApi->getBasicInfo()));
		break;

	case "check":
		$location = $_GET['location'];
		$ip = $_GET['ip'];
		$allowedIPs = $vultrApi->getIPs();
		if (in_array($ip, $allowedIPs)) {
			echo(json_encode($lambdaApi->testVPNFrom($location, $ip)));
		} else {
			echo(json_encode(["message" => "IP not allowed"]));
		}
		break;

	case "getLocations":
		echo(json_encode($lambdaApi->getLocations()));
		break;

	default:
		echo(json_encode(['message' => 'unknown operation']));
		break;
}
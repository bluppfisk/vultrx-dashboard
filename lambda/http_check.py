import http.client, json, os
from time import perf_counter as pc
from urllib.parse import urlparse
import ssl


def http_check(event, context):
    endpoint = event["queryStringParameters"]["ip"]
    timeout = 120
    method = "GET"
    path = "/"

    url = urlparse("https://" + endpoint)
    location = url.netloc
    request = http.client.HTTPSConnection(
        location, timeout=int(timeout), context=ssl._create_unverified_context()
    )

    try:
        t0 = pc()

        request.request(method, path, None, {})
        response_data = request.getresponse()

        t1 = pc()

        result = {
            "Reason": response_data.reason,
            "TimeTaken": int((t1 - t0) * 1000),
            "Available": 1,
            "ip": endpoint,
        }
    except Exception as e:
        result = {"Available": 0, "Reason": str(e)}

    return {
        "body": json.dumps(result),
        "headers": {"Content-Type": "application/json"},
        "statusCode": 200,
    }


from config import API_KEY, BASE_URL, FORECAST_URL

## Get the weather by latitude `lat` and longitude `lon`
def weather_lat_lon_url(lat, lon, apiKey=API_KEY, units=''):
    if units:
        units = f'&units={units}'
    return BASE_URL + f"lat={lat}&lon={lon}&appid={apiKey}{units}"



## Get the weather by City Name `city` with optional parameters State Code `state` and 
##      Country Code `country`
def weather_city_url(city, state=None, country=None, apiKey=API_KEY, units=''):
    query = city
    if state:
        query += f',{state}'
    if country:
        query += f',{country}'
    if units:
        units = f'&units={units}'
    return BASE_URL + f"q={query}&appid={apiKey}{units}"

## Get the weather by cityId as defined in `http://bulk.openweathermap.org/sample/`
def weather_city_id_url(cityId, apiKey=API_KEY, units=''):
    if units:
        units = f'&units={units}'
    return BASE_URL + f"id={cityId}&appid={API_KEY}{units}"


## Get the weather by `zipCode` and optionally `countryCode`. 
## If there is no countryCode, "USA" is used by default
def weather_zip_code_url(zipCode, countryCode='', apiKey=API_KEY,units=""):
    q = zipCode
    if units:
        units = f'&units={units}'
    if countryCode:
        q += f",{countryCode}"
    return BASE_URL + f'zip={q}&appid={API_KEY}{units}'

## Geting the forecast based zipCode and countryCode
def forecast_zip_code_url(zipCode, countryCode='', apiKey=API_KEY, units=""):
    q = zipCode
    if units:
        units = f'&units={units}'
    if countryCode:
        q += f",{countryCode}"
    return FORECAST_URL + f'zip={q}&appid={API_KEY}{units}'
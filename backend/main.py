from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from api_url import *
import requests

## Open in console with:
##     uvicorn main:app --reload
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/status")
def status() -> dict:
    return {"status": "ok"}

@app.get("/weather")
def get_weather(zipcode=None, country=None) ->dict:
    if not zipcode:
        return JSONResponse(status_code=404, content="Enter a ZipCode: /weather/?zipcode={zip}")
    res = requests.get(weather_zip_code_url(zipcode, country, units="metric"))
    return res.json()

@app.get('/forecast')
def get_forecast(zipcode=None, country=None) -> dict:
    if not zipcode:
        return JSONResponse(status_code=404, content="Enter a ZipCode: /weather/?zipcode={zip}")
    res = requests.get(forecast_zip_code_url(zipcode, country, units="metric"))
    return res.json()
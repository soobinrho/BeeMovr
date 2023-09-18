<br>
<br>

<p align="center">
  <b>
    Source code for
    <a href="https://beemovr.com">Beemovr.com</a>
  </b>
</p>

Google Maps, but for beekeepers.
We called around 50 beekeepers all over the country and asked them, "We care about bees, and we want to help you save bees. Is there anything techy we can help you guys with? We can program."

One major problem, Keith Robert from The Valley Hive in California explained, was that beekeepers are sometimes forced to move out and relocate their bee hives due to a variety of reasons - e.g. California drought - but they can't just move into any area. Rather, they need to find an area where the survival rate and honey yield is the highest.

What's more -- what this means is that they have to manually go through Google Maps with precipitation data and do the math for each area to find a candidate to move into.
BeeMovr was therefore created to address this problem by automating the process and thereby making it more efficient and more accurate.
BeeMovr allows the user to click any point on the map.
It then pulls real-time weather data and calculates the maximum potential honey yield of the given point.

<br>

## Getting Started
[1.](#1-how-to-spin-up-a-development-server) How to spin up a development server<br>
[2.](#2-how-does-this-work) How does this work?<br>
[3.](#3-future-roadmap) Future Roadmap

<br>

## Acknowledgement

Special thanks to Keith Robert from [The Valley Hive](https://www.thevalleyhive.com/), our favorite beekeeper. We promised Keith that we'll open-source BeeMovr and make available for all beekeepers.

Also, our work would not have been possible without the paper "[The Impact of Precipitation and Temperature on Honey Yield in the United States](https://etd.auburn.edu/bitstream/handle/10415/7108/Hayes%20Grogan.pdf?sequence=2)" (Hayes Kent Grogan, 2020, Auburn University). The paper provided the BeeMovr team with the prediction formula for the relationship between monthly precipitation / maximum temperature / minimum temperature and honey yield, and this is exactly what made our core functionality possible.

<br>

## 1. How to spin up a development server

***How to run***<br>
```bash
git clone https://github.com/ericfly02/BeeMovr.git
cd BeeMovr
docker compose up
```

***How to stop running and clean up***<br>
```bash
docker compose down
```

<br>

## 2. How does this work?

The UI was largely built with Mapbox.
All of the internal API's were built with Flask.
Whenever the user clicks a point in the map, it calls for a function that calculates the honey production prediction value based on the formula given by Hayes Kent Grogan's paper.

<br>

| Stack | Name |
| ------- | ---- |
| **Front-end** | [React](https://react.dev/) + [Mapbox](https://www.mapbox.com/) |
| **Back-end** | [Flask](https://flask.palletsprojects.com/) |
| **Server** | [DigitalOcean](https://cloud.digitalocean.com/) with 1vCPU, 1GB RAM, 25GB SSD  |
| **Containerization** | [Docker](https://www.docker.com/) + [Docker Compose](https://docs.docker.com/compose/) |

<br>

## 3. Future Roadmap

- `Short Term Goal`: Add a drag functionality, where the user can get the honey production prediction value of a rectangle instead of just a single point.
- `Long Term Goal`: Now, we call the Open Meteo API's everytime the user clicks on a something to get the environmental values (precipitation and max/min temps). This will be replaced by a data storage / caching system. Whenever an API is called, the precipitation and max/min temp values will be stored into either Elastic Stack or PostGIS. Flask caching will also prevent duplicate API calls.
- `Long Term Goal`: Create a heatmap of the honey production potential of all areas based on the data stored on the database.

<br>
<br>
<br>

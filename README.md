<br>
<br>

<p align="center">
  <img alt="Logo" src="https://github.com/ericfly02/BeeMovr/assets/19341857/d5d670f3-1dd9-4ab2-bd86-db38221804a1" width="500">
</p>

<br>

<p align="center">
  <b>
    Who are we?
  </b>
</p>

<br>

Maps for beekeepers.
We called beekeepers all over the country and asked them, "We want to help you save bees.
What can we do for you?
We can program."

Keith Robert from the Valley Hive in California explained that beekeepers are sometimes forced to relocate their beehives - e.g. California drought - and they can't just move into any location.
They need to find an area that has the highest survival rate and the best nectar availability for their colonies.
That's how BeeMovr started.

<br>

## Getting Started

[1.](#1-how-to-spin-up-a-development-server) How to spin up a development server<br>
[2.](#2-how-we-deploy-to-beemovrcom) How we deploy to [beemovr.com](https://beemovr.com)<br>
[3.](#3-how-does-this-work) How does this work?<br>

<br>

## Acknowledgement

Special thanks to Keith Robert from [The Valley Hive](https://www.thevalleyhive.com/), our favorite beekeeper.

Also, our work would not have been possible without the paper "[The Impact of Precipitation and Temperature on Honey Yield in the United States](https://etd.auburn.edu/bitstream/handle/10415/7108/Hayes%20Grogan.pdf)" (Hayes Kent Grogan, 2020, Auburn University).
This paper is what made our core prediction model possible.

> BeeMovr is a [HackMIT](https://github.com/soobinrho/BeeMovr/blob/main/DEVLOG.md#2023-09-17) and [Call for Code](https://developer.ibm.com/callforcode/) project.

<br>

## Call for Code

![Architecture diagram of BeeMovr](https://github.com/soobinrho/BeeMovr/assets/19341857/7bba3368-acb9-4ce4-90c5-167f158d5edf)

| Stack             | Name                                                                                                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **CDN**           | [Cloudflare](https://www.cloudflare.com/)                                                                                                                                                   |
| **Reverse Proxy** | [Nginx](https://www.nginx.com/)                                                                                                                                                             |
| **Deployment**    | Containerized with [Docker](https://www.docker.com/) + server runtime with [Node.js](https://nodejs.org/)                                                                                   |
| **Front-end**     | [Next.js client-side components](https://nextjs.org/docs/app/building-your-application/rendering/client-components) + OpenStreetMap interactivity from [Mapbox](https://www.mapbox.com/)    |
| **Back-end**      | [Next.js server-side components](https://nextjs.org/docs/app/building-your-application/rendering/server-components) + real-time weather data from [Open Meteo API](https://open-meteo.com/) |
| **Experimental**  | [IBM Cloud PostgresSQL](https://www.ibm.com/cloud/databases-for-postgresql) + [watsonx.ai](https://www.ibm.com/products/watsonx-ai)                                                         |

<br>

**_The issue we are addressing_**<br>

```
☐ Brief description of "The issue we are hoping to solve" (2-3 sentences)
This should be a short description, 2-3 sentences in length, of the specific sustainability problem your solution is meant to address.
```

Whenever beekeepers need to relocate their colonies, they need to find an area that has the higest survival rate and the maximum potential for honey yield.
BeeMovr allows our users (beekeepers ♥) to do exactly that.

<br>

**_What BeeMovr does_**<br>

```
☐ Description of "How our technology solution can help" (approximately 10 words)
This is where you will give a short description of your team's technology solution, in about 10 words.
```

We can calculate honey-yield prediction value of any given coordinates.

<br>

**_The idea behind BeeMovr_**<br>

```
☐ Long description of your team’s solution (approximately 500 words)
This is a longer description of your solution.
In about 500 words, describe your solution in more detail.
Include the real-world problem you identified, describe the technological solution you have created, and explain how it's an improvement over existing solutions.
You can supply additional documentation in this source code repository that you link to as well.
```

BeeMovr utilizes real-time precipitation, maximum temperature, and minimum temperature data from Open Meteo API to calculate prediction of the maximum possible honey yield value of any given coordinates on a map based on [Hayes Kent Grogan's paper](https://etd.auburn.edu/bitstream/handle/10415/7108/Hayes%20Grogan.pdf).
Our project seeks to provide beekeepers with better information about ideal pollinator conditions near them in order to increase colony survival rates and reduce uncertainty.
We focused on researching the most accurate model possible and we now use a linear regression model with the factors of precipitation, maximum temperature, and minimum temperature.
Further, we plan to use watsonx.data to pull combined data from USDA (U.S. Department of Agriculture) and NASS (National Agricultural Statistics Service) for improved prediction models.

We're also trying to increase prediction accuracy by utilizing colony-specific demographic data in our prediction model, as colony demographic data such as the age of the queen were found to be statistically significant, as reported in Grogan's 2020 paper.
In our predictive model API endpoints, we currently rely on Next.js built-in request memorization caching to avoid duplicate API calls.
This process is fairly efficient.
However, we believe the data fetching process can be improved by implementing IBM Cloud PostgresSQL to cache and store all precipitation & temperature requests `{ key: latLng, values: [precipitation, maxTemp, minTemp] }`.
These data, in turn, will be used in conjunction with watsonx.ai to improve our prediction models, which we will host at [beemovr.com/watsonx](https://beemovr.com/watsonx)

We envision BeeMovr to become the de-facto map for helping beekeepers make an informed decision about what's best for their bees.
We aim to create _the_ beekeeper's map, the first feature of which is maximum potential honey yield prediction, but as we iterate with our beekeepers, we'll listen to what their (and their bees') needs are, and we'll incrementally add those features.
We therefore believe that the most important part of BeeMovr is to listen, understand, and deliver what the beekeepers want and need to serve their bees.

BeeMovr has been and will always be open-sourced and open to all beekeepers.
If you're a beekeeper and have any suggestions or feature requests, please feel free to email us at &lt;workerbees@beemovr.com&gt;.
Our program is up and online at [beemovr.com](https://beemovr.com) and we are Schaler Starks &lt;schaler@beemovr.com&gt;, Eric Gonzalez Duro &lt;eric@beemovr.com&gt;, Jasper Ha &lt;jasper@beemovr.com&gt;, and Soobin Rho &lt;soobin@beemovr.com&gt;.
If you share our goal to make a positive impact on environmental sustainability by helping beekeepers and their bees, you're welcome to join us.
Feel free to make pull requests and contribute in any way you think is the best for helping beekeepers save their bees.

![Timeline of BeeMovr development](https://github.com/soobinrho/BeeMovr/assets/19341857/72474594-7a01-4da1-bcfc-7c45bed963f7)

**_IBM AI Services_**<br>

We are trying to improve our core prediction models by integrating `watsonx.ai`, `watsonx.data`, `IBM Cloud PostgresSQL`, and `Watson Studio` at [beemovr.com/watsonx](https://beemovr.com/watsonx)

<br>

**_How will you support this project going forward?_**<br>

We designed BeeMovr to be as self-sustainable as possible by minimizing the operational costs.
We'll maintain it as a free software - hosted at [beemovr.com](https://beemovr.com) - with open-source community.
The historical weather data API from Open Meteo we use for honey-yield prediction is free thanks to Open Meteo's generosity, as well as OpenStreetMap's support for open-source community and Mapbox providing 50,000 map loads per month for free.

Yes, we'll have to temporarily stop our website if the map loads go over 50,000 and wait until the quota resets the next month, but we anticipate this will be fine with the use cases of our users, since doing this allows our program to be completely free for everyone.

<br>

## 1. How to spin up a development server

```bash
# ---------------------------------------------------------------------
# Development workflow.
# ---------------------------------------------------------------------
cd BeeMovr

# Install pnpm: package manager that is faster and more disk efficient
npm install -g pnpm
pnpm setup

# If you're using zsh:
source ~/.zshrc

# If you're using bash:
source ~/.bashrc

# Install dependencies.
pnpm install

# Go to https://mapbox.com and get an API token.
# Then, copy and paste the token to `.env.local` file.
# Mapbox has a free tier of 50,000 map loads per month.
cp ./.env.development ./.env.local

# Run a development server.
pnpm dev
```

<br>

## 2. How we deploy to [beemovr.com](https://beemovr.com)

```bash
# ---------------------------------------------------------------------
# Deployment workflow.
# ---------------------------------------------------------------------
# Our server is an Ubuntu box on Hetzner with 3 vCPU, 4GB RAM, and
# 80GB SSD, which amounts to only $8 per month. We wanted to make our
# program as sustainable as possible, so we tried to use the most
# reliable, yet the most inexpensive server available.
ssh <username>@<ip address>
cd ~
git clone https://github.com/soobinrho/BeeMovr
cd BeeMovr/docker

# For development purposes, just running `cd ./BeeMovr && pnpm dev` is
# perfect, and in fact that is how we run a development server all the
# time for testing purposes. However, if you want to run a production
# server, by which we mean deployment to a server so that it becomes
# available to everyone on the internet, we use Docker Compose to
# deploy Next.js through Node.js and reverse proxy that through Nginx.
docker compose up -d

# ---------------------------------------------------------------------
# How we re-deploy whenever we make changes to our code.
# ---------------------------------------------------------------------
cd BeeMovr/docker
git pull
docker compose build --no-cache && docker compose up --force-recreate -d
```

<br>

## 3. How does this work?

We created a separate section for all of our [development logs](DEVLOG.md).

<br>
<br>
<br>

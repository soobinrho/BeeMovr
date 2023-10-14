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

Google Maps, but for beekeepers.
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

| Stack             | Name                                                                                                                                                                                                  |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **CDN**           | [Cloudflare](https://www.cloudflare.com/)                                                                                                                                                             |
| **Reverse Proxy** | [Nginx](https://www.nginx.com/)                                                                                                                                                                       |
| **Deployment**    | Containerized with [Docker](https://www.docker.com/) + server runtime with [Node.js](https://nodejs.org/)                                                                                             |
| **Front-end**     | [Next.js client-side components](https://nextjs.org/docs/app/building-your-application/rendering/client-components) + OpenStreetMap interactivity from [Mapbox](https://www.mapbox.com/)              |
| **Back-end**      | [Next.js server-side components](https://nextjs.org/docs/app/building-your-application/rendering/server-components) + real-time weather data from [Open Meteo API](https://open-meteo.com/)           |
| **Experimental**  | Machine learning with [IBM Cloud watsonx.data](https://www.ibm.com/products/watsonx-data) + persistent data handling with [IBM Cloud PostgresSQL](https://www.ibm.com/cloud/databases-for-postgresql) |

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
Further, we plan to use [IBM watsonx.data](https://cloud.ibm.com/docs/watsonxdata?topic=watsonxdata-getting-started) to pull combined data from [USDA (U.S. Department of Agriculture)](https://www.usda.gov/) and [NASS (National Agricultural Statistics Service)](https://www.nass.usda.gov/) for improved prediction models.

We're also trying to increase prediction accuracy by utilizing colony-specific demographic data in our prediction model, as colony demographic data such as the age of the queen were found to be statistically significant, as reported in Grogan's 2020 paper.
In our predictive model API endpoints, we currently rely on [Next.js built-in request memorization caching](https://nextjs.org/docs/app/building-your-application/caching#request-memoization) to avoid duplicate API calls.
This process is fairly efficient.
However, we believe the data fetching process can be improved by implementing [IBM Cloud PostgresSQL](https://www.ibm.com/cloud/databases-for-postgresql) to cache and store all precipitation & temperature requests `{ key: latLng, values: [precipitation, maxTemp, minTemp] }`.
These data, in turn, will be used in conjunction with [IBM watsonx.data](https://cloud.ibm.com/docs/watsonxdata?topic=watsonxdata-getting-started) to improve our prediction models, which we will host at [beemovr.com/watsonx](https://beemovr.com/watsonx)

We envision BeeMovr to become the de-facto map for helping beekeepers make an informed decision about what's best for their bees.
We aim to create _the_ beekeeper's map, the first feature of which is maximum potential honey yield prediction, but as we iterate with our beekeepers, we'll listen to what their (and their bees') needs are, and we'll incrementally add those features.
We therefore believe that the most important part of BeeMovr is to listen, understand, and deliver what the beekeepers want and need to serve their bees.

BeeMovr has been and will always be open-sourced and open to all beekeepers.
If you're a beekeeper and have any suggestions or feature requests, please feel free to email us at &lt;workerbees@beemovr.com&gt;.
Our program is up and online at [beemovr.com](https://beemovr.com) and we are Schaler Starks &lt;schaler@beemovr.com&gt;, Eric Gonzalez Duro &lt;eric@beemovr.com&gt;, Jasper Ha &lt;jasper@beemovr.com&gt;, and Soobin Rho &lt;soobin@beemovr.com&gt;.
If you share our goal to make a positive impact on environmental sustainability by helping beekeepers and their bees, you're welcome to join us.
Feel free to make pull requests and contribute in any way you think is the best for helping beekeepers save their bees.

![Timeline of BeeMovr development](https://github.com/soobinrho/BeeMovr/assets/19341857/72474594-7a01-4da1-bcfc-7c45bed963f7)

<br>

<!-- TODO: Delete this after Call for Code submission
☐ Link to publicly accessible code repository that contains your working code
Link should be to a GitHub repository (or other source control system such as GitLab or Bitbucket) where the judges can examine and evaluate the source code built for your solution as well as a README containing all of the technology and solution descriptions for your project. You should use the Call for Code Project Sample template to create your team's repository. This template will help you deliver all required components of your submission. See the instructions below for "Setting up your project GitHub repository".

☐ Link to a three-minute solution demo video (Public YouTube or Vimeo link)
Record a demo of your solution, upload it to YouTube or Vimeo, and share the URL. Three minutes is the maximum length. Judges will not watch more than 3 minutes of your video. You can link to additional or longer versions from your source code repository. It is recommended that you use this video to briefly introduce the problem you are trying to solve, but also leave at least 90 seconds to demonstrate your solution’s interface, architecture, and code. Keep in mind that non-technical judges may rely on the video more than technical documentation.

☐ Listing of all IBM AI services used in your solution code and description of how they were used
List all IBM AI services used in your solution code. Provide details on where and how you used each IBM AI service to help judges review your implementation.
Note: Complete project submissions must make use of one or more IBM AI services, and will receive a "2023 Call for Code Global Challenge — IBM AI Services" digital badge for doing so, after the close of the Round.

☐ Listing of any other IBM technology used in your solution code and description of how it was used
List any other IBM technology used in your solution and describe how each component was used. If you can provide links to exactly where these were used in your code, that would help the judges review your submission.

☐ Solution architecture diagram (.pdf, .png)
Create a graphic diagram that show the user experience flow of your solution and highlights how and where technology comes into the overall solution architecture. See the example provided in the Project Sample README template. Also include numbered steps below the image to describe the flow in words.

☐ Brief description of "The issue we are hoping to solve" (2-3 sentences)
This should be a short description, 2-3 sentences in length, of the specific sustainability problem your solution is meant to address.

☐ Description of "How our technology solution can help" (approximately 10 words)
This is where you will give a short description of your team's technology solution, in about 10 words.

☐ Long description of your team’s solution (approximately 500 words)
This is a longer description of your solution. In about 500 words, describe your solution in more detail. Include the real-world problem you identified, describe the technological solution you have created, and explain how it's an improvement over existing solutions. You can supply additional documentation in this source code repository that you link to as well.

☐ Project development roadmap (.pdf, .png, .docx)
Create a document or image that shows how mature your solution is today and how you would like to improve it in the future. This can include information on the business model, funding needs, and a sustainability plan. Here's an example from the 2018 Call for Code winner Project OWL: https://github.com/Call-for-Code/Project-Sample/blob/main/images/roadmap.jpg
-->

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
docker compose build --no-cache
docker compose up --force-recreate -d
```

<br>

## 3. How does this work?

We created a separate section for all of our [development logs](DEVLOG.md).

<br>
<br>
<br>

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
That's why we created BeeMovr.

<br>

## Getting Started
[1.](#1-how-to-spin-up-a-development-server) How to spin up a development server<br>
[2.](#2-how-does-this-work) How does this work?<br>
[3.](#3-roadmap) Roadmap

<br>

## Acknowledgement

Special thanks to Keith Robert from [The Valley Hive](https://www.thevalleyhive.com/), our favorite beekeeper.

Also, our work would not have been possible without the paper "[The Impact of Precipitation and Temperature on Honey Yield in the United States](https://etd.auburn.edu/bitstream/handle/10415/7108/Hayes%20Grogan.pdf)" (Hayes Kent Grogan, 2020, Auburn University).
This paper is what made our core prediction model possible.

<br>

## BeeMovr & IBM Call for Code

***IBM AI Services We Used***<br>
Work in progres...

<br>

***IBM Cloud Services We Used***<br>
Work in progres...

<br>

![Architecture diagram of BeeMovr](https://github.com/soobinrho/BeeMovr/assets/19341857/8f477951-6a82-437c-b705-3316671bbd8d)

| Stack | Name |
| ------- | ---- |
| **CDN** | [Cloudflare](https://www.cloudflare.com/) |
| **Reverse Proxy** | [Nginx](https://www.nginx.com/) |
| **Deployment** | Containerized with [Docker](https://www.docker.com/) + server runtime with [Node.js](https://nodejs.org/) |
| **Front-end** | [Next.js client-side components](https://nextjs.org/docs/app/building-your-application/rendering/client-components) + OpenStreetMap interactivity from [Mapbox](https://www.mapbox.com/) |
| **Back-end** | [Next.js server-side components](https://nextjs.org/docs/app/building-your-application/rendering/server-components) + real-time weather data from [Open Meteo API](https://open-meteo.com/) |
| **Experimental** | Machine learning with [IBM Cloud watsonx.data](https://www.ibm.com/products/watsonx-data) + data handling with [IBM Cloud PostgresSQL](https://www.ibm.com/cloud/databases-for-postgresql)

<br>

***The Issue We are Addressing***<br>
```
☐ Brief description of "The issue we are hoping to solve" (2-3 sentences)
This should be a short description, 2-3 sentences in length, of the specific sustainability problem your solution is meant to address.
```
Whenever beekeepers need to relocate their colonies, they need to find an area that has the higest survival rate and the maximum potential for honey yield.
BeeMovr allows the user (beekeepers) to do exactly that.

<br>

***How BeeMovr will Help Beekeepers***<br>
```
☐ Description of "How our technology solution can help" (approximately 10 words)
This is where you will give a short description of your team's technology solution, in about 10 words.
```
[BeeMovr.com](https://BeeMovr.com) calculates honey yield prediction value of any given coordinates.

<br>

***The Idea Behind BeeMovr***<br>
```
☐ Long description of your team’s solution (approximately 500 words)
This is a longer description of your solution.
In about 500 words, describe your solution in more detail.
Include the real-world problem you identified, describe the technological solution you have created, and explain how it's an improvement over existing solutions.
You can supply additional documentation in this source code repository that you link to as well.
```
BeeMovr pulls in real-time precipitation, maximum temperature, and minimum temperature data from Open Meteo API's, and calculates a prediction of the maximum possible honey yield value based on [Hayes Kent Grogan's paper](https://etd.auburn.edu/bitstream/handle/10415/7108/Hayes%20Grogan.pdf).
Our project seeks to give beekeepers increased information about ideal pollinator conditions near them to increase colony survival rate and reduce uncertainty.
We envision BeeMovr to become the de-facto map for helping beekeepers make an informed decision about what's best for their bees.

We focused on researching the most accurate model possible.
Currently, we use a linear regression with the factors of maximum and minimum temperatures and precipitation data.
We plan to use [IBM watsonx.data](https://cloud.ibm.com/docs/watsonxdata?topic=watsonxdata-getting-started) to pull combined data from [USDA (U.S. Department of Agriculture)](https://www.usda.gov/) and [NASS (National Agricultural Statistics Service)](https://www.nass.usda.gov/) for improved prediction models.

We're also trying to increase prediction accuracy by ingesting colony-specific demographic data into our prediction model, as colony demographic data - e.g. age of the queen - were found to be statistically significant, as discovered by Grogan's 2020 paper.

As we promised our beekeeper Keith Robert, BeeMovr has been and will always be an open-source project.
If you're a beekeeper and have any suggestions or feature requests, please feel free to email us at &lt;workerbees@beemovr.com&gt;.
Our main website is at [BeeMovr.com](https://BeeMovr.com) and we are Schaler Starks, Eric Gonzalez Duro, Jasper Ha, and Soobin Rho.

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

We created a separte section for all of our [development logs](DEVLOG.md).

<br>

## 3. Roadmap

[Development roadmap diagram will created soon...]

- `Short Term Goal`: Add a drag functionality, where the user can get the honey production prediction value of a rectangle instead of just a single point.
- `Long Term Goal`: Now, we call the Open Meteo API's everytime the user clicks on a something to get the environmental values (precipitation and max/min temps). This will be replaced by a data storage / caching system. Whenever an API is called, the precipitation and max/min temp values will be stored into either Elastic Stack or PostGIS. Flask caching will also prevent duplicate API calls.
- `Long Term Goal`: Create a heatmap of the honey production potential of all areas based on the data stored on the database.

<br>
<br>
<br>

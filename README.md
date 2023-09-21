<br>
<br>

<p align="center">
  <img alt="Logo" src="https://github.com/ericfly02/BeeMovr/assets/19341857/d5d670f3-1dd9-4ab2-bd86-db38221804a1" width="500">
</p>

<br>

<p align="center">
  <b>
    Source code for
    <a href="https://beemovr.com">Beemovr.com</a>
  </b>
</p>

<br>

Google Maps, but for beekeepers.
We wanted to do something beneficial for bees.
So, we found 50 beekeepers by googling; called them; and asked them, "We want to help you save bees. What can we do for you? We can program."

So, the problem that Keith Robert from The Valley Hive in California had is that whenever you have to expand your bee colonies or are forced to move out - e.g. California drought - he needs to find a good area to move into.
He does it by manually going to Google Maps, getting precipitation data, and doing the math for each of the area himself.

We created BeeMovr to address this problem.
Basically, we do the same things that the beekeepers had to do, but more efficiently and more accurately.
BeeMovr allows the user (beekeepers) to click any point on the map, and then pulls real-time weather data and calculates the maximum potential honey yield of any given point.

If you're a beekeeper and want any new feature or modifications to the existing features, please email our co-founder Soobin Rho &lt;soobinrho@nsustain.com&gt;. We'll reply as soon as possible!

<br>

## Getting Started
[1.](#1-how-to-spin-up-a-development-server) How to spin up a development server<br>
[2.](#2-how-does-this-work) How does this work?<br>
[3.](#3-future-roadmap) Future Roadmap

<br>

## Acknowledgement

Special thanks to Keith Robert from [The Valley Hive](https://www.thevalleyhive.com/), our favorite beekeeper.

Also, our work would not have been possible without the paper "[The Impact of Precipitation and Temperature on Honey Yield in the United States](https://etd.auburn.edu/bitstream/handle/10415/7108/Hayes%20Grogan.pdf?sequence=2)" (Hayes Kent Grogan, 2020, Auburn University). The paper provided the BeeMovr team with the prediction formula for the relationship between monthly precipitation / maximum temperature / minimum temperature and honey yield, and this is exactly what made our core functionality possible.

<br>

## BeeMovr & IBM Call for Code

***IBM AI services used***<br>
Work in progres...

***Other IBM technology used***<br>
Work in progres...

***Solution architecture diagram***<br>
Work in progres...

***The issue we are hoping to solve***<br>
Whenever beekeepers need to relocate their colonies, they need to find an area that increases the chance of survival as well as the maximum potential honey yield.
Until BeeMovr was created, it was a long process involving a lot of manual work on the beekeeper's end.

***How our technology solution can help***<br>
BeeMovr makes this process faster and easier by algorithmically calculating the maximum honey yield of any given point on the map by ingesting real-time Open Meteo data (monthly total precipitation, maximum temperature, and minimum temperature) into Hayes Kent Grogan's honey yield prediction model.

***Our idea***<br>
Our project seeks to give beekeepers increased information about ideal pollinator conditions near them to improve efficiency and decrease uncertainty about insufficient honey production by using precipitation and temperature models.

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

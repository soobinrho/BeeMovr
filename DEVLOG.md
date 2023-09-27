## Dev log

**2023-02-23 Soobin** <br>
All of this began because of helplessness in a way.
We wanted to help the environment in any way we can because - well, you know - the earth doesn't seem to be doing too well.
We really wanted our future generations to be able to live.
The problem, however, was that we realized it's really hard for normal people like us to make an impact.
Yes, maybe nations or big organizations might be able to make a difference, but it's really hard for regular people to make a big difference.

We figured the best way to go about it is to actually go ask someone who works in the environment everyday and ask them.
So, that's what we did.
We googled 50 random beekeepers; called their number; and asked them, "We want to help you save bees. What can we do for you? We can program."
This is exactly what our open-source project BeeMovr started.
2023-02-23, 1:14PM is when it all of this began, with an one-hour call with Keith Robert from the Valley Hive in California.
He explained that beekeepers need a way to see which area has the highest nectar availability because they're sometimes forced to relocate their beehives - e.g. California drought - and they can't just move into any location.
Beekeepers currently have to go to Google Maps; find the precipitation data; and do the math themselves to figure out which area has the best chance for their colonies.
He explained, "creating a map that can calculate the nectar availability of any given region will help beekeepers a lot."

<br>

**2023-07-31 Soobin and Schaler** <br>
"[HackMIT] Welcome to HackMIT 2023! 🎈🎉"
Both Schaler and I (Soobin) got into HackMIT.
We decided this is the perfect time to create the beekeeper's map to address the problem Keith explained to us a few months ago.
We will create a map that can calculate the nectar availability of any given point on the map.
We promised Keith that we'll make it open source and therefore available for all beekeepers.
We'll license it with MIT License, since we'll create it at HackMIT hahaha

<br>

**2023-08-21 Eric and Soobin** <br>

```
Hi Soobin,

I noticed on Discord that you're participating in HackMIT. Your profile caught my eye ... If you haven't already formed a team, how about teaming up?

Looking forward to your thoughts!
```

This is how our Eric joined our team.
We welcomed Eric right away.
He had the perfect experience that our team needed.
And yes, he built the majority of our MVP during the 48 hour of HackMIT, so he proved himself very well.

<br>

**2023-09-16 Jasper, Schaler, and Soobin** <br>
Schaler and I were waiting patiently at the MIT athletic center for the HackMIT to begin.
It was going to start at 10AM, and it was around 9AM.
I was making conversation with everyone around me, and Jasper caught my eye.
He has done really cool stuff with robotic engineering.
We figured Jasper would be the perfect addition to our team, so we invited him to join our team, and he said yes.
As it turns out, it was the best decision we made as a team.
We worked great as a team.
Schaler, Eric, Jasper, and I, all of us turn out to have the best team chemistry.

<br>

**2023-09-17 Eric, Jasper, Schaler, and Soobin** <br>
We worked hard for the weekend-long hackathon.
We worked on our project, which by the way we named BeeMovr, until 1AM and continued til 5PM the next day.
We won Grand Prize 3rd Prize.
We let Keith know.

```
Hey Keith,

Schaler, Eric, Jasper, and I started working on creating the beekeeper's map, the first feature of which is nectar availability prediction. As we iterate with you, we'll try to be as helpful for beekeepers as possible by tweaking / adding more features. [1] We spent the entire weekend coding it, and we won 3rd prize at HackMIT, so we believe we're at a great start.

We'll hopefully update you again with more great news on progress of the beekeeper's map. Spent many hours coding all night hahaha

[1] https://github.com/ericfly02/BeeMovr

Best,
Soobin
```

```
Soobin,

Very cool!!!

Keith
```

<br>

**2023-09-24 Soobin** <br>
The MVP was good and all, but we decided to [throw away the first version](https://news.ycombinator.com/item?id=37003910) of BeeMovr and recreate.
[Leigh Halliday's YouTube video on Next.js and Mapbox](https://youtu.be/sZfUXVSor-k?si=AFo9qOFzs4eH98fP) was incredibly helpful.
Immediate todos I have to do right now are: finish recreating BeeMovr with Next.js; read Nginx documentation to set up the nginx.conf; and containerize with Docker and deploy with Docker Compose.

```bash
#
# Workflows I find using a lot
#

# Open VS Code in the project directory.
cd BeeMovr
code .

# Initialize Next.js
yarn create next-app

# Install all dependencies.
yarn install

# Start a development server.
yarn dev

# Create optimized production build.
yarn build

# Install ts-node to run TypeScript files mainly for testing purposes.
yarn global add ts-node

# Run a TypeScript file.
ts-node <filename>

# Add a development dependency.
yarn add <package name> --dev
```

Today, I read [Next.js routing fundamentals](https://nextjs.org/docs/app/building-your-application/routing), [REST API URI naming conventions](https://restfulapi.net/resource-naming/), [TSDoc specifications](https://tsdoc.org/), and [JavaScript promises, async, and await](https://javascript.info/async).

<br>

**2023-09-26 Soobin** <br>

I tried to get a deeper understanding of how Next.js works by reading:
- [Don't be tempted to reach for an internal API route](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props#getserversideprops-or-api-routes)
- [How rendering in Next.js works](https://nextjs.org/docs/app/building-your-application/rendering)
- [API Route Handling, Response Headers, and CORS Headers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [For fetching data from the client side, use SWR](https://nextjs.org/docs/app/building-your-application/deploying/static-exports#client-components)

After that, I read about the specifics of how the actual code can look like:
- [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Patterns for compositing client components and server components](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)

Plus, I read about meta data generation functions that will greatly improve SEO:
- [sitemap.ts](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#generate-a-sitemap)
- [robots.ts](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots#generate-a-robots-file)
- [Open Graph protocol support](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image#generate-images-using-code-js-ts-tsx)

Also, "to reduce the Client JavaScript bundle size, we recommend moving Client Components down your component tree." If a child component doesn't ready have a `'use client'` directive, create a separate `.tsx` fole wrapping around that component with the `'use client'` directive. [[Source](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#moving-client-components-down-the-tree)]

`yarn build` (which by the way is short for `yarn run build` creates optimized deployment files:
- [Next.js build directory overview](https://nextjs.org/docs/pages/building-your-application/deploying)
- [How to deploy with `yarn run build` and `yarn run start`](https://nextjs.org/docs/pages/building-your-application/deploying#nodejs-server)

One remaining question I have is, since Next.js supports GET API routing, can we export BeeMovr with static build?
This will have the advantage of not having to rent a server.
Services like GitHub Pages will be able to host our web app without any server cost if so.
This will require experimentation.
Let's keep in mind future roadmap includes implementation of geospatial database for more extensive functionality.
We'll see...

-> "If you need to read dynamic values from the incoming request, you cannot use a static export." [[Source](https://nextjs.org/docs/app/building-your-application/deploying/static-exports#route-handlers)] So, never mind. We'll use a regular build instead.

# Dev log

## 2023-02-23

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
He explained, "creating a map that can calculate the nectar availability of any given region will help us a lot."

<br>

## 2023-07-31

```
[HackMIT] Welcome to HackMIT 2023! 🎈🎉
```

Both Schaler and I (Soobin) got into HackMIT.
We decided this is the perfect time to create the beekeeper's map to address the problem Keith explained to us a few months ago.
We will create a map that can calculate the nectar availability of any given point on the map.
We promised Keith that we'll make it open source and therefore available for all beekeepers.

<br>

## 2023-08-21

```
Hi Soobin,

I noticed on Discord that you're participating in HackMIT.
Your profile caught my eye ...
If you haven't already formed a team, how about teaming up?

Looking forward to your thoughts!
```

This is how our Eric joined our team.
We welcomed Eric right away.
He had the perfect experience that our team needed.
And yes, he built the majority of our MVP during the 48 hours of HackMIT, so he proved himself very well.

<br>

## 2023-09-16

Schaler and I were waiting patiently at the MIT athletic center for the HackMIT to begin.
It was going to start at 10AM, and it was around 9AM.
I was making conversation with everyone around me, and Jasper caught my eye.
He has done really cool stuff with robotic engineering.
We figured Jasper would be the perfect addition to our team, so we invited him to join our team, and he said yes.
As it turns out, we couldn't have found a better teammate.
We worked great as a team.
Schaler, Eric, Jasper, and I, all of us turned out to have the best team chemistry.

<br>

## 2023-09-17

We worked hard for the weekend-long hackathon.
We worked on our project, which by the way we named BeeMovr, until 1AM and continued til 5PM the next day.
We won Grand Prize 3rd Prize.
We made sure to tell Keith right away:

```
Hey Keith,

Schaler, Eric, Jasper, and I started working on creating the beekeeper's map, the first feature of which is nectar availability prediction.
As we iterate with you, we'll try to be as helpful for beekeepers as possible by tweaking / adding more features. [1]
We spent the entire weekend coding it, and we won 3rd prize at HackMIT, so we believe we're at a great start.

We'll hopefully update you again with more great news on progress of the beekeeper's map.
Spent many hours coding all night hahaha

[1] https://github.com/ericfly02/BeeMovr

Best,
Soobin
```

```
Soobin,

Very cool!!!

Keith
```

Plus, here are some pictures of us at HackMIT:

<img src="https://github.com/soobinrho/soobinrho/assets/19341857/7ea0f7e6-112b-40a1-b37e-c78d49ae4143" width="500px">
<img src="https://github.com/soobinrho/soobinrho/assets/19341857/89d9138e-761b-4edf-bd17-94d1852fafa8" width="500px">
<img src="https://github.com/soobinrho/BeeMovr/assets/19341857/87a9fb3b-e114-44e8-8c87-0dd0cae19537" width="500px">
<img src="https://github.com/soobinrho/BeeMovr/assets/19341857/fc99305f-45f5-4594-89ba-7bc1d9d6657a" width="500px">

<br>
<br>

## 2023-09-24

The MVP was good and all, but we decided to [throw away the first version](https://news.ycombinator.com/item?id=37003910) of BeeMovr and recreate.
[Leigh Halliday's YouTube video on Next.js and Mapbox](https://youtu.be/sZfUXVSor-k?si=AFo9qOFzs4eH98fP) was incredibly helpful.
Immediate todos I have to do right now are: finish recreating BeeMovr with Next.js; read Nginx documentation to set up the nginx.conf; and containerize with Docker and deploy with Docker Compose.

```bash
# ---------------------------------------------------------------------
# Workflows we find using a lot
# ---------------------------------------------------------------------

# Open VS Code in the project directory.
cd BeeMovr
code .

# Install pnpm: package manager that is faster and more disk efficient.
npm install -g pnpm
pnpm setup

# If you're using zsh:
source ~/.zshrc

# If you're using bash:
source ~/.bashrc

# Install Typescript globally.
pnpm add -g typescript ts-node

# Initialize Next.js
pnpm create next-app --typescript

# Install all dependencies.
pnpm install

# Start a development server.
pnpm dev

# Create optimized production build and serve with Node.js
pnpm build
pnpm start

# How to run an individual TypeScript file rather than running the entire project.
ts-node <filename>

# How to add a development dependency.
pnpm add -D <package name>

# How to remove a dependency.
pnpm remove <package name>

# How to update all packages.
pnpm up --latest
```

Today, I read [Next.js routing fundamentals](https://nextjs.org/docs/app/building-your-application/routing), [REST API URI naming conventions](https://restfulapi.net/resource-naming/), [TSDoc specifications](https://tsdoc.org/), and [JavaScript promises, async, and await](https://javascript.info/async).

<br>

## 2023-09-26

I tried to get a deeper understanding of how Next.js works by reading:

- [Don't be tempted to reach for an internal API route](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props#getserversideprops-or-api-routes)
- [How rendering in Next.js works](https://nextjs.org/docs/app/building-your-application/rendering)
- [API Route Handling, Response Headers, and CORS Headers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [For fetching data from the client side, use SWR](https://nextjs.org/docs/app/building-your-application/deploying/static-exports#client-components)
- [Next.js has a built-in font optimization](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts)
- [For importing external libraries (in our case, it's Mapbox), use next/script](https://nextjs.org/docs/pages/building-your-application/optimizing/scripts)

After that, I read about the specifics of how to structure the actual code:

- [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Patterns for compositing client components and server components](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)

Plus, I read about meta data generation functions that will greatly improve SEO:

- [metadata object](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#the-metadata-object)
- [metaData base URL and `canonical: '/'`](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase)
- [sitemap.ts](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#generate-a-sitemap)
- [robots.ts](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots#generate-a-robots-file)
- [Open Graph protocol support](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image#generate-images-using-code-js-ts-tsx)
- [The 404 page and the 500 page](https://nextjs.org/docs/pages/building-your-application/routing/custom-error#customizing-the-404-page)
- [loading.ts](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)

Also, "to reduce the Client JavaScript bundle size, we recommend moving Client Components down your component tree." If a child component doesn't ready have a `'use client'` directive, create a separate `.tsx` file wrapping around that component with the `'use client'` directive. [[Source](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#moving-client-components-down-the-tree)]

`pnpm build` creates optimized deployment files:

- [Next.js build directory overview](https://nextjs.org/docs/pages/building-your-application/deploying)
- [SIGTERM handling in Next.js](https://nextjs.org/docs/pages/building-your-application/deploying#manual-graceful-shutdowns)
- [How to deploy prod](https://nextjs.org/docs/pages/building-your-application/deploying#nodejs-server)
- [Next.js production Dockerfile example](https://github.com/vercel/next.js/tree/canary/examples/with-docker#in-existing-projects)
- [Nginx as reverse proxy for Node](https://betterstack.com/community/guides/scaling-nodejs/nodejs-reverse-proxy-nginx/)

One remaining question I have is, since Next.js supports GET API routing, can we export BeeMovr with static build?
This will have the advantage of not having to rent a server.
Services like GitHub Pages will be able to host our web app without any server cost if so.
This will require experimentation.
Let's keep in mind future roadmap includes implementation of geospatial database for more extensive functionality.
We'll see...

For security, I read:

- [Content-Security-Policy HTTP response header](https://csp.withgoogle.com/docs/index.html)
- [A Dev.to post on how to set up the CSP header](https://dev.to/snaka/securing-your-nextjs-application-with-strict-csp-4lie)
- [Example code for CSP](https://nextjs.org/docs/pages/building-your-application/configuring/content-security-policy)

"If you need to read dynamic values from the incoming request, you cannot use a static export." [[Source](https://nextjs.org/docs/app/building-your-application/deploying/static-exports#route-handlers)] So, never mind. We'll use a regular build instead.

<br>

## 2023-09-28

We decided to use Jest for unit testing.

```bash
# ---------------------------------------------------------------------
# Unit testing workflows
# ---------------------------------------------------------------------

# Set up Jest for unit testing.
# Source:
#   https://kulshekhar.github.io/ts-jest/docs/getting-started/installation/#jest-config-file
pnpm add -D jest ts-jest @types/jest
pnpm ts-jest config:init

# How to run tests.
pnpm test
```

<br>

## 2023-09-29

More digging around on best practices:

- [How to build a fullstack app with Next.js, Prisma, and Postgres](https://vercel.com/guides/nextjs-prisma-postgres)
- [.env files and environmental variables in Next.js](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#default-environment-variables)
- [Open Graph protocol image generation as an API endpoint](https://vercel.com/docs/functions/edge-functions/og-image-generation)
- [Differences between client side rendering, server side rendering, and static site generation](https://youtu.be/6nuRlaNFd4g?si=XiAx3xhnp3TXzAx0)

<br>

## 2023-10-02

We're finally done with rewriting all of our back-end with Next.js server-side components.
Now, we work on the front-end.
A lot of the UI will change compared to our MVP.
Whereas our MVP had only one basic functionality, we're now adding an information console at the bottom to see all of the past honey yield prediction values the user clicked on.
Previously, it was able to show only one value at a time.

One of the judges at HackMIT gave us this really good feedback that it will be cool to show basic statistics that are useful for beekeepers.
Before, we showed only the honey yield prediction value.
Now, we'll also show basic but crucial stats, such as precipitation.

- [How to add an icon on Mapbox](https://docs.mapbox.com/mapbox-gl-js/example/add-image/)
- [How to make a popup on icon click](https://docs.mapbox.com/mapbox-gl-js/example/popup-on-click/)

Also, a reminder to myself to use cybersecurity frameworks to ensure the confidentiality, integrity, and availability of all data we store, process, and handle (I compiled this list during my cybersecurity internship over the summer).

- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/latest/)
- [OWASP Code Review Guide](https://owasp.org/www-project-code-review-guide/)
- [OWASP Cyber Security File Upload Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)
- [OWASP Top 10 Web Application Security Risks](https://owasp.org/www-project-top-ten/)
- [Mitre CWE (Common Weakness Enumeration) List](https://cwe.mitre.org/data/index.html)
- [CIS Critical Security Controls](https://www.cisecurity.org/controls)
- [ISO 27001](https://www.iso.org/standard/27001)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [Hacker News discussion on NIST AI Risk Management Framework](https://news.ycombinator.com/item?id=35506485)
- [Hacker News discussion on CWE Top Most Dangerous Software Weaknesses](https://news.ycombinator.com/item?id=36707321)
- [Hacker News discussion on GDPR for Developers](https://news.ycombinator.com/item?id=32328837)
- [NSA Cybersecurity Advisories & Guidance](https://www.nsa.gov/Press-Room/Cybersecurity-Advisories-Guidance/)

Also, these are some articles I'll need to reference when creating schemas with IBM PostgresSQL:

- [Upgrading databases best practices](https://news.ycombinator.com/item?id=37724549)
- We can download [historical weather data sets](https://aws.amazon.com/blogs/publicsector/decrease-geospatial-query-latency-minutes-seconds-using-zarr-amazon-s3/) and store them into PostgresSQL rather than trying to get data one at a time through API's.

<br>

## 2023-10-03

- Consider [using Markdown](https://nextjs.org/learn/basics/dynamic-routes/render-markdown) with graphs generated as .svg or .png files.
- [Mapbox Getting Started](https://docs.mapbox.com/help/getting-started/web-apps/)
- [Mapbox Token Management Security Best Practices](https://docs.mapbox.com/help/troubleshooting/how-to-use-mapbox-securely/#access-tokens)
- [Mapbox XSS Prevention (Content Security Policy)](https://docs.mapbox.com/mapbox-gl-js/guides/browsers-and-testing/#csp-directives)
- `react-map-gl` is a [React wrapper for Mapbox GL JS that makes using Mapbox GL JS in React applications easy](https://visgl.github.io/react-map-gl/)
- [HTTP Status Codes (200, 308, 404, 500, 503)](https://nextjs.org/learn/seo/crawling-and-indexing/status-codes)

<br>

## 2023-10-05

- [Tailwind CSS Buttons Hover, Focus, and Other States](https://tailwindcss.com/docs/hover-focus-and-other-states)
- [MapLibre is an open-source fork of Mapbox](https://maplibre.org/)
- [How to make some divs go away using conditional rendering](https://stackoverflow.com/a/71641621)
- [Conditional Rendering Best Practices](https://medium.com/@brandonlostboy/build-it-better-next-js-conditional-rendering-be5617431cef)

<br>

## 2023-10-06

- [CSS Positioning (absolute, relative, etc)](https://tailwindcss.com/docs/position)
- [Hacker News Discussion on Database Performance at Scale](https://news.ycombinator.com/item?id=37778069)
- [React useMemo hook](https://react.dev/reference/react#performance-hooks) provides caching in functions, and [this can be used for map markers to improve performance](https://visgl.github.io/react-map-gl/docs/get-started/tips-and-tricks#performance-with-many-markers)
- [Nginx Configuration Beginner's Guide](http://nginx.org/en/docs/beginners_guide.html#conf_structure)
- [NSA / CISA Top 10 Misconfigurations](https://www.nsa.gov/Press-Room/Press-Releases-Statements/Press-Release-View/Article/3549369/nsa-and-cisa-advise-on-top-ten-cybersecurity-misconfigurations/)

<br>

## 2023-10-08

- [Next.js and Content Security Policy (CSP)](https://reesmorris.co.uk/blog/implementing-proper-csp-nextjs-styled-components)
- [React State Management (useState, useReducer, useContext)](https://react.dev/learn/managing-state)

<br>

## 2023-10-11

- [Axios has a built-in mechanism for protecting against CSRF (Cross-Site Request Forgery)](https://axios-http.com/docs/intro)

<br>

## 2023-10-12

- I think we can share the main route (`/`) data with other pages using [Next.js Link Router](https://stackoverflow.com/questions/52238637/react-router-how-to-pass-data-between-pages-in-react)
- [How rendering works in React](https://react.dev/learn/render-and-commit)
- [How to write pure React components](https://react.dev/learn/keeping-components-pure)
- [Why `e.preventDefault()` is needed](https://react.dev/learn/responding-to-events#preventing-default-behavior)

"When a piece of information is used for rendering, keep it in state.
When a piece of information is only needed by event handlers and changing it doesn’t require a re-render, using a ref may be more efficient ...
If your component needs to store some value, but it doesn’t impact the rendering logic, choose refs."

- [Purpose and mechanisms of useRef](https://react.dev/learn/referencing-values-with-refs)

"Effects let you run some code after rendering so that you can synchronize your component with some system outside of React ...
Effects run at the end of a commit after the screen updates.
This is a good time to synchronize the React components with some external system (like network or a third-party library)."

- [Purpose and mechanisms of useEffect](https://react.dev/learn/synchronizing-with-effects)

"Hooks are special functions that are only available while React is rendering (which we’ll get into in more detail on the next page).
They let you “hook into” different React features ...

Hooks—functions starting with use—can only be called at the top level of your components or your own Hooks.
You can’t call Hooks inside conditions, loops, or other nested functions.
Hooks are functions, but it’s helpful to think of them as unconditional declarations about your component’s needs.
You “use” React features at the top of your component similar to how you “import” modules at the top of your file."

- [Purpose and mechanisms of useState](https://react.dev/learn/state-a-components-memory#meet-your-first-hook)
- [All React built-in hooks](https://react.dev/reference/react)

<br>

## 2023-10-14

- [How to let the user click through a div class](https://stackoverflow.com/a/4839672)

<br>

## 2023-10-19

- [USDA Honey Bee Surveys and Reports](https://www.nass.usda.gov/surveys/Guide_to_NASS_Surveys/Bee_and_Honey/)
- [USDA "HONEY, BEE COLONIES - LOSS, DEADOUT, MEASURED IN COLONIES" (2015-2022)](https://quickstats.nass.usda.gov/results/96060AFB-43C7-33D7-868A-788D2E45608B)
- [USDA "HONEY - PRODUCTION, MEASURED IN LB / COLONY" (2013-2022)](https://quickstats.nass.usda.gov/results/E518BE2D-6EC7-33B5-B21E-13B92ADD51F8)

<br>

## 2023-10-27

- [How to make README.MD more accessible](https://github.blog/2023-10-26-5-tips-for-making-your-github-profile-page-accessible/)

<br>

## 2023-10-28

- [PRISM Historical Weather Datasets](https://prism.oregonstate.edu/6month/)
- [Next.js 14 Release blog post](https://next-site-git-next-14.vercel.sh/blog/next-14)
- [Using clsx for conditionals in className](https://nextjs.org/learn/dashboard-app/css-styling#using-the-clsx-library-to-toggle-class-names)
- [layout.tsx good example. "One benefit of using layout is that on navigation, only the page components update while the layout won’t re-render. In Next.js, this is called partial rendering"](https://nextjs.org/learn/dashboard-app/creating-layouts-and-pages#creating-the-dashboard-layout)
- [Database connection in Next.js good example](https://nextjs.org/learn/dashboard-app/setting-up-your-database#exploring-your-database)
- [Use parallel data fetching to avoid data request waterfall](https://nextjs.org/learn/dashboard-app/fetching-data#parallel-data-fetching)
- [In dynamic rendering, the slowest data fetch slows down the entire page rendering. So, use streaming](https://nextjs.org/learn/dashboard-app/streaming)
- [How to update the url without rerendering](https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#2-update-the-url-with-the-search-params)
- [Super cool server actions, which is a new feature in Next.js 14](https://nextjs.org/learn/dashboard-app/mutating-data)
- [try/catch and notFound.tsx best practices](https://nextjs.org/learn/dashboard-app/error-handling#handling-all-errors-with-errortsx)
- [Increasing accessibility (forms)](https://nextjs.org/learn/dashboard-app/improving-accessibility#improving-form-accessibility)
- [NextAuth.js best practices](https://nextjs.org/learn/dashboard-app/adding-authentication#setting-up-nextauthjs)

<br>

## 2023-10-29

- [Introduction to Linear Algebra](https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://terrytao.files.wordpress.com/2016/12/linear-algebra-notes.pdf&ved=2ahUKEwjix4bzypyCAxXmJUQIHSgyAzIQFnoECA4QAQ&usg=AOvVaw2-4_1MME94qz0voAMm3jeW)

<br>

## 2024-09-25

### How does `sqlite` work?

https://www.sqlite.org/fileformat2.html

https://www.sqlite.org/arch.html

"SQLite is a Recommended Storage Format for datasets according to the US Library of Congress."
"SQLite runs on any platform with an 8-bit byte, two's complement 32-bit and 64-bit integers, and a C compiler."
"SQLite database files are bit-for-bit identical on 32-bit, 64-bit, big-endian, and little-endian platforms.
You can copy an SQLite database file from one system to another without having to translate or convert the database."
"The only other recommended storage formats for datasets are XML, JSON, and CSV."

"In order to provide portability across operating systems, SQLite uses an abstract object called the VFS [SQLite OS portability layer].
Each VFS provides methods for opening, reading, writing, and closing files on disk, and for other OS-specific tasks such as finding the current time, or obtaining randomness to initialize the built-in pseudo-random number generator.
Hence, porting SQLite to a new operating system is simply a matter of writing a new OS interface layer or 'VFS.'

"SQLite works by compiling SQL text into bytecode, then running that bytecode using a virtual machine."

"The complete state of an SQLite database is usually contained in a single file on disk called the 'main database file.'
During a transaction, SQLite stores additional information in a second file called the "rollback journal", or if SQLite is in WAL mode, a write-ahead log file."
"An SQLite database is maintained on disk using a B-tree implementation found in the `btree.c` source file.
Separate B-trees are used for each table and each index in the database. All B-trees are stored in the same disk file."

<br>

### `SQLite` Use Cases

"Rather than using fopen() to write XML, JSON, CSV, or some proprietary format into disk files used by your application, use an SQLite database.
You'll avoid having to write and troubleshoot a parser, your data will be more easily accessible and cross-platform, and your updates will be transactional."

"Because it requires no configuration and stores information in ordinary disk files, SQLite is a popular choice as the database to back small to medium-sized websites...
SQLite has a small code footprint, makes efficient use of memory, disk space, and disk bandwidth, is highly reliable, and requires no maintenance from a Database Administrator...
SQLite works great as the database engine for most low to medium traffic websites (which is to say, most websites)."


<br>

### When not to use `SQLite`

https://www.sqlite.org/whentouse.html

"SQLite supports an unlimited number of simultaneous readers, but it will only allow one writer at any instant in time."

"A good rule of thumb is to avoid using SQLite in situations where the same database will be accessed directly (without an intervening application server) and simultaneously from many computers over a network...
Because this problem results from bugs in the underlying filesystem implementation, there is nothing SQLite can do to prevent it.
If there are many client programs sending SQL to the same database over a network, then use a client/server database engine instead of SQLite."

"SQLite allows multiple processes to have the database file open at once, and for multiple processes to read the database at once.
When any process wants to write, it must lock the entire database file for the duration of its update.
But that normally only takes a few milliseconds.
Other processes just wait on the writer to finish then continue about their business."

"However, client/server database engines (such as PostgreSQL, MySQL, or Oracle) usually support a higher level of concurrency and allow multiple processes to be writing to the same database at the same time.
This is possible in a client/server database because there is always a single well-controlled server process available to coordinate access."

"An SQLite database is limited in size to 281 terabytes (248 bytes, 256 tibibytes). 
And even if it could handle larger databases, SQLite stores the entire database in a single disk file and many filesystems limit the maximum size of files to something less than this.
So if you are contemplating databases of this magnitude, you would do well to consider using a client/server database engine that spreads its content across multiple disk files, and perhaps across multiple volumes."

"Otherwise → choose SQLite!
For device-local storage with low writer concurrency and less than a terabyte of content, SQLite is almost always a better solution.
SQLite is fast and reliable and it requires no configuration or maintenance. 
It keeps things simple.
SQLite 'just works.'"

<br>

### Basics of `SQLite`

https://www.sqlite.org/cli.html

Enter `sqlite3 newDatabase.db` to attach to or create a new database.
"Most of the time, sqlite3 just reads lines of input and passes them on to the SQLite library for execution.
But input lines that begin with a dot (".") are intercepted and interpreted by the sqlite3 program itself."

```
```sql
/* How to see all tables. */
.tables

/* How to see all tables and indices. */
.schema

/* How to run an SQL script. */
.read <fileName>

/* How to get general help or for a specific function. */
.help ?PATTERN?

/* How to configure logging option. */
.log FILE|on|off

/* How to clone a database. */
.clone NEWDB

/* Close the current db and open a new one. */
.open NEWDB

/* How to export to an Excel file. */
.excel
SELECT * FROM tab1;

/* How to import a csv. */
.import --csv --skip 1 --schema temp C:/work/somedata.csv tab1

/* How to export to a csv. */
.headers on  -- Output column names.
.mode csv
.once c:/work/dataout.csv  -- Next query's output goes to the csv file.
SELECT * FROM tab1;

/* How to export to a csv. */
/* How to exit. */
.exit
```

<br>

### `SQL` Style Guide

https://www.sqlstyle.guide/

1. "Store ISO 8601 compliant time and date information (`YYYY-MM-DDTHH:MM:SS.SSSSS`)."
2. "Include comments in SQL code where necessary. Use the C style opening `/*` and closing `*/` where possible otherwise precede comments with `--` and finish them with a new line."

```sql
/* Use whitespaces and indents to make it easy to read. */
/* Spaces should be used to line up the code so that the root keywords all end on the same character boundary. */
SELECT file_hash  -- stored ssdeep hash
  FROM file_system
 WHERE file_name = '.vimrc';
```

5. "Never give a table the same name as one of its columns and vice versa."
6. For table names, Avoid a singular form. "Use a collective name or, less ideally, a plural form. For example (in order of preference) staff and employees."
7. For column names, "always use the singular name."
8. For procedures, always include a verb.
9. Avoid "camelCase -- it is difficult to scan quickly."
10. "Use underscores where you would naturally include a space in the name (`first name` becomes `first_name`)."
11. "Where possible avoid simply using id as the primary identifier for the table."
12. Always use lowercase except where it may make sense not to such as proper nouns.
13. "Always use uppercase for the reserved keywords like `SELECT` and `WHERE`."
14. It is best to avoid the abbreviated keywords and use the full length ones where available (prefer `ABSOLUTE` to `ABS`).
15. Include space before and after "before and after equals (`=`)
after commas (`,`)."
16. "Specify the primary key first right after the `CREATE TABLE` statement.
Constraints should be defined directly beneath the column they correspond to."

<br>

### What are `props` in html?

https://nextjs.org/learn/react-foundations/displaying-data-with-props

```tsx
<Header title="React" />

{/* ... */}

function Header(props) {
  console.log(props); // { title: "React" }
  return <h1>Develop. Preview. Ship.</h1>;
}
```

<br>

### App Router in `Next.js`

https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#server-side-rendering-getserversideprops

`getStaticProps` and `getServerSideProps` are now replaced by `Static Rendering` and `Dynamic Rendering` respectively.
Server-side components use `Static Rendering` by default, but we can make it to use `Dynamic Rendering` by adding `unstable_noStore`.

<br>

### `import` and `require`

https://javascript.plainenglish.io/javascript-import-vs-require-statements-in-gatsby-next-js-and-similar-frameworks-1de1145f1228

While `require` was primarily made to be used outside a web browser, `import` was implemented more recently to improve the modular system of JavaScript.
Both `require` and `import` will work in any files under `src` directory thanks to bundlers and compilers, but outside the `src` folder (e.g. config files), only `require` will work.

<br>

### `Next.js` Client-Side Component Pricinples

https://www.yoseph.tech/posts/jam-stack/architecting-nextjs-applications-for-better-performance

In order to maximize user experience, we need to minimize the amount of JavaScript that the client receives and therefore processes using the client's browser.
To do so, we need to (a) "push all of our client components as far downt he NextJS render tree as you can," so that we can use server components by default to render most things on the server instead of on the client's browser, and (b) "keep client components as thin as possible."

<br>

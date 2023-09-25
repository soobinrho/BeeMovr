## Dev log

**2023-09-24 Soobin** <br>
The MVP was good and all, but we decided to [throw away the first version](https://news.ycombinator.com/item?id=37003910) of BeeMovr and recreate.
[Leigh Halliday's YouTube video on Next.js and Mapbox](https://youtu.be/sZfUXVSor-k?si=AFo9qOFzs4eH98fP) was incredibly helpful.
Immediate todos I have to do right now are: finish recreating BeeMovr with Next.js; read Nginx documentation to set up the nginx.conf; and containerize with Docker and deploy with Docker Compose.

```bash
# Initialize Next.js
yarn create next-app

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

Today, I read [Next.js routing fundamentals](https://nextjs.org/docs/app/building-your-application/routing), [REST API URI naming conventions](https://restfulapi.net/resource-naming/), [TSDoc specifications](https://tsdoc.org/), ...

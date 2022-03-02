# price-tracker

#### Environment required for development:
  * Docker: https://www.docker.com/
#### Quick Start:
  Docker:
    docker build --tag price_tracker .
    docker run --name docker-node -p 3000:8080 -d price_tracker
    
  * Server:
    * Init:
      yarn prisma migrate dev —name init
    * Setup:
      * run: "**yarn server-setup**" or "**cd server** && **yarn**"
    * Start Development:
      * run: "**yarn dev**" (if currently in /server folder) to start the server development
        * default url:
          * Local: http://localhost:3000
          * Playground: http://localhost:3000/graphiql
      * run: "**yarn server-dev**" (if currently in the root folder /price-tracker) to start the server development
         * default url:
           * Local: http://localhost:3000
           * Playground: http://localhost:3000/graphiql
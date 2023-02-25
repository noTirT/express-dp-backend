## Docker build

    docker build -f Dockerfile.dev -t dietplannerbackend:1.0 .

## Docker run

    docker run -d -it -p 3333:3333 --name dpbe dietplannerbackend:1.0

## Run locally

    npm run dev

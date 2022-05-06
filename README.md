# Hexagonal Architecture Seed

[![Trazable Standards](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Semantic Versioning](https://img.shields.io/badge/Semver-2.0.0-brightgreen)](https://semver.org/spec/v2.0.0.html)
[![Node](https://img.shields.io/badge/Node-14.15-yellowgreen)](https://nodejs.org/en/)
[![NPM](https://img.shields.io/badge/NPM-red)](https://www.npmjs.com/)
[![Docker](https://img.shields.io/badge/Docker-19.03.13-blue)](https://www.docker.com/)

## Description

- This repository is the seed for the creation of new projects. It was created following the best practices
and principles of the hexagonal architecture, but with the trazable dev team's flavor.

## Trazable Hexagonal Architecture

- The hexagonal architecture is one of the multiple backend architectures aimed to isolate the core (entities, business logic) of our application for the exterior.
- This architecture avoids the knowledge of our core with the "exterior”, allowing the change of the external components without impact to our business logic.
- The principle keys of this architecture are the naming of the different components that compose it.
  - Adapters:
    - Primary (Input): Components out of the hexagon/core that name the business logic (services/useCases/managers).
      - Example: Rest API call with their controllers the business logic.
    - Secondary (Output): Components out of the hexagon/core that `implements` the `ports` (interfaces) or `repositories` (data interfaces).
      - Example: Database implements the methods defined by the interface.
  - Ports: Interfaces implemented by the secondary adapters.
    - Example: `Technology`DownloadFile implements `DownloadFile` (The business logic needs downloadFile but doesn’t need the how)
  - Repositories: Data interfaces implemented by the secondary adapters with data access.
    - Example: `DatabaseEntity`Repository implements `Entity`Repository (The business logic needs data from the entity but it doesn’t need to know how and where is stored)
  - Core: All of the components not explained before they are part of the core/inside of the hexagon (entities,exceptions,use-cases).

## Steps to create a project using the seed

- Download this repository.
- Remove the existing .git file and create a new one for your project with the following commands:  
`rm -rf .git`  
`git init`  
`git add .`  
`git commit -m "Initial commit"`
- Find and change globally `project_name` to the correct project name
- Change in `package.json` the project information (name, description, repository...)

## Running the application

- Install dependencies:  `npm i`
- Run the environment with docker-compose:  `docker-compose up`.
  - Services:
    - project_name: Example application using the trazable hexagonal architecture.
      - localhost:8080
    - project_name_mongo: Mongo DB Database
      - localhost:27017
    - project_name_mongo_express: Dashboard for Mongo DB
      - localhost:8081

## How it works

- This application works with the theory before explained but we explain how this example works with the trazable implementation.
- The isolation of our core is achieved with the structure obtained with the hexagonal architecture and the dependency injection orchestred in the index.ts of our example application.
  - Explaining the index.ts (Dependency orchestrator).
    - With the perspective of the hexagonal architecture (LEFT<=>RIGHT) the dependencies are `initialized` from the RIGHT to the LEFT and `needed/injected` from the LEFT to the RIGHT
      - SECONDARY ADAPTER MONGO EXAMPLE
        - We need to start the database configuration as our repositories need a database to do the database operations. (Remember that our repository is not able to know where it is stored, but only the methods that the business logic needs).
      - CORE USE-CASES EXAMPLE
        - We need initialize our use-cases/services/interactors with the repositories or any dependency `needed` in the business logic (Databases, Technologies...)
      - EXPRESS API EXAMPLE
        - We need initalize the primary adapter with the `necessary` components to communicate with our core.

## Methodology

- Test driven development (Require Trazable dev culture)
  - Define the test before create the business logic, the test must fail because the logic doesn't exist.
- Domain Zone (Business Logic)
  - The business logic must contain a single responsability of a specific operation representing the logic defined by business (use-case).
    - The use-case must have in their initialization all of the dependencies needed for accomplishing their objective (repositories, ports...)
      - Example: `Add` use case (src/use-cases/add/index.ts)
        - This use case have two dependencies, the repository to acces to the necessary data of the entity `Example` and their loggerContainer.
        - The method execute (command pattern) to realize the behavior of the name that has the use-case, in this case `Add` a `Example`.
        - Business says that is not possible to add an Example with the same name. In order to manage this, go to the repository to ask if any `Example` exist with the name received (the input and output of these methods are defined in the interface, MUST return a business entity not a container data). If the name exist, throw a business exception called `NameAlreadyExists` (managing the exception and returning a custom message its responsibility of the primary adapter).
- Details/Dependencies
  - When starting to create the use-case, you need to create the dependencies necessary to call your logic and the dependencies of it.
    - Example: `Add` use case (src/use-cases/add-index.ts)
      - Primary Adapter:
        - This use-case has from the primary adapter a REST API, allowing us to create the necessary API routes in order to call the endpoint where our logic is waiting to start its objective. (src/adapters/primary/rest/express/index.ts => setupRoutes()).
        - This route needs a controller to execute the use-case. (src/adapters/primary/rest/express/controllers/example.controller.ts)
        - In this hexagonal architecture implementation, the primary adapters call directly to the business logic instead of creating a previous interface.
      - Secondary port:
        - The secondary port in this example is the `repository`, the repository is an interface that "say" to the secondary adapters the methods that the business logic needs. (src/repositories/example.repository.ts)
      - Secondary Adapter:
        - The secondary adapter is the `technology` (In this example a Mongo DB database) that `implements` the interfaces defined, and it must return the data typed in the interface (in this example a `Example` business entity).
    - At this point you should think which order is the most easier to implement the components necessaries for your use-case (From the primary adapter => INPUT or from the secondary adapter => OUTPUT)

- Dependency injection.
  - When you have your use-case, your primary adapter and all of the dependencies that the use-case needs to work, the final step is the dependency injection (The theory of this it was explained at the point [How it Works](#How-it-works))
  - Inject the dependencies to your new use-case. You must inject in your use case the repository initialized with its database. Also, if you have in your use-case another dependency, you must inject in the initialization of the use-case, with your use-case and all of the dependencies instantiated, and inject your use-case to the primary-adapter.
  - Life cycle of your implementation
    - Express API => USE-CASE => REPOSITORY => MONGO REPOSITORY => MONGO CLIENT => MONGO DB `NEEDS`
    - EXPRESS API <= USE-CASE <= REPOSITORY <= MONGO REPOSITORY <= MONGO CLIENT <= MONGO DB `INITIALIZATION`

## CI Environment-variables

### Generic

### Staging
  
### Production

### Playground

### Project

- AUTH_URL: Trazable Microservice Auth URL
- PORT?: Port on serve htt primary adapter // default 8080
- GCLOUD_PROJECT_ID: Google Cloud project id
- SECRETS_BUCKET: Google Bucket name with the secrets
- KMS_KEYRING: Google cloud keyring
- KMS_KEY_CREDENTIALS: Key for the environment variables (environment-variables)
- KMS_LOCATION: Keyring location
- KMS_KEY_WALLETS: Wallets key (wallets)
- MONGO_VARIABLES_FILENAME: Name of the mongo environment variables file encrypted (mongo-variables.json.encrypted)
- DB_URI?: Optional env variable if no secret is provided
- DB_USER?: Optional env variable if no secret is provided
- DB_PASSWORD?: Optional env variable if no secret is provided
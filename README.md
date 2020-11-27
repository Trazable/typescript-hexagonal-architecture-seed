# Hexagonal Architecture Seed

[![Trazable Standards](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Semantic Versioning](https://img.shields.io/badge/Semver-2.0.0-brightgreen)](https://semver.org/spec/v2.0.0.html)
[![Node](https://img.shields.io/badge/Node-14.15-yellowgreen)](https://nodejs.org/en/)
[![NPM](https://img.shields.io/badge/NPM-red)](https://www.npmjs.com/)
[![Docker](https://img.shields.io/badge/Docker-19.03.13-blue)](https://www.docker.com/)

## Description

- This repository is the seed for create new projects, it was created following the best practices and following the principles of the [hexagonal architecture](#Hexagonal-Architecture) but with the trazable dev team's flavor.

## Trazable Hexagonal Architecture

- The hexagonal architecture is one of the multiples backend architectures aimed to isolate the core (entities, business logic) of our application for the exterior.
- This architecture avoid the knowledge of our core with the "exterior" allowing change the external components without impact of our business logic.
- The principle keys of this architecture is the naming of the different components that compound the architecture.
  - Adapters:
    - Primary (Input): Components out of the hexagon/core that `calls` the `bussines logic` (services/useCases/managers).
      - Example: Rest API call with their controllers the business logic.
    - Secondary (Output): Components out of the hexagon/core that `implements` the `ports` (interfaces) or `repositories` (data interfaces).
      - Example: Database implements the methods defined by the interface.
  - Ports: Interfaces implemented by the secondary adapters.
    - Example: `Technology`DownloadFile implements `DownloadFile` (The business logic need downloadFile but don't need how)
  - Repositories: Data interfaces implemented by the secondary adapters with data access.
    - Example: `DatabaseEntity`Repository implements `Entity`Repository (The business logic need data from the entity but he don't need know how and where is stored)
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
    - hexagonal: Example application using the trazable hexagonal architecture.
      - localhost:8080
    - mongo: Mongo DB Database
      - localhost:27017
    - mongo_express: Dashboard for Mongo DB
      - localhost:8081

## How it works

- This application works with the theory before explained but now we go to explain how works this example with the trazable implementation.
- The isolation of our core is achieved with the structure obtained with the hexagonal architecture and the dependency injection orchestred in the index.js of our example application.
  - Explaining the index.js (Dependency orchestrator).
    - With the perspective of the hexagonal architecture (LEFT<=>RIGHT) the dependencies are `initialized` from the RIGHT to the LEFT and `needed/injected` from the LEFT to the RIGHT
      - SECONDARY ADAPTER MONGO EXAMPLE
        - We need initialize the database configuration because our repositories `needs` a database to do the database operations. (Remember that our repository don't know where is stored only know the methods that the business logic need).
      - CORE USE-CASES EXAMPLE
        - We need initialize our use-cases/services/interactors with the repositories or any dependency `needed` in the business logic (Databases, Technologies...)
      - EXPRESS API EXAMPLE
        - We need initalize the primary adapter with the `necessary` components to communicate with our core.

## Methodology

- Test driven development (Require Trazable dev culture)
  - Define the test before create the business logic, the test must fail because the logic doesn't exist.
- Domain Zone (Business Logic)
  - The business logic must contain a single responsability of a specific operation representing the logic defined by business (use-case).
    - The use-case must have in their initialization all of the dependencies needed for acomplish their objective (repositories, ports...)
      - Example: `Add` use case (src/use-cases/add/index.js)
        - This use case have two dependencies, the repository to acces to the necessary data of the entity `Example` and their loggerContainer.
        - The method execute (command pattern) realize the behaviour of the name that have the use-case, in this case `Add` a `Example`.
        - Bussines say that is not possible add a `Example` with the same name, for manage this, we go to the `repository` to ask if any `Example` exist with the name received (the input and output of these methods are defined in the interface, MUST return a businnes entity not a container data), if the name exist, we throw a business exception called `NameAlreadyExists` (manage the exception and return a custom message its a responsability from the primary adapter).
- Details/Dependencies
  - When you start creating the use-case, you need create the dependencies necessaries to call your logic and the dependencies of the logic.
    - Example: `Add` use case (src/use-cases/add-index.js)
      - Primary Adapter:
        - This use-case have from primary adapter a REST API, let go to create the necessary API routes for call the endpoint where our logic are waiting to start their objective. (src/adapters/primary/rest/express/index.js => setupRoutes()).
        - This route needs a controller to execute the use-case. (src/adapters/primary/rest/express/controllers/example.controller.js)
        - In this implementation of the hexagonal architecture the primary adapters call directly to the business logic instead creating a previous interface.
      - Secondary port:
        - The secondary port in this example is the `repository`, the repository its a interface that "say" to the secondary adapters the methods that the business logic need. (src/repositories/example.repository.js)
      - Secondary Adapter:
        - The secondary adapter is the `technology` (In this example a Mongo DB database) that `implements` the interfaces defined, must return the data typed in the interface (in this example a `Example` business entity).
    - At this point you should think which order is the most easier to implement the components necessaries for your use-case (From the primary adapter => INPUT or from the secondary adapter => OUTPUT)

- Dependency injection.
  - When you have your use-case, your primary adapter and all of the dependencies that the use-case need to work, the final step is the dependency injection (The theory of this it was explained at the point [How it Works](#How-it-works))
  - Inject the dependencies to your new use-case, you must inject in your use case the repository initalizated with their database, also if you have in your use-case another dependency you must inject in the initialization of the use-case, with your use-case with all of the dependencies instantiated, inject your use-case to the primary-adapter.
  - Life cycle of your implementation
    - Express API => USE-CASE => REPOSITORY => MONGO REPOSITORY => MONGO CLIENT => MONGO DB `NEEDS`
    - EXPRESS API <= USE-CASE <= REPOSITORY <= MONGO REPOSITORY <= MONGO CLIENT <= MONGO DB `INITIALIZATION`

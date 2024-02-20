

# Country Explorer

This project is built using React and Vite and is designed to display, filter, and group country information through GraphQL. It utilizes Apollo Client for `@apollo/client`, jotai for global state management, and lodash for utility functions. It is developed in TypeScript.

## Screenshot
![App Screenshot](https://github.com/haticesaike/country-explorer/blob/main/src/assets/country-explorer.png?raw=true)


## Getting Started

This section explains how to run the project on your local development environment.

### Prerequisites

Before running the project, ensure you have Node.js and npm (Node Package Manager) installed on your machine. For more information on installing Node.js and npm, visit the [Node.js website](https://nodejs.org/).

### Installation

1. Clone the repository:
```bash
git clone https://github.com/haticesaike/country-explorer.git
```

2. Navigate to the project directory:
```bash
cd country-explorer
```

3. Install the required npm packages:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

After these steps, project should be running on `localhost:3000` (or another port specified by Vite).

## Technologies Used

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [GraphQL](https://graphql.org/)
- [@apollo/client](https://www.apollographql.com/docs/react/)
- [jotai](https://jotai.pmnd.rs/)
- [lodash](https://lodash.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Features

- Fetch country information through GraphQL queries
- Display country information in the interface
- Filter countries by name, population, etc.
- Group countries by characteristics such as continent or currency


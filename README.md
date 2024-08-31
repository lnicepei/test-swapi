# SWApi test task

## Overview
In this project I used React Query to fetch data from the SWApi and ShadCN to create UI components. Despite the API not having the character update functionality, I added a Client-side simulation of the update process.

## Technologies Used
- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **React Query**
- **React Hook Form**
- **Notistack**
- **ESLint**
- **Jest**
- **ShadCN**

## Project Structure
The project follows a modular structure with a clear separation of concerns. Below is an overview of the main folders and their purposes:

    .
    ├── src
    │   ├── app/                # Application-level components and providers
    │   │   ├── index.tsx
    │   │   └── providers/
    │   │       ├── NotificationProvider.tsx
    │   │       ├── RouterProvider.tsx
    │   │       └── QueryProvider.tsx
    │   ├── pages/              # Page components
    │   │   └── character-details/
    │   │       ├── index.tsx
    │   │       ├── index.test.tsx
    │   │       └── useCharacter.ts
    │   │   └── characters/
    │   │       ├── index.tsx
    │   │       ├── index.test.tsx
    │   │       └── useCharacters.ts
    │   │   └── layout/
    │   │       └── index.tsx
    │   └── shared/             # Shared components, utilities, and types
    │       ├── api/            # API-related utilities
    │       ├── lib/            # Shared libraries and utilities
    │       ├── types/          # TypeScript types
    │       └── ui/             # Shared UI components, I used ShadCN
    │           ├── alert.tsx
    │           ├── avatar.tsx
    │           ├── button.tsx
    │           ├── card.tsx
    │           ├── input.tsx
    │           ├── Loader/     # Loader component
    │           │   └── index.tsx
    │           └── table.tsx
    └── README.md


## Environment Variables
The project uses environment variables to manage configuration settings. Below are the environment variables used in the project:

- **VITE_API_URL**: The base URL for the API.

Example `.env.local` file:
```
VITE_API_URL=https://swapi.dev/api/
```

## Scripts
The following scripts are available in the project:

- `dev`: Starts the development server.
- `build`: Builds the project for production.
- `lint`: Runs ESLint to check for code quality issues.
- `preview`: Previews the production build.
- `test`: Runs the test suite using Jest.

## Installation and Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/project-name.git
   ```
2. Navigate to the project directory:
   ```sh
   cd project-name
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a \`.env.local\` file and add the necessary environment variables:
   ```sh
   VITE_API_URL=https://swapi.dev/api/
   ```
5. Start the development server:
   ```sh
   npm run dev
   ```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
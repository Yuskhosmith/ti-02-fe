# Getting Started

1. Clone the Repository
    ```
    git clone https://github.com/Yuskhosmith/ti-02-fe.git
    ```

2. Install Dependencies
    Navigate into the project directory and install the required dependencies:
    ```
    cd ti-02-fe
    npm install
    ```

3. Set Up Environment Variables
    Create a .env file in the root directory and add the necessary environment variables, such as your backend API URL:
    ```
    PORT = 4000
    REACT_APP_API_URL='http://localhost:3000'
    ```

4. Run the Development Server
    Start the development server:
    ```
    npm start
    ```
    Your application will be available at http://localhost:4000.

5. Linting & Formatting
    To ensure consistent code formatting, Prettier is integrated into the project. You can format the code manually using:
    ```
    npm run format
    ```

## Available Scripts
- `npm start`: Runs the app in development mode.
- `npm run build`: Builds the app for production to the build folder.
- `npm run format`: Formats all the code using Prettier.


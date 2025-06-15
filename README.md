# Quiz App

A simple, interactive multiple-choice quiz application built with React.

## Features

*   **Multiple Choice Questions**: Presents users with questions, each having multiple answer options.
*   **Dynamic Question Display**: Shows one question at a time for focused engagement.
*   **Navigation**: Allows users to move to the next question after answering.
*   **Scoring**: Calculates and displays the final score at the end of the quiz.
*   **Randomization**:
    *   Questions are presented in a random order each time the quiz starts.
    *   Answer options for each question are also randomized.
*   **Instant Feedback**: Provides immediate feedback (correct/incorrect) after an answer is selected.
    *   Highlights the correct answer and the user's choice if incorrect.
*   **Restart Quiz**: Users can restart the quiz from the score screen.
*   **User-Friendly Interface**: Clean and intuitive UI with a clear header and responsive design elements.
*   **Loading State**: Displays a "Loading quiz..." message while questions are being prepared.

## Tech Stack

*   **JavaScript (ES6+)**
*   **React** (v18+)
*   **HTML5**
*   **CSS3**

## Project Structure

```
Quiz App/
├── public/
│   └── ... (vite public assets)
├── src/
│   ├── App.css         # Styles for the QuizApp component
│   ├── App.jsx         # Main QuizApp component logic and JSX
│   ├── index.css       # Global styles (Vite default)
│   └── main.jsx        # Application entry point
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── README.md           # This file
└── vite.config.js
```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v16 or later recommended)
*   npm (comes with Node.js) or yarn

### Installation

1.  Clone the repository (if it's on a version control system like GitHub):
    ```bash
    git clone <your-repository-url>
    cd "Quiz App"
    ```
2.  Install NPM packages:
    ```bash
    npm install
    ```
    or if you use yarn:
    ```bash
    yarn install
    ```

### Running the Application

To start the development server:
```bash
npm run dev
```
or
```bash
yarn dev
```
This will typically open the application in your default web browser at `http://localhost:5173` (the port might vary if 5173 is in use).

## Functional Requirements Met

*   At least 3 questions (currently 4) with question text, 3+ answer options, and one correct answer.
*   Displays one question at a time.
*   Navigation to the next question.
*   Final score at the end.

## Bonus Features Implemented

*   Randomized question and option order.
*   Shows correct/incorrect feedback.
*   Allows restart of the quiz.
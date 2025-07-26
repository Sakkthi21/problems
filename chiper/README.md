# Code Solver Suite

An elegant web application showcasing interactive solutions to four classic programming challenges. Built with React, TypeScript, and Tailwind CSS, this project provides a clean and intuitive interface for users to explore and understand different algorithms.

## Features

- **Interactive Solvers:** Hands-on interfaces for four distinct coding problems.
- **Caesar Cipher:** Encrypt and decrypt text with a customizable letter shift.
- **Indian Currency Formatter:** Format numbers according to the Indian numbering system (lakhs, crores).
- **List Combiner:** Merge list items based on a >50% positional overlap rule.
- **Loss Minimizer:** Find the optimal trade to minimize loss from a series of projected prices.
- **Sleek & Responsive UI:** A clean, modern interface that works seamlessly on all screen sizes, from mobile to desktop.
- **Dark Mode:** Easily switch between light and dark themes for comfortable viewing in any environment.

## The Challenges

1.  **Caesar Cipher:** A simple substitution cipher where each letter in the plaintext is shifted a certain number of places down or up the alphabet. This tool allows for both encoding and decoding.
2.  **Indian Currency Formatter:** Converts numeric values into a string formatted according to the Indian numbering system, where commas are used to group the last three digits, and then every two digits thereafter.
3.  **Combine Lists:** An algorithm that merges two lists of objects. An item from one list is combined with an item from another if their positional ranges overlap by more than 50% of either item's length.
4.  **Minimize Loss:** Given a sequence of prices over time, this tool calculates the best time to buy and sell a stock to incur the smallest possible financial loss.

## Tech Stack

-   **Framework:** [React](https://reactjs.org/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Module System:** ES Modules with [Import Maps](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) (no build step required for dependencies).

## Running Locally

This project is set up to run directly in the browser without a complex build process.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/code-solver-suite.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd code-solver-suite
    ```

3.  **Serve the files:**
    Since this project uses no build step, you can serve the `index.html` file using any simple static server.

    **Using Python:**
    ```bash
    # If you have Python 3 installed
    python -m http.server
    ```

    **Using VS Code:**
    Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension and click "Go Live" from the bottom-right status bar.

4.  **Open in your browser:**
    Visit `http://localhost:8000` (or the address provided by your server).

## Project Structure

```
/
├── components/           # React components for each challenge
│   ├── CaesarCipher.tsx
│   ├── IndianCurrencyFormatter.tsx
│   ├── ListCombiner.tsx
│   └── LossMinimizer.tsx
├── App.tsx               # Main application component routing to challenges
├── constants.tsx         # Shared constants (e.g., navigation items)
├── index.html            # Main HTML entry point with import maps
├── index.tsx             # React root renderer
├── metadata.json         # Project metadata
└── types.ts              # TypeScript type definitions
```

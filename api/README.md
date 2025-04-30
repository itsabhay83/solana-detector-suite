# Solana Detector Suite - Detection API

## Overview

This is the backend API component of the Solana Detector Suite, an open-source project designed to help identify and mitigate Solana dusting and address poisoning attacks. This API serves as the core analysis engine, processing Solana transaction data to detect suspicious activities based on known patterns and heuristics.

It leverages the power of the Helius API for fetching and parsing detailed Solana transaction information, enabling sophisticated analysis beyond basic transaction details. The API is built using Node.js, TypeScript, and the Express framework, providing a robust and scalable foundation.

## Features

*   **Transaction Analysis:** Accepts Solana transaction signatures and fetches detailed, parsed transaction data from Helius.
*   **Dusting Detection:** Implements heuristics to identify potential dusting attacks, including the distribution of tiny amounts of SOL or suspicious SPL tokens/NFTs.
*   **Address Poisoning Detection:** Analyzes transactions to detect potential address poisoning attempts, focusing on zero-value or low-value transfers from lookalike addresses designed to pollute transaction history.
*   **Extensible Design:** Built with modularity in mind, allowing for the future addition of new detection modules and heuristics.

## Getting Started

Follow these instructions to get the API running locally for development or testing.

### Prerequisites

*   **Node.js:** Version 18.x or later recommended.
*   **npm** or **yarn:** Package manager for Node.js.
*   **Helius API Key:** You need an API key from Helius (https://helius.dev) to fetch Solana transaction data. A free tier is available.

### Installation

1.  Clone the repository (if you haven't already) or navigate to the API directory within the unzipped project folder:
    ```bash
    cd path/to/solana-detector-suite/api
    ```
2.  Install the required dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Configuration

1.  Create a `.env` file in the root of the `api` directory.
2.  Add your Helius API key and specify the port for the server:
    ```dotenv
    HELIUS_API_KEY=YOUR_HELIUS_API_KEY_HERE
    PORT=3001
    ```
    Replace `YOUR_HELIUS_API_KEY_HERE` with your actual key. You can change the `PORT` if 3001 is already in use on your system.

### Running the API

*   **Development Mode:** To run the server with hot-reloading using `ts-node-dev`:
    ```bash
    npm run dev
    ```
*   **Production Mode:** To build the TypeScript code and run the compiled JavaScript:
    ```bash
    npm run build
    npm start
    ```

The API should now be running, typically at `http://localhost:3001`.

## API Endpoints (Example)

*(Note: These are illustrative examples. Refer to the actual route definitions in `src/server.ts` or relevant route files for precise endpoints and request/response formats.)*

*   `POST /analyze-transaction`: Accepts a JSON body containing a Solana transaction signature (`{ "signature": "..." }`). Fetches, parses, and analyzes the transaction, returning a report indicating potential dusting or poisoning flags.
*   `GET /check-address?address=<address>`: Potentially analyzes an address for known associations with malicious activities (implementation might vary).

## Contributing

Contributions are highly welcome and essential for making the Solana Detector Suite a powerful tool for the community! Whether you're fixing bugs, improving heuristics, adding new features, or enhancing documentation, your help is appreciated.

### How to Contribute

1.  **Fork the Repository:** Create your own copy of the project.
2.  **Create a Branch:** Make a new branch for your specific feature or bug fix (`git checkout -b feature/your-feature-name` or `bugfix/issue-description`).
3.  **Code:** Implement your changes or additions.
4.  **Test:** Ensure your changes work as expected and don't break existing functionality (adding unit/integration tests is highly encouraged!).
5.  **Commit:** Write clear and concise commit messages.
6.  **Push:** Push your changes to your forked repository.
7.  **Create a Pull Request (PR):** Submit a PR to the main repository, clearly describing the changes you've made and why.

### Areas for Contribution

*   **Improve Detection Heuristics:** Refine the logic for detecting dusting and address poisoning based on new patterns or research.
*   **Add New Attack Vectors:** Implement detection for other types of Solana scams (e.g., NFT wash trading, specific DeFi exploits).
*   **Enhance Performance:** Optimize API response times and resource usage.
*   **Add Unit/Integration Tests:** Increase code coverage and reliability.
*   **Improve Documentation:** Enhance this README, add code comments, or create more detailed API documentation.
*   **Refactor Code:** Improve code structure, readability, and maintainability.

### Code Style

Please follow standard TypeScript best practices. Ensure your code is well-formatted (consider using Prettier) and includes relevant comments where necessary.

### Reporting Issues

If you encounter a bug or have a suggestion, please open an issue on the GitHub repository, providing as much detail as possible.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


# Solana Detector Suite - Open Source Solana Security Tool

## Overview

Welcome to the Solana Detector Suite! This open-source project provides a set of tools designed to help users and developers identify and mitigate common security threats on the Solana blockchain, specifically focusing on **Dusting Attacks** and **Address Poisoning**.

The suite consists of two main components:

1.  **Detection API (`./api`):** A backend service built with Node.js, TypeScript, and Express. It leverages the Helius API to fetch and parse detailed Solana transaction data, applying heuristics to detect suspicious patterns indicative of dusting or address poisoning.
2.  **Dashboard (`./solana-detector-dashboard`):** A frontend application built with Next.js, React, and TypeScript. It provides a user-friendly interface to interact with the Detection API, allowing users to submit addresses or transaction signatures for analysis and view the results.

This central README provides a high-level overview and guides you through the complete local setup process. For more detailed information about each component, including specific features, API endpoints, and contribution guidelines, please refer to the individual README files within their respective directories:

*   [Backend API README](./api/README.md)
*   [Frontend Dashboard README](./solana-detector-dashboard/README.md)

## Project Goals

*   **Enhance Security Awareness:** Educate users about the risks of dusting and address poisoning on Solana.
*   **Provide Detection Tools:** Offer accessible, open-source tools for identifying potentially malicious transactions or addresses.
*   **Foster Community Collaboration:** Encourage developers to contribute to improving detection methods and expanding the suite's capabilities.

## Local Setup Guide

Follow these steps to set up and run the entire Solana Detector Suite locally.

### Prerequisites

*   **Node.js:** Version 18.x or later recommended.
*   **npm** or **yarn:** Package manager for Node.js.
*   **Helius API Key:** Required for the backend API to function. Obtain a free key from [Helius](https://helius.dev).
*   **Git:** (Optional, if cloning from a repository).

### Step 1: Get the Code

If you haven't already, download and unzip the project archive or clone the repository.

### Step 2: Set Up and Run the Backend API

1.  **Navigate to the API directory:**
    ```bash
    cd path/to/solana-detector-suite/api
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Configure Environment Variables:**
    *   Create a file named `.env` in the `api` directory.
    *   Add your Helius API key and desired port:
        ```dotenv
        HELIUS_API_KEY=YOUR_HELIUS_API_KEY_HERE
        PORT=3001
        ```
    *   Replace `YOUR_HELIUS_API_KEY_HERE` with your actual key.
4.  **Run the API (Development Mode):**
    ```bash
    npm run dev
    ```
    The API should now be running, typically at `http://localhost:3001`.

    *For more details, see the [API README](./api/README.md)*

### Step 3: Set Up and Run the Frontend Dashboard

**Important:** Ensure the backend API is running before starting the dashboard.

1.  **Open a new terminal window/tab.**
2.  **Navigate to the Dashboard directory:**
    ```bash
    cd path/to/solana-detector-suite/solana-detector-dashboard
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
4.  **Run the Dashboard (Development Mode):**
    ```bash
    npm run dev
    ```
    The dashboard should now be running. Open your web browser and navigate to `http://localhost:3000` (or the port specified by Next.js if 3000 is busy).

    *For more details, see the [Dashboard README](./solana-detector-dashboard/README.md)*

## Contributing

We welcome contributions from the community! Whether you want to improve the detection logic, enhance the dashboard UI/UX, add tests, or improve documentation, your help is valuable.

Please refer to the contribution guidelines in the individual README files for each component:

*   [API Contribution Guide](./api/README.md#contributing)
*   [Dashboard Contribution Guide](./solana-detector-dashboard/README.md#contributing)

## License

This project is licensed under the MIT License. See the LICENSE files within the `api` and `solana-detector-dashboard` directories for details.


# Solana Detector Suite - Dashboard

## Overview

This is the frontend dashboard component of the Solana Detector Suite, an open-source project dedicated to identifying and visualizing Solana dusting and address poisoning attacks. This dashboard provides a user-friendly interface to interact with the [Detection API](../api) and visualize potential threats associated with Solana addresses or transactions.

Built with Next.js, React, TypeScript, Tailwind CSS, and Shadcn/UI, the dashboard offers a modern, responsive, and informative experience for users looking to assess the security risks related to Solana activity.

## Features

*   **Address/Transaction Input:** Allows users to input a Solana address or transaction signature for analysis.
*   **Analysis Results Display:** Clearly presents the analysis results received from the backend API, highlighting potential dusting or address poisoning flags.
*   **Data Visualization:** (Potential Feature) Includes charts (using Recharts) or tables to visualize historical data or trends related to detected threats (e.g., frequency of attacks, common malicious token types).
*   **Recent Detections:** (Potential Feature) Displays a table of recently detected suspicious activities.
*   **Responsive Design:** Adapts to various screen sizes for usability on both desktop and mobile devices.

## Getting Started

Follow these instructions to get the dashboard running locally for development or testing.

### Prerequisites

*   **Node.js:** Version 18.x or later recommended.
*   **npm** or **yarn:** Package manager for Node.js.
*   **Running Detection API:** The dashboard relies on the backend API being accessible. Ensure you have the [Detection API](../api) set up and running locally (usually at `http://localhost:3001`) or deployed elsewhere.

### Installation

1.  Clone the repository (if you haven't already) or navigate to the dashboard directory within the unzipped project folder:
    ```bash
    cd path/to/solana-detector-suite/solana-detector-dashboard
    ```
2.  Install the required dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Configuration

By default, the dashboard expects the API to be running at `http://localhost:3001`. If your API is running on a different URL or port, you may need to update the API endpoint references within the dashboard's code (e.g., in utility functions or component fetch calls).

### Running the Dashboard

*   **Development Mode:** To run the Next.js development server:
    ```bash
    npm run dev
    ```
    Open your web browser and navigate to `http://localhost:3000` (or the port specified by Next.js if 3000 is in use).

*   **Production Mode:** To build the application for production and start the server:
    ```bash
    npm run build
    npm start
    ```

## Contributing

Contributions are highly encouraged to improve the dashboard's functionality, user experience, and visualization capabilities! Your efforts can help make Solana security more accessible to everyone.

### How to Contribute

1.  **Fork the Repository:** Create your own copy of the project.
2.  **Create a Branch:** Make a new branch for your specific feature or bug fix (`git checkout -b feature/your-feature-name` or `bugfix/issue-description`).
3.  **Code:** Implement your changes or additions, focusing on clean, reusable React components and clear state management.
4.  **Test:** Ensure your changes render correctly, are responsive, and interact properly with the API. Test across different browsers if possible.
5.  **Commit:** Write clear and concise commit messages.
6.  **Push:** Push your changes to your forked repository.
7.  **Create a Pull Request (PR):** Submit a PR to the main repository, clearly describing the changes you've made, the motivation behind them, and include screenshots if applicable.

### Areas for Contribution

*   **Improve UI/UX:** Enhance the user interface design, layout, and overall user experience.
*   **Add Visualizations:** Implement new charts or data displays to better represent threat data (e.g., using Recharts, Nivo, or other libraries).
*   **Integrate More API Features:** Add UI elements to interact with potentially new API endpoints.
*   **Improve Responsiveness:** Ensure the dashboard works flawlessly on various mobile devices and screen sizes.
*   **Add Accessibility Features:** Improve accessibility (a11y) for users with disabilities.
*   **Refactor Components:** Improve the structure and reusability of React components.
*   **Enhance State Management:** Optimize how data is fetched, stored, and updated.
*   **Improve Documentation:** Update this README or add comments within the code.

### Code Style

Please adhere to standard React/TypeScript best practices and the existing code style. Utilize Tailwind CSS utility classes for styling and leverage Shadcn/UI components where appropriate. Ensure code is well-formatted (consider using Prettier).

### Reporting Issues

If you find a bug or have a suggestion for improvement, please open an issue on the GitHub repository, providing detailed steps to reproduce or a clear description of your idea.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


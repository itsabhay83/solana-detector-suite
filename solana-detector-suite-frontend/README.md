
# Superteam Security Dashboard

A modern, responsive, and open-sourced frontend dashboard that rehashes the original Superteam Security handbook into an interactive platform for tracking and analyzing exploits in the Solana ecosystem.

## Features

### Dashboard
- Overview of key security metrics
- Summary of recent exploits
- Exploit type breakdown
- Timeline of security events
- Live hack alerts

### Exploits Explorer
- Comprehensive list of Solana ecosystem exploits
- Filter by recency, severity, and funds recovered
- Search functionality to find specific exploits
- Detailed card view of each exploit

### Analytics
- Visualizations of exploit trends over time
- Breakdown of exploit types and frequencies
- Analysis of funds lost and recovered
- Response time metrics

### Live Hack Tracker
- Real-time monitoring of potential security incidents
- Status updates on active security threats
- Auto-refreshing data every 30 seconds
- Manual refresh option

### Resources
- Curated security best practices
- Educational resources for developers
- Links to security tools and services

## Technologies

- React + Vite
- TypeScript
- TailwindCSS
- Recharts for data visualization
- React Router for navigation
- React Query for data fetching
- RainbowKit + Wagmi for Ethereum wallet connection
- Solana Wallet Adapter for Solana wallet connection
- Shadcn/UI for UI components

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Run the development server with `npm run dev`
4. Open [http://localhost:5173](http://localhost:5173) to view the app

## Wallet Connection

The dashboard supports both Ethereum and Solana wallet connections:

- Ethereum: Using RainbowKit and Wagmi
- Solana: Using Solana Wallet Adapter

## Authentication

Authentication is handled via email/password login. User session is managed in the browser for demo purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

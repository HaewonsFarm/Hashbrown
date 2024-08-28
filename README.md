# Blockchain-based e-Wallet for Identity and Credential Management

## Project Overview

This project is a mobile application that leverages blockchain technology and hashing algorithms to securely manage user data within an e-Wallet. The app is designed to store and manage digital identity credentials and other forms of verifiable credentials, following the standards set by the W3C's DID (Decentralized Identifier) and VC (Verifiable Credentials) data models.

### Development Focus: Blockchain-based e-Wallet for Identity and Credential Management

- **Identity Verification**: Confirm the identity of users in a decentralized manner.
- **Credential Verification**: Ensure that users have the necessary credentials to access specific services.
- **Identity Documents**: Adheres to W3C's DID and VC standards for decentralized identity and verifiable credentials.
   - Understanding DID by W3C (Korean)
   - DID Technical Information
  
## Used Tools and languages
- React Native & Expo
- MySQL
- Infura (Ethereum blockchain)
- TypeScript, JavaScript
- Solidity: For writing smart contracts that manage identity and credential verification on the blockchain.

## Installation
To set up this project locally, follow these steps:

Clone the repository:

```sh
git clone https://github.com/HaewonsFarm/Hashbrown.git
```

Navigate to the project directory:
```sh
cd Hashbrown
```

Install the required dependencies:
```sh
npm install
```

Start the development server:
```sh
npm run android
```

## Usage
### Identity and Credential Management
- Identity Verification: Users can verify their identity through a secure, blockchain-based process that stores and manages decentralized identifiers (DIDs).
- Credential Verification: The app enables users to store and present verifiable credentials (VCs) for access to various services.
### Blockchain Integration
The application integrates with the Ethereum blockchain via Infura to manage DIDs and VCs, ensuring that all operations are secure, transparent, and decentralized.

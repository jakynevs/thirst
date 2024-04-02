# Thirst App

Welcome to the Thirst App, a virtual vending machine designed to quench thirst with just a few clicks. Powered by a Full-Stack TypeScript skeleton with Express and React, this app is encapsulated within Docker to streamline setup and ensure consistency across different environments.

## Features

- **Easy Drink Ordering** - Users can select their desired drink type, insert the amount of money, and enjoy their choice effortlessly.

- **Real-time earnings tracker** - The app includes a feature for the owner to see how much money is earned in real-time, providing valuable insights into the business's performance.

## How it Works

The Thirst App operates on two main components:

- **API**: At the core of the app, the API handles the business logic, processing drink orders based on input parameters and maintaining earnings data.
- **Web App**: A user-friendly web page where individuals input their drink choices and money. The web app communicates directly with the API to fetch and display the outcome.

## Business Logic

Mimicking a traditional vending machine, users need to insert money and select their drink type. The app then delivers the beverage if sufficient funds are provided and the selected drink is available.

### Parameters:

- **drinkType**: string (required) - specifies the ordered drink.
- **moneyAmount**: float (required) - represents the coins inserted by the user.

Errors are communicated back to the user, providing feedback on the transaction outcome.

### Extra Feature

To meet the business owner's needs, the app tracks and displays the total earnings from all transactions, ensuring every product sale is accounted for.

## Getting Started
To get the Thirst App running on your local machine, follow these steps:

### Docker
This app leverages Docker to simplify the setup and execution process, ensuring that you have a consistent development environment. Follow these steps to get the app up and running:

#### Prerequisites

- Ensure Docker is installed on your machine. If not, download and install it from the Docker website.
- Make sure '**make**' is installed on your system. It's usually pre-installed on Linux and macOS. Windows users might need to install it through a package manager or WSL.

### Clone the Repository

First, clone the repository to your local machine:

```
git clone https://github.com/yourusername/thirst-app.git
cd thirst-app
```

### Running the App

Within the cloned repository, run the following command:

```
make up
```

This command does the following:

- Installs Yarn dependencies.
- Starts the entire application stack using Docker.

As defined in the Makefile, '**make up**' automatically handles the dependencies as well.

### Accessing the App

Once the application is running, you can access it at:

- **Frontend (React)**: http://localhost:3000 - to interact with the virtual vending machine.
- **Backend (Express API)**: http://localhost:8000/ping - to verify the backend is operational.

### Resetting the Database

To reset the database (your data.json file), follow these steps:

1. Navigate to where '**data.json**' is located within your project.
2. Replace its contents with 0 values.

Since the app is running in Docker, you might need to restart the Docker container for the changes to take effect:

```
make down
make up
```

'**make down**' stops and removes the containers, ensuring a fresh state on the next '**make up**' command.
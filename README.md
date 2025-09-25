# iShop4U Dashboard

iShop4U Dashboard is a comprehensive web application designed to provide insightful analytics and management tools for an e-commerce platform. It features a user-friendly interface with various data visualizations, product management, and authentication.

## Features

*   **User Authentication:** Secure login and signup with Firebase.
*   **Dashboard Overview:** Centralized view of key metrics.
*   **Sales Graph:** Visualize sales trends over time.
*   **Donut Chart:** Display product category distribution.
*   **Items Shipped:** Track and summarize shipped items.
*   **Level Comparison:** Compare performance across different levels.
*   **Top Products:** Identify best-selling products.
*   **Product Management:** View and manage product listings.
*   **Shopping Cart:** Functionality to add and manage items in a cart.

## Technologies Used

**Frontend:**

*   React.js (with Vite)
*   Tailwind CSS
*   Firebase (Authentication)

**Backend:**

*   Flask (Python)
*   SQLite (Database)

## Setup and Installation

To get the iShop4U Dashboard up and running on your local machine, follow these steps:

### Prerequisites

*   Node.js (LTS version recommended)
*   npm or Yarn
*   Python 3.x
*   pip

### 1. Clone the Repository

```bash
git clone <repository-url>
cd project-phase-4-1
```

### 2. Frontend Setup

Navigate to the project root directory and install the frontend dependencies:

```bash
npm install
# or yarn install
```

To start the frontend development server:

```bash
npm run dev
# or yarn dev
```

The frontend application will typically run on `http://localhost:5173`.

### 3. Backend Setup

Navigate to the `backend` directory and install the Python dependencies:

```bash
cd backend
pip install -r requirements.txt
```

To run the Flask backend server:

```bash
python app.py
```

The backend API will typically run on `http://127.0.0.1:5000`.

### 4. Firebase Configuration

Ensure your Firebase configuration is set up in `src/firebase/config.js` with your project's credentials.

## Project Structure

*   `public/`: Static assets.
*   `src/`: Frontend React application source code.
    *   `assets/`: Images and other static assets.
    *   `components/`: Reusable React components.
    *   `contexts/`: React Context API for global state management.
    *   `firebase/`: Firebase configuration.
    *   `pages/`: Page-level React components.
*   `backend/`: Flask backend application source code.
    *   `instance/`: SQLite database file (`ishop4u.db`).

## Deployment

The project includes a `render.yaml` file for deployment to Render.com, enabling easy continuous deployment for both frontend and backend services.

## Usage

After setting up both the frontend and backend, open your web browser and navigate to the frontend URL (e.g., `http://localhost:5173`). You can then sign up or log in to access the dashboard features.

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details. (Note: A `LICENSE` file is not currently present in the repository, consider adding one.)

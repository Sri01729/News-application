# Top Stories Aggregator

## Overview

The Top Stories Aggregator is a web application that allows users to explore and search for the latest top stories from the New York Times. The application leverages the New York Times Developers API to fetch and display news articles dynamically.

## Features

- **Top Stories Grid:** View the latest top stories in a grid layout with images and headlines.
- **Search Functionality:** Enter a search keyword to fetch articles based on the user's interests.
- **Responsive Design:** The application is designed to be responsive, providing a seamless experience across various devices.

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Feathers.js
- **Database:** MariaDB
- **External API:** New York Times Developers API

## Setup

1. **Clone the repository:**

   ```
   git clone https://github.com/your-username/top-stories-aggregator.git
   cd top-stories-aggregator
   ```
2. **Install dependencies:**

    ```
    npm install
    ```
3. **Set up the MariaDB database and configure the connection in config/default.json.**

4. **Obtain a New York Times API key and update it in the config/default.json file.**

## Run the application:
    npm start
    
The application will be accessible at http://localhost:3030.

## Database Schema
  The MariaDB database should have the following schema:
  
  Table: stories  
  id (INT, PRIMARY KEY, AUTO_INCREMENT)  
  headline (VARCHAR)  
  snippet (TEXT)  
  imageUrl (VARCHAR)  
  fullArticleLink (VARCHAR)  
  keyword (VARCHAR)  

## Usage
  Open the application in your web browser.
  Explore the latest top stories in the default section.
  Use the search bar to enter keywords and fetch articles related to your interests.

# YamiNews Website Project

This project is a news website built using **Next.js**, **Node.js**, and **Tailwind CSS**. It integrates multiple API services to provide real-time news, weather, and financial data. **Context API** and **Firebase Authentication** are used for user authentication. The news data is periodically synchronized and stored in Firestore using cron jobs to ensure up-to-date content while adhering to API rate limits and avoiding exceeding free plan quotas.

## Features

- **Frontend with Next.js:** Delivers a dynamic and performant user interface.
- **Backend with Node.js:** Manages API integrations for news and data synchronization.
- **Tailwind CSS for UI Design:** Provides a modern and responsive design.
- **NewsAPI, CurrentsAPI, GNews, WeatherAPI, and Alpha Vantage API integration:** Offers real-time news, weather updates, and financial data.
- **Context API with Firebase Authentication:** Manages user authentication.
- **Firestore for Data Storage:** News and other data are stored in Firestore, synchronizing to overcome Firebase free plan limitations.

## API Integrations

- **NewsAPI:** Fetches the latest news.
- **CurrentsAPI:** Aggregates news from various sources.
- **GNews:** Provides global news coverage.
- **WeatherAPI:** Fetches weather data.
- **Alpha Vantage API:** Supplies financial and stock market information.

## Technologies

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **TypeScript**: A superset of JavaScript that adds static types to the language.
- **Database:** Firestore (Firebase)
- **Authentication:** Firebase Authentication
- **Other Technologies:** Context API, Firebase Firestore, API Integrations, Formik, Yup

## Setup

To run the project locally, follow these steps:

1. Clone this repository:
   ```bash
   git clone https://github.com/username/news-website-project.git
   ```

## Contributing

We welcome contributions from the community. If you find any issues or have suggestions for improvement, please feel free to open an issue or create a pull request.

## Project GIF

![Project Snapshot](/yaminews.gif)

## Contact

If you have questions or suggestions, please feel free to reach out:

- [LinkedIn Profile](https://www.linkedin.com/in/imoguz)
- [Email Address](mailto:imoguz0510@gmail.com)

# ☕ GetMeACoffee

A full-stack creator support platform built with Next.js that allows creators to receive contributions from their audience, along with personalized messages.

🔗 **Live Demo:** [GetMeACoffee](https://get-me-a-coffee-psi.vercel.app)

## 📌 About the Project

GetMeACoffee is a web application inspired by creator-support platforms. It allows creators to set up personalized profiles and receive financial contributions from supporters.

The project focuses on implementing authentication, database operations, payment integration, and deployment in a modern full-stack web application.

## ✨ Features

- **GitHub Authentication** — Sign in using GitHub OAuth with NextAuth.js.
- **Personalized Creator Profiles** — Custom usernames and profile information.
- **Payment Integration** — Razorpay integration for creating payment orders.
- **Supporter Messages** — Supporters can include a name and message with their contribution.
- **Database Integration** — MongoDB Atlas for persistent data storage using Mongoose.
- **Responsive UI** — Interface styled with Tailwind CSS.
- **Cloud Deployment** — Deployed using Vercel.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | Full-stack React framework |
| React | User interface |
| Tailwind CSS | Styling and responsive layouts |
| NextAuth.js | GitHub authentication |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB object modeling |
| Razorpay | Payment order integration |
| Vercel | Deployment and hosting |

## ⚙️ Getting Started

Follow these steps to run the project locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm
- A MongoDB Atlas account
- A GitHub OAuth application
- A Razorpay account for payment functionality

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd YOUR_PROJECT_FOLDER
```

Replace the placeholders with your GitHub repository URL and project directory.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory.

Add the variables required by your application:

```env
MONGO_URI=your_mongodb_atlas_connection_string

GITHUB_ID=your_github_oauth_client_id
GITHUB_SECRET=your_github_oauth_client_secret

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

Add any additional environment variables required by your payment integration or other application features.

**Important:**
- Replace the example values with your own credentials.
- Configure the GitHub OAuth callback URL for local development as `http://localhost:3000/api/auth/callback/github`.
- For production, configure `NEXTAUTH_URL` to use your deployed domain.
- Never commit `.env.local` or expose database credentials, OAuth secrets, or payment secrets in your repository.
- Ensure `.env.local` is included in `.gitignore`.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Authentication

The application uses GitHub OAuth through NextAuth.js to authenticate users.

To configure authentication:

1. Create an OAuth application in GitHub Developer Settings.
2. Configure the appropriate homepage and callback URLs.
3. Add the OAuth client ID and client secret to your environment variables.
4. Configure the required authentication secret.

## 💳 Payment Integration

Razorpay is used to create payment orders for creator contributions.

The application uses server-side logic to create orders and stores contribution details in MongoDB.

To enable payment functionality, configure the required Razorpay credentials securely. Use Razorpay test mode while developing and testing the payment workflow.

## 🗄️ Database

MongoDB Atlas is used for cloud-based data storage, with Mongoose handling database models and queries.

The application stores user profile information and payment records.

## 🚀 Deployment

The application is deployed on [Vercel](https://vercel.com/).

To deploy your own instance:

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add the required environment variables in your Vercel project settings.
4. Configure your production GitHub OAuth callback URL.
5. Ensure MongoDB Atlas network access allows connections from your deployment.
6. Deploy and test authentication and payment functionality.

## 📚 What I Learned

Through this project, I gained practical experience with:

- Building a full-stack application using Next.js.
- Implementing GitHub OAuth authentication.
- Connecting a Next.js application to MongoDB Atlas using Mongoose.
- Managing environment variables across development and production.
- Integrating payment order creation with Razorpay.
- Deploying a web application using Vercel.
- Debugging production configuration and database connection issues.

## 🔮 Future Improvements

- Improve payment verification and transaction status handling.
- Add creator analytics and contribution summaries.
- Improve error handling and loading states.
- Strengthen authentication, input validation, and security.
- Add automated tests for critical application flows.

## 👨‍💻 Author

**Abdullah**

- GitHub: [Your GitHub Profile](https://github.com/YOUR_GITHUB_USERNAME)
- LinkedIn: [Your LinkedIn Profile](https://www.linkedin.com/)

---

If you find this project interesting, feel free to explore the live demo or the source code.

⭐ If you like the project, consider giving the repository a star!

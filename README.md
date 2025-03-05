# User List App

This is an Angular application that fetches user data from an API and displays their details along with their posts. The app includes proper error handling to ensure smooth performance even when API requests fail.

## Features
- Fetches users from `https://jsonplaceholder.typicode.com/users`.
- Fetches user posts from `https://jsonplaceholder.typicode.com/posts?userId=`.
- Displays user details including name, email, and address.
- Displays user posts in a structured format.
- Implements error handling to prevent crashes on API failures.

## Technologies Used
- **Angular** (Standalone Components)
- **RxJS** (Observables and Error Handling)
- **Bootstrap** (Styling)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/user-list-app.git
   cd user-list-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the application:
   ```sh
   ng serve
   ```
4. Open your browser and navigate to:
   ```
   http://localhost:4200/
   ```

## Error Handling
- If user data fetching fails, an error message is displayed instead of breaking the app.
- If post data fetching fails, the app continues to display users without posts.
- Logs errors to the console for debugging.

## Project Structure
```
user-list-app/
│── src/
│   ├── app/
│   │   ├── user.service.ts  # Handles API requests with error handling
│   │   ├── user-list/
│   │   │   ├── user-list.component.ts  # Main user listing logic
│   │   │   ├── user-list.component.html  # UI Template
│   │   │   ├── user-list.component.css  # Styling
│── README.md
│── angular.json
│── package.json
```

## License
This project is licensed under the MIT License.

---

**Author:** Turki Aloufi  
For any issues or suggestions, feel free to create a pull request or open an issue!


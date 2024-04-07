
## PUSTAKASARASWATHA

### To Start

1. **Clone the Repository:**
   - Ensure that you have Git installed on your machine.
   - Run the following command in your terminal:
     ```bash
     git clone https://github.com/sanchaya/pustakasaraswatha.git
     ```

2. **Setup Backend:**
   - Navigate to the `server` folder using:
     ```bash
     cd server
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `server` folder and add your MongoDB connection string:
     ```env
     ATLAS_STRING=mongodb://localhost:27017/your-database-name
     ```
   - Start the backend:
     ```bash
     node index.js or npm run start
     ```

3. **Setup Frontend:**
   - Navigate to the `search` folder using:
     ```bash
     cd publisher-portal
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
     - Create a `.env.local` file in the `publisher-portal` folder and add your clerk api:
     ```env
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY='publishable key'
      CLERK_SECRET_KEY='secret key'
     ```
   - Start the client:
     ```bash
     npm run dev
     ```

4. **Deploying:**
   - To deploy on a server:
     - Navigate to the `publisher-portal` folder:
       ```bash
       cd publisher-portal
       ```
     - Build the project:
       ```bash
       npm run build
       ```
     - Deploy the built files on your server.

### Additional Information

- **Environment Variables:**
  - Ensure that the `.env` file in the `server` folder is properly configured with your MongoDB connection string.
  - Ensure that the `.env.local` file in the `publisher-portal` folder is properly configured with your clerk api.


- **Dependencies:**
  - Make sure you have Node.js and npm installed on your machine before running the setup.




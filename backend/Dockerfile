# 1. Use an official Node.js base image
FROM node:18

# 2. Set working directory inside container
WORKDIR /app

# 3. Copy all files into the container
COPY . .

# 4. Install dependencies
RUN npm install

# 5. Expose port (adjust if needed)
EXPOSE 5000

# 6. Run the backend
CMD ["npm", "start"]

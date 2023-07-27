FROM node:18-slim
ADD app.js app.js
CMD ["node", "app.js"]

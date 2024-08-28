# Description

This is a web application chat-bot that is taking on my identity

# Accessing the Bot

1. The bot can be accessed via ```https://intro-ai-jaredpek.vercel.app/```
   - This is the chat page for my personal chat-bot
      - It leverages retrieval augmented generation to embed relevant information to any prompt that is received (have attached an architecture diagram for reference)
   - Feel free to ask any questions regarding my profile!

# Tech Stack

1. Framework
   - Next.js
      - Easy and quickly develop both front and back-ends of the application
      - Allows server-side operations and rendering
2. Database
   - MongoDB noSQL database
   - MongoDB vector search index and semantic search
3. GAI Model
   - Gemini 1.5 Flash (API)
5. Deployment
   - Vercel (AWS)
      - Easy and convenient deployment
         - In-built CI/CD pipeline
         - Free domain name + SSL certification

# Approach

## Pre-Processing
1. Prepare my profile in markdown format in a ```.txt``` file
2. Use a markdown text splitter to split my profile text file into chunks
   - Markdown ensures that chunks are labelled with a specific "category"
   - Reduces likelihood of obtaining chunks from other irrelevant categories when a prompt is received and analysed via the MongoDB semantic search
3. Create vector embeddings for each chunk using Google's generative AI text embedding model and save them onto a MongoDB collection
4. Create a vector search index based on the vector embeddings that were saved to the collecion
   - Uses euclidean distance to determine the similarity between the prompt and the chunks

## Generation and Operation
1. Users send a message to the bot, which makes a request to the ```/api/chat``` API endpoint
2. The chat is first initialised with an initial system prompt
   - Instructions on how the model should respond and the role that it should undertake
   - Semantic search is conducted for prompt on the relevant chunks via the MongoDB vector search index, which allows us to obtain relevant chunks of information from the database
3. Send the initial prompt, together with the user chat history and the newly received message to the Gemini API, and generate a response from the LLM
4. Send the response back to the user

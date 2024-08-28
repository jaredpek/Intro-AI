# Description
This is a web application aimed at enabling users to create their very own AI chat-bot based on their own profiles. Anyone will be able to chat with the bot and receive responses based on the user's provided profiles.

# Accessing the Deployed Application
1. The website can be accessed via ```https://intro-ai-jaredpek.vercel.app/```
   - This is where users will be able to authenticate, create an account and update their profile
   - Users may also obtain the link to their personal chat-bot by clicking on "Start Chatting" on the home-page or "Chat" on the navigation bar
   - The link to the personal chat-bot can be shared with anyone, so others can chat with it as well
2. My personal chat-bot can be accessed via ```https://intro-ai-jaredpek.vercel.app/chat/66c273f74cb6d9dbfd680dd8```
   - This is the chat page for my personal chat-bot, which will respond based on the profile that I had previously provided
   - Feel free to ask any questions regarding my profile!

# Tech Stack
1. Framework
   - Next.js
      - Used for ease and speed of development
      - Monolithic architecture
      - Will have to migrate to a multi-layered architecture in the future to allow for greater reliability and scalability
2. Database
   - MongoDB (NoSQL)
3. GAI Model
   - Gemini 1.5 Flash (API)
5. Deployment
   - Vercel (AWS)
      - Used for ease of deployment
         - In-built CI/CD pipeline
         - Free domain name + SSL certification
      - Will have to migrate onto a more production-ready environment via cloud platforms like AWS or GCP in the future
         - More control over every aspect of our infrastructure
         - Multi-layered cloud architecture with load balancing and dynamic scaling for enhanced scalability, reliability and cost-effectiveness

# Prompt Approach
1. Obtain user profile from database in JSON format
2. Initialise chat with an initial prompt
   - Instructions on how the model should respond
   - User's profile that is obtained above in JSON format
   - Initial prompt is hidden from all users
3. Provide any other prompt that is provided by users who want to chat

# Remarks
Currently developing this applcation while making my way to my exchange campus in Sweden (travelling and flights throughout the week), so more updates will be rolled out again! Feel free to contact me via jaredpek2000@gmail.com, or +6596515321

# Welcome to DreamyNote

### Live Site:
* https://dreamy-note.onrender.com

DreamyNote is a journaling app that let's you record and keep track of your Dreams. Dreams can lend a powerful insight into our subconsious, and writing them down in a Journal is a great way to keep track and reflect on the dreams we have every night!

<img width="1267" alt="Screenshot 2023-03-06 at 6 36 27 PM" src="https://user-images.githubusercontent.com/104462124/223305833-88606e58-6763-41dc-a846-9368f280430f.png">
<img width="1274" alt="Screenshot 2023-03-06 at 6 36 59 PM" src="https://user-images.githubusercontent.com/104462124/223305880-65cdf8ea-747b-4650-a7d7-077295f08484.png">
<img width="1270" alt="Screenshot 2023-03-06 at 6 37 11 PM" src="https://user-images.githubusercontent.com/104462124/223305893-a9eb8c9d-ff43-4fb3-9626-14276c362c98.png">
<img width="1263" alt="Screenshot 2023-03-06 at 6 38 40 PM" src="https://user-images.githubusercontent.com/104462124/223305899-8c01e52d-be91-4ebf-b918-6e3867c46dfc.png">
<img width="1455" alt="Screenshot 2023-03-06 at 6 21 08 PM" src="https://user-images.githubusercontent.com/104462124/223305914-390a848b-457d-4487-b1db-b4710cacc482.png">


### Technologies used:
* Javascript/ Nodejs
* Python/ Flask
* React/ Redux
* Quilljs Rich Text Editor
* SQLAlchemy/ Alembic
* SQLite/ PostgreSQL


### MVP Core Features 
* Create, view, update, and delete Dream entries
* Create, view, update, and delete Journals to organize your dream entries.
* Create theme tags for your dream entries to keep track of recurring themes or motifs in your dreams

#### What's up next
* Dashboard page with widgets related to these features.


### Contact Me
Created by Alex Vance
alexkvance@gmail.com
LinkedIn: https://www.linkedin.com/in/alex-vance-503537234/


### Get Started Locally
1. Locally clone this repository
2. In the root directory, run ```pipenv install -r requirements.txt```
3. Then run ```pipenv shell``` , ```flask db upgrade```, and ```flask seed all``` to set up the database, and ```flask run``` to start the backend server.
4. cd into the react-app directory and run ```npm install```, then ```npm start``` to run the frontend server.

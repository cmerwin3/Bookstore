# Project Storepage

## Overview
This site functions as a simplistic book store allowing all the functionality that a customer would expect in an online store.

### Technologies Used
    - Javascript 
    - React
    - Express
    - Sequelize
    - SQLite
    - HTML 
    - CSS

### Archetecture
The core functionality is carried out by three layers.
1. UI (Javascript, React, HTML, CSS)
    - A React client with intuitive controls that uses state storage to display content.
    - Using a single React page the client is dynamically updated based on current user state. 
2. Server (Javascript, Express, Sequelize)
    - Views handle the REST API requests to retrieve and/or store book, user, and order data. 
    - Models define the structures for the business entities such as books and orders. 
3. Database (SQLite)


## REST API
The UI sends requests to the server to intiate actions such as book search, place order, and order search. 


## React Components
The components in the React structure are divided into two sections of dipalay: the HeadderBar that is at the top of all pages for ease of navigation, and the PageBody which dynamically displays all other content. 

### AppState
The AppState class is used to carry over information such as shopping cart, current selection, and user data throughout the shopping process. Using a state for each customer allows the tracking of this individualized session data that can be passed around to all pages.


### PageBody
The PageBodyfile functions as a traffic cop to display the different content pages such as search results, book details, the contents of a shopping cart, and the checkout page. Each of these is a defined diplay that is stored in the App State. 


### HeadderBar
The HeadderBar of the page contains the search bar, user data, and shopping cart navigation. Each of these child components can signal to the page body what to be displayed next based on the current appstate. The core function if the headder is to facilitate navigation while being a consistant display between page displays.




## Versions
- V1  Basic store page functionality 


## Author
### Cameron Merwin 
[Linkedin Profile](https://www.linkedin.com/in/cameron-merwin-a4316320b/)

## License
This project is licensed under the [Apache License V2.0](https://github.com/cmerwin3/Adventure_Project/blob/master/LICENSE.txt)


## Unit Testing
Testing is divided between the /client directory and the /server directory. The front end tests focus on displaying content properly and the changes in appState with the standard React testing library. The back end tests focus on the calculations, data storage, and rest api calls.
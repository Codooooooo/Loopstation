ITCS212 - Web Programming

# Loopstation--Second-hand Recycling Platform for Mobile Phones, Pad, and Wearable Devices.

This project is a web application that allows users to sell their used mobile phones, pad, and wearable devices online.
The project consists of the following pages: Home, Login, Search, Detail, Product/Service Management, User Account Management, About Us.

There are our teammates:
Chusong Xu
- Homepage
- Product Details
- About Us
- The link between backend and frontend
- Search product function 
- The add, edit, and delete function for product
- Create database and design


Lingrui Dong
- Product Manage Page
- Account Manage Page
- Login Page
- The link between backend and frontend
- Login Function
- Search administrators function
- The add, edit, and delete function for administrators

Yunduo Luo
- Search Page
- Product Details
- Navigation Diagram
- The link between backend and frontend
- Exchange Rate Conversion API

Short introduction:
     In this project, we use concurrently package to run the frontend and backend web service at the same time. So you may need an introduction about how to run it.

How to run
1. Please enter the sec1_gr11_ws_src folder first
    You can type this in your terminal

    cd sec1_gr11_ws_src

2. After you enter the  sec1_gr11_ws_src folder
    Install all packages that this project needs

    npm install

3. Please enter the backend folder
    Install all packages that this project needs

    npm install

4. Please enter the frontend folder
    Install all packages that this project needs

    npm install

5. Run the lsdb.sql in backend to create the database(Recommend use MySQL Workbench 8.0 CE) And you should following the building environment in .env file

6. Go back to the sec1_gr11_ws_src folder

    cd..

7. Now you have already done all the necessary things you can type 
    
    npm start

For API:
    The API provider is Fixer API.
    The API Key can be invoked by simply selecting the currency type from the page drop-down bar, but due to the API provider's very slow servers, it can take a while to change the currency for the first time. 
    
<div align="center">

<img src="app/frontend/public/image/logo.png" alt="Loopstation logo" width="260">

# Loopstation

**A second-hand trading platform for phones, tablets and wearables**

`HTML / CSS / JavaScript` · `Node.js` · `Express` · `MySQL`

</div>

Loopstation is a web platform for buying and selling used phones, tablets and wearables. Visitors browse and search listings and view a detailed test report for each device; administrators sign in to manage products and admin accounts.

<p align="center">
  <img src="docs/screenshots/home.jpg" alt="Homepage" width="49%">
  <img src="docs/screenshots/detail.jpg" alt="Product detail with test report" width="49%">
</p>

## Features

| Module | Description |
|---|---|
| Homepage | Listings grouped into three categories: phones, tablets and wearables |
| Search | Search products by name and type |
| Product detail | Device photos and a test report: condition, battery health, warranty status, charge cycles and more |
| Currency conversion | Switch the displayed price between currencies via the Fixer API |
| Admin login | Sign-in with three roles: Boss, Product Manager and Tester |
| Product management | Create, read, update and delete products |
| Admin management | Create, edit, delete and search admin accounts |

## Architecture

```text
Browser
   │
   ▼
frontend/  Express server for static pages (port 3031)
   │        HTML + CSS + vanilla JavaScript (fetch)
   ▼
backend/   Express REST API (port 5000)
   │
   ▼
MySQL      lsdb database (6 tables)
```

### REST API

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/search` | Search products |
| `POST` | `/api/product` | Create a product |
| `PUT` | `/api/product/:id` | Update a product |
| `DELETE` | `/api/product/:id` | Delete a product |
| `GET` | `/api/productdetail/:id` | Get product details |
| `POST` | `/login` | Admin login |
| `GET` | `/admis` | List admins |
| `POST` | `/searchAdmi` | Search admins |
| `POST` | `/admi` | Create an admin |
| `PUT` | `/admi/:id` | Update an admin |
| `DELETE` | `/admi/:id` | Delete an admin |

### Database

Six tables: `product`, `report`, `adm_login`, `adm_information`, `address` and `country`. The schema is in [`app/backend/lsdb.sql`](app/backend/lsdb.sql).

<p align="center"><img src="docs/erd.png" alt="ER diagram" width="460"></p>

## Run locally

Requires Node.js and MySQL 8.

```bash
git clone https://github.com/Codooooooo/Loopstation.git
cd Loopstation/app

# 1. Install dependencies
npm install
npm install --prefix backend
npm install --prefix frontend

# 2. Create the database
mysql -u root -p < backend/lsdb.sql

# 3. Configure the database connection
cp backend/.env.example backend/.env   # then fill in your MySQL credentials

# 4. Start the frontend and backend together
npm start
```

Then open http://localhost:3031.

## Credits

- Exchange rates: [Fixer API](https://fixer.io/)
- Font: [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue) (Google Fonts)
- Product images are from apple.com and are used for demonstration only. All rights belong to Apple.

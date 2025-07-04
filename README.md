# Product Management

This is a simple product management project that allows you to perform CRUD (Create, Read, Update, Delete) operations efficiently. Developed with pure HTML, CSS, and JavaScript, it offers an intuitive user interface for managing product inventory.

## Features

- Product Creation: Add new products with details such as name, brand, model, expiration date, manufacturer, warranty months, and country of origin.

- Product Listing: View all existing products in a clear and organized table format.

- Product Editing: Modify the information of any existing product.

- Product Deletion: Safely remove products from the list with confirmation.

- Form Validation: Ensures all required fields are completed before saving or updating a product.

- Interactive Alerts: Utilizes SweetAlert2 for user-friendly success, error, and confirmation notifications.

- Responsive Design: The interface adapts to different screen sizes, from mobile devices to desktops.

- RESTful API: Connects to a local backend (simulated with json-server) for data persistence.

## Technologies used

- HTML5
- CSS3 (Flexbox + Media Queries)
- JavaScript Vanilla
- SweetAlert2
- json-server

## File structure

```bash
CRUD.../
├── node_modules
├── public/
│   └── database.json
├── src/
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── alert.js
│       └── gestión_api.js
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
└── README.md       
```

## How to use

1. Clone this repository: git clone https://github.com/valeriacadenay/crud_s3

2. Open the index.html file in your browser.

3. Interact with the interface:

4. Add a New Product: Fill out the "Agregar producto" (Add product) form on the left side of the screen with the product's details and click the "Guardar" (Save) button.

5. View Products: Products you add will automatically appear in the "productos-lista" (product list) table on the right side.

6. Edit a Product: Click the "Editar" (Edit) button next to any product in the list. The product's details will load into the form, and the "Guardar" button will change to "Actualizar" (Update). Make your changes and click "Actualizar".

7. Delete a Product: Click the "Eliminar" (Delete) button next to any product in the list. A confirmation dialog will appear; confirm to remove the product.

8. Clear Form: The form automatically clears after a successful save or update, or you can manually clear it by refreshing the page.


## Future improvement
- Search and filtering

- Table sorting

- Pagination

- Real-time validation feedback

- Modals for edit/view

- Confirmation for edits

- Date pickers

- Improved responsiveness (table to "cards")

- Real backend integration

- User authentication and authorization


## Author Valeria Cadena Yance

Valeria Cadena Yance.

Clan: Caiman

Correo: valecade16@gmail.com

User github: valeriacadenay.

Link repositorio: https://github.com/valeriacadenay/crud_s3
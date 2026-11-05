# Fruit Shop Prototype - Copilot Context
This file contains the product requirements and wireframes provided for the prototype. Use them as the source of truth when modifying the app.

## Updated navigation breakpoint

The navigation must remain anchored on the **left side of the app at every viewport size**; do not move it to the top or bottom. Keep the full sidebar at widths of 600px and above; below 600px, keep it as a compact left rail. Every page link displays its own emoji in expanded and collapsed modes. In collapsed mode, center the emoji horizontally in the rail; retain the full accessible link name and current-page indication. Show a cart badge with the total quantity of items (sum of cart line quantities) in both navigation modes, including a readable number on the collapsed rail.

Use in-app notification banners or toasts for feedback; do not use JavaScript `alert()` popups. After a successful mock checkout, show a clear order-complete/thank-you message, confirm that no payment was taken, and clear the cart.

These are the current product requirements and supersede conflicting older 300px breakpoint or distinct-product badge descriptions in the PRD and wireframes reproduced below.

---

## Product Requirements Document

# Product Requirements Document: Fruit Shop Prototype

## 1. Product overview

### Product purpose

Build a static, client-side web prototype for an online fruit shop. The prototype should let shoppers browse a small fruit catalog, view product details, manage a shopping cart, and complete a simulated checkout.

### Problem and opportunity

Online shoppers need a straightforward way to find fruit, understand its price and unit, choose quantities, and review an order. This prototype demonstrates that basic shopping journey without requiring a server or real transactions.

## 2. Goals and success criteria

The prototype is successful when a shopper can:

- Browse the sample fruit catalog and open an individual product's details.
- Add products and chosen quantities to a cart.
- Update quantities or remove products from the cart.
- Review an accurate order summary and total at checkout.
- Process a mock order and see a confirmation.
- Navigate among all four app pages on desktop and phone-sized screens.

## 3. Target audience and user needs

### Target audience

Online shoppers interested in ordering fruit products.

### User needs

- See what fruit is available, with a recognizable image and clear product information.
- Understand the price and the unit to which each price applies.
- Select quantities, review the cart, and correct the order before checkout.
- Receive clear feedback when the simulated order is processed.

## 4. Scope and assumptions

### In scope

- A static web app implemented with HTML, CSS, and client-side JavaScript.
- Four navigable pages/views: **Products**, **ProductDetails**, **ShoppingCart**, and **Checkout**.
- Ten sample fruit products, represented with emoji.
- Basic, visually appealing styling and layouts that adapt for desktop and phone widths.
- Client-side cart management saved in browser `localStorage`.
- A simulated checkout and confirmation.

### Out of scope

- User authentication or accounts.
- Backend services, API calls, or database integration.
- Real payment processing, shipping, or order fulfillment.
- Live inventory, pricing, or product data.
- Production-grade design polish.

### Assumptions

- Prices are sample values in euros (EUR); they are not live offers.
- Quantities are whole numbers. Products sold by weight are priced per kilogram and quantities represent kilograms; products sold individually are priced per item.
- Checkout is only a demonstration. Processing an order must not contact a payment provider or submit data to a server.
- If saved cart data is missing or unusable, the app should present an empty cart rather than fail to render.

## 5. User journeys and use cases

### Browse and inspect a product

1. The shopper opens **Products**.
2. The app displays the sample catalog.
3. The shopper selects a product name, image, or details control.
4. The app opens **ProductDetails** for that product.
5. The shopper can return to **Products**.

### Add products and manage the cart

1. The shopper chooses a quantity for a product on **Products** or **ProductDetails**.
2. The shopper adds it to the cart.
3. The app updates the cart and gives visible feedback.
4. The shopper opens **ShoppingCart**, changes a product quantity, or removes a product.
5. The app recalculates line totals and the cart total.

### Review and process an order

1. The shopper opens **Checkout** from the navigation.
2. The app displays the products, quantities, line prices, and total.
3. The shopper selects **Process Order**.
4. If the cart contains products, the app displays a mock order confirmation and clears the cart.
5. If the cart is empty, the app explains that there is nothing to process and offers navigation back to **Products**.

## 6. Functional requirements by page

### Products

- Display all ten sample products with emoji, product name, price, and price unit.
- Provide a quantity control for each product. The initial quantity should be 1; quantities must not be less than 1.
- Provide an **Add to cart** action that adds the selected quantity. Adding an existing product increases its cart quantity.
- Provide a way to open the selected product's **ProductDetails** page.
- Show clear feedback after a product is added using an in-app notification banner or toast; do not use `alert()` popups.

### ProductDetails

- Display the selected product's emoji, name, full description, price per unit, and unit.
- Provide a quantity control and **Add to cart** action with the same behavior as on **Products**.
- Provide a way to return to **Products**.
- If a product cannot be identified, show a clear not-found state with a link to **Products**.

### ShoppingCart

- Display each cart product's name, quantity, unit price, and line total.
- Allow the shopper to update each product's quantity to a whole number of 1 or more.
- Allow the shopper to remove any product.
- Recalculate line totals and the cart total whenever quantities change or products are removed.
- Show an empty-cart message and a link to **Products** when there are no cart items.
- Persist cart updates in `localStorage` so they survive page navigation and browser reloads in the same browser.

### Checkout

- Display each product's name, quantity, unit price, and line total.
- Clearly display the order total in EUR.
- Provide a **Process Order** control. For a non-empty cart, it displays a confirmation, does not initiate a real transaction, and clears the saved cart.
- The confirmation must thank the shopper, state that the sample order was processed, and make clear that no payment was taken.
- Do not process an empty cart; display a helpful message and a route back to **Products**.

## 7. Navigation and page behavior

- Provide a persistent navigation menu on the left with links to **Products**, **ProductDetails**, **ShoppingCart**, and **Checkout**, and a badge showing the total quantity of cart items.
- Users can navigate to each page from the menu. The selected product's ID must be conveyed when opening **ProductDetails**.
- Make the current page clear in the navigation.
- Provide a return link from product details to **Products**.
- Navigation should work consistently across desktop and phone widths, including browser back and forward where supported by the chosen page/view approach.
- Below a viewport width of 600 CSS pixels, collapse the navigation labels to one- or two-letter abbreviations. Preserve accessible names for assistive technology and provide a clear indication of the destination for each link.
- The main content should remain usable at narrow widths; allow content to reflow rather than requiring a fixed desktop layout.

## 8. Data requirements and sample dataset

Each product must have a stable ID, name, description, emoji, price in EUR, and unit. Use the following sample catalog:

| ID | Product | Description | Price | Unit | Emoji |
|---|---|---|---:|---|---|
| apple | Red Apples | Crisp, sweet apples for snacking or baking. | €2.49 | per kg | 🍎 |
| banana | Bananas | Ripe bananas with a naturally sweet, soft texture. | €1.79 | per kg | 🍌 |
| orange | Oranges | Juicy oranges with a bright, refreshing flavor. | €2.29 | per kg | 🍊 |
| strawberry | Strawberries | Fragrant, sweet strawberries, ideal for a snack or dessert. | €4.99 | per 500 g pack | 🍓 |
| grapes | Grapes | Seedless grapes with a crisp bite and mellow sweetness. | €3.49 | per kg | 🍇 |
| pineapple | Pineapple | Golden pineapple with a tangy-sweet tropical flavor. | €3.99 | per item | 🍍 |
| watermelon | Watermelon | Refreshing watermelon with juicy red flesh. | €1.89 | per kg | 🍉 |
| lemon | Lemons | Zesty lemons for drinks, cooking, and baking. | €0.69 | per item | 🍋 |
| peach | Peaches | Soft, fragrant peaches with sweet summer flavor. | €3.79 | per kg | 🍑 |
| kiwi | Kiwis | Tangy-sweet kiwis with bright green flesh. | €2.99 | per 6-item pack | 🥝 |

### Pricing and calculations

- Show prices in euros using consistent two-decimal formatting.
- A line total is the product's price per unit multiplied by the selected number of units/packs.
- The order total is the sum of all line totals. Do not add tax, shipping, discounts, or other fees.
- Use standard currency-aware rounding to two decimal places to avoid floating-point display errors.

## 9. UI and styling direction

- Use simple, appealing styling appropriate for a small fruit shop: clear typography, readable contrast, restrained colors, and recognizable interactive controls.
- Use emoji as product illustrations; external image assets are not required.
- Make the content adapt to large and small screens with basic responsive layout behavior. This is a functional prototype, not a fully polished responsive storefront.
- Keep the left-side navigation on wider screens and collapse it as specified below 600 CSS pixels.
- Provide visible focus states and semantic labels for controls, including quantity inputs and icon/abbreviation-only navigation.
- Clearly distinguish buttons, links, selected navigation, totals, empty states, and checkout confirmation.

## 10. Technical requirements and constraints

- Implement the app using HTML, CSS, and client-side JavaScript. Do not require a framework, build step, backend, or network service.
- Keep the product sample data in a simple client-side data structure that is the single source for the product list, details, and price calculations.
- Keep the cart in `localStorage`; validate stored data before use and handle unavailable or invalid stored data without crashing the interface.
- Use a consistent navigation approach for the four pages/views and preserve product identity when navigating to **ProductDetails**.
- Avoid real payment, authentication, server submissions, or collection of personal information.
- The prototype should be runnable locally as a static web app. Include brief run instructions with the deliverable.

## 11. Acceptance criteria

1. **Catalog:** Given the shopper opens **Products**, when the page loads, then all ten sample fruits appear with an emoji, name, EUR price, and unit.
2. **Product details:** Given the shopper selects a catalog item, when **ProductDetails** opens, then it shows the matching product's description, emoji, price, and unit.
3. **Add to cart:** Given a valid quantity is selected, when the shopper adds a product, then that quantity appears in the cart; adding the same product again increases its quantity.
4. **Cart calculations:** Given one or more products are in the cart, when the shopper changes quantities or removes an item, then line totals and the order total update correctly in EUR.
5. **Persistence:** Given the shopper has cart items, when the page is reloaded, then the cart is restored from `localStorage`.
6. **Empty cart:** Given no products are in the cart, when the shopper opens **ShoppingCart** or **Checkout**, then a helpful empty state appears and the shopper can return to **Products**.
7. **Mock checkout:** Given the cart is non-empty, when the shopper selects **Process Order**, then an order-complete thank-you message appears, it confirms that no payment was taken, no server request occurs, and the cart is cleared.
8. **Navigation:** Given any app page is open, when the shopper selects a navigation item, then the corresponding page/view opens and the current destination is indicated.
9. **Narrow navigation:** Given the viewport is narrower than 600 CSS pixels, when the app is displayed, then the left navigation remains on the left with centered page emoji, accessible names, current-page indication, and a visible numeric cart badge.
10. **Cart badge:** Given the cart contains multiple quantities, when any page is displayed, then the navigation badge shows the sum of all cart quantities, not just the number of distinct products.
11. **Responsive layout:** Given the app is viewed on desktop or a phone-sized viewport, when the viewport width changes, then page content reflows and remains usable without requiring a fully polished design.
12. **Invalid product:** Given a details route or view references an unknown product, when it opens, then a not-found message and a link to **Products** are shown.
13. **In-app feedback:** Given an app action needs to provide feedback, when the result or an error is shown, then it appears in an in-app notification banner or toast rather than a JavaScript `alert()` popup.

## 12. Deliverables and run instructions

- Deliver a working static prototype with the four named pages/views, sample data, cart behavior, navigation, and styling described in this PRD.
- Include all files needed to run it locally.
- Document the simplest local run method in the project README (for example, opening the entry HTML file directly if supported by the chosen implementation).
- No automated test suite is required for this prototype, but verify the acceptance criteria manually before considering it complete.

---

## Wireframe Overview

# Low-Fidelity Wireframes: Fruit Shop Prototype

These text wireframes translate the PRD into a basic page structure, not final visual designs. Bracketed labels describe controls or content. Product and price examples use the PRD's sample catalog and EUR pricing.

## Shared navigation

### Expanded left navigation (viewport 600 CSS px or wider)

```text
+----------------------+----------------------------------------------+
| FRUIT SHOP           |                                              |
|                      |                 PAGE CONTENT                 |
| > Products           |                                              |
|   ProductDetails     |                                              |
|   ShoppingCart (2)   |                                              |
|   Checkout           |                                              |
|                      |                                              |
|                      |                                              |
+----------------------+----------------------------------------------+
  Fixed-width sidebar     Remaining width; content can reflow
```

- The active page is marked (shown with `>`).
- `(2)` is an optional cart badge showing total cart quantity, including duplicate quantities of one product.
- The sidebar remains on the left on wider screens. The content area uses the remaining width.

### Collapsed left navigation (viewport narrower than 600 CSS px)

```text
+---+--------------------------------------------+
| F |                 PAGE CONTENT              |
+---+--------------------------------------------+
| P | [Products]                                 |
| D |                                            |
| C | ProductDetails / ShoppingCart / Checkout  |
| O | content reflows to the narrow space        |
+---+--------------------------------------------+
```

`P`, `D`, `C`, and `O` stand for Products, ProductDetails, ShoppingCart, and Checkout. In the actual interface, each abbreviated link retains its full accessible name, has a visible focus state, and indicates the current page. The wireframe's right-hand text is illustrative content, not a second navigation list.

## 1. Products

```text
+----------------------+----------------------------------------------+
| FRUIT SHOP           | Products                         [Cart: 2]  |
| > Products           | Browse fresh fruit                           |
|   ProductDetails     |                                              |
|   ShoppingCart (2)   | +------------------+  +------------------+   |
|   Checkout           | |       🍎         |  |       🍌         |   |
|                      | | Red Apples       |  | Bananas          |   |
|                      | | €2.49 / kg       |  | €1.79 / kg       |   |
|                      | | Qty [-] 1 [+]    |  | Qty [-] 1 [+]    |   |
|                      | | [Add to cart]    |  | [Add to cart]    |   |
|                      | | [Details]        |  | [Details]        |   |
|                      | +------------------+  +------------------+   |
|                      |                                              |
|                      | +------------------+  ... remaining fruits  |
|                      | | 🍊 Oranges       |                         |
|                      | | €2.29 / kg       |                         |
|                      | | Qty [-] 1 [+]    |                         |
|                      | | [Add to cart]    |                         |
|                      | | [Details]        |                         |
|                      | +------------------+                         |
+----------------------+----------------------------------------------+
```

- Show all ten products using the same card pattern.
- On narrow screens, cards flow into fewer columns or a single column; controls remain readable.
- After **Add to cart**, show a brief status message, such as “Red Apples added to cart.”

## 2. ProductDetails

```text
+----------------------+----------------------------------------------+
| FRUIT SHOP           | Product details                  [Cart: 2]  |
|   Products           |                                              |
| > ProductDetails     | [< Back to Products]                         |
|   ShoppingCart (2)   |                                              |
|   Checkout           | +----------------------+  Red Apples        |
|                      | |                      |  Crisp, sweet apples|
|                      | |         🍎           |  for snacking or    |
|                      | |                      |  baking.            |
|                      | +----------------------+                    |
|                      |                         €2.49 per kg        |
|                      |                         Quantity            |
|                      |                         [-] [ 1 ] [+]       |
|                      |                         [Add to cart]        |
+----------------------+----------------------------------------------+
```

- The displayed product is the item selected from Products.
- A narrow viewport stacks the emoji/image area above the description and controls.
- If the product ID is unknown, replace the detail content with:

```text
Product not found
We couldn't find that fruit.
[Back to Products]
```

## 3. ShoppingCart

### Cart with products

```text
+----------------------+----------------------------------------------+
| FRUIT SHOP           | Shopping Cart                    [2 items]  |
|   Products           |                                              |
|   ProductDetails     | Product          Qty       Unit       Line    |
| > ShoppingCart (2)   | -------------------------------------------- |
|   Checkout           | 🍎 Red Apples     [-] 2 [+] €2.49/kg   €4.98  |
|                      |                   [Remove]                     |
|                      | 🍓 Strawberries  [-] 1 [+] €4.99/pack €4.99  |
|                      |                   [Remove]                     |
|                      |                                              |
|                      | Order total:                           €9.97 |
|                      | [Continue shopping]     [Go to Checkout]     |
+----------------------+----------------------------------------------+
```

- Changing a quantity or selecting **Remove** updates the line total and order total immediately.
- At narrow widths, show each item as a stacked row/card so the controls and prices do not require horizontal scrolling.
- The navigation badge shows total quantity (for example, two apples plus one banana displays `3`).
- Cart contents persist across navigation and reloads through `localStorage`.

### Empty cart

```text
+----------------------+----------------------------------------------+
| FRUIT SHOP           | Shopping Cart                                |
|   Products           |                                              |
|   ProductDetails     | Your cart is empty.                          |
| > ShoppingCart       |                                              |
|   Checkout           | [Browse Products]                            |
+----------------------+----------------------------------------------+
```

## 4. Checkout

### Checkout with products

```text
+----------------------+----------------------------------------------+
| FRUIT SHOP           | Checkout                                     |
|   Products           |                                              |
|   ProductDetails     | Order summary                                |
|   ShoppingCart (2)   | -------------------------------------------- |
| > Checkout           | Red Apples       2 kg                 €4.98 |
|                      | Strawberries     1 pack               €4.99 |
|                      |                                              |
|                      | Total                                  €9.97 |
|                      |                                              |
|                      | [Back to Shopping Cart] [Process Order]     |
|                      |                                              |
|                      | Mock checkout: no payment is taken.          |
+----------------------+----------------------------------------------+
```

- The summary reflects current cart quantities and totals.
- **Process Order** is a mock action only. It displays the confirmation state below and clears the cart.

### Order confirmation

```text
+----------------------+----------------------------------------------+
| FRUIT SHOP           | Order complete                               |
|   Products           |                                              |
|   ProductDetails     | Your sample order has been processed.        |
|   ShoppingCart       | No payment was taken.                        |
| > Checkout           |                                              |
|                      | [Continue shopping]                          |
+----------------------+----------------------------------------------+
```

### Empty checkout

```text
+----------------------+----------------------------------------------+
| FRUIT SHOP           | Checkout                                     |
|   Products           |                                              |
|   ProductDetails     | There are no items to process.               |
|   ShoppingCart       |                                              |
| > Checkout           | [Browse Products]                            |
+----------------------+----------------------------------------------+
```

## Navigation flow

```text
                         select product
                    +----------------------+
                    |                      v
              +----------+           +----------------+
              | Products |           | ProductDetails |
              +----------+           +----------------+
                   |                       |
           add to cart                 add to cart
                   +----------+------------+
                              v
                       +-------------+
                       | ShoppingCart|
                       +-------------+
                              |
                         review order
                              v
                       +----------+
                       | Checkout |
                       +----------+
                              |
                      Process Order
                              v
                    Mock confirmation
                    and clear the cart
```

The left navigation is also available on every page, so shoppers can jump directly among all four destinations. Its cart badge shows total quantity across all cart lines. The Products-to-ProductDetails link carries the selected product ID. Browser back and forward should work with the app's chosen navigation approach.

---

## Navigation Wireframe

FRUIT SHOP PROTOTYPE - NAVIGATION WIREFRAMES

Expanded left navigation (viewport 600 CSS px or wider)

+----------------------+----------------------------------------------+
| FRUIT SHOP           |                                              |
|                      |                 PAGE CONTENT                 |
| > Products           |                                              |
|   ProductDetails     |                                              |
|   ShoppingCart (2)   |                                              |
|   Checkout           |                                              |
|                      |                                              |
+----------------------+----------------------------------------------+
  Fixed-width sidebar     Remaining width; content can reflow

The active page is marked with >. The optional (2) badge shows total
cart quantity, including duplicate quantities of one product.
The sidebar stays at the left on wider screens.


Collapsed left navigation (viewport narrower than 600 CSS px)

+---+--------------------------------------------+
| F |                 PAGE CONTENT              |
+---+--------------------------------------------+
| P | Main content reflows into the narrow space |
| D |                                            |
| C |                                            |
| O |                                            |
+---+--------------------------------------------+

P = Products
D = ProductDetails
C = ShoppingCart
O = Checkout
F = Fruit Shop

Each abbreviated link keeps its full accessible name, has a visible
focus state, and indicates the current page. The main page content uses
the remaining width and must remain usable.


Navigation flow

                         select product
                    +----------------------+
                    |                      v
              +----------+           +----------------+
              | Products |           | ProductDetails |
              +----------+           +----------------+
                   |                       |
           add to cart                 add to cart
                   +----------+------------+
                              v
                       +-------------+
                       | ShoppingCart|
                       +-------------+
                              |
                         review order
                              v
                       +----------+
                       | Checkout |
                       +----------+
                              |
                      Process Order
                              v
                    Mock confirmation
                    and clear the cart

The left navigation is available on every page, allowing direct
navigation among all four destinations. Selecting a product carries
its ID to ProductDetails. Browser back and forward should work with
the chosen navigation approach.

---

## Products Wireframe

FRUIT SHOP PROTOTYPE - PRODUCTS PAGE

+----------------------+----------------------------------------------+
| FRUIT SHOP           | Products                         [Cart: 2]  |
| > Products           | Browse fresh fruit                           |
|   ProductDetails     |                                              |
|   ShoppingCart (2)   | +------------------+  +------------------+   |
|   Checkout           | |       [apple]    |  |      [banana]    |   |
|                      | | Red Apples       |  | Bananas          |   |
|                      | | EUR 2.49 / kg    |  | EUR 1.79 / kg    |   |
|                      | | Qty [-] 1 [+]    |  | Qty [-] 1 [+]    |   |
|                      | | [Add to cart]    |  | [Add to cart]    |   |
|                      | | [Details]        |  | [Details]        |   |
|                      | +------------------+  +------------------+   |
|                      |                                              |
|                      | +------------------+  ... remaining fruits  |
|                      | | [orange]         |                         |
|                      | | Oranges          |                         |
|                      | | EUR 2.29 / kg    |                         |
|                      | | Qty [-] 1 [+]    |                         |
|                      | | [Add to cart]    |                         |
|                      | | [Details]        |                         |
|                      | +------------------+                         |
+----------------------+----------------------------------------------+

Show all ten sample products with emoji, name, price, and unit. The
layout above illustrates the repeated product-card pattern.

On narrow screens, the cards flow into fewer columns or a single
column. Controls remain readable and usable.

After adding an item, show brief feedback, for example:
"Red Apples added to cart."

Selecting [Details] opens ProductDetails for that product.

---

## ProductDetails Wireframe

FRUIT SHOP PROTOTYPE - PRODUCT DETAILS PAGE

+----------------------+----------------------------------------------+
| FRUIT SHOP           | Product details                  [Cart: 2]  |
|   Products           |                                              |
| > ProductDetails     | [< Back to Products]                         |
|   ShoppingCart (2)   |                                              |
|   Checkout           | +----------------------+  Red Apples        |
|                      | |                      |  Crisp, sweet apples|
|                      | |       [apple]       |  for snacking or    |
|                      | |                      |  baking.            |
|                      | +----------------------+                    |
|                      |                         EUR 2.49 per kg     |
|                      |                         Quantity            |
|                      |                         [-] [ 1 ] [+]       |
|                      |                         [Add to cart]        |
+----------------------+----------------------------------------------+

Display the selected product's emoji, name, full description, price,
and unit. The quantity starts at 1 and cannot be less than 1.

On narrow screens, stack the image/emoji above the description and
controls.

Unknown product state:

Product not found
We couldn't find that fruit.
[Back to Products]

---

## ShoppingCart Wireframe

FRUIT SHOP PROTOTYPE - SHOPPING CART PAGE

Cart with products

+----------------------+----------------------------------------------+
| FRUIT SHOP           | Shopping Cart                    [2 items]  |
|   Products           |                                              |
|   ProductDetails     | Product          Qty       Unit       Line    |
| > ShoppingCart (2)   | -------------------------------------------- |
|   Checkout           | [apple] Red Apples [-] 2 [+] EUR 2.49/kg     |
|                      |                                  EUR 4.98    |
|                      |                   [Remove]                   |
|                      | [berry] Strawberries [-] 1 [+] EUR 4.99/pack |
|                      |                                  EUR 4.99    |
|                      |                   [Remove]                   |
|                      |                                              |
|                      | Order total:                    EUR 9.97    |
|                      | [Continue shopping]     [Go to Checkout]    |
+----------------------+----------------------------------------------+

Changing quantity or removing a product updates its line total and
the order total. Quantities are whole numbers of at least 1.

At narrow widths, stack each item as a card/row so the shopper can
read and use all controls without horizontal scrolling.

Cart data persists across navigation and reloads using localStorage.


Empty cart

+----------------------+----------------------------------------------+
| FRUIT SHOP           | Shopping Cart                                |
|   Products           |                                              |
|   ProductDetails     | Your cart is empty.                          |
| > ShoppingCart       |                                              |
|   Checkout           | [Browse Products]                            |
+----------------------+----------------------------------------------+

---

## Checkout Wireframe

FRUIT SHOP PROTOTYPE - CHECKOUT PAGE

Checkout with products

+----------------------+----------------------------------------------+
| FRUIT SHOP           | Checkout                                     |
|   Products           |                                              |
|   ProductDetails     | Order summary                                |
|   ShoppingCart (2)   | -------------------------------------------- |
| > Checkout           | Red Apples       2 kg              EUR 4.98 |
|                      | Strawberries     1 pack            EUR 4.99 |
|                      |                                              |
|                      | Total                             EUR 9.97 |
|                      |                                              |
|                      | [Back to Shopping Cart] [Process Order]     |
|                      |                                              |
|                      | Mock checkout: no payment is taken.          |
+----------------------+----------------------------------------------+

The summary reflects the cart's current quantities and totals.
Process Order is a mock action: it takes no payment, shows a
confirmation, and clears the cart.


Order confirmation

+----------------------+----------------------------------------------+
| FRUIT SHOP           | Order complete                               |
|   Products           |                                              |
|   ProductDetails     | Your sample order has been processed.        |
|   ShoppingCart       | No payment was taken.                        |
| > Checkout           |                                              |
|                      | [Continue shopping]                          |
+----------------------+----------------------------------------------+


Empty checkout

+----------------------+----------------------------------------------+
| FRUIT SHOP           | Checkout                                     |
|   Products           |                                              |
|   ProductDetails     | There are no items to process.               |
|   ShoppingCart       |                                              |
| > Checkout           | [Browse Products]                            |
+----------------------+----------------------------------------------+

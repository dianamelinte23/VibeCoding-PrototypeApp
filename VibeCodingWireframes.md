# Low-Fidelity Wireframes: Fruit Shop Prototype

These text wireframes translate the PRD into a basic page structure, not final visual designs. Bracketed labels describe controls or content. Product and price examples use the PRD's sample catalog and EUR pricing.

## Shared navigation

### Expanded left navigation (viewport 300 CSS px or wider)

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
- `(2)` is an optional cart item-count badge; it represents distinct cart products, not total quantity.
- The sidebar remains on the left on wider screens. The content area uses the remaining width.

### Collapsed left navigation (viewport narrower than 300 CSS px)

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

The left navigation is also available on every page, so shoppers can jump directly among all four destinations. The Products-to-ProductDetails link carries the selected product ID. Browser back and forward should work with the app's chosen navigation approach.

# Fruit Shop Prototype

A static, client-side shopping prototype built with HTML, CSS, and JavaScript. It includes a 10-fruit sample catalog, product details, cart management saved in browser `localStorage`, responsive navigation, and a mock checkout.

## Run locally

From this directory, start a local static server:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a modern browser. No build step, dependencies, backend, or external network connection is required. Serving the app from localhost provides a consistent browser origin for `localStorage`.

## Pages

- Products
- ProductDetails
- ShoppingCart
- Checkout

Checkout is simulated: it does not take payment or send an order to a server.

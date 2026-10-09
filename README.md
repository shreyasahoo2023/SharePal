# SharePal Gaming Rentals

A React and Vite frontend recreation of SharePal's Bangalore gaming-rentals page.
Product listings are kept in `src/data/product-list.json`.

## Run locally

From this directory, install the dependencies and start the development server:

```sh
npm install
npm run dev
```

Vite prints the local URL when the server is ready. To create a production build,
run `npm run build`; to check code style, run `npm run lint`.

## Demo behavior

Rental date selection, product filtering and search, the wishlist, shopping bag,
FAQ accordion, recommendation form, and a rule-based AI shopping assistant work
in the browser. The assistant uses `src/data/product-list.json` and predefined
website FAQs; it does not connect to an AI service. Place the supplied launcher
image at `public/chatbot-icon.png`. Wishlist, bag contents, recommendations, and
demo account credentials are stored in `localStorage`. Demo accounts are not
secure authentication; rentals and recommendations are not sent to a backend,
and checkout/payment are not implemented.

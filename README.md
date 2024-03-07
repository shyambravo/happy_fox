## Tech stack used

- Next.js
- Jest

## Api

- Next.js route handlers are used for backend api endpoints.
- Refer employees.json under app/api.
- Data is persisted in memory on server side.

## Thrid party libraries used

No third party libraries used for css or other js utility functions

## Data Store

No State management libraries are used.

Only getter/setter methods are used for simulating data stores.

Getter and Setter methods for global state can be found under app/client-data-store.

## Testing

```bash
npm run test
```

## Running the app in dev mode

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

The api data for employees can be modified by editing the file employees.json under app/api

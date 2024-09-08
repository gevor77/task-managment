import express from 'express';

export const app = express();

app.use(
  express.urlencoded({
    extended: true,
    limit: '100mb',
  }),
);
app.use(express.json({ limit: '100mb' }));
// Use body parser to read sent json payloads
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());


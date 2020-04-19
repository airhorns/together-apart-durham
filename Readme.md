# Together Apart

Frontend for local business directory power together-apart.ca

## Developing

This is a `next.js` app, so run `yarn install` and then `yarn start` and you're off to the races.

You need to get a `.env` file.

## Multisite considerations

Each separate region (Ottawa vs Toronto vs whatever) is a fully separate deployment of this frontend. The `CURRENT_SITE` environment variable decides for which separate site to build the whole thing for.

## License

MIT

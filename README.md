# Starwars Characters!
This project utilizes the [SWAPI](https://swapi.dev/) to provide character details of the StarWars movides.

## Prequisites
* node version >= 20
* git version >= 2

## Setup
run the following commands
```sh
git clone https://github.com/ntregillus/starwars.git
cd starwars
npm i

```

## Development

Run the dev server:

```sh
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This project comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience, and leverages components from the [shadcn/ui](https://ui.shadcn.com/docs/) framework. current components installed are found in the /compnents/ui/ directory. current components used are:
* button
* card
* input
* label
* seperator
* table
* tabs

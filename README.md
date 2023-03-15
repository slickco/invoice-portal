# invoice-portal

This is a simple web application that demonstrates how to use the [Slick Invoice API](https://slickco.io) to render invoices for end users.

## Getting Started

```git clone https://github.com/slickco/invoice-portal.git```

```cd invoice-portal```

```npm install```

```npm run dev```


### Prerequisites

You will need to have [Node.js](https://nodejs.org/en/) installed on your machine.

## Deployment

Using cloudflare pages, you can deploy this application in a few simple steps. 

1. Fork this repository
2. Create a new project on [Cloudflare Pages](https://pages.cloudflare.com)
3. Select your forked repository
4. Set the build command to ```npm run build```
5. Set the build directory to ```dist```
6. Set the environment variables to the following:
-   ```NODE_VERSION``` - `16` 
7. Click the deploy button


## Built With

* Slickco.io - The API used to render invoices 
* Vue.js - The web framework used for the frontend of the application
* Tailwind CSS - The CSS framework used for styling the application 
* Vite - The build tool used to bundle the application
* TypeScript - The language used to write the application code

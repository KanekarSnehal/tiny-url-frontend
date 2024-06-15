
# Tiny Url

Tiny Url is a simple and efficient solution for shortening URLs, generating QR codes, and customizing shortened links. With this tool, users can quickly convert long, cumbersome URLs into concise and shareable links, making it easier to distribute and manage web addresses.

## Tech Stack

**Vue.js** - A progressive JavaScript framework for building user interfaces.

**Vue Router** - The official router for Vue.js, enabling navigation in a Vue.js application.

**VeeValidate** - A form validation library for Vue.js applications.

**Vue Chart.js** - A Vue wrapper for Chart.js, allowing for easy integration of charts into Vue applications.

**Pinia** - A state management solution for Vue.js applications, providing a Vuex alternative.

**Axios** - A promise-based HTTP client for the browser and Node.js, used for making API requests.

**Chart.js** - A simple yet flexible JavaScript charting library for web developers.

**Vue3 Toastify** - A Vue 3.x plugin for displaying toast notifications.

## How to run the app locally?

### Using npm
```bash
$ git clone https://github.com/KanekarSnehal/tiny-url-frontend.git
$ cd tiny-url-frontend
$ npm install
$ npm start
```

### Using Docker
- Make sure you have Docker installed on your system.
- Clone the repository:
```bash
$ git clone https://github.com/KanekarSnehal/tiny-url-frontend.git
$ cd tiny-url-frontend
```
- Build the Docker image:
```bash
$ docker build -t tiny-url-frontend .
```
- Run the Docker container:
```bash
$ docker run -d -p 3000:3000 tiny-url-frontend
```
This will start the Tiny URL frontend server in a Docker container, accessible at http://localhost:3000

### Using Docker Compose
Alternatively, you can use Docker Compose for managing multi-container Docker applications. A `docker-compose.yaml` file is provided in the repository. 

To use it:
- Make sure you have Docker Compose installed on your system.
- Clone the repository:
```bash
$ git clone https://github.com/KanekarSnehal/tiny-url-frontend.git
$ cd tiny-url-frontend
```
- Run the Docker Compose command:
```bash
$ docker-compose up
```
- This will start the application along with any necessary services (such as MySQL and Redis), as defined in the `docker-compose.yaml` file.

## Related

Here is the link to backend repo.

[tiny-url-backend](https://github.com/KanekarSnehal/tiny-url-backend)


## Screens

![Sign in Page](https://res.cloudinary.com/dj5uckowi/image/upload/v1718431367/0146f378-24d3-4ca8-ac47-53351be77df4.png)

![Home Page](https://res.cloudinary.com/dj5uckowi/image/upload/v1718431626/7baf810a-1a60-44d8-8ec6-336fbd76bc50.png)

![Create Page](https://res.cloudinary.com/dj5uckowi/image/upload/v1718431753/4c5c161e-4b0e-4a3e-9504-fb77ff383adf.png)

![Link Page](https://res.cloudinary.com/dj5uckowi/image/upload/v1718431853/06e89bdf-879a-4bf5-b185-f630db004129.png)

![Stats Page](https://res.cloudinary.com/dj5uckowi/image/upload/v1718431964/921c71da-7cce-49bb-9189-dce6139d02e1.png)

![Stats Page](https://res.cloudinary.com/dj5uckowi/image/upload/v1718432065/c1d8a739-2a7c-4aa7-9206-b44a0521316a.png)
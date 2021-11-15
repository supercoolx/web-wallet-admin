
<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="src/assets/EqusLogoLight.svg" alt="Equs" width="80" height="80">
  </a>

  <h3 align="center">Equs Web Wallet</h3>

  <p align="center">
    Crypto Wallet
    <br />
    <a href="https://blockchainsinc.atlassian.net/wiki/spaces/GENBANK/pages/8052211771/Web+Wallet"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://webwallet.develop.bc-labs.dev">View Demo</a>
    ·
    <a href="https://blockchains-inc.atlassian.net/jira/software/projects/CLIENT/issues/">Report Bug</a>
    ·
    <a href="https://blockchains-inc.atlassian.net/jira/software/projects/CLIENT/issues/">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <!-- <li><a href="#development">Development</a></li> -->
    <li><a href="#local-development">Local Deployment</a></li>
    <!--
    <li><a href="#usage">Usage</a></li>-->
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <!--
    <li><a href="#license">License</a></li>-->
    <li><a href="#contributors">Contributors</a></li> <!--
    <li><a href="#acknowledgements">Acknowledgements</a></li>-->
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Crypto Wallet.

### Built With

-   [React](https://reactjs.org/)
-   [Materail-UI](https://material-ui.com/)
-   [MobX](https://mobx.js.org/)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

-   npm
    ```sh
    npm install npm@latest -g
    ```
-   yarn
    ```sh
    npm install --global yarn
    ```

### Installation

1. Clone the repo
    ```sh
    git clone https://git.slock.it/equs/crypto/web-wallet.git
    ```
2. Install NPM packages
    ```sh
    yarn install
    ```

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn lint`

Launches the linter.



### `yarn generate:version`

Creates `src/environments/version.ts` that will be use to display version in Apps footer. The script is automatically executed during package stage in Pipeline builds.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

<!-- LOCAL DEPLOYMENT -->
## Local Development

With a local installed helm and a running kubernetes (for instance via docker-desktop), the web-wallet can be deployed via commandline.
Example call:

helm upgrade --debug --install --wait --create-namespace --namespace local-minikube \
--set ingress.host=local.netid.develop.bc-labs.dev \
--set ingress.enabled=true \
--set ingress.mockService.enabled=true \
--set ingress.mockService.url=f4cde22d-60b0-406b-ab0c-5dd240289f09.mock.pstmn.io \
--set image.repository="docker.slock.it/equs/crypto" \
--set image.name=web-wallet \
--set image.tag=in-328-create-build-and-deployment \
webwallet ./helm

To use the ingress a contour proxy needs to be running in the local kubernetes cluster (see the netid/deploy project for the contour proxy deployment)

## Pipeline builds and deployments

Stages:

-   Build - try generate production build.
-   Test - run several tests.
-   Package - dockerize production build.
-   Deploy - deploy package in kubernetes with generated web url.

The following events produce the following images:

-   Push to a feature branch produces a image based on the feature branch name
-   Merge into develop or main produces a image tag based on the branch name (develop/main) and a new latest tag
-   Creating a repository tag creates an image with the same tag
-   Generates web url `webwallet.develop.bc-labs.dev` for branches develop and main.
-   Generates web url `[branch]-webwallet.develop.bc-labs.dev` for feature branches.
- for the review deployments a corresponding stop-review action for manual use will be enabled
- on merging a feature branch into develop or main the review environment is automatically stopped





<!-- USAGE EXAMPLES

## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_
-->

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://blockchains-inc.atlassian.net/jira/software/projects/CLIENT/issues/) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE

## License

TBD. See `LICENSE` for more information.-->

<!-- CONTACT -->

## Contributors

- Duc Anh Trinh
- Karl Adler
- Orlyn Anthony Gerano - [email](mailto:ogerano@blockchains.com)

<!-- ACKNOWLEDGEMENTS

## Acknowledgements

-   []()
-   []()
-   []()
 -->

# Bootstrap - Next

## Prerequisites

1. Install Node.js: <https://nodejs.org/es/download/>
2. Install Yarn: <https://yarnpkg.com/getting-started/install>

**NOTE**: we also recommend using NVM to install Node.js: <https://github.com/nvm-sh/nvm>

## Setting up the repo

### Local Storage

Update constant `PROJECT_NAME` in `constants/localStorage.js` with your project's name.

### Favicon

Use [Favicon Generator](https://realfavicongenerator.net/) to generate your favicon and replace the files in `public/` with the generated ones.

## Start to develop

Follow these steps to get started:

1. yarn install
2. yarn dev

A local environment will open at `http://localhost:3000` by default.

## While developing

### Adding a new page

- Don't forget to export `getStaticPropsTranslations` in your page's `getStaticProps` function.
```js
import { getStaticPropsTranslations } from '#utils/translations';
export const getStaticProps = getStaticPropsTranslations;
```

- Add PageHead component to your page.
```js
import PageHead from '#components/PageHead';
export default function Home() {
  return (
    <>
      <PageHead />
      {/* Your page content */}
    </>
  );
}
```

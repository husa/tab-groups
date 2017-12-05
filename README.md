# tab-groups

[![Build Status](https://travis-ci.org/husa/tab-groups.svg?branch=master)](https://travis-ci.org/husa/tab-groups)

## Local development

```
yarn start
```

## Build
Assets build
```
yarn build
```
Build icons
```
node assets/generate.js
```

Complete build
```
yarn lint
yarn flow
yarn test
yarn build
```

Release
```
yarn release 1.2.3
```

CI Build
```
yarn lint
yarn flow
yarn test
yarn build
yarn zip
yarn deploy
```

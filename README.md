# generator-simple

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![npm download][download-image]][download-url]

Scaffold a simple Typescript project using Vitest

```
npm i yo generator-mistery -g
yo mistery
```

Scaffold looks like this:

```bash
my@nb:~/hey$ tree -L 3 -I node_modules -a
.
├── .config
│   ├── tsconfig.cjs.json
│   ├── tsconfig.esm.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── .github
│   └── workflows
│       ├── nodejs-ts.yml
│       ├── nodejs.yml
│       ├── release.yml
│       └── typedoc.yml
├── .gitignore
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
└── src
    ├── index.ts
    └── index.test.ts
```



[npm-image]: https://img.shields.io/npm/v/generator-mistery.svg
[npm-url]: https://www.npmjs.com/package/generator-mistery
[ci-image]: https://github.com/santimirandarp/generator-mistery/workflows/Node.js%20CI/badge.svg?branch=master
[ci-url]: https://github.com/santimirandarp/generator-mistery/actions?query=workflow%3A%22Node.js+CI%22
[download-image]: https://img.shields.io/npm/dm/generator-mistery.svg
[download-url]: https://www.npmjs.com/package/generator-mistery
~                                                              

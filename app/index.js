'use strict';
import cp from 'child_process';

import camelCase from 'camelcase';
import Generator from 'yeoman-generator';

let username = ' ';

try {
  username = cp.execSync('git config user.name').toString();
} catch (e) {
  /* istanbul ignore next */
  console.error('Missing git configuration');
}

export default class extends Generator {
  async prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname, // Default to current folder name
      },
      {
        type: 'input',
        name: 'org',
        message: 'GitHub organization',
        default: username,
      },
      {
        type: 'input',
        name: 'userName',
        message: 'Your name',
        default: username.substring(0, username.length - 1),
      },
      {
        type: 'input',
        name: 'description',
        message: 'Your package description',
      },
      {
        type: 'confirm',
        name: 'node',
        message: 'Is it a Node.js-only library?',
        default: false,
      },
    ];

    this.props = await this.prompt(prompts);
  }

  async writing() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const camelName = camelCase(this.props.name);
    const prefix = this.props.org === 'mljs' ? 'ml-' : '';
    const includes = {
      npmName: prefix + this.props.name,
      name: this.props.name,
      org: this.props.org,
      userName: this.props.userName,
      notOnlyNode: !this.props.node,
      description: this.props.description,
      date: year + '-' + month + '-' + day,
      year: year,
      camelName: camelName,
    };
    this.fs.copy(
      this.templatePath('tsconfig.json'),
      this.destinationPath('.config/tsconfig.json'),
    );
    this.fs.copy(
      this.templatePath('tsconfig.cjs.json'),
      this.destinationPath('.config/tsconfig.cjs.json'),
    );
    if (includes.notOnlyNode) {
      this.fs.copy(
        this.templatePath('tsconfig.esm.json'),
        this.destinationPath('.config/tsconfig.esm.json'),
      );
    }
    this.fs.copy(
      this.templatePath('eslintrc.yml'),
      this.destinationPath('.config/.eslintrc.yml'),
    );
    this.fs.copy(
      this.templatePath('index.ts'),
      this.destinationPath('src/index.ts'),
    );
    this.fs.copy(
      this.templatePath('index.test.ts'),
      this.destinationPath('src/__tests__/index.test.ts'),
    );
    this.fs.copy(
      this.templatePath('prettierrc.json'),
      this.destinationPath('.config/.prettierrc.json'),
    );
    this.fs.copy(
      this.templatePath('vite.config.ts'),
      this.destinationPath('.config/vite.config.ts'),
    );
    // templates use the ejs `includes` object i.e `<%= includes.name %>`
    this.fs.copyTpl(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore'),
      includes,
    );
    this.fs.copyTpl(
      this.templatePath('LICENSE'),
      this.destinationPath('LICENSE'),
      includes,
    );
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      includes,
    );
    this.fs.copyTpl(
      this.templatePath('package'),
      this.destinationPath('package.json'),
      includes,
    );
  }

  install() {
    let deps = [
      '@types/jest',
      'eslint',
      'eslint-config-cheminfo-typescript',
      'vitest',
      'prettier',
      'rimraf',
      'typescript',
    ];

    cp.spawnSync('npm', ['install', '--save-dev', ...deps]);
  }
}

import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import camelCase from 'camelcase';
import Generator from 'yeoman-generator';

const __dirname = dirname(fileURLToPath(import.meta.url));

const deps = [
  '@types/jest',
  'eslint',
  'eslint-config-cheminfo-typescript',
  'vitest',
  'prettier',
  'rimraf',
  'typescript',
];

const toCopy = join(__dirname, 'toCopy');
const templates = join(__dirname, 'templates');

export default class extends Generator {
  async prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.determineAppname(),
      },
      {
        type: 'input',
        name: 'org',
        message: 'GitHub organization',
        default: await this.user.github.username(),
      },
      {
        type: 'input',
        name: 'userName',
        message: 'Your name',
        default: this.user.git.name(),
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
      date: `${year}-${month}-${day}`,
      year,
      camelName,
    };

    this.copyDestination(join(toCopy, '**'), '.', {
      globOptions: {
        globstar: true,
        deep: 3,
        dot: true,
      },
    });

    this.fs.copyTpl(
      this.templatePath(join(templates, '*')),
      this.destinationPath('.'),
      includes,
      null,
      {
        globOptions: {
          dot: true,
          onlyFiles: true,
        },
      },
    );

    this.fs.copyTpl(join(__dirname, 'package'), 'package.json', includes);
    this.addDevDependencies(deps);
  }
}

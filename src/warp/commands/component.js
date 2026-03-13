import { Command } from 'commander';
import chalk from 'chalk';
import { generateComponent } from '../lib/generators/componentGenerator.js';

const componentCommand = new Command('component');

componentCommand
    .description('component generation commands')
    .action(() => {
        console.log(`
  ${chalk.green.bold('warp component')}
  ${chalk.gray('--------------------------------')}
  Usage:
    ${chalk.green('npm run warp -- component create --name=ComponentName --path=./src/components')}

  
  Options:
    ${chalk.yellow('--name')}    Name of the component component
    ${chalk.yellow('--path')}    Directory to save the component file
  `);
    });

componentCommand
    .command('create')
    .description('Create a new component')
    .option('--name <name>', 'Name of the component')
    .option('--path <path>', 'Directory to save the component')
    .action((options) => {
        if (!options.name || !options.path) {
            console.log(chalk.red('Error: Name and Path are required.'));
            process.exit(1);
        }
      generateComponent(options.name, options.path);
    });

export default componentCommand;

import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
// import fs from 'fs';
// import path from 'path';
import ora from 'ora';
import { generateModule } from '../lib/generators/moduleGenerator.js';
import { handleExistingModule } from '../lib/utils/handleModuleExistence.js';
import { generateRoutes } from '../lib/utils/generateRoutes.js';


import { config } from '../lib/config/default.config.js';

const moduleCommand = new Command('module')
  .description('Module generation commands')
  .action(() => {
    console.log(`
  ${chalk.green.bold('warp module')}
  ${chalk.gray('--------------------------------')}
  Usage:
    ${chalk.green('npm run warp -- module create --name=moduleName')}
  
  Options:
    ${chalk.blue('--name')}            Name of the module (required)
    ${chalk.blue('-h, --help ')}       Display help for form commands

  Example Usage:
    ${chalk.green('npm run warp -- module create --name=iam')}
  `);
  });

const moduleCreateCommand = new Command('create')
  .alias('module:create')
  .alias('module/create')
  .description('Create a new module')
  .requiredOption('--name <name>', 'Name of the module')
  .option('--all', 'Create all module folders without prompts')
  .action(async (options) => {
    let { name, all } = options;

    console.log(chalk.green('🚀 Generating Module with the following options:'));
    console.log(chalk.yellow(`- Name: ${name}`));

    let allFolders = [
      'components',
      'views',
      'router'
    ];

    let selectedFolders = allFolders;

    // Check if module already exists
    const canProceed = await handleExistingModule(name);
    if (!canProceed) return;

    // Check if inquiry is enabled
    if (config.ENABLE_INQUIRY) {
      // If --all is NOT passed, prompt the user
      if (!all) {
        try {
          const answers = await inquirer.prompt([
            {
              type: 'checkbox',
              name: 'folders',
              message: 'Which folders should be created?',
              choices: allFolders.map(folder => ({ name: folder, checked: true })),
            }
          ]);
          selectedFolders = answers.folders;

          // If no folders are selected, ask the user if they want to generate everything
          if (selectedFolders.length === 0) {
            const confirmAll = await inquirer.prompt([
              {
                type: 'confirm',
                name: 'generateAll',
                message: chalk.red('⚠️ No folders were selected. Do you want to generate all folders?'),
                default: false
              }
            ]);

            if (confirmAll.generateAll) {
              selectedFolders = allFolders;
            } else {
              console.log(chalk.red('❌ Module generation cancelled.'));
              return;
            }
          }
        } catch (error) {
          if (error.isTtyError) {
            console.error(chalk.red('❌ Error: The terminal does not support prompts.'));
          } else {
            console.log(chalk.yellow('\n👋 Exiting Warp CLI. Goodbye!'));
            process.exit(0);
          }
        }
      }
    } else {
      // If ENABLE_INQUIRY is false, always generate all folders and ignore --all option
      console.log(chalk.yellow('⚠️ Inquiry is disabled. Generating all module folders automatically.'));
    }

    // Show a loading spinner while generating
    const spinner = ora('Generating module...').start();

    try {
      const success = await generateModule(name, selectedFolders);
      if (success) {
        spinner.succeed(chalk.green(`✅ Module successfully generated at: ${name}`));
        generateRoutes();
      }
    } catch (error) {
      spinner.fail(chalk.red(`❌ Error generating module: ${error.message}`));
    }
  });

moduleCommand.addCommand(moduleCreateCommand);
export default moduleCommand;
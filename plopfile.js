import fs from "fs";

export default function (plop) {
  // 1. Read our Shopping List (the manifest)
  const manifest = JSON.parse(fs.readFileSync("./modules-manifest.json", "utf8"));

  plop.setGenerator("generate-all", {
    description: "Read manifest and generate all modules automatically",
    prompts: [], // No questions asked in the terminal!
    actions: () => {
      const actions = [];

      // 2. Loop through each module (iam, admin)
      manifest.modules.forEach((module) => {
        
        // 3. Loop through each submodule (roles, permissions, etc.)
        module.submodules.forEach((sub) => {
          const basePath = `modules/${module.name}`;
          
          // These are the variables we pass to our templates
          const data = {
            moduleName: module.name, // e.g., "iam"
            entityName: sub.name,    // e.g., "role"
            endpoint: sub.endpoint,  // e.g., "/iam/rbac/roles"
          };

          // Action A: Create Service
          actions.push({
            type: "add",
            path: `${basePath}/services/${sub.name}Service.js`,
            templateFile: "plop-templates/service.js.hbs",
            data: Object.assign({}, data, sub), // Pass columns and formFields to the service template
            skipIfExists: true,
            // force: true,
          });

          // Action B: Create Store
          actions.push({
            type: "add",
            path: `${basePath}/stores/${sub.name}Store.js`,
            templateFile: "plop-templates/store.js.hbs",
            data: Object.assign({}, data, sub),
            skipIfExists: true,
            // force: true,
          });

          // Action C: Create View (It checks if it should use the Table or Form template)
          const templateName = sub.type === "table" ? "IndexView.vue.hbs" : "FormView.vue.hbs";
          actions.push({
            type: "add",
            path: `${basePath}/views/${plop.getHelper("pascalCase")(sub.name)}View.vue`,
            templateFile: `plop-templates/${templateName}`,
            data: Object.assign({}, data, sub),
            skipIfExists: true,
            // force: true,
          });
          // Action D: Create Router
          actions.push({
            type: "add",
            path: `${basePath}/routers/${sub.name}Router.js`,
            templateFile: "plop-templates/router.js.hbs",
            data: Object.assign({}, data, sub),
            skipIfExists: true,
            // force: true,
          });
        });
      });

      return actions;
    },
  });
}
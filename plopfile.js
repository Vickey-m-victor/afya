import fs from "fs";

export default function (plop) {
  const manifest = JSON.parse(fs.readFileSync("./modules-manifest.json", "utf8"));

  plop.setGenerator("generate-all", {
    description: "Read manifest and generate all modules automatically",
    prompts: [], 
    actions: () => {
      const actions = [];

      manifest.modules.forEach((module) => {
        const basePath = `modules/${module.name}`;
        
        actions.push({
          type: "add",
          path: `${basePath}/router.js`,
          templateFile: "plop-templates/moduleRouter.js.hbs",
          data: {
            moduleName: module.name,
            submodules: module.submodules
          },
          force: true, 
        });

        module.submodules.forEach((sub) => {
          const camelName = plop.getHelper("camelCase")(sub.name);
          const pascalName = plop.getHelper("pascalCase")(sub.name);
          const singularEndpoint = sub.endpoint.endsWith("s") ? sub.endpoint.slice(0, -1) : sub.endpoint;

          const data = {
            moduleName: module.name, 
            entityName: sub.name,    
            endpoint: sub.endpoint,  
            singularEndpoint: singularEndpoint
          };

          actions.push({
            type: "add",
            path: `${basePath}/services/${camelName}Service.js`,
            templateFile: "plop-templates/service.js.hbs",
            data: Object.assign({}, data, sub), 
            skipIfExists: true,
          });

          actions.push({
            type: "add",
            path: `${basePath}/stores/${camelName}Store.js`,
            templateFile: "plop-templates/store.js.hbs",
            data: Object.assign({}, data, sub),
            skipIfExists: true,
          });

          const templateName = sub.type === "table" ? "IndexView.vue.hbs" : "FormView.vue.hbs";
          actions.push({
            type: "add",
            path: `${basePath}/views/${pascalName}View.vue`,
            templateFile: `plop-templates/${templateName}`,
            data: Object.assign({}, data, sub),
            skipIfExists: true,
          });
          
          actions.push({
            type: "add",
            path: `${basePath}/routers/${camelName}Router.js`,
            templateFile: "plop-templates/router.js.hbs",
            data: Object.assign({}, data, sub),
            skipIfExists: true,
          });
        });
      });

      return actions;
    },
  });
}
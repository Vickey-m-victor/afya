import { createPageTemplate, updatePageTemplate, viewPageTemplate, indexPageTemplate } from './pages.js';

export default function pageTemplate(route, type, tableColumns, moduleName, endpoints = {}, routeKey = '') {
  switch (type) {
    case 'create':
      return createPageTemplate(route, moduleName, endpoints, routeKey);
    case 'update':
      return updatePageTemplate(route, moduleName, endpoints, routeKey);
    case 'view':
      return viewPageTemplate(route, moduleName, endpoints, routeKey);
    case 'index':
      return indexPageTemplate(route, tableColumns, moduleName, endpoints, routeKey);
    default:
      throw new Error(`Unknown page type: ${type}`);
  }
}
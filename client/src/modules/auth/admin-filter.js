export class AdminFilterValueConverter {
  toView(routes, isAdmin) {
    return routes.filter(r => r.config.settings.admin === undefined || r.config.settings.admin === isAdmin);
  }
}

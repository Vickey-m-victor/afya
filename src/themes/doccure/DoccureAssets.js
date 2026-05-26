export default class DoccureAssets {
    static assets = [
        () => import('bootstrap/dist/css/bootstrap.min.css'),
        () => import('@fortawesome/fontawesome-free/css/fontawesome.min.css'),
        () => import('@fortawesome/fontawesome-free/css/all.min.css'),
        () => import('vue-select/dist/vue-select.css'),
        () => import('@/themes/doccure/assets/css/feather.css'),
        () => import('@/themes/doccure/assets/css/iconsax.css'),
        () => import('@/themes/doccure/assets/scss/main.scss'),
    ]

    static styleRefs = []

    static async register() {
        this.styleRefs = await Promise.all(this.assets.map(fn => fn()))
        return this
    }

    static cleanup() {
        const styles = document.querySelectorAll('style');
        styles.forEach(style => {
          if (this.styleRefs.some(ref => style.textContent?.includes(ref.default))) {
            style.remove()
          }
        })
    }
}

# vue2-workbox-swr

// notas limpiar el codigo
// siempre async await
// siempre es6 o next para usar top await y demas
// cambiar la config del webpack a pwa
// hacer que un componente se actualize con los eventos del swr [quiza usando ref de vue]
// montar un express para las pruebas
// swr y los tiener funcionan siempre que no sean opacas las request [ideal en el mismo origin las pruebas]
// precache and route hay que desactivarlo si se prueba con un asset de estilo data.json en el src ya que recompila
// sacar sw del sw ya que los recompila
// vue: los listener globales se pueden escribir sin dramas en main.js es la forma correcta ya que es el entrypoint de toda la app
// si choca pnpm swr o pnpm build es porque serve-prod [o serve -s dist] esta corriendo aun [windows cosas]
// cuando se corre el terminar en modo dev evitar registrar el sw si no se vuelve loco por el watch
// cuando se corre el terminar en dev (serve) y se corre el prod (pnpm swr) no sirve el listener de swr para capturar cambios
// para las pruebas cambiar los textos radicalmente

## Project setup

```bash
pnpm install
```

### Compiles and hot-reloads for development

```bash
# for vue
pnpm serve
# for swr
pnpm swr
```

### Compiles and minifies for production

```
pnpm build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

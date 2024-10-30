# Контекст

Используется npm workspaces, чтобы был синк по версиям пакетов.

Шаги запуска и теста (локально):

```
# Нужно собрать проект

npm run build -w ./packages/remote
```

После выполнений в терминале будет что-то типо такого:

```
❯ npm run build -w ./packages/remote

> remote@0.0.0 build
> tsc -b && vite build

vite v5.4.10 building for production...
✓ 355 modules transformed.
dist/index.html                                            0.90 kB │ gzip:  0.41 kB
dist/assets/index-BEX1ocfc.css                             1.77 kB │ gzip:  0.80 kB
dist/assets/Component-Ch1UGJ2C.css                       219.38 kB │ gzip:  8.70 kB
dist/assets/__federation_expose_PlainButton-DRPmdRKl.js    0.21 kB │ gzip:  0.17 kB
dist/assets/__federation_expose_HostButton-CwcJCCkR.js     0.27 kB │ gzip:  0.20 kB
dist/assets/jsx-runtime-BgsmXpcd.js                        1.21 kB │ gzip:  0.65 kB
dist/assets/remoteEntry.js                                 2.47 kB │ gzip:  0.94 kB
dist/assets/__federation_shared_react-DYlhdcjt.js          7.84 kB │ gzip:  2.91 kB
dist/assets/__federation_fn_import-BNrZmHgS.js            13.85 kB │ gzip:  3.07 kB
dist/assets/Component.responsive-BxbYIb_Z.js              27.42 kB │ gzip:  8.39 kB
dist/assets/index-BJehOxLO.js                            139.40 kB │ gzip: 44.83 kB
✓ built in 607ms
```

INFO: PlainButton - без каких либо зависимостей;

После нужно запустить локальный сервер для раздачи(используется встроенные инструменты vite):

```
> vite preview

  ➜  Local:   http://localhost:4173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

После запускаем хост приложение и проверяем что кнопки работают корректно и в консоле все чисто.

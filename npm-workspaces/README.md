# Контекст

Используется npm workspaces, чтобы был синк по версиям пакетов.

Для решение проблемы с работой module federation и nextjs, есть кастыль, который позволяет вызывать код, который отвечает за загрузку remoteEntry.js напрямую из клиентского компонента.

# Сборка widgets

Для сборки widgets в папочку dist нужно запустить:

```
npm run build -w ./packages/widgets
```

Результат: должны получить следующее

```
❯ l packages/widgets/dist
total 1472
drwxr-xr-x  23 vladislavkovaliov  staff   736B Nov  1 11:03 .
drwxr-xr-x  10 vladislavkovaliov  staff   320B Nov  1 11:03 ..
-rw-r--r--   1 vladislavkovaliov  staff    23K Nov  1 11:03 184.js
-rw-r--r--   1 vladislavkovaliov  staff    17K Nov  1 11:03 251.js
-rw-r--r--   1 vladislavkovaliov  staff    63K Nov  1 11:03 370.js
-rw-r--r--   1 vladislavkovaliov  staff   950B Nov  1 11:03 370.js.LICENSE.txt
-rw-r--r--   1 vladislavkovaliov  staff    14K Nov  1 11:03 392.css
-rw-r--r--   1 vladislavkovaliov  staff   945B Nov  1 11:03 392.js
-rw-r--r--   1 vladislavkovaliov  staff   121B Nov  1 11:03 392.js.LICENSE.txt
-rw-r--r--   1 vladislavkovaliov  staff   225K Nov  1 11:03 430.css
-rw-r--r--   1 vladislavkovaliov  staff    14K Nov  1 11:03 430.js
-rw-r--r--   1 vladislavkovaliov  staff   121B Nov  1 11:03 430.js.LICENSE.txt
-rw-r--r--   1 vladislavkovaliov  staff   212B Nov  1 11:03 442.js
-rw-r--r--   1 vladislavkovaliov  staff    14K Nov  1 11:03 509.css
-rw-r--r--   1 vladislavkovaliov  staff   2.2K Nov  1 11:03 509.js
-rw-r--r--   1 vladislavkovaliov  staff    14K Nov  1 11:03 911.css
-rw-r--r--   1 vladislavkovaliov  staff   2.0K Nov  1 11:03 911.js
-rw-r--r--   1 vladislavkovaliov  staff   492B Nov  1 11:03 951.js
-rw-r--r--   1 vladislavkovaliov  staff   416B Nov  1 11:03 index.html
-rw-r--r--   1 vladislavkovaliov  staff   143K Nov  1 11:03 main.js
-rw-r--r--   1 vladislavkovaliov  staff   721B Nov  1 11:03 main.js.LICENSE.txt
-rw-r--r--   1 vladislavkovaliov  staff   144K Nov  1 11:03 remoteEntry.js
-rw-r--r--   1 vladislavkovaliov  staff   721B Nov  1 11:03 remoteEntry.js.LICENSE.txt
```

# Сборка NextJS

Тут есть две версии NextJS с app роутом.

Нужно собрать NextJS приложения через команду:

```

npm run build -w ./packages/next14-app
```

# Запуск server

Зачем оно? Сейчас оно используется чтобы раздавать статику widgets пакета и запуск NextJS приложения.

```
npm run start -w ./packages/server
```

NOTES: запустив exposer можно запустить SPA на vite или webpack и подключить \_\_federation/remoteEntry.js используя ModuleFederation или ViteFederation.

# Запуск react-vite

```
npm run dev -w ./packeges/react-vite
```

NOTES: Нужно чтобы был запущен сервер для раздачи widgets.

```
  # Пример как подвключать remoteEntry.js
 
  remotes: {
    widgets: {
      /**
       * Для локальной разработки нужно раскоментить
       */
      external: "http://localhost:3000/__federated/remoteEntry.js",
      externalType: 'url',
      format: 'var',
      from: 'webpack',
    },
  },
```
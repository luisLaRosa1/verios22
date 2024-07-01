# AppZurich

<h2 align="center">Presto | Zurich Santander </h2>

## 🛠️ Instaladores - Herramientas requeridas para el desarrollo.

| Nombre                                                            | Command |
| :---------------------------------------------------------------- | :------ |
| [Visual Studio Code](https://code.visualstudio.com/)              | -       |
| [Node.js](https://nodejs.org/dist/v18.16.0/node-v18.16.0-x64.msi) | -       |
| [Git](https://git-scm.com/download/win)                           | \_      |



## 🛠️ Docs - Desarrollo

| Nombre                                                            
| -----------------------------------------------------------------
| [PrimeFLEX - Design](https://primeflex.org/width)              
| [PrimeNG - Design](https://primeng.org/autocomplete) 
| [Angular 17](https://angular.dev/)                                 


## 🛠️ Iniciar aplicación (Development)

Se requiere tener en ejecución los siguientes proyectos:

|   Aplicación  |              Url                    |
| ------------- | ----------------------------------  |
| [Api Backend] | `http://localhost:5020/swagger`     |

Para iniciar la aplicación se necesita ejecutar alguno de estos comandos:

```bash
npm start

ng serve --port 2053 -o
```

## 🛠️ Despliegue

Obtener el compilado del aplicativo para publicar en otro ambiente:

| Ambiente | Comando              |
| :------- | :------------------- |
| DEV      | `npm run deploy_dev` |
| QA       | `npm run deploy_qa`  |
| PROD     | `npm run deploy_pro` |

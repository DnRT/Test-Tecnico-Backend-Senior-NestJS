# Test-Técnico-Backend-Senior-NestJS
Test para medir las competencias, teóricas y prácticas, para postular al puesto de Técnico Backend Senior en Finmarkets

# Ejecución del proyecto API

Para comenzar, debe estar en la carpeta del proyecto con un
``` cd taskmanager-api ```

Para luego realizar una ejecución mediante el comando
``` npm run start ``` el cual genera una instancia de esta API

Y mediante el navegador o software especializado, como Postman, usando como raíz
``` localhost:3000 ```

Para realizar las pruebas se debe utilizar el comando
``` npm run test:cov ```

Con "test:cov" es más simple poder visualizar los resultados de las pruebas, donde se ejecutan la autogenerada con la creación del proyecto en NestJS y las propias de la API; donde se prueba cada endpoint y se destaca que se genera un entorno separado de la base de datos real, con tal de poder ejecutar y comprobar el funcionamiento en un entorno simulado.
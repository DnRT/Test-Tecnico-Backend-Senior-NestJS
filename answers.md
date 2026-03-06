# Respuestas a preguntas teoricas

``` 1. Explicar la diferencia entre Middelware, Guard, Interceptor y Pipe. ```
    
    R: Middleware: es quien previene errores de tipos de datos y registros de logs; en esencia, son tareas simples para evitar fallos dentro del sistema.
       Guard: son reglas, actúan como firewall, solo son condiciones y alertan en caso de que algo no cumpla dichas reglas; por ejemplo, caracteres no permitidos en un campo de texto.
       Interceptor: son gestores de memoria, evitan que datos en caché sean procesados y solo se vuelvan a entregar; gestionan respuestas al formato esperado.
       Pipe: validadores de datos; por ejemplo, en un campo de email verificar que sea un formato válido "example@example.com" o en un campo de texto donde se solicita un número de teléfono y que contenga 9 dígitos, exclusivamente dígitos numéricos.


``` 2. ¿Comó implementaría autorización basada en roles? ```

    R: En base de datos, generando una tabla "usuarios" donde contenga una columna de "rol", luego en backend solicitar mediante sentencias a la base de datos si cumple dicho rol o no, utilizando el usuario y contraseña propiciados desde el Front-End. En formato SQL es un contador para saber si existen coincidencias, ya que no importan los datos para esta comprobación, donde las condiciones son inicialmente el rol a buscar, luego el usuario y contraseña obtenidos desde el Front-end.

``` 3. ¿Qué problemas aparecen cuando un backend crece mucho y cómo NestJS ayuda a resolverlos?. ```

    R: Principal problema de escalabilidad es el tráfico; si escala demasiado, el backend colapsa. NestJS soluciona el problema a nivel de software al estar basado en Express y, si llegase a ser necesario, implementar Fastify. Problemas más secundarios, pero importantes para la mantención del sistema, es la modularidad que proporciona NestJS, el cual evita tener búsquedas tan exhaustivas para encontrar dónde falla el código o tenerlos completamente desparramados por un equipo de desarrollo amplio implicado en el sistema.

``` 4. ¿Cómo manejaría configuración por ambiente (development, staging, production)? ```

    R: Mediante el uso de plataformas estilo GitHub o GitLab, donde cada ambiente es una rama del proyecto, un usuario administrador gestiona los merge de development a staging y, una vez completadas las comprobaciones y pruebas, realiza el merge a production. Además, en cada ambiente solo se permite la modificación de los usuarios implicados; es decir, un desarrollador solo puede modificar la rama de development y nada más si no está implicado en otro ambiente.

``` 5. ¿Cómo evitaría que dos usuarios compren el último producto disponible al mismo tiempo? ```

    R: Verificando las respuestas del pago, se lleva el producto el usuario cuya entidad bancaria entregó el "OK" a la transacción antes; al otro usuario se le rechazaría dicha operación. En caso de ser necesario, se realiza una nota de crédito para autorizar el reembolso por "stock agotado".
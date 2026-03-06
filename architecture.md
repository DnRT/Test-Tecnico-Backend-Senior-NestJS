# Preguntas de Arquitectura de la API

``` 1. ¿Cómo escalaría esta API para soportar 1000 requests por segundo? ```

    R: Si solo se pudiera contar con una sola instancia de esta API, modificaría las peticiones entrantes al backend para que todas se agregaran a una lista cada segundo o microsegundo, generando una o varias colas dependiendo de la petición necesaria, para no saturar el límite de PostgreSQL o el mismo equipo donde esté ejecutándose. En caso de poder contar con más instancias, mediante métodos propiciados por los gestores de Nginx, utilizaría repartición de carga, aprovechando la posibilidad de un escalamiento horizontal del sistema.
    
``` 2. ¿Qué cambios haría si el sistema creciera a millones de tareas? ```

    R: En esta situación, dentro de lo posible, utilizar escalamiento horizontal, sistemas de caching y, además, utilizar la opción que permite NestJS de utilizar Fastify; ya que, a diferencia de la pregunta anterior, este escenario demanda una combinación de técnicas; en este caso se utilizaría caching, optimización de recursos y escalamiento horizontal.
    
``` 3. ¿Cómo implementaría autenticación JWT en este sistema? ```

    R: Mediante la instalación del paquete, en este caso "@nestjs/jwt", y luego generando un Guard para que gestione las claves creadas para los usuarios ingresados; esto a nivel de diseño del flujo, ya que a nivel de desarrollo limitaría las peticiones de agregar, modificar y eliminar "tasks" a usuarios verificados.

``` 4. ¿Cómo manejaría procesamiento asincrónico para tareas pesadas? ```

    R: Utilizando sistemas de gestores de colas como Redis o BullMQ, esto para evitar sobrecargas del sistema y un posible "memory overload" dando de baja momentáneamente el servicio que se esté ejecutando.

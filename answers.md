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

# Análisis de código

# Codigo a analizar

    @Injectable()
    export class OrdersService {
        private orders = [];
        create(order) {
            this.orders.push(order);
            return order;
        }
        findAll() {
        return this.orders;
        }
        updateStatus(id, status) {
        const order = this.orders.find(o => o.id === id);
        order.status = status;
        return order;
        }
    }

# Preguntas y respuestas

``` 1. Identifique al menos 5 problemas de arquitectura o diseño. ```

    R: 1. La función "updateStatus" no comprueba si existe previamente el identificador antes de operar, por lo que puede llegar a colapsar el sistema dando un "Can't set property to undefined".
    2. Código interpretado en TypeScript, pero realmente es JavaScript puro, por lo que desperdicia las ventajas de utilizar NestJS.
    3. Faltan DTOs; es decir, no existen verificaciones de los datos necesarios, por lo que cualquier usuario puede crear una "order" con datos extras, una falla que afecta directamente a la seguridad del sistema y sus datos sensibles.
    4. Al tener la línea "private orders = [];", las órdenes están vivas mientras el sistema siga vivo, por lo que, anidado al error 1, existen altas posibilidades de pérdida de órdenes cuando alguna contenga un identificador inexistente.
    5. La función "findAll" entrega de forma íntegra el arreglo "orders" con el agregado de que puede modificar dicho arreglo, por lo que es una falla a la integridad de los datos de dichas órdenes generadas por los usuarios.

``` 2. Explique cómo refactorizaría esta implementación en un proyecto real de NestJS. ```

    R: Por orden:
    1. Generar un bloque try/catch para evitar la interrupción del sistema, donde, en caso de no existir dicho identificador, se agregue a la base de datos y se siga con el flujo natural del sistema.
    2. Generar una interfaz donde se especifique el tipo de dato "order".
    3. Agregar Pipes de validación para verificar los campos necesarios.
    4. Enviar los datos a alguna base de datos, sea SQL o NoSQL, con tal de mantener dichos registros activos aun después de un apagado por mantenimiento del sistema.
    5. Generar en una variable o en el mismo retorno una copia del mismo arreglo; así solo se modifica la copia y no el original.

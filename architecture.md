# Respuestas a preguntas de análisis de la arquitectura entregada

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

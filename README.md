Integrantes:
* Santiago Espinosa
* Samuel Gutierrez
* Juan Pablo Niño

# Descripcion
  En este proyecto se puede acceder desde un usuario normal o un superadmin, el superadmin tiene la capacidad de crear,
   modificar y eliminar otros usuarios, mientras que el usuario normal no. se pueden crear comentarios por parte de todos
   los usuarios y tambien se puede acceder a dichos comentarios con cualquier rol, las personas dueñas de sus comentarios
   tienen la capacidad de modificarlos o eliminarlos. Tambien, los usuarios pueden reaccionar a dichos comentarios, estas
  reacciones pueden ser eliminadas por su usuario creador.

# Dificultades
  La dificultad mas grande fue el como relacionar los comentarios con sus respuestas, ya que se tenia que hacer una
  pequeña investigacion aparte, se concluyo que era mejor referenciar las respuestas a partir de su id.

# Modo de uso
Para crear un usuario, se debe hacer login en /api/users/login con el usuario superadmin que esta por defecto en el programa (los superusuarios están identificados por tener un 0 en el campo "rol", luego se accede
a thunderclient y se realiza una solicitud POST en la ruta /api/users con un body que contenga los campos nombre, email, contraseña y rol. 

```
{
    "name": "Test",
    "email": "test@admin.com",
    "password": "test-password",
    "role": "0"
}
```

Para eliminar un usuario, se hace login y se usa la solicitud DELETE acompañado del email de la persona que se quiere eliminar al final de la ruta.

```
http://localhost:3000/api/users/test@admin.com
```

Para modificar un usuario, se hace login y se usa la solicitud PUT con un body que contenga los campos nombre, email, contraseña y rol (cualquiera de estos puede ser diferente al que se tenia antes).

```
{
    "name": "Hola Mundo",
    "email": "test@admin.com",
    "password": "test-password",
    "role": "1"
}
```

Para crear un comentario, se debe hacer login en /api/users/login con cualquier tipo de usuario y se accede a la ruta /api/comments, en el body 
se incluye el texto que se quiere comentar.

```
{
    "text": "Esto es un comentario"
}
```

Para modificar un comentario, se debe hacer login con el usuario que creo dicho comentario, luego se realiza una
solicitud PUT acompañado del ID del comentario que se quiere actualizar al final de la ruta. Esta petición debe incluir el nuevo texto que se quiere actualizar. 

```
http://localhost:3000/api/comments/"id"
````

Para borrar un comentario, se debe hacer login con el usuario que creo dicho comentario, luego se realiza una solicitud DELETE acompañado del ID del comentario que se quiere eliminar al final de la ruta.

Para crear una respuesta de comentario, se debe hacer login con cualquier tipo de usuario y se accede a la ruta /api/comments/[id-comentario-a-responder] y se realiza una solicitud POST 
con un body que contiene el texto a responder. Se realiza el mismo procedimiento con las solicitudes PUT y DELETE anteriores. Es importante saber que en la estructura del proyecto las respuestas son esencialmente comentarios que responden a otros comentarios.

Para reaccionar a un comentario, se debe hacer login con cualquier tipo de usuario y se accede a la ruta /api/reactions/[id-comentario-a-reaccionar], en la cual se realiza una solicitud
POST con un body que contenga la reaccion a vincular con el comentario. Las funcionalidades de actualizar y eliminar aplican con la misma lógica de los comentarios.

```
{
    "text" : "me_gusta"
}
```

Las posibles reacciones son las siguientes:

```
MeGusta = "me_gusta",
MeEncanta = "me_encanta",
MeDivierte = "me_divierte",
MeSorprende = "me_sorprende",
MeEntristece = "me_entristece",
MeEnoja = "me_enoja"
```




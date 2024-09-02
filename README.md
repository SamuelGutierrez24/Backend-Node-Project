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
Para crear un usuario, se debe hacer login en /api/users/login con el usuario superadmin que esta por defecto en el programa, luego se accede
a thunderclient y se realiza una solicitud POST en la ruta /api/users con un body que contenga los campos nombre, email, contraseña y rol. Para eliminar 
un usuario, se hace login y se usa la solicitud DELETE con un body que contenga el campo del email de la persona que se quiere eliminar. Para modificar
un usuario, se hace login y se usa la solicitud PUT con un body que contenga los campos nombre, email, contraseña y rol (cualquiera de estos puede ser
diferente al que se tenia antes).

Para crear un comentario, se debe hacer login en /api/users/login con cualquier tipo de usuario y se accede a la ruta /api/comments, en el body 
se incluye el texto que se quiere comentar. Para modificar un comentario, se debe hacer login con el usuario que creo dicho comentario, luego se realiza una
solicitud PUT que incluye el nuevo texto que se quiere actualizar. Para borrar un comentario, se debe hacer login con el usuario que creo dicho comentario, luego se realiza una
solicitud DELETE.

Para crear una respuesta de comentario, se debe hacer login con cualquier tipo de usuario y se accede a la ruta /api/comments/[id-comentario-a-responder] y se realiza una solicitud POST 
con un body que contiene el texto a responder. Se realiza el mismo procedimiento con las solicitudes PUT y DELETE anteriores.
Para reaccionar a un comentario, se debe hacer login con cualquier tipo de usuario y se accede a la ruta /api/comments/[id-comentario-a-responder]/react, en la cual se realiza una solicitud
POST con un body que contenga la reaccion a vincular con el comentario.


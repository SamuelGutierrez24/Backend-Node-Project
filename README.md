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
El servidor GraphQL está disponible en la ruta /graphql.

Crear un Usuario
Para crear un usuario, se debe hacer login utilizando la mutación login con el usuario superadmin que está por defecto en el programa (los superusuarios están identificados por tener un 0 en el campo "rol"). Luego, se puede utilizar la mutación createUser para crear un nuevo usuario.

```
mutation {
  createUser(input: {
    name: "Test",
    email: "test@admin.com",
    password: "test-password",
    role: "0"
  }) {
    id
    name
    email
  }
}
```

Eliminar un Usuario
Para eliminar un usuario, se debe hacer login y luego utilizar la mutación deleteUser con el email de la persona que se quiere eliminar.

```
mutation {
  deleteUser(email: "test@admin.com") {
    success
  }
}
```

Modificar un Usuario
Para modificar un usuario, se debe hacer login y luego utilizar la mutación updateUser con un body que contenga los campos nombre, email, contraseña y rol (cualquiera de estos puede ser diferente al que se tenía antes).

```
mutation {
  updateUser(email: "test@admin.com", input: {
    name: "Hola Mundo",
    password: "new-password",
    role: "1"
  }) {
    id
    name
    email
  }
}
```

Ejemplos de Consultas y Mutaciones

Obtener un Usuario
```
query {
  getUser(id: "user-id") {
    id
    name
    email
  }
}
```

Crear un Comentario
```
mutation {
  createComment(email: "test@example.com", text: "Este es un comentario") {
    id
    text
    email
  }
}
```

Obtener Todos los Comentarios
```
query {
  getComments {
    id
    text
    email
  }
}
```

Crear una Reacción
```
mutation {
  createReaction(input: {
    type: "MeGusta",
    commentId: "comment-id"
  }) {
    id
    type
    commentId
  }
}
```

Obtener una Reaccion
```
query {
  getReaction(id: "reaction-id") {
    id
    type
    commentId
  }
}
```

Obtener Todas las Reacciones
```
query {
  getReactions {
    id
    type
    commentId
  }
}
```

Las posibles reacciones son las siguientes:
``
`MeGusta = "me_gusta",
NoMeGusta = "no_me_gusta",
```





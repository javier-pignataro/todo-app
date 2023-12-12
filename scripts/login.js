window.addEventListener('load', function () {
      /* ---------------------- obtenemos variables globales ---------------------- */
            const form = document.forms[0]
      const email = document.querySelector("#inputEmail")
      const password = document.getElementById("inputPassword")
      const url = "https://todo-api.ctd.academy/v1"

      /* -------------------------------------------------------------------------- */
            /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
            /* -------------------------------------------------------------------------- */


            if( token = localStorage.getItem('jwt') ){

                  const settings = {
                        method: "GET",
                        headers: {
                              'Content-Type': 'application/json',
                              'authorization': token
                        }
                  }
                  fetch(`${url}/users/getMe`, settings)
                        .then(
                              response => 
                              {
                                    if( response.ok ){
                                          location.replace("./mis-tareas.html")
                                    } else {
                                          this.localStorage.clear();
                                    }
                              }
                        )
                        .catch(
                               () =>
                               {
                                     this.localStorage.clear();
                               }
                        )
            }


      form.addEventListener('submit', function (event) {
            event.preventDefault()

            //Creamos el cuerpo de la request (petición al servidor)
            const payload = {
                  email: email.value,
                  password: password.value
            }

            // vemos el objeto que recibimos del formulario
            // console.log(payload);

            //configuramos la request del Fetch
            const settings = {
                  method: "POST",
                  body: JSON.stringify(payload),
                  headers: {
                        'Content-Type': 'application/json'
                  }
            }

            // Lanzamos la consulta del login a la API
            realizarLogin(settings)

            // Limpiamos el formulario
            form.reset()

      });


      /* -------------------------------------------------------------------------- */
            /*                     FUNCIÓN 2: Realizar el login [POST]                    */
            /* -------------------------------------------------------------------------- */
            function realizarLogin(settings) {


                  fetch(`${url}/users/login`, settings)
                        .then(response => {

                              // manejar el error de la request.
                              if (response.ok) 
                                    return response.json()
                              return Promise.reject( response );



                              // si llego acá es por que la request no es la correcta y fuerzo el rechazo de la promesa del fetch
                              // return Promise.reject(response)

                        })
                        .then(data => {

                              if (data.jwt) {
                                    // Guardamos el dato jwt en el local storage (este token de autenticación)
                                    // localStorage.setItem("jwt", JSON.stringify(data.jwt))
                                    localStorage.setItem("jwt", data.jwt); // no es necesario convertirlo a string

                                    // redireccionamos a nuestro dashboard de todo
                                    location.replace("./mis-tareas.html")
                              }

                        })
                        .catch(err => {
                              console.warn("Promesa rechazada ");
                              if (err.status == 400) {
                                    console.warn("Contraseña incorrecta")
                                    alert("Contraseña incorrecta")
                              } else if (err.status == 404) {
                                    console.warn("El usuario no existe")
                                    alert("El usuario no existe")
                              } else {
                                    console.error("Error del servidor | url no existe")
                                    alert("Error del servidor | url no existe")
                              }
                        })



            };


});

// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.



      /* ------ comienzan las funcionalidades una vez que carga el documento ------ */
      window.addEventListener('load', function () {

            /* ---------------- variables globales y llamado a funciones ---------------- */
                  // HTML Nodes
            const btnCerrarSesion = document.getElementById( "closeApp" );
            const formCrearTarea = document.querySelector( ".nueva-tarea" );
            const userInfo = document.querySelector( ".user-info" );
            // Endpoints
            const urlGetCredentials = "https://todo-api.ctd.academy/v1/users/getMe"
            const urlGetTasks = "https://todo-api.ctd.academy/v1/tasks"
            const token = localStorage.getItem( "jwt" );
            // Requests
            // get for tasks and getCredentials
            const getReqWithAuth = {
                  method: "GET",
                  headers: {
                        'Content-Type': 'application/json',
                        'authorization': token
                  }
            }
            // POST for create a new task
            const createTaskPostReq = {
                  method: "POST",
                  headers: {
                        'Content-Type': 'application/json',
                        'authorization': token
                  },
                  body: ""
            }

            // Listas de tareas pendientes y completadas
            let pendingTasks = [];
            let completedTasks = [];

            // Run Time Instructions
            obtenerNombreUsuario();
            consultarTareas();


            /* -------------------------------------------------------------------------- */
                  /*                          FUNCIÓN 1 - Cerrar sesión                         */
                  /* -------------------------------------------------------------------------- */

                  btnCerrarSesion.addEventListener('click', function ()
                        {
                              localStorage.clear();                        
                              location.replace( "./index.html" );
                        });

            /* -------------------------------------------------------------------------- */
                  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
                  /* -------------------------------------------------------------------------- */

                  function obtenerNombreUsuario() {
                        fetch( urlGetCredentials, getReqWithAuth )
                              .then(
                                    res =>
                                    {
                                          if( !res.ok ){
                                                return Promise.reject(respuesta);
                                          }
                                          return res.json();
                                    }
                              )
                              .then(
                                    data =>
                                    {
                                          userInfo.childNodes[1].innerHTML = `${data.firstName}`;
                                    }
                              )
                              .catch(
                                    err =>
                                    {
                                          console.error( err );
                                    }
                              )
                        ;
                  };


            /* -------------------------------------------------------------------------- */
                  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
                  /* -------------------------------------------------------------------------- */

                  function consultarTareas() {
                        fetch( urlGetTasks, getReqWithAuth )
                              .then(
                                    res =>
                                    {
                                          if( !res.ok ){
                                                return Promise.reject(respuesta);
                                          }
                                          return res.json();
                                    }
                              )
                              .then(
                                    data =>
                                    {
                                          console.log( data );
                                    }
                              )
                              .catch(
                                    err =>
                                    {
                                          console.error( err );
                                    }
                              )
                        ;
                  };


            /* -------------------------------------------------------------------------- */
                  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
                  /* -------------------------------------------------------------------------- */

                  formCrearTarea.addEventListener('submit', function (event) {





                  });


            /* -------------------------------------------------------------------------- */
                  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
                  /* -------------------------------------------------------------------------- */
                  function renderizarTareas(listado) {







                  };

            /* -------------------------------------------------------------------------- */
                  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
                  /* -------------------------------------------------------------------------- */
                  function botonesCambioEstado() {





                  }


            /* -------------------------------------------------------------------------- */
                  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
                  /* -------------------------------------------------------------------------- */
                  function botonBorrarTarea() {





                  };

      });

// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.



      /* ------ comienzan las funcionalidades una vez que carga el documento ------ */
      window.addEventListener('load', function () {

            /* ---------------- variables globales y llamado a funciones ---------------- */
                  // HTML Nodes
            const btnCerrarSesion = document.getElementById( "closeApp" );
            const formCrearTarea = document.querySelector( ".nueva-tarea" );
            const userInfo = document.querySelector( ".user-info" );
            const taskDescr = document.getElementById("nuevaTarea");
            const htmlTaskList = document.querySelector( ".tareas-pendientes" );
            // Endpoints
            const urlGetCredentials = "https://todo-api.ctd.academy/v1/users/getMe"
            const urlTasks = "https://todo-api.ctd.academy/v1/tasks"
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
            // User name for headers
            obtenerNombreUsuario();
            // Obtener ARRAY de tasks desde la API, y guardarlo en -> [ pendingTasks ]
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
                        fetch( urlTasks, getReqWithAuth )
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
                                          pendingTasks = data;
                                          renderizarTareas( pendingTasks );
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
                        event.preventDefault()

                        const body = {
                              description: taskDescr.value,
                              completed: false
                        }

                        createTaskPostReq.body = JSON.stringify( body );

                        fetch( urlTasks, createTaskPostReq )
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
                                          // console.log( data );
                                          pendingTasks.push( data ); // Push response task to pendingTasks [] ( array )
                                          console.log( "Array de tareas: -------------" );
                                          console.log( pendingTasks );
                                          renderizarTareas(pendingTasks);
                                    }
                              )
                              .catch(
                                    err =>
                                    {
                                          console.error( err );
                                    }
                              )
                        ;
                  });


            /* -------------------------------------------------------------------------- */
                  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
                  /* -------------------------------------------------------------------------- */
                  function renderizarTareas(listado) {

                        // Reset List of tasks
                        htmlTaskList.innerHTML = "";

                        for( let task of listado ){
                              taskListItem = `
                                    <li class="tarea">
                                          <button class="change" id="0${task.id}"><i class="fa-regular fa-circle"></i></button>
                                          <div class="descripcion">
                                                <p class="nombre">${task.description}</p>
                                                <p class="timestamp">${task.createdAt}</p>
                                          </div>
                                    </li>
                              `;
                              htmlTaskList.innerHTML += taskListItem;
                        }
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

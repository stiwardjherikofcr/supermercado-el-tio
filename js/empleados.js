document.getElementById("formulario").addEventListener("submit", crear);

//Agrega Empleados
function crear(e){
  nombre = document.getElementById("nombreE").value
  usuario = document.getElementById("usuarioE").value
  telefono = document.getElementById("telefonoE").value
  direccion = document.getElementById("direccionE").value
  cargo = document.getElementById("cargoE").value

  let empleado = {
    nombre,
    usuario,
    telefono,
    direccion,
    cargo
  }

  if(localStorage.getItem("Empleados") == null){
    let empleados = []
    empleados.push(empleado)
    localStorage.setItem("Empleados",JSON.stringify(empleados))
  } else{
    let empleados = JSON.parse(localStorage.getItem("Empleados"))
    empleados.push(empleado)
    localStorage.setItem("Empleados",JSON.stringify(empleados))
  }

  
  document.getElementById("formulario").reset();
  e.preventDefault();
  console.log("Empleado Guardado Correctamente")
  e.preventDefault()
  leer();  
}

function leer(l) {
    let empleados = JSON.parse(localStorage.getItem("Empleados"));
    document.getElementById("tbody").innerHTML = ""
    for (let i = 0; i < empleados.length; i++){
        let nombre = empleados[i].nombre
        let usuario = empleados[i].usuario
        let telefono = empleados[i].telefono
        let direccion = empleados[i].direccion
        let cargo = empleados[i].cargo
        
        document.getElementById("tbody").innerHTML += 
        ` <tr>
        <td>${nombre}</td>
        <td>${usuario}</td>
        <td>${telefono}</td>
        <td>${direccion}</td>
        <td>${cargo}</td>
        <td>
          <div class="dropdown show">
            <a class="btn dropdown-toggle" src="images/puntos.png" href="#" role="button" id="desplegable"
              data-toggle="dropdown" aria-haspopup="true">
              <img src="../images/puntos.png" class="align-right" height="30px" width="30px">
            </a>


            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <a class="dropdown-item" onclick="usarliminar('${nombre}')" data-toggle="modal" style="background-color:#FFFFFF"
                href="#ventana1">Eliminar</a>
              <a class="dropdown-item" data-toggle="modal" style="background-color:#FFFFFF" id="btn-abrir-popup2"
                href="#ventana2">Editar información</a>
              <a class="dropdown-item" data-toggle="modal" style="background-color:#FFFFFF" id="btn-abrir-popup3"
                href="#ventana3">Restablecer contraseña</a>
            </div>
          </div>
        </td>
      </tr>

        `
    }  
}
leer();

function usarliminar(nombre){
    let eliminadop = {
      nombre
    }
  
    if(localStorage.getItem("eliminados") == null){
      let u_eliminados = []
      u_eliminados.push(eliminadop)
      localStorage.setItem("eliminados",JSON.stringify(u_eliminados))
    } else{
      let u_eliminados = JSON.parse(localStorage.getItem("eliminados"))
      u_eliminados.unshift(eliminadop)
      localStorage.setItem("eliminados",JSON.stringify(u_eliminados))
    }
  }

  function eliminar(){
    let empleados = JSON.parse(localStorage.getItem("Empleados"));
    let u_eliminados = JSON.parse(localStorage.getItem("eliminados"));
    for(let i = 0; i<empleados.length; i++){
      if(u_eliminados[0].nombre != null &&  empleados[i].nombre === u_eliminados[0].nombre){
        empleados.splice(i,1);
        u_eliminados.splice(0,1);
      }
      
    }
    
    localStorage.setItem("Empleados",JSON.stringify(empleados));
    localStorage.setItem("eliminados",JSON.stringify(u_eliminados));
    
    leer();
    console.log("Empleado Eliminado Correctamente")
    $('#Empleado eliminado').modal('hide');
  }
  leer();

  function editar(telefono, dirección, cargo){
    let empleados = JSON.parse(localStorage.getItem("Empleados"));
    for(let i=0; i<empleados.length; i++){
      if(empleados[i].nombre == nombre){
        document.getElementById("ventana2").innerHTML = 
      `<div class="modal fade" id="ventana2" style="top:70px">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Editar Información</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">${telefono}</label>
                <input type="text" class="form-control" id="recipient-telf">
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">${direccion}</label>
                <input type="text" class="form-control" id="recipient-dir">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">${cargo}</label><br>
                <select style="width:100%" class="form-select" aria-label="Default select example">
                  <option selected>Cargo</option>
                  <option value="1">Cargo 1</option>
                  <option value="2">Cargo 2</option>
                  <option value="3">Cargo 3</option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary">Guardar cambios</button>
          </div>
        </div>
      </div>
    </div>
      `  
      }
    }
  }

  function actualizarr(i){
    let empleados = JSON.parse(localStorage.getItem("Empleados"));
    empleados[i].telefono = document.getElementById("newtelefono").value;
    empleados[i].direccion = document.getElementById("newdireccion").value;
    empleados[i].cargo = document.getElementById("newcargo").value;
    localStorage.setItem("Empleados",JSON.stringfy(empleados));
  }
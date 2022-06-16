document.getElementById("formulario").addEventListener("submit", crear);

//Agrega Deudores
function crear(e){
  nombre = document.getElementById("nombreD").value
  saldo = document.getElementById("saldoD").value
  telefono = document.getElementById("telefonoD").value
  direccion = document.getElementById("direccionD").value

  let deudor = {
    nombre,
    saldo,
    telefono,
    direccion
  }

  if(localStorage.getItem("Deudores") == null){
    let deudores = []
    deudores.push(deudor)
    localStorage.setItem("Deudores",JSON.stringify(deudores))
  } else{
    let deudores = JSON.parse(localStorage.getItem("Deudores"))
    deudores.push(deudor)
    localStorage.setItem("Deudores",JSON.stringify(deudores))
  }
  document.getElementById("formulario").reset();
  e.preventDefault();
  console.log("Deudor Guardado Correctamente")
  leer()
  
}


//funcion leer Deudores
function leer(){
  let deudores = JSON.parse(localStorage.getItem("Deudores"));
  document.getElementById("tbody").innerHTML = ""
  for(let i=0; i<deudores.length; i++){
    let nombre = deudores[i].nombre
    let saldo = deudores[i].saldo
    let telefono = deudores[i].telefono
    let direccion = deudores[i].direccion

    document.getElementById("tbody").innerHTML += 
      `<tr>
      <td>${nombre}</td>
      <td>${saldo}</td>
      <td>${telefono}</td>
      <td>${direccion}</td>
      <td>${i+1}</td>
      <td><div class="dropdown show">
		  <a class="btn dropdown-toggle" src="images/puntos.png" href="#" role="button" id="desplegable" data-toggle="dropdown" aria-haspopup="true"> 
		  	<img src="../images/puntos.png" class="align-right" height="30px" width="30px"> 
		  </a>

			  <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
			    <a class="dropdown-item" data-toggle="modal" onclick="usereliminar('${nombre}')" style="background-color:#FFFFFF" href="#ventana1">Cancelar Deuda</a>
			    <a class="dropdown-item" data-toggle="modal" onclick="abonar('${nombre}',${saldo})" href="#ventana2">Abonar</a>
          <a class="dropdown-item" data-toggle="modal" onclick="editar('${nombre}',${saldo})" href="#ventana4">Editar Informacion</a>          
			  </div>
			  </div>
			</div></td>
    </tr>`
  }
}

//funcion editar
function editar(nombre,saldo){
  let deudores = JSON.parse(localStorage.getItem("Deudores"));
  for(let i=0; i<deudores.length; i++){
    if(deudores[i].nombre == nombre){
      document.getElementById("ventana4").innerHTML = 
    `<div class="modal fade" id="ventana4" width="80%">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="model-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="margin-right: 10px">&times;</button><br>
						</div>
						<div id="vent"><h3 align="center">Editar Información</h3><br>
              <label style="margin-left: 50px"> Cliente: ${nombre}</label>
              <form id="formularioEdit">                  
						<label style="margin-left: 50px"> Dirección </label>
                <div class="form-group">
                    <input type="text" id="newdireccion" class="form control" placeholder="Direccion Nueva">
                  </div><br>
						<label style="margin-left: 50px"> Teléfono </label>
                <div class="form-group">
                    <input type="number" id="newtelefono" class="form control" placeholder="Teléfono Nuevo">
                  </div><br><br>
              <label style="margin-left: 50px"> Saldo: ${saldo}</label>
							<button type="submit" class="btn btn-primary">Guardar</button>
                </form>
							</div> 
          <br>					
					</div>
				</div>
			</div>
    `  
    }
  }
}

//funcion actualizar
function actualizar(i){
  let deudores = JSON.parse(localStorage.getItem("Deudores"));
  deudores[i].nombre = document.getElementById("newnombre").value;
  deudores[i].telefono = document.getElementById("newtelefono").value;
  deudores[i].direccion = document.getElementById("newdireccion").value;
  localStorage.setItem("Deudores",JSON.stringfy(deudores));
}

//funcion usuario a eliminar
function usereliminar(nombre){
  let eliminado = {
    nombre
  }

  if(localStorage.getItem("Eliminados") == null){
    let eliminados = []
    eliminados.push(eliminado)
    localStorage.setItem("Eliminados",JSON.stringify(eliminados))
  } else{
    let eliminados = JSON.parse(localStorage.getItem("Eliminados"))
    eliminados.unshift(eliminado)
    localStorage.setItem("Eliminados",JSON.stringify(eliminados))
  }
  
}

//funcion abonar
function abonar(nombre, saldo){
  let deudores = JSON.parse(localStorage.getItem("Deudores"));
  document.getElementById("ventana2").innerHTML = ""
  document.getElementById("ventana2").innerHTML += 
    `<div class="modal-dialog">
				<div class="modal-content">
					<div class="model-header">
						<button tyle="button" class="close" data-dismiss="modal" aria-hidden="true" style="margin-right: 10px">&times;</button><br>
						</div>
						<div id="vent"><h1 align="center">Abonos</h1><br>
							<label id="saldo"> Saldo pendiente: </label>
								<label id="idVenta">${saldo}</label><br>
							<label id="clien">Cliente: </label>
								<Label id="idVenta">${nombre}</label>

								<div  id="banner2" class="container-fluid">
									<div class="row mt-4">
							      		<div class="col-md">
							        <table class="table table-striped" style="width: 100%;">
							          <thead>
							            <tr>
							              <th style="width:30%">ID Factura</th>
							              <th class="text-center" >Fecha de Compra</th>
							              <th class="text-center">Saldo</th>
							            </tr>
							          <tbody>
							    	 	<tr>
							      		  <td>id</td>
							      		  <td>fecha</td>
							      		  <td>${saldo}</td>
							      	    </tr>							      
							      	  </tbody>
							          </thead>
							        </table>
							        </div></div></div><br>
							<label style="margin-left: 50px"> Saldo a abonar: </label><Input type = "number" id ="abono" value = "" style="margin-left: 70px"/></label><br><br>
							<button type="button" onclick="abono('${nombre}',${saldo})" id="btnAbono" data-dismiss="modal" class="btn btn-primary">Abonar</button>
							</div> <br>
					
					</div>
				</div>`
  
}


//funcion de abono
function abono(nombre, saldo){
  let deudores = JSON.parse(localStorage.getItem("Deudores"));
  let abono = document.getElementById("abono").value;
  let nuevoSaldo = saldo - abono;
  if(nuevoSaldo<0) alert("El valor del abono es mayor al del saldo, por favor verifique el valor");     
  for(let i = 0; i<deudores.length; i++){
    if(deudores[i].nombre === nombre && nuevoSaldo >= 0){
      deudores[i].saldo = nuevoSaldo;
    }
    localStorage.setItem("Deudores",JSON.stringify(deudores));
    leer();
    }
  console.log("Abono realizado Correctamente")
}

//funcion eliminar
function eliminar(){
  let deudores = JSON.parse(localStorage.getItem("Deudores"));
  let eliminados = JSON.parse(localStorage.getItem("Eliminados"));
  for(let i = 0; i<deudores.length; i++){
    if(eliminados[0].nombre != null &&  deudores[i].nombre === eliminados[0].nombre){
      deudores.splice(i,1);
      eliminados.splice(0,1);
    }
    
  }
  
  localStorage.setItem("Deudores",JSON.stringify(deudores));
  localStorage.setItem("Eliminados",JSON.stringify(eliminados));
  
  leer();
  console.log("Deudor Eliminado Correctamente")
  $('#deudaeliminada').modal('hide');
  
}
leer();

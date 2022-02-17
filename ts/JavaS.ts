var users:any[]=[];
var coches:any[]=[];
var motos:any[]=[];
var camiones:any[]=[];

class Usuario {
    nombre:string;
    apellidos:string;
    fechaNacimiento:string;
    telefono:number;
    email:string;
    usuario:string;
    contraseña:string;
    contraseña2:string;
    rol:string;

    constructor(nuevoNombre:string, nuevoApellidos:string, nuevaFechaNacimiento:string, nuevoTelefono:number, nuevoEmail:string, nuevoUsuario:string, nuevaContraseña:string, nuevaContraseña2:string, nuevoRol:string){
        this.nombre = nuevoNombre;
        this.apellidos = nuevoApellidos;
        this.fechaNacimiento = nuevaFechaNacimiento;
        this.telefono = nuevoTelefono;
        this.email = nuevoEmail;
        this.usuario = nuevoUsuario;
        this.contraseña = nuevaContraseña;
        this.contraseña2 = nuevaContraseña2;
        this.rol = nuevoRol;
    }
}

class vehiculo {
    imagen:string;
    id:number;
    marca:string;
    modelo:string;
    año:string;
    distancia:string;
    potencia:string;
    precio:string;
    estado:string;

    constructor(nuevaImagen:string, nuevaId:number,nuevaMarca:string, nuevoModelo:string, nuevoAño:string, nuevaDistancia:string, nuevaPotencia:string, nuevoPrecio:string, nuevoEstado:string) {
        this.imagen = nuevaImagen;
        this.id = nuevaId;
        this.marca = nuevaMarca;
        this.modelo = nuevoModelo;
        this.año = nuevoAño;
        this.distancia = nuevaDistancia;
        this.potencia = nuevaPotencia;
        this.precio = nuevoPrecio;
        this.estado = nuevoEstado;
    }
}

// Creacion de los vehiculos por defecto
function arraysDefecto () {
    // Relleno array coches
    var coche1:vehiculo = new vehiculo("img/coche-1.jpg", 1, "Audi A3", "1.6 TDI 105cv Attraction","2014", "140.137", "105" , "11.290" ,"Disponible");
    var coche2:vehiculo = new vehiculo("img/coche-2.jpg", 2, "SEAT León", "1.5 TSI 110kW DSG-7 S&S FR Fast Edition","2020", "30.182", "150" , "19.690" ,"Disponible");
    var coche3:vehiculo = new vehiculo("img/coche-3.jpg", 3, "Peugeot 208", "1.5 TSI 110kW DSG-7 S&S FR Fast Edition","2020", "30.182", "150" , "11.290" ,"Disponible");
    var coche4:vehiculo = new vehiculo("img/coche-4.jpg", 4, "Citroën C4 Cactus", "PureTech 81KW (110CV) S&S EAT6 Shine","2018", "103.137", "110" , "11.999" ,"Disponible");
    var coche5:vehiculo = new vehiculo("img/coche-5.jpg", 5, "Opel Corsa", "1.4 66kW (90CV) Design Line","2019", "52.137", "90" , "10.290" ,"Disponible");
    var coche6:vehiculo = new vehiculo("img/coche-6.jpg", 6, "Audi A1", "Adrenalin2 1.0 TFSI 70kW(95CV)k","2018", "35.663", "95" , "13.290" ,"Disponible");
    coches.push(coche1);
    coches.push(coche2);
    coches.push(coche3);
    coches.push(coche4);
    coches.push(coche5);
    coches.push(coche6);
    localStorage.setItem("coches", JSON.stringify(coches));

    // Relleno array motos
    var moto1:vehiculo = new vehiculo("img/moto-1.jpg", 1, "Harley Davidson", "Electra Glide Ultra Classic", "2013", "37.500", "1.690", "19.940", "Disponible");
    var moto2:vehiculo = new vehiculo("img/moto-2.jpg", 2, "Benelli", "Leoncino 500", "2018", "16.500", "500", "4.790", "Disponible");
    var moto3:vehiculo = new vehiculo("img/moto-3.jpg", 3, "Aprilia", "Shiver 750", "2010", "41.350", "750", "3.490", "Disponible");
    motos.push(moto1);
    motos.push(moto2);
    motos.push(moto3);
    localStorage.setItem("motos", JSON.stringify(motos));

    // Relleno array camiones
    var camion1:vehiculo = new vehiculo("img/camion-1.jpeg", 1, "MAN", "TGX 480", "2015", "602.399", "220", "26.800", "Disponible");
    var camion2:vehiculo = new vehiculo("img/camion-2.jpeg", 2, "DAF", "Xf 105.460 Palfinger 44002", "2007", "494.850", "220","15.500", "Disponible");
    camiones.push(camion1);
    camiones.push(camion2);
    localStorage.setItem("camiones", JSON.stringify(camiones));
}

// Creación del localStorage en la pagina incluyendo el admin
function primerVez() {
    if (!localStorage.getItem('users')) {
        users.push(
            {
                usuario : 'admin',
                contraseña : '1234',
                rol : "Admin"
            }
        );
        localStorage.setItem('users',JSON.stringify(users));
        localStorage.setItem("Login", "no");
        arraysDefecto();
    }
}

// Comprueba si el usuario es el admin
function checkAdmin() {
    var rolUser:any = localStorage.getItem("Rol");
    var liAdmin:any = document.getElementById("li-admin");
    var li:any = "";

    if (rolUser == "Admin"){
        li += "Agregar producto <i class='bx bx-edit'></i>";
        liAdmin.innerHTML=li;
    }
}

// Registro de clientes
function registro(){
    var nombre:any = document.getElementById('inputNombre');
    var apellidos:any = document.getElementById('inputApellidos');
    var fechaNacimiento:any = document.getElementById('inputFecha');
    var telefono:any = document.getElementById('inputTelefono');
    var email:any = document.getElementById('inputCorreo');
    var usuario:any = document.getElementById('inputUsuario');
    var contraseña:any = document.getElementById('inputContraseña');
    var contraseñaDos:any = document.getElementById('inputContraseña2');
    var user:Usuario = new Usuario (nombre.value, apellidos.value, fechaNacimiento.value, telefono.value, email.value, usuario.value, contraseña.value, contraseñaDos.value, "Cliente");

    var arrayUsers:any = localStorage.getItem("users");
    arrayUsers = JSON.parse(arrayUsers);
    var check:any = controlErroresRegistro(user);
    if (check == 1){
        for (let i = 0; i < arrayUsers.length; i++) {
            if (arrayUsers[i].usuario == nombre.usuario) {
                alert("ERROR - Este nombre de usuario ya está en uso.");
                check = 0;
                location.reload();
            }
        }
        if (check == 1) {
            arrayUsers.push(user);
            localStorage.setItem("users", JSON.stringify(arrayUsers));
            alert("Registrado correctamente.");
            location.reload();    
        } 
    } 
}

// Control de errores de los datos introducidos en el registro
function controlErroresRegistro(user:Usuario){
    
    if (user.nombre.length == 0) {
        alert("No has rellenado el campo 'Nombre'. (Todos los campos son obligatorios.)");
        return 0;
    }
    else if (user.apellidos.length == 0){
        alert("No has rellenado el campo 'Apellidos'. (Todos los campos son obligatorios.)");
        return 0;
    }
    else if (user.fechaNacimiento.length == 0){
        alert("No has introducido la Fecha. (Todos los campos son obligatorios.)");
        return 0;
    }
    else if (user.telefono.toString().length == 0){
        alert("No has rellenado el campo 'Telefono'. (Todos los campos son obligatorios.)");
        return 0;
    }
    else if (user.telefono.toString().length != 9){
        alert("Formato erroneo del campo: Telefono (123-456-789)");
        return 0;
    }
    else if(user.email.length == 0){
        alert("No has rellenado el campo 'Email'. (Todos los campos son obligatorios.)");
        return 0;
    }
    else if (user.usuario.length == 0){
        alert("No has rellenado el campo 'Usuario'. (Todos los campos son obligatorios.)");
        return 0;
    }
    else if (user.contraseña.length == 0){
        alert("No has rellenado el campo 'Contraseña'. (Todos los campos son obligatorios.)");
        return 0;
    }
    else if (user.contraseña2.length == 0){
        alert("Confirma la contraseña.");
        return 0;
    }
    else if (user.contraseña != user.contraseña2){
        alert("Las contraseñas no coinciden");
        return 0;
    }
    else {
        return 1;
    }
}

// Funcion de login
function login() {
    var usuarioLogin:any = document.getElementById('inputUsuarioLogin');
    var contraseñaLogin:any = document.getElementById('inputContraseñaLogin');
    var arrayUsers:any = localStorage.getItem('users');
    var checkLogin: boolean;
    arrayUsers = JSON.parse(arrayUsers);

    for (let i = 0; i < arrayUsers.length; i++) {
        if (arrayUsers[i].usuario == usuarioLogin.value) {
            if (arrayUsers[i].contraseña == contraseñaLogin.value){
                localStorage.setItem("Login", "si");
                localStorage.setItem("UserId" , i.toString());
                localStorage.setItem("Rol", arrayUsers[i].rol);
                alert("Bienvenido " + arrayUsers[i].usuario + "!");
                location.reload();
            }else {
                alert("Contraseña incorrecta.");
            }
        }
        else {
            checkLogin = false;
        }        
    }

}

// Funcion cerrar sesion
function signOut() {
    localStorage.setItem("Login", "no");
    localStorage.removeItem("Rol");
    location.reload();
}

// Funcion que identifica si el admin y añade opciones al navbar
function btnLogin () {
    var loggin:any = localStorage.getItem("Login");
    var liDropdown:any = document.getElementById("li-dropdown");
    var li:any = "";
    if (loggin == "no"){
        li +=    "<a href='#' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'><i class='bx bxs-user'></i></a>";
        li +=    "<div class='dropdown-menu'>";
        li +=    "<div class='form-user'>";
        li +=        "<input type='text' class='form-control' placeholder='Usuario' id='inputUsuarioLogin'>";
        li +=        "<input type='password' class='form-control' placeholder='Contraseña' id='inputContraseñaLogin'>";
        li +=    "</div>";
        li +=    "<div>";
        li +=        "<button onclick='login()'>Log-in</button>";
        li +=        "<button  data-toggle='modal' data-target='#myModal'>Registro</button>";
        li +=    "</div>";
        li +=    "</div>";
        liDropdown.innerHTML = li;
    }
    else {
        var userId:any = localStorage.getItem("UserId");
        var arrayUsers:any = localStorage.getItem("users");
        arrayUsers = JSON.parse(arrayUsers);
        userId = parseInt(userId);
        li +="<a href='#' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'><i class='bx bxs-user'></i></a>";
        li +="<div class='dropdown-menu'>";
        li +=   "<p class='text-center h4' style='color: #fff'>" + arrayUsers[userId].usuario + "</p>";
        li +=   "<button class='center-block' onclick='signOut()'>Cerrar sesión</button>";
        li +="</div>";
        liDropdown.innerHTML = li;
    }
}

// Función que muestra todos los vehiculos en la pag
function mostrarVehiculos() {
    var arrayCoches:any = localStorage.getItem("coches");
    arrayCoches = JSON.parse(arrayCoches);
    var container:any = document.getElementById("coches");
    var strings:any = "";

    for (let i = 0; i < arrayCoches.length; i++) {
        strings += "<div class='col-xs-12 col-sm-6 col-md-4'>";
        strings += "<div class='jumbotron'>";
        strings += "<img src='"+arrayCoches[i].imagen+"' class='img-responsive'>";
        strings += "<h2>"+arrayCoches[i].marca+"</h2>";
        strings += "<h4>"+arrayCoches[i].modelo+"</h4>";
        strings += "<p class='h5'>"+arrayCoches[i].año+" | "+arrayCoches[i].distancia+" Km | "+arrayCoches[i].potencia+" CV </p>";
        if (arrayCoches[i].estado == "Disponible") {
            strings += "<p class='h5 disponible'>"+arrayCoches[i].estado+"</p>";
        }
        else if(arrayCoches[i].estado == "Reservado") {
            strings += "<p class='h5 reservado'>"+arrayCoches[i].estado+"</p>";
        }
        else {
            strings += "<p class='h5 vendido'>"+arrayCoches[i].estado+"</p>";
        }
        strings += "<p><span class='h4'>Precio:</span> "+arrayCoches[i].precio+"€</p>";
        strings += "<button class='btn btn-lg text center-block' onclick='comprarCoche("+i+")'>Comprar</button><br>";
        strings += "<button class='btn btn-lg text center-block' onclick='reservarCoche("+i+")'>Reservar</button>";
        strings += "</div>";
        strings += "</div>";    
    }
    container.innerHTML=strings;

    var arrayMotos:any = localStorage.getItem("motos");
    arrayMotos = JSON.parse(arrayMotos);
    var container2:any = document.getElementById("motos");
    strings = "";

    for (let i = 0; i < arrayMotos.length; i++) {
        strings += "<div class='col-xs-12 col-sm-6 col-md-4'>";
        strings += "<div class='jumbotron'>";
        strings += "<img src='"+arrayMotos[i].imagen+"' class='img-responsive'>";
        strings += "<h2>"+arrayMotos[i].marca+"</h2>";
        strings += "<h4>"+arrayMotos[i].modelo+"</h4>";
        strings += "<p class='h5'>"+arrayMotos[i].año+" | "+arrayMotos[i].distancia+" Km | "+arrayMotos[i].potencia+" CV </p>";
        if (arrayMotos[i].estado == "Disponible") {
            strings += "<p class='h5 disponible'>"+arrayMotos[i].estado+"</p>";
        }
        else if(arrayMotos[i].estado == "Reservado") {
            strings += "<p class='h5 reservado'>"+arrayMotos[i].estado+"</p>";
        }
        else {
            strings += "<p class='h5 vendido'>"+arrayMotos[i].estado+"</p>";
        }
        strings += "<p><span class='h4'>Precio:</span> "+arrayMotos[i].precio+"€</p>";
        strings += "<button class='btn btn-lg text center-block' onclick='comprarMoto("+i+")'>Comprar</button><br>";
        strings += "<button class='btn btn-lg text center-block' onclick='reservarMoto("+i+")'>Reservar</button>";
        strings += "</div>";
        strings += "</div>";

        
    }
    container2.innerHTML = strings;

    var arrayCamiones:any = localStorage.getItem("camiones");
    arrayCamiones = JSON.parse(arrayCamiones);
    var container3:any = document.getElementById("camiones");
    strings = "";

    for (let i = 0; i < arrayCamiones.length; i++) {
        strings += "<div class='col-xs-12 col-sm-6'>";
        strings += "<div class='jumbotron'>";
        strings += "<img src='"+arrayCamiones[i].imagen+"' class='img-responsive'>";
        strings += "<h2>"+arrayCamiones[i].marca+"</h2>";
        strings += "<h4>"+arrayCamiones[i].modelo+"</h4>";
        strings += "<p class='h5'>"+arrayCamiones[i].año+" | "+arrayCamiones[i].distancia+" Km | "+arrayCamiones[i].potencia+" CV </p>";
        if (arrayCamiones[i].estado == "Disponible") {
            strings += "<p class='h5 disponible'>"+arrayCamiones[i].estado+"</p>";
        }
        else if(arrayCamiones[i].estado == "Reservado") {
            strings += "<p class='h5 reservado'>"+arrayCamiones[i].estado+"</p>";
        }
        else {
            strings += "<p class='h5 vendido'>"+arrayCamiones[i].estado+"</p>";
        }
        strings += "<p><span class='h4'>Precio:</span> "+arrayCamiones[i].precio+"€</p>";
        strings += "<button class='btn btn-lg text center-block' onclick='comprarCamion("+i+")'>Comprar</button><br>";
        strings += "<button class='btn btn-lg text center-block' onclick='reservarCamion("+i+")'>Reservar</button>";
        strings += "</div>";
        strings += "</div>";
        
        
    }
    container3.innerHTML = strings;
}

// Funciones de reservar
function reservarCoche (id:number) {
    if (localStorage.getItem("Login") == "si") {
        var arrayCoche:any = localStorage.getItem("coches");
        arrayCoche = JSON.parse(arrayCoche);
        if (arrayCoche[id].estado == "Vendido") {
            alert("No puedes reservar este vehiculo.")
        }
        else {
            arrayCoche[id].estado = "Reservado";
            localStorage.setItem("coches",JSON.stringify(arrayCoche));
            alert("Has reservado el vehiculo.");
            location.reload();   
        }
    }
    else {
        alert("Inicia Sesión para reservar el vehiculo.");
    }
}

function reservarMoto (id:number) {
    if (localStorage.getItem("Login") == "si") {
        var arrayMoto:any = localStorage.getItem("motos");
        arrayMoto = JSON.parse(arrayMoto);
        if (arrayMoto[id].estado == "Vendido") {
            alert("No puedes reservar este vehiculo.")
        }
        else {
            arrayMoto[id].estado = "Reservado";
            localStorage.setItem("motos",JSON.stringify(arrayMoto));
            alert("Has reservado el vehiculo.");
            location.reload();    
        }          
    }
    else {
        alert("Inicia Sesión para reservar el vehiculo.");
    }
}

function reservarCamion (id:number) {
    if (localStorage.getItem("Login") == "si") {
        var arrayCamion:any = localStorage.getItem("camiones");
        arrayCamion = JSON.parse(arrayCamion);
        if (arrayCamion[id].estado == "Vendido") {
            alert("No puedes reservar este vehiculo.")
        }
        else {
            arrayCamion[id].estado = "Reservado";
            localStorage.setItem("camiones",JSON.stringify(arrayCamion));
            alert("Has reservado el vehiculo.");
            location.reload();    
        }
          
    }
    else {
        alert("Inicia Sesión para reservar el vehiculo.");
    }
}

// Funciones comprar
function comprarCoche (id:number) {
    if (localStorage.getItem("Login") == "si") {
        var arrayCoche:any = localStorage.getItem("coches");
        arrayCoche = JSON.parse(arrayCoche);
        if (arrayCoche[id].estado == "Vendido") {
            alert("Ya han comprado este vehiculo.");
        }
        else {
            arrayCoche[id].estado = "Vendido";
            localStorage.setItem("coches",JSON.stringify(arrayCoche));
            alert("Has comprado el vehiculo.");
            location.reload();    
        }
          
    }
    else {
        alert("Inicia Sesión para comprar el vehiculo.");
    }
}

function comprarMoto (id:number) {
    if (localStorage.getItem("Login") == "si") {
        var arrayMoto:any = localStorage.getItem("motos");
        arrayMoto = JSON.parse(arrayMoto);
        if (arrayMoto[id].estado == "Vendido") {
            alert("Ya han comprado este vehiculo.");
        }
        else {
            arrayMoto[id].estado = "Vendido";
            localStorage.setItem("motos",JSON.stringify(arrayMoto));
            alert("Has comprado el vehiculo.");
            location.reload();     
        }    
    }
    else {
        alert("Inicia Sesión para comprar el vehiculo.");
    }
}

function comprarCamion (id:number) {
    if (localStorage.getItem("Login") == "si") {
        var arrayCamion:any = localStorage.getItem("camiones");
        arrayCamion = JSON.parse(arrayCamion);
        if (arrayCamion[id].estado == "Vendido") {
            alert("Ya han comprado este vehiculo.");
        }
        else {
            arrayCamion[id].estado = "Vendido";
            localStorage.setItem("camiones",JSON.stringify(arrayCamion));
            alert("Has comprado el vehiculo.");
            location.reload(); 
        }
    }
    else {
        alert("Inicia Sesión para comprar el vehiculo.");
    }
}

function añadirVehiculo () {
    var imagen:any = document.getElementById("inputImagen");
    var marca:any = document.getElementById("inputMarca");
    var modelo:any = document.getElementById("inputModelo");
    var año:any = document.getElementById("inputAño");
    var distancia:any = document.getElementById("inputDistancia");
    var potencia:any = document.getElementById("inputPotencia");
    var precio:any = document.getElementById("inputPrecio");
    
}
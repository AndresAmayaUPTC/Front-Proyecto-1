let data; 

try {
  document.addEventListener("DOMContentLoaded", function () {
    
    const lugaresSelect = document.getElementById("lugares");

    
    fetch("https://proyecto-api-zeta.vercel.app/location")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error de red: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        if (responseData.state && responseData.data) {
          
          data = responseData;

          
          data.data.forEach((location) => {
            const option = document.createElement("option");
            option.value = location._id;
            option.text = location.name;
            lugaresSelect.appendChild(option);
          });
        } else {
          throw new Error(
            "Formato de datos de ubicación incorrecto en la respuesta de la API"
          );
        }
      })
      .catch((error) => {
        console.error("Error al obtener las ubicaciones:", error);
      });
  });

} catch (error) {
  console.log("Error al cargar el contenido:", error);
}

try{
  document.addEventListener("DOMContentLoaded", function () {
   
    const formulario = document.querySelector("form");

   
    formulario.addEventListener("submit", function (event) {
      try {
        event.preventDefault(); 

        
        const id = document.getElementById("id").value;
        const nombre = document.getElementById("nombre").value;
        const fecha = document.getElementById("fecha").value;
        const precio = document.getElementById("precio").value;
        const lugarSeleccionado = document.getElementById("lugares");
        const lugarId = lugarSeleccionado.value;

        
        const ubicacion = data.data.find((location) => location._id === lugarId);

        
        if (ubicacion) {
          
          const datos = {
            id: id,
            name: nombre,
            date: fecha,
            price: precio
          };

          
          fetch(`https://proyecto-api-zeta.vercel.app/rental/${lugarId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
          })
            .then((response) => {
              console.log(response);
              if (!response.ok) {
                throw new Error(`Error de red: ${response.status}`);
              }
              return response.json();
            })
            .then((responseData) => {
              
              console.log("Datos guardados exitosamente:", responseData);
            })
            .catch((error) => {
              console.error("Error al enviar datos a la API:", error);
            });
        } else {
          console.error("La ubicación seleccionada no está definida");
        }
      } catch (error) {
        console.log("Error en el evento submit:", error);
      }
    });
  });
}catch(error){
  console.log("Error al cargar el contenido:", error);
}

try {
  document.getElementById('lugar').addEventListener('click',(event)=>{
    event.preventDefault()
    
    const id = document.getElementById('id').value
    const name = document.getElementById('nombre').value
    const address = document.getElementById('direccion').value
    const phone = document.getElementById('telefono').value
    const capasity = document.getElementById('capacidad').value

    const datos = {
      id: id,
      name:name,
      address:address,
      phone:phone,
      capasity:capasity
    }

    fetch(`https://proyecto-api-zeta.vercel.app/location/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
          })
            .then((response) => {
              console.log(response);
              if (!response.ok) {
                throw new Error(`Error de red: ${response.status}`);
              }
              return response.json();
            })
            .then((responseData) => {
              
              console.log("Datos guardados exitosamente:", responseData);
            })
            .catch((error) => {
              console.error("Error al enviar datos a la API:", error);
            })

  })
} catch (error) {
  console.log("Error en el evento submit:", error);
}
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
            option.value = location.id;
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

        
        const ubicacion = data.data.find((location) => location.id === lugarId);

        
        if (ubicacion) {
          
          const datos = {
            id: id,
            name: nombre,
            date: fecha,
            price: precio,
            location: {
              _id: ubicacion._id,
              id: ubicacion.id,
              name: ubicacion.name,
              address: ubicacion.address,
              phone: ubicacion.phone,
              capasity: ubicacion.capasity,
            },
          };

          
          fetch("https://proyecto-api-zeta.vercel.app/rental", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
          })
            .then((response) => {
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
        console.error("Error en el evento submit:", error);
      }
    });
  });
} catch (error) {
  console.error("Error al cargar el contenido:", error);
}

document.addEventListener('DOMContentLoaded', () => {
    // Fetch de cat facts
    document.getElementById('gato-button').addEventListener('click', obtenerHechoDeGato);

    async function obtenerHechoDeGato() {
        cargandoGato();
        try {
            const respuesta = await fetch('https://catfact.ninja/fact');
            if (!respuesta.ok) throw new Error('Chale');
            const datos = await respuesta.json();
            mostrarHechoDeGato(datos.fact);
        } catch (error) {
            mostrarErrorGato();
        }

        function cargandoGato() {
            const contenedorGato = document.getElementById('gato-container');
            contenedorGato.innerHTML = '<p>loading...</p>';
        }

        function mostrarErrorGato() {
            const contenedorGato = document.getElementById('gato-container');
            contenedorGato.innerHTML = '<p>Hubo un error...</p>';
        }

        function mostrarHechoDeGato(hecho) {
            const contenedorGato = document.getElementById('gato-container');
            contenedorGato.innerHTML = ''; // Limpiar datos anteriores

            const hechoGatoElemento = document.createElement('h2');
            hechoGatoElemento.innerText = hecho;

            contenedorGato.appendChild(hechoGatoElemento);
        }
    }

    // Fetch de population
    document.getElementById('us-button').addEventListener('click', obtenerPoblacion);

    async function obtenerPoblacion() {
        cargandoUS();
        try {
            const respuesta = await fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population');
            if (!respuesta.ok) throw new Error('Chale');
            const datos = await respuesta.json();
            mostrarPoblacion(datos.data[0].Population); // Acceder a datos anidados
        } catch (error) {
            mostrarErrorUS();
        }

        function cargandoUS() {
            const contenedorUS = document.getElementById('us-container');
            contenedorUS.innerHTML = '<p>loading...</p>';
        }

        function mostrarErrorUS() {
            const contenedorUS = document.getElementById('us-container');
            contenedorUS.innerHTML = '<p>Hubo un error...</p>';
        }

        function mostrarPoblacion(poblacion) {
            const contenedorUS = document.getElementById('us-container');
            contenedorUS.innerHTML = ''; // Limpiar datos anteriores

            const elementoPoblacion = document.createElement('h2');
            elementoPoblacion.innerText = poblacion;

            contenedorUS.appendChild(elementoPoblacion);
        }
    }
});

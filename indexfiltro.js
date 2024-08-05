document.getElementById('searchBtn').addEventListener('click', async function() {
    const limit = document.getElementById('limit').value;  //En el api el Id es "mal_id (creo)"
    const search = document.getElementById('search').value;
    const type = document.getElementById('type').value;
    const resultsDiv = document.getElementById('results');

    const url = `https://api.jikan.moe/v4/anime?q=${search}&type=${type}&limit=${limit}`;

    renderLoadingState();

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.data.length === 0) {
            resultsDiv.innerHTML = '<p>No se encontraron resultados.</p>';
        } else {
            renderData(data.data);
        }
    } catch (error) {
        renderErrorState(error);
    }
});

document.getElementById('clearBtn').addEventListener('click', function() {
    document.getElementById('animeForm').reset();
    document.getElementById('results').innerHTML = '';
});

function renderLoadingState() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<p class="loading">Cargando...</p>';
}

function renderErrorState(error) {
    console.error('Error al buscar el anime:', error);
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<p class="error">Ocurrió un error al buscar el anime. Revisa la consola para más detalles.</p>`;
}

function renderData(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    data.forEach(anime => {
        const animeDiv = document.createElement('div');
        animeDiv.classList.add('anime-card');
        animeDiv.innerHTML = `
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            <h3>${anime.title}</h3>
            <p>${anime.synopsis || 'No hay sinopsis disponible.'}</p>
        `;
        resultsDiv.appendChild(animeDiv);
    });
}

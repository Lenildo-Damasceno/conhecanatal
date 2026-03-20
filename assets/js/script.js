// Busca temperatura em tempo real de Natal - RN via Open-Meteo
async function atualizarClima() {
    try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-5.7945&longitude=-35.211&current=temperature_2m,weathercode&timezone=America/Fortaleza');
        const data = await res.json();
        const temp = Math.round(data.current.temperature_2m);
        const codigo = data.current.weathercode;

        const descricoes = {
            0: 'Céu limpo', 1: 'Principalmente limpo', 2: 'Parcialmente nublado', 3: 'Nublado',
            45: 'Neblina', 48: 'Neblina com gelo', 51: 'Garoa leve', 53: 'Garoa moderada',
            61: 'Chuva leve', 63: 'Chuva moderada', 65: 'Chuva forte',
            80: 'Pancadas de chuva', 81: 'Pancadas moderadas', 82: 'Pancadas fortes',
            95: 'Tempestade', 99: 'Tempestade com granizo'
        };

        const icones = {
            0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
            45: '🌫️', 48: '🌫️', 51: '🌦️', 53: '🌦️',
            61: '🌧️', 63: '🌧️', 65: '🌧️',
            80: '🌦️', 81: '🌦️', 82: '⛈️',
            95: '⛈️', 99: '⛈️'
        };

        const descricao = descricoes[codigo] || 'Ensolarado';
        const icone = icones[codigo] || '☀️';

        const el = document.getElementById('clima-info');
        if (el) el.innerHTML = `${icone} Natal, RN · ${temp}°C · ${descricao}`;
    } catch (e) {
        // mantém o texto padrão em caso de erro
    }
}

atualizarClima();

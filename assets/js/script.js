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

function iniciarRadioAutomatica() {
    const radio = document.querySelector('.header-player');
    if (!radio) return;

    radio.autoplay = true;
    radio.preload = 'auto';

    const tentarPlay = async () => {
        try {
            await radio.play();
            return true;
        } catch (e) {
            return false;
        }
    };

    const limparEventosInteracao = () => {
        document.removeEventListener('click', iniciarNaInteracao);
        document.removeEventListener('keydown', iniciarNaInteracao);
        document.removeEventListener('touchstart', iniciarNaInteracao);
    };

    // Tenta iniciar assim que a pagina carrega.
    window.addEventListener('load', async () => {
        const iniciou = await tentarPlay();

        // Em navegadores que bloqueiam audio automatico,
        // mutado costuma ser permitido.
        if (!iniciou) {
            radio.muted = true;
            await tentarPlay();
        }
    });

    // Tenta novamente quando o stream ficar pronto.
    radio.addEventListener('canplay', () => {
        tentarPlay();
    });

    // Se o navegador bloquear autoplay, tenta de novo
    // na primeira interacao do usuario.
    const iniciarNaInteracao = async () => {
        radio.muted = false;
        await tentarPlay();
        limparEventosInteracao();
    };

    document.addEventListener('click', iniciarNaInteracao);
    document.addEventListener('keydown', iniciarNaInteracao);
    document.addEventListener('touchstart', iniciarNaInteracao);
}

iniciarRadioAutomatica();

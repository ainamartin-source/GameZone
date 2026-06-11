// Sistema de gestió de jocs retro

// Emmagatzemador de jocs
const gamesManager = {
    games: [],
    
    // Registra un nou joc
    register(gameId, gameName, gameIcon, gameComponent) {
        this.games.push({
            id: gameId,
            name: gameName,
            icon: gameIcon,
            component: gameComponent
        });
        this.renderGames();
    },
    
    // Renderitza els jocs disponibles
    renderGames() {
        const container = document.getElementById('gamesContainer');
        container.innerHTML = '';
        
        if (this.games.length === 0) {
            container.innerHTML = `
                <div class="game-card placeholder">
                    <div class="game-icon">?</div>
                    <h3>Proximament...</h3>
                    <p>Afegeix els teus jocs aquí!</p>
                </div>
            `;
            return;
        }
        
        this.games.forEach(game => {
            const card = document.createElement('div');
            card.className = 'game-card';
            card.innerHTML = `
                <div class="game-icon">${game.icon}</div>
                <h3>${game.name}</h3>
            `;
            card.addEventListener('click', () => this.playGame(game));
            container.appendChild(card);
        });
    },
    
    // Inicia un joc
    playGame(game) {
        const gameDisplay = document.getElementById('gameDisplay');
        const gameContent = document.getElementById('gameContent');
        
        gameContent.innerHTML = '';
        gameDisplay.style.display = 'block';
        
        // Cridar la funció de joc
        if (typeof game.component === 'function') {
            game.component(gameContent);
        }
        
        // Scroll a la secció del joc
        gameDisplay.scrollIntoView({ behavior: 'smooth' });
    },
    
    // Torna enrere
    goBack() {
        document.getElementById('gameDisplay').style.display = 'none';
        document.getElementById('gamesContainer').scrollIntoView({ behavior: 'smooth' });
    }
};

// Botó "Enrere"
document.getElementById('backBtn').addEventListener('click', () => {
    gamesManager.goBack();
});

// ==========================================
// EXEMPLE: Afegeix aquí els teus jocs!
// ==========================================

// Exemple de joc simple
function createExampleGame(container) {
    container.innerHTML = `
        <h2 style="text-align: center; margin-bottom: 20px;">🎯 JOC DE PROVA</h2>
        <div style="text-align: center; padding: 30px; background: rgba(0,245,255,0.2); border: 2px solid #FF006E;">
            <p style="margin-bottom: 20px;">Aquí va el teu joc!</p>
            <button class="back-btn" style="margin-top: 20px;">Edita script.js per afegir jocs</button>
        </div>
    `;
}

// Registrar el joc de prova
gamesManager.register('example', 'JOC DE PROVA', '🎮', createExampleGame);

// ==========================================
// INSTRUCCIONS PER AFEGIR JOCS:
// ==========================================
// 
// 1. Crea una funció per al teu joc:
// 
//    function createMyGame(container) {
//        container.innerHTML = `<h2>El meu joc</h2>`;
//        // Aquí va la lògica del joc
//    }
//
// 2. Registra'l:
//
//    gamesManager.register('my-game', 'Nom del Joc', '🎯', createMyGame);
//
// 3. Pots afegir tants jocs com vulguis!
//
// ==========================================

console.log('%c🎮 RETRO GAMES SISTEMA CARREGAT 🎮', 'color: #FFE702; font-size: 20px; text-shadow: 2px 2px #FF006E;');
console.log('%cAra pots afegir els teus jocs amb gamesManager.register()', 'color: #00F5FF; font-size: 14px;');

// Adicionar easter egg para "o que é a vida?"
document.addEventListener('DOMContentLoaded', function() {
    // Elementos originais do script.js
    const quaseGPT = new QuaseGPTAPI();
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    
    // Função para abrir o YouTube quando a resposta for "É UMA MARAVILHA"
    function abrirYouTubeVida() {
        // Adicionar efeito visual
        const chatMessages = document.getElementById('chat-messages');
        chatMessages.classList.add('rainbow-background');
        
        // Abrir YouTube em uma nova aba
        setTimeout(() => {
            window.open('https://www.youtube.com/watch?v=2SUwOgmvzK4', '_blank');
            
            // Remover efeito após 10 segundos
            setTimeout(() => {
                chatMessages.classList.remove('rainbow-background');
            }, 10000);
        }, 1000); // Pequeno atraso para garantir que o usuário veja a resposta primeiro
    }
    
    // Sobrescrever a função processUserInput original para adicionar o easter egg
    window.processUserInput = function() {
        const text = userInput.value.trim();
        if (text === '') return;
        
        // Adicionar mensagem do usuário
        addMessage(text, true);
        userInput.value = '';
        
        if (!chatActive) {
            startChat();
        }
        
        // Desativar botão de envio durante a "digitação"
        sendButton.disabled = true;
        
        // Mostrar indicador de digitação
        showTypingIndicator();
        
        // Simular tempo de "pensamento" do QuaseGPT
        const thinkingTime = Math.floor(Math.random() * 2000) + 1000; // 1-3 segundos
        
        // Simular resposta do QuaseGPT usando a API
        setTimeout(() => {
            removeTypingIndicator();
            
            // Usar a API do QuaseGPT para gerar a resposta
            const botResponse = quaseGPT.processarMensagem(text);
            addMessage(botResponse, false);
            
            // Verificar se é a resposta especial "É UMA MARAVILHA"
            const perguntaVida = text.toLowerCase().replace(/[?!.,]/g, '').trim();
            if (
                (perguntaVida === "o que é a vida" || 
                 perguntaVida === "o que e a vida" || 
                 perguntaVida === "qual o sentido da vida" || 
                 perguntaVida === "qual é o sentido da vida") && 
                botResponse === "É UMA MARAVILHA"
            ) {
                abrirYouTubeVida();
            }
            
            // Reativar botão de envio
            sendButton.disabled = false;
        }, thinkingTime);
    };
    
    // Adicionar estilo para o efeito rainbow
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow-bg {
            0% { background-color: rgba(255, 0, 0, 0.3); }
            14% { background-color: rgba(255, 127, 0, 0.3); }
            28% { background-color: rgba(255, 255, 0, 0.3); }
            42% { background-color: rgba(0, 255, 0, 0.3); }
            57% { background-color: rgba(0, 0, 255, 0.3); }
            71% { background-color: rgba(75, 0, 130, 0.3); }
            85% { background-color: rgba(148, 0, 211, 0.3); }
            100% { background-color: rgba(255, 0, 0, 0.3); }
        }
        
        .rainbow-background {
            animation: rainbow-bg 5s linear infinite;
        }
        
        .rainbow-background .message {
            text-shadow: 0 0 5px white;
        }
    `;
    document.head.appendChild(style);
    
    // Substituir os event listeners originais
    if (sendButton) {
        // Remover event listeners antigos (não é possível diretamente, então sobrescrevemos)
        sendButton.onclick = window.processUserInput;
    }
    
    if (userInput) {
        userInput.onkeypress = function(e) {
            if (e.key === 'Enter') {
                window.processUserInput();
            }
        };
    }
});

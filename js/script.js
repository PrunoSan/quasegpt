// QuaseGPT - Script principal

document.addEventListener('DOMContentLoaded', function() {
    // Importar a API do QuaseGPT
    const quaseGPT = new QuaseGPTAPI();
    
    // Elementos da interface
    const welcomeScreen = document.getElementById('welcome-screen');
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const exampleCards = document.querySelectorAll('.example-card');
    const newChatButton = document.querySelector('.new-chat button');
    const historyItems = document.querySelectorAll('.history-item');

    // Estado da aplicação
    let chatActive = false;
    let isTyping = false;
    
    // Iniciar chat
    function startChat() {
        welcomeScreen.style.display = 'none';
        chatMessages.style.display = 'block';
        chatActive = true;
        userInput.focus();
    }
    
    // Adicionar mensagem ao chat
    function addMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        
        // Aplicar formatação especial para respostas do bot
        if (!isUser) {
            // Verificar se contém link para Google
            if (text.includes('https://www.google.com/search')) {
                const parts = text.split('https://www.google.com/search');
                const beforeLink = parts[0];
                const linkPart = 'https://www.google.com/search' + parts[1];
                
                messageDiv.innerHTML = beforeLink + `<a href="${linkPart}" target="_blank" class="lazy-response">${linkPart}</a>`;
            } 
            // Verificar se contém erro matemático
            else if (text.includes('matemática') || text.includes('cálculo')) {
                messageDiv.innerHTML = `<span class="portugues-errado">${text}</span>`;
            }
            // Verificar se contém elogio ao criador
            else if (text.includes('criador') || text.includes('programador') || text.includes('gostoso')) {
                messageDiv.innerHTML = `<span class="creator-praise">${text}</span>`;
            }
            // Resposta padrão em português errado
            else {
                messageDiv.innerHTML = `<span class="portugues-errado">${text}</span>`;
            }
            
            // Adicionar efeito de digitação
            messageDiv.classList.add('typing-animation');
        } else {
            messageDiv.textContent = text;
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Mostrar indicador de digitação
    function showTypingIndicator() {
        if (isTyping) return;
        
        isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('typing-indicator');
        typingDiv.id = 'typing-indicator';
        
        typingDiv.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Remover indicador de digitação
    function removeTypingIndicator() {
        const typingDiv = document.getElementById('typing-indicator');
        if (typingDiv) {
            typingDiv.remove();
            isTyping = false;
        }
    }
    
    // Processar entrada do usuário
    function processUserInput() {
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
            
            // Reativar botão de envio
            sendButton.disabled = false;
        }, thinkingTime);
    }
    
    // Event listeners
    sendButton.addEventListener('click', processUserInput);
    
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            processUserInput();
        }
    });
    
    exampleCards.forEach(card => {
        card.addEventListener('click', function() {
            const promptText = this.querySelector('p').textContent.replace(/"/g, '');
            userInput.value = promptText;
            processUserInput();
        });
    });
    
    newChatButton.addEventListener('click', function() {
        // Limpar chat e voltar para tela inicial
        chatMessages.innerHTML = '';
        chatMessages.style.display = 'none';
        welcomeScreen.style.display = 'flex';
        chatActive = false;
    });
    
    historyItems.forEach(item => {
        item.addEventListener('click', function() {
            startChat();
            // Aqui poderia carregar o histórico específico
        });
    });
    
    // Responsividade para dispositivos móveis
    const menuToggle = document.createElement('button');
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = '<i class="bi bi-list"></i>';
    document.querySelector('.main-content').prepend(menuToggle);
    
    menuToggle.addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('show');
    });
});



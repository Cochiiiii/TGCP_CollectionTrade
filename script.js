// Função para adicionar imagem em qualquer uma das duas seções
function addImage(section) {
    const imageUrl = document.getElementById(`imageUrl${section}`).value;
    const imageContainer = document.getElementById(`imageContainer${section}`);

    if (imageUrl) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Imagem inserida pelo usuário';

        // Aguardar a imagem ser carregada antes de adicioná-la
        img.onload = () => {
            imageContainer.appendChild(img);
            document.getElementById(`imageUrl${section}`).value = ''; // Limpa o campo de input

            // Adicionar evento de clique para remover a imagem
            img.onclick = function() {
                const confirmRemoval = confirm("Você deseja remover esta imagem?");
                if (confirmRemoval) {
                    imageContainer.removeChild(img); // Remove a imagem
                }
            };
        };

        img.onerror = () => {
            alert('O link fornecido não é válido ou a imagem não pôde ser carregada.');
        };
    } else {
        alert('Por favor, insira um link de imagem.');
    }
}

// Função para gerar uma imagem do conteúdo da página
function generateImage() {
    console.log('Gerando imagem com largura mínima de 1366px...');

    // Esconde os elementos desnecessários (inputs e botões)
    const inputsAndButtons = document.querySelectorAll('.container input, .container button');
    inputsAndButtons.forEach(element => element.classList.add('hide-on-capture'));

    // Garantir que as imagens estejam carregadas antes de capturar a tela
    const images = document.querySelectorAll('.container img');
    let imagesLoaded = 0;

    // Verificar se todas as imagens estão carregadas
    images.forEach(img => {
        if (img.complete) {
            imagesLoaded++;
        } else {
            img.onload = () => {
                imagesLoaded++;
                if (imagesLoaded === images.length) {
                    capturePage();  // Quando todas as imagens estiverem carregadas
                }
            };
            img.onerror = () => {
                imagesLoaded++;
                if (imagesLoaded === images.length) {
                    capturePage();  // Mesmo com erro na imagem
                }
            };
        }
    });

    // Se não houver imagens, captura imediatamente
    if (images.length === 0 || imagesLoaded === images.length) {
        capturePage();
    }

    // Função para capturar a página com resolução mínima
    function capturePage() {
        const container = document.querySelector('.container');
        const minWidth = 1366;  // Largura mínima de 1366px

        // Verificar se o conteúdo é maior ou menor que o mínimo
        const containerWidth = container.offsetWidth > minWidth ? container.offsetWidth : minWidth;

        // Calcular o fator de escala para garantir que a largura seja a mínima necessária
        const scale = containerWidth / container.offsetWidth;

        // Usar html2canvas para capturar a página com a escala correta
        html2canvas(container, {
            useCORS: true,      // Permite carregar imagens de outros domínios
            scale: scale,       // Definir o fator de escala
            width: containerWidth, // A largura será definida pelo mínimo ou pelo tamanho real
            height: container.offsetHeight * scale,  // Ajusta a altura proporcionalmente
            logging: true,      // Ativa o log para depuração
            letterRendering: true, // Melhora a renderização de texto
        }).then(function(canvas) {
            // Criar uma URL da imagem gerada a partir do canvas
            const imageURL = canvas.toDataURL();

            // Criar elemento de imagem para exibição
            const imgElement = document.createElement('img');
            imgElement.src = imageURL;
            imgElement.alt = 'Imagem gerada';
            imgElement.style.width = '400px';  // Ajuste de tamanho para visualização

            // Exibir a imagem gerada na página
            const generatedImageContainer = document.getElementById('generatedImageContainer');
            generatedImageContainer.innerHTML = '';  // Limpa qualquer conteúdo anterior

            // Aplicar a classe para centralizar o conteúdo
            generatedImageContainer.classList.add('centered-container');  // Classe que centraliza o conteúdo
            generatedImageContainer.appendChild(imgElement);
        }).catch(function(error) {
            console.error('Erro ao gerar a imagem:', error);
        }).finally(() => {
            // Mostrar novamente os inputs e botões após a captura
            inputsAndButtons.forEach(element => element.classList.remove('hide-on-capture'));
        });
    }
}

// Função para exibir/ocultar o texto "Lorem Ipsum"
function toggleText() {
    const loremText = document.getElementById('loremText');
    if (loremText.style.display === 'none' || loremText.style.display === '') {
        loremText.style.display = 'block';  // Exibe o texto
    } else {
        loremText.style.display = 'none';  // Oculta o texto
    }
}

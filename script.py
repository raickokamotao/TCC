from js import document, FileReader, console
from pyodide.ffi import to_js, create_proxy

# Criar input invisível para upload de arquivo
input_arquivo = document.createElement("input")
input_arquivo.type = "file"
input_arquivo.style.display = "none"
input_arquivo.accept = ".pdf,.docx,.txt"
document.body.appendChild(input_arquivo)

# Elementos da interface
botao = document.getElementById("botao")
arquivo_info = document.getElementById("arquivo-info")
arquivo_nome = document.getElementById("arquivo-nome")
arquivo_tamanho = document.getElementById("arquivo-tamanho")
resultado_analise = document.getElementById("resultado-analise")
loading = document.getElementById("loading")
requisitos_input = document.getElementById("requisitos")
enviar_btn = document.getElementById("enviar-analise")

# Quando o botão é clicado, simula clique no input
def abrir_seletor(event):
    input_arquivo.click()

# Quando um arquivo é selecionado
def arquivo_selecionado(event):
    arquivo = input_arquivo.files.item(0)
    if arquivo:
        # Atualizar informações do arquivo
        arquivo_nome.textContent = arquivo.name
        
        # Converter tamanho para formato legível
        tamanho = arquivo.size
        if tamanho < 1024:
            tamanho_formatado = f"{tamanho} bytes"
        elif tamanho < 1024 * 1024:
            tamanho_formatado = f"{(tamanho / 1024):.1f} KB"
        else:
            tamanho_formatado = f"{(tamanho / (1024 * 1024)):.1f} MB"
            
        arquivo_tamanho.textContent = f"Tamanho: {tamanho_formatado}"
        arquivo_info.classList.remove("hidden")
        
        # Se for um arquivo de texto, podemos ler o conteúdo
        if arquivo.type == "text/plain":
            leitor = FileReader.new()
            
            def ao_carregar(e):
                # Aqui poderíamos processar o conteúdo do arquivo
                # Para demonstração, apenas registramos que foi lido
                console.log("Arquivo lido com sucesso")
                
            leitor.onload = create_proxy(ao_carregar)
            leitor.readAsText(arquivo)

# Função para simular análise de IA
def analisar_documento(requisitos):
    # Esta função simularia a análise do documento com base nos requisitos
    # Em uma implementação real, aqui você faria chamadas para APIs de IA
    
    # Simulação de resultado
    resultado = {
        "compatibilidade": 78,
        "experiencia": 65,
        "habilidades": 82,
        "recomendacao": "Com base na análise do documento e nos requisitos especificados, este candidato apresenta um bom perfil para a posição. Recomenda-se prosseguir para a etapa de entrevista técnica para avaliar melhor as habilidades práticas."
    }
    
    return resultado

# Função para processar envio da análise
def processar_analise(event):
    requisitos = requisitos_input.value
    
    if not arquivo_info.classList.contains("hidden") and requisitos:
        # Mostrar loading
        loading.classList.remove("hidden")
        
        # Em uma implementação real, aqui você chamaria a função de análise
        # e esperaria o resultado. Para demonstração, usamos setTimeout no JS.
        console.log(f"Processando análise com requisitos: {requisitos}")

# Conectar eventos
botao_proxy = create_proxy(abrir_seletor)
arquivo_proxy = create_proxy(arquivo_selecionado)
analise_proxy = create_proxy(processar_analise)

botao.addEventListener("click", botao_proxy)
input_arquivo.addEventListener("change", arquivo_proxy)
enviar_btn.addEventListener("click", analise_proxy)

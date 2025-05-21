document.addEventListener("DOMContentLoaded", () => {
  // Create canvas for particles background
  const particlesCanvas = document.createElement("canvas")
  particlesCanvas.id = "particles-canvas"
  particlesCanvas.style.position = "fixed"
  particlesCanvas.style.top = "0"
  particlesCanvas.style.left = "0"
  particlesCanvas.style.width = "100%"
  particlesCanvas.style.height = "100%"
  particlesCanvas.style.zIndex = "0"
  particlesCanvas.style.pointerEvents = "none"
  document.body.insertBefore(particlesCanvas, document.body.firstChild)

  // Particles animation
  const canvas = document.getElementById("particles-canvas")
  const ctx = canvas.getContext("2d")
  let particles = []
  const particleCount = 100

  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  window.addEventListener("resize", resizeCanvas)
  resizeCanvas()

  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 3 + 1
      this.speedX = Math.random() * 0.5 - 0.25
      this.speedY = Math.random() * 0.5 - 0.25
      this.opacity = Math.random() * 0.5 + 0.2 // Varying opacity for shimmer effect
    }

    update() {
      this.x += this.speedX
      this.y += this.speedY

      // Shimmer effect - opacity fluctuation
      this.opacity += Math.random() * 0.03 - 0.015
      this.opacity = Math.max(0.1, Math.min(0.7, this.opacity))

      // Boundary check
      if (this.x < 0 || this.x > canvas.width) {
        this.speedX = -this.speedX
      }
      if (this.y < 0 || this.y > canvas.height) {
        this.speedY = -this.speedY
      }
    }

    draw() {
      ctx.fillStyle = `rgba(200, 200, 200, ${this.opacity})`
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Initialize particles
  function initParticles() {
    particles = []
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }
  }

  // Animation loop
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw connections between nearby particles
    ctx.strokeStyle = "rgba(180, 180, 180, 0.1)"
    ctx.lineWidth = 0.5
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }

    // Update and draw particles
    for (const particle of particles) {
      particle.update()
      particle.draw()
    }

    requestAnimationFrame(animateParticles)
  }

  // Start animation
  initParticles()
  animateParticles()

  // Referências aos elementos
  const botaoUpload = document.getElementById("botao")
  const arquivoInfo = document.getElementById("arquivo-info")
  const arquivoNome = document.getElementById("arquivo-nome")
  const arquivoTamanho = document.getElementById("arquivo-tamanho")
  const removerArquivo = document.getElementById("remover-arquivo")
  const enviarAnalise = document.getElementById("enviar-analise")
  const requisitosInput = document.getElementById("requisitos")
  const resultadoAnalise = document.getElementById("resultado-analise")
  const loadingOverlay = document.getElementById("loading")

  // Funcionalidade do dropdown de perfil
  const perfilBtn = document.querySelector(".perfil-btn")
  const profileDropdown = document.querySelector(".profile-dropdown")

  if (perfilBtn && profileDropdown) {
    // Variável para controlar o estado do dropdown
    let isDropdownOpen = false

    // Adicionar evento de clique ao botão de perfil
    perfilBtn.addEventListener("click", (e) => {
      e.stopPropagation() // Impedir que o clique se propague para o documento
      isDropdownOpen = !isDropdownOpen

      if (isDropdownOpen) {
        profileDropdown.classList.add("active")
      } else {
        profileDropdown.classList.remove("active")
      }
    })

    // Fechar o dropdown quando clicar em qualquer lugar fora dele
    document.addEventListener("click", (e) => {
      // Verificar se o clique foi fora do botão de perfil e do dropdown
      if (!perfilBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
        profileDropdown.classList.remove("active")
        isDropdownOpen = false
      }
    })

    // Impedir que cliques dentro do dropdown fechem o menu
    profileDropdown.addEventListener("click", (e) => {
      e.stopPropagation()
    })
  }

  // Animação de entrada
  document.body.classList.add("fade-in")

  // Efeito de hover nos itens do histórico
  const historyItems = document.querySelectorAll(".history-item")
  historyItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)"
      this.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.05)"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
      this.style.boxShadow = "none"
    })

    // Ao clicar em um item do histórico
    item.addEventListener("click", () => {
      // Simular carregamento de análise anterior
      loadingOverlay.classList.remove("hidden")

      setTimeout(() => {
        loadingOverlay.classList.add("hidden")
        resultadoAnalise.classList.remove("hidden")
        resultadoAnalise.innerHTML = `
                    <h3>Resultado da Análise</h3>
                    <div class="analise-content">
                    <p>Esta é uma análise carregada do histórico. Aqui seriam exibidos os detalhes da análise selecionada.</p>
                    <div class="analise-stats">
                        <div class="stat-item">
                        <span class="stat-label">Compatibilidade</span>
                        <div class="stat-bar">
                            <div class="stat-fill" style="width: 85%"></div>
                        </div>
                        <span class="stat-value">85%</span>
                        </div>
                        <div class="stat-item">
                        <span class="stat-label">Experiência</span>
                        <div class="stat-bar">
                            <div class="stat-fill" style="width: 72%"></div>
                        </div>
                        <span class="stat-value">72%</span>
                        </div>
                        <div class="stat-item">
                        <span class="stat-label">Habilidades técnicas</span>
                        <div class="stat-bar">
                            <div class="stat-fill" style="width: 90%"></div>
                        </div>
                        <span class="stat-value">90%</span>
                        </div>
                    </div>
                    </div>
                `

        // Adicionar animação de entrada para o resultado
        resultadoAnalise.style.animation = "fadeIn 0.5s ease-in-out"
      }, 1500)
    })
  })

  // Remover arquivo
  removerArquivo.addEventListener("click", () => {
    arquivoInfo.classList.add("hidden")
    resultadoAnalise.classList.add("hidden")
  })

  // Simular envio de análise
  enviarAnalise.addEventListener("click", () => {
    const requisitos = requisitosInput.value.trim()

    if (!arquivoInfo.classList.contains("hidden") && requisitos) {
      // Mostrar loading
      loadingOverlay.classList.remove("hidden")

      // Simular processamento
      setTimeout(() => {
        loadingOverlay.classList.add("hidden")
        resultadoAnalise.classList.remove("hidden")
        resultadoAnalise.innerHTML = `
                    <h3>Resultado da Análise</h3>
                    <div class="analise-content">
                    <div class="break-line">Análise concluída com base nos requisitos: "${requisitos}"</div>
                    <div class="analise-stats">
                        <div class="stat-item">
                        <span class="stat-label">Compatibilidade</span>
                        <div class="stat-bar">
                            <div class="stat-fill" style="width: 78%"></div>
                        </div>
                        <span class="stat-value">78%</span>
                        </div>
                        <div class="stat-item">
                        <span class="stat-label">Experiência</span>
                        <div class="stat-bar">
                            <div class="stat-fill" style="width: 65%"></div>
                        </div>
                        <span class="stat-value">65%</span>
                        </div>
                        <div class="stat-item">
                        <span class="stat-label">Habilidades técnicas</span>
                        <div class="stat-bar">
                            <div class="stat-fill" style="width: 82%"></div>
                        </div>
                        <span class="stat-value">82%</span>
                        </div>
                    </div>
                    <div class="recomendacao">
                        <h4>Recomendação da IA:</h4>
                        <p>Com base na análise do documento e nos requisitos especificados, este candidato apresenta um bom perfil para a posição. Recomenda-se prosseguir para a etapa de entrevista técnica para avaliar melhor as habilidades práticas.</p>
                    </div>
                    </div>
                `

        // Adicionar animação de entrada para o resultado
        resultadoAnalise.style.animation = "fadeIn 0.5s ease-in-out"

        // Limpar campo de requisitos
        requisitosInput.value = ""
      }, 2000)
    } else if (arquivoInfo.classList.contains("hidden")) {
      alert("Por favor, selecione um arquivo para análise.")
    } else {
      alert("Por favor, descreva os requisitos para a análise.")
    }
  })

  // Adicionar mais animações e interatividade conforme necessário
  const waves = document.querySelectorAll(".wave")
  waves.forEach((wave, index) => {
    wave.style.animationDuration = `${15 + index * 2}s`
  })

  // Animação para o botão central
  botaoUpload.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.05)"
    this.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)"
  })

  botaoUpload.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)"
    this.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"
  })

  // Simular upload de arquivo ao clicar no botão
  botaoUpload.addEventListener("click", () => {
    // Aqui normalmente você teria um input file real sendo clicado
    // Para fins de demonstração, vamos simular um arquivo selecionado

    setTimeout(() => {
      arquivoNome.textContent = "curriculo_exemplo.pdf"
      arquivoTamanho.textContent = "Tamanho: 245 KB"
      arquivoInfo.classList.remove("hidden")
    }, 500)
  })

  // Adicionar estilos CSS dinâmicos para a animação de fundo
  const style = document.createElement("style")
  style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .fade-in {
            animation: fadeIn 0.5s ease-in-out;
        }
        
        .analise-stats {
            margin: 1.5rem 0;
        }
        
        .stat-item {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
        }
        
        .stat-label {
            width: 150px;
            font-size: 0.9rem;
        }
        
        .stat-bar {
            flex: 1;
            height: 8px;
            background-color: #e5e7eb;
            border-radius: 4px;
            overflow: hidden;
            margin: 0 1rem;
        }
        
        .stat-fill {
            height: 100%;
            background-color: var(--primary-color);
            border-radius: 4px;
            transition: width 1s ease-in-out;
        }
        
        .stat-value {
            font-weight: 600;
            color: var(--primary-color);
        }
        
        .recomendacao {
            background-color: rgba(99, 102, 241, 0.1);
            border-left: 4px solid var(--primary-color);
            padding: 1rem;
            border-radius: 0 0.5rem 0.5rem 0;
            margin-top: 1.5rem;
        }
        
        .recomendacao h4 {
            margin-bottom: 0.5rem;
            color: var(--primary-color);
        }
    `
  document.head.appendChild(style)
})

function autoResize(el) {
  el.style.height = "auto"
  el.style.height = el.scrollHeight + "px"
}

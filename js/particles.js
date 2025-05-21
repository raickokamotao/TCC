document.addEventListener("DOMContentLoaded", () => {
  console.log("Network particles animation loaded")

  // Create canvas for particles
  const canvas = document.createElement("canvas")
  canvas.id = "particles-canvas"
  canvas.style.position = "fixed"
  canvas.style.top = "0"
  canvas.style.left = "0"
  canvas.style.width = "100%"
  canvas.style.height = "100%"
  canvas.style.zIndex = "-1" // Behind content but above background
  canvas.style.pointerEvents = "none"
  document.body.insertBefore(canvas, document.body.firstChild)

  const ctx = canvas.getContext("2d")

  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  // Animation configuration
  const config = {
    particleCount: 150, // Increased for denser network
    particleSize: { min: 0.5, max: 2 }, // Smaller particles
    speed: { min: 0.1, max: 0.3 }, // Slower movement for more stable network
    connectionDistance: 200, // Increased connection distance for more connections
    colors: {
      // Darker purple shades
      particles: [
        "rgba(141, 49, 221, 0.7)", // Dark purple
        "rgba(118, 36, 180, 0.7)", // Darker purple
        "rgba(99, 29, 153, 0.7)", // Even darker purple
        "rgba(168, 86, 235, 0.7)", // Medium-dark purple (for some variation)
      ],
      connections: "rgba(123, 44, 191, 0.25)", // More visible connections
      background: "rgba(15, 7, 20, 0.1)", // Slightly more visible trail for smoother effect
    },
  }

  // Particles array
  let particles = []

  // Create particles
  function createParticles() {
    particles = []
    for (let i = 0; i < config.particleCount; i++) {
      const colorIndex = Math.floor(Math.random() * config.colors.particles.length)
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (config.particleSize.max - config.particleSize.min) + config.particleSize.min,
        speedX: (Math.random() - 0.5) * (config.speed.max - config.speed.min) + config.speed.min,
        speedY: (Math.random() - 0.5) * (config.speed.max - config.speed.min) + config.speed.min,
        color: config.colors.particles[colorIndex],
        pulseSpeed: Math.random() * 0.01 + 0.005, // Slower pulse for more stable appearance
        pulseDirection: Math.random() > 0.5 ? 1 : -1,
        pulseValue: Math.random(),
        // Add depth effect with z-value
        z: Math.random() * 0.5 + 0.5, // Value between 0.5 and 1 for depth scaling
      })
    }
  }

  // Animation function
  function animate() {
    // Semi-transparent clear for trail effect
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // Draw connections between particles (draw first so they appear behind particles)
    ctx.strokeStyle = config.colors.connections
    ctx.lineWidth = 0.9
    ctx.beginPath()

    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i]

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j]
        const dx = p1.x - p2.x
        const dy = p1.y - p2.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < config.connectionDistance) {
          // Opacity based on distance - stronger when closer
          const opacity = 1 - distance / config.connectionDistance
          ctx.strokeStyle = `rgba(123, 44, 191, ${opacity * 0.4})`
          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.stroke()
        }
      }
    }

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]

      // Update position
      p.x += p.speedX
      p.y += p.speedY

      // Boundary check with smooth transition
      if (p.x < 0) p.x = canvas.width
      if (p.x > canvas.width) p.x = 0
      if (p.y < 0) p.y = canvas.height
      if (p.y > canvas.height) p.y = 0

      // Pulse effect
      p.pulseValue += p.pulseSpeed * p.pulseDirection
      if (p.pulseValue > 1) {
        p.pulseValue = 1
        p.pulseDirection = -1
      } else if (p.pulseValue < 0.3) {
        p.pulseValue = 0.3
        p.pulseDirection = 1
      }

      // Create a smaller glow effect
      const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2)
      glow.addColorStop(0, p.color)
      glow.addColorStop(1, "rgba(81, 24, 126, 0)")

      ctx.beginPath()
      ctx.fillStyle = glow
      ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2)
      ctx.fill()

      // Draw the particle core
      ctx.beginPath()
      ctx.fillStyle = p.color
      ctx.arc(p.x, p.y, p.size * p.pulseValue, 0, Math.PI * 2)
      ctx.fill()
    }

    requestAnimationFrame(animate)
  }

  // Initialize and start animation
  createParticles()
  animate()

  // Handle window resize
  window.addEventListener("resize", () => {
    resizeCanvas()
    createParticles()
  })

  console.log("Network particles animation started")
})

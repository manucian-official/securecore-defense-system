<!DOCTYPE html>

<html lang="en">
<head>
<meta charset="UTF-8">
<title>SCDS Watermark</title>

<style>
body {
  margin: 0;
  height: 100vh;
  background: #0f172a;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  font-family: 'Segoe UI', sans-serif;
}

/* Glow text */
.watermark {
  font-size: 60px;
  font-weight: bold;
  color: #00ffff;
  text-transform: uppercase;
  position: relative;
  letter-spacing: 5px;
  animation: glow 2s ease-in-out infinite alternate;
}

/* Glow effect */
@keyframes glow {
  from {
    text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff;
  }
  to {
    text-shadow: 0 0 20px #00ffff, 0 0 40px #00ffff;
  }
}

/* Moving lines background */
.lines {
  position: absolute;
  width: 200%;
  height: 200%;
  background: repeating-linear-gradient(
    45deg,
    rgba(0,255,255,0.05) 0px,
    rgba(0,255,255,0.05) 2px,
    transparent 2px,
    transparent 20px
  );
  animation: moveLines 10s linear infinite;
}

@keyframes moveLines {
  from { transform: translate(0, 0); }
  to { transform: translate(-200px, -200px); }
}

/* Floating particles */
.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #00ffff;
  border-radius: 50%;
  animation: float 6s infinite;
}

@keyframes float {
  0% { transform: translateY(0); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(-200px); opacity: 0; }
}
</style>

</head>

<body>

<div class="lines"></div>

<div class="watermark">
  SCDS • SECURECORE
</div>

<!-- particles -->

<script>
for (let i = 0; i < 40; i++) {
  const p = document.createElement("div");
  p.className = "particle";
  p.style.left = Math.random() * 100 + "%";
  p.style.top = Math.random() * 100 + "%";
  p.style.animationDelay = Math.random() * 5 + "s";
  document.body.appendChild(p);
}
</script>

</body>
</html>

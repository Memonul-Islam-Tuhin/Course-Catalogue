export function confetti() {
  const emojis = ["🎉", "✨", "🎓", "⭐", "💜"];
  for (let i = 0; i < 28; i++) {
    const e = document.createElement("span");
    e.className = "conf";
    e.textContent = emojis[i % emojis.length];
    e.style.left = Math.random() * 100 + "vw";
    e.style.fontSize = 14 + Math.random() * 16 + "px";
    e.style.animationDelay = Math.random() * 0.5 + "s";
    document.body.appendChild(e);
    setTimeout(() => e.remove(), 3200);
  }
}

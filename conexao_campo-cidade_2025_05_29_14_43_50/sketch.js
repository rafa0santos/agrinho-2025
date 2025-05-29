function setup() {
  createCanvas(400, 400);
}
let letras = [];
let xTrator = 700;
let milhos = [];
let liberarMilho = false;
let caminhao = { x: 630, y: 275, milhosRecebidos: 0, cheio: false,
indoParaCidade: false, entregar: false };
let mostrarLata = false;
function setup() {
createCanvas(800, 600);
textFont("Broadway");
textAlign(CENTER, CENTER);
angleMode(DEGREES);
}
function draw() {
background(255);
// Céu
fill("#2196F3");
noStroke();
rect(0, 0, 800, 300);
// Prédios (cidade)
textSize(60);
text("🌇 ", 40, 272);
textSize(80);
text("🌇 ", 100, 262);
// Árvores
fill("green");
ellipse(340, 300, 150, 100);
ellipse(480, 300, 150, 100);
ellipse(620, 290, 200, 150);
// Fábrica
textSize(80);
text("🏭", 700, 262);
// Caminhão
textSize(60);
text("🚚", caminhao.x, caminhao.y);
// Terra
fill("#F0AE4C");
noStroke();

rect(0, 300, 800, 300);
// Trator
strokeWeight(2);
fill("#F0E059");
textStyle(BOLD);
textSize(60);
text("🚜", xTrator, 350);
if (xTrator > -50) {
xTrator -= 2;
} else {
liberarMilho = true;
}
// Título
textSize(30);
text("Conexão campo-cidade", width / 2, 50);
// Milhos voadores
if (liberarMilho) {
if (frameCount % 5 === 0 && milhos.length < 20) {
milhos.push({
x: 0,
y: random(300),
alvoX: caminhao.x,
alvoY: caminhao.y,
entregue: false
});
}
for (let i = 0; i < milhos.length; i++) {
let milho = milhos[i];
if (!milho.entregue) {
textSize(30);
text("🥔", milho.x, milho.y);
milho.x = lerp(milho.x, milho.alvoX, 0.02);
milho.y = lerp(milho.y, milho.alvoY, 0.02);
// Verifica se chegou ao caminhão
if (dist(milho.x, milho.y, caminhao.x, caminhao.y) < 10 &&
!milho.entregue) {
milho.entregue = true;
caminhao.milhosRecebidos++;
}
}
}

}
// Caminhão cheio
if (caminhao.milhosRecebidos >= 20 && !caminhao.cheio) {
caminhao.cheio = true;
caminhao.indoParaCidade = true;
}
// Caminhão vai até a cidade
if (caminhao.indoParaCidade && caminhao.x > 120) {
caminhao.x -= 2;
}
// Caminhão chegou na cidade
if (caminhao.indoParaCidade && caminhao.x <= 120) {
caminhao.indoParaCidade = false;
caminhao.cheio = false;
caminhao.milhosRecebidos = 0;
mostrarLata = true;
}
// Exibe lata de milho no centro
if (mostrarLata) {
textSize(100);
text(" ", width / 2, height / 2);
}
// Círculo de letras
textSize(30);
push();
translate(width / 2, height / 2 + 50);
rotate(frameCount * 0.5);
let raio = 150;
let anguloPorLetra = 360 / letras.length;
for (let i = 0; i < letras.length; i++) {
let ang = i * anguloPorLetra - 90;
let x = cos(ang) * raio;
let y = sin(ang) * raio;
push();
translate(x, y);
rotate(ang + 90);
text(letras[i], 0, 0);
pop();
}
pop();
}

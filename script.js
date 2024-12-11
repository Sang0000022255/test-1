// Biến khởi tạo
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 400;

let isPlaying = false;
let score = 0;
let obstacles = [];
let player = { x: 50, y: 200, width: 20, height: 40, speed: 5 };

// Hàm tạo chướng ngại vật ngẫu nhiên
function generateObstacles() {
  const obstacle = {
    x: canvas.width,
    y: Math.random() * (canvas.height - 30),
    width: 20,
    height: 30,
    speed: 3 + Math.random() * 2,
  };
  obstacles.push(obstacle);
}

// Vẽ xe người chơi
function drawPlayer() {
  ctx.fillStyle = "blue";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Vẽ chướng ngại vật
function drawObstacles() {
  ctx.fillStyle = "red";
  obstacles.forEach(obstacle => {
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    obstacle.x -= obstacle.speed;
  });
  obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);
}

// Kiểm tra va chạm
function checkCollision() {
  return obstacles.some(obstacle => {
    return (
      player.x < obstacle.x + obstacle.width &&
      player.x + player.width > obstacle.x &&
      player.y < obstacle.y + obstacle.height &&
      player.y + player.height > obstacle.y
    );
  });
}

// Cập nhật trò chơi
function updateGame() {
  if (!isPlaying) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawObstacles();

  // Kiểm tra va chạm
  if (checkCollision()) {
    isPlaying = false;
    alert(`Game over! Điểm của bạn: ${score}`);
    updateRanking(score);
    return;
  }

  // Tăng điểm số
  score++;
  if (score % 100 === 0) {
    generateObstacles();
  }

  requestAnimationFrame(updateGame);
}

// Bảng xếp hạng
const rankingList = document.getElementById("ranking-list");
let rankings = [];

function updateRanking(newScore) {
  rankings.push(newScore);
  rankings.sort((a, b) => b - a);
  rankingList.innerHTML = rankings
    .map((rank, index) => `<li>${index + 1}. Điểm: ${rank}</li>`)
    .join("");
}

// Bắt đầu trò chơi
document.getElementById("start-game").addEventListener("click", () => {
  isPlaying = true;
  score = 0;
  obstacles = [];
  updateGame();
});

// Điều khiển xe
document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp" && player.y > 0) player.y -= player.speed;
  if (e.key === "ArrowDown" && player.y + player.height < canvas.height)
    player.y += player.speed;
});

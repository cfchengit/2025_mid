let circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100); // 使用 HSB 色彩模式
  regenerateCircles();
  window.addEventListener('scroll', onScroll);
  window.addEventListener('message', onMessage, false);
}

function draw() {
  background(255);
  for (let circle of circles) {
    fill(circle.color);
    ellipse(circle.x, circle.y, circle.size);
  }
}

function regenerateCircles() {
  circles = [];
  for (let i = 0; i < 100; i++) {
    circles.push({
      x: random(width),
      y: random(height),
      size: random(30, 50),
      color: color(random(360), 100, 100) // 隨機鮮豔顏色
    });
  }
}

function onScroll() {
  regenerateCircles();
}

function onMessage(event) {
  if (event.data === 'iframeScroll') {
    regenerateCircles();
  }
}

function mouseMoved() {
  let hueChange = map(mouseX, 0, width, -10, 10); // 色相變化範圍
  
  for (let circle of circles) {
    let h = hue(circle.color);
    let s = saturation(circle.color);
    let b = brightness(circle.color);
    
    h = (h + hueChange) % 360; // 確保色相在 0 到 360 之間循環
    if (h < 0) h += 360;
    
    circle.color = color(h, s, b);
    circle.size = constrain(circle.size + map(mouseX, 0, width, -2, 2), 30, 50);
  }
}

function showContent(id) {
  let contents = document.querySelectorAll('.content');
  contents.forEach(content => {
    content.style.display = 'none';
  });
  document.getElementById(id).style.display = 'block';
  document.getElementById('iframe-container').style.display = 'none';
}

function showIframe(url) {
  let contents = document.querySelectorAll('.content');
  contents.forEach(content => {
    content.style.display = 'none';
  });
  let iframeContainer = document.getElementById('iframe-container');
  let iframe = document.getElementById('iframe');
  iframe.src = url;
  iframeContainer.style.display = 'block';
  iframe.onload = () => {
    iframe.contentWindow.postMessage('addScrollListener', '*');
  };
}

let circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
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
      size: random(10, 50),
      color: color(random(255), random(255), random(255))
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
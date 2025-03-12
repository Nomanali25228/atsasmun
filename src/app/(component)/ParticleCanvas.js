import React, { useEffect } from "react";

const ParticleCanvas = () => {
  useEffect(() => {
    const CANVAS_WIDTH = window.innerWidth;
    const CANVAS_HEIGHT = window.innerHeight;
    const CURSOR_RADIUS = 80;
    let cursor = [-1500, -1500];

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const canvasOffset = {
      x0: 0,
      y0: 0,
      x1: CANVAS_WIDTH,
      y1: CANVAS_HEIGHT,
    };

    function random(factor) {
      return Math.max(0, Math.floor(Math.random() * factor));
    }

    class Particle {
      constructor(ctx) {
        this.ctx = ctx;
        this.x = random(canvasOffset.x1);
        this.y = random(canvasOffset.y1);
        this.size = random(4);
        this.color = "#ffffff";
        this.opacity = 1;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
      }

      draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
      }
    }

    let particles = [];
    for (let i = 0; i < 60; i++) {
      particles.push(new Particle(ctx));
    }

    canvas.addEventListener("mousemove", (evt) => {
      cursor = [evt.clientX, evt.clientY];
    });

    canvas.addEventListener("mouseleave", () => {
      cursor = [-1500, -1500];
    });

    function clearCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function animate() {
      clearCanvas();
      particles.forEach((particle) => {
        const dx = particle.x - cursor[0];
        const dy = particle.y - cursor[1];
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < CURSOR_RADIUS) {
          ctx.strokeStyle = "#fff";
          ctx.beginPath();
          ctx.moveTo(cursor[0], cursor[1]);
          ctx.lineTo(particle.x, particle.y);
          ctx.stroke();
          ctx.closePath();
        }

        particle.draw();

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < canvasOffset.x0 || particle.x > canvasOffset.x1) {
          particle.vx *= -1;
        }

        if (particle.y < canvasOffset.y0 || particle.y > canvasOffset.y1) {
          particle.vy *= -1;
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      id="canvas"
      className="absolute top-0 left-0 w-full h-full z-0"
    ></canvas>
  );
};

export default ParticleCanvas;

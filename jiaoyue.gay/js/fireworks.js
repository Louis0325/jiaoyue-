(function () {

    const now = new Date();


    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log('使用者時區:', userTimeZone);


    const formatter = new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit', timeZone: userTimeZone });
    const parts = formatter.formatToParts(now);
    const month = parts.find(p => p.type === 'month').value;
    const day = parts.find(p => p.type === 'day').value;
    const mmdd = `${month}-${day}`;

    const isGregorian = (mmdd === '12-31' || mmdd === '01-01');


    const birthday = '03-25';
    const isBirthday = (mmdd === birthday);


    window.startFireworks = function () {
        if (document.getElementById('fireworks-canvas')) return;
        startAnimation();
    };


    if (!isGregorian && !isBirthday) return;

    window.startFireworks();

    function startAnimation() {

        let canvas = document.getElementById('fireworks-canvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.id = 'fireworks-canvas';
            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.pointerEvents = 'none';
            canvas.style.zIndex = '9999';
            document.body.appendChild(canvas);
        }

        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        }
        window.addEventListener('resize', resize);
        resize();

        const particles = [];
        const rockets = [];


        const random = (min, max) => Math.random() * (max - min) + min;

        class Rocket {
            constructor(targetX, targetY) {

                this.x = targetX || random(width * 0.1, width * 0.9);
                this.y = height;
                this.targetY = targetY || random(height * 0.1, height * 0.4);

                this.speed = random(8, 12);


                this.angle = targetX ? Math.atan2(targetY - height, targetX - this.x) : -Math.PI / 2 + random(-0.1, 0.1);

                this.vx = Math.cos(this.angle) * this.speed;
                this.vy = Math.sin(this.angle) * this.speed;

                this.hue = Math.floor(random(0, 360));
                this.color = `hsl(${this.hue}, 100%, 60%)`;
                this.exploded = false;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.vy += 0.1;


                if (Math.random() > 0.4) {
                    particles.push(new Particle(this.x, this.y, this.hue, true));
                }



                if (this.vy >= 0 || (this.targetY && this.y <= this.targetY)) {
                    this.explode();
                    return false;
                }
                return true;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            explode() {
                this.exploded = true;

                // 效能優化：手機版減少粒子數量
                const isMobile = window.innerWidth < 768;
                const count = isMobile ? Math.floor(random(20, 40)) : Math.floor(random(60, 100));

                const style = Math.random();

                for (let i = 0; i < count; i++) {
                    const angle = (Math.PI * 2 / count) * i;

                    const speed = style > 0.4 ? random(2, 8) : (i % 2 === 0 ? 6 : 3);
                    particles.push(new Particle(this.x, this.y, this.hue, false, angle, speed));
                }
            }
        }

        class Particle {
            constructor(x, y, hue, isTrail, angle, speed) {
                this.x = x;
                this.y = y;
                this.isTrail = isTrail;
                this.hue = hue + random(-20, 20);

                if (isTrail) {

                    this.vx = random(-0.8, 0.8);
                    this.vy = random(1, 3);
                    this.alpha = 0.5;
                    this.decay = random(0.02, 0.04);
                    this.size = random(0.5, 1.2);
                } else {

                    this.vx = Math.cos(angle) * speed;
                    this.vy = Math.sin(angle) * speed;
                    this.alpha = 1;
                    this.decay = random(0.01, 0.02);
                    this.size = random(1.5, 2.5);
                }

                this.friction = 0.95;
                this.gravity = 0.12;
            }

            update() {
                this.vx *= this.friction;
                this.vy *= this.friction;
                this.vy += this.gravity;
                this.x += this.vx;
                this.y += this.vy;
                this.alpha -= this.decay;
                return this.alpha > 0;
            }

            draw() {
                ctx.save();
                ctx.globalCompositeOperation = 'lighter';
                ctx.globalAlpha = this.alpha;
                ctx.fillStyle = `hsl(${this.hue}, 100%, 70%)`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();


                if (!this.isTrail && this.alpha > 0.6) {
                    ctx.fillStyle = '#fff';
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            }
        }



        window.addEventListener('mousedown', (e) => {
            rockets.push(new Rocket(e.clientX, e.clientY));
        });

        function loop() {

            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, width, height);
            ctx.globalCompositeOperation = 'source-over';


            if (Math.random() < 0.020) {
                rockets.push(new Rocket());
            }


            for (let i = rockets.length - 1; i >= 0; i--) {
                if (!rockets[i].update()) {
                    rockets.splice(i, 1);
                } else {
                    rockets[i].draw();
                }
            }


            for (let i = particles.length - 1; i >= 0; i--) {
                if (!particles[i].update()) {
                    particles.splice(i, 1);
                } else {
                    particles[i].draw();
                }
            }

            requestAnimationFrame(loop);
        }

        loop();
    }
})();
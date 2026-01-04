(function () {
    // --- 新增：日期檢查邏輯 (只在過年期間執行) ---
    const now = new Date();

    // 檢查並獲取用戶時區
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log('目前用戶時區:', userTimeZone);

    // 根據用戶時區格式化日期 (MM-DD)
    const formatter = new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit', timeZone: userTimeZone });
    const parts = formatter.formatToParts(now);
    const month = parts.find(p => p.type === 'month').value;
    const day = parts.find(p => p.type === 'day').value;
    const mmdd = `${month}-${day}`;

    const isGregorian = (mmdd === '12-31' || mmdd === '01-01'); // 西曆跨年

    // 設定生日日期 (格式：MM-DD)
    const birthday = '03-25'; // 請在此修改您的生日，例如 '09-15'
    const isBirthday = (mmdd === birthday);

    // 暴露全域函數供彩蛋調用
    window.startFireworks = function () {
        if (document.getElementById('fireworks-canvas')) return; // 避免重複啟動
        startAnimation();
    };

    // 若非過年期間且非生日，不自動執行，但保留 window.startFireworks 供彩蛋使用
    if (!isGregorian && !isBirthday) return;

    window.startFireworks();

    function startAnimation() {
        // 嘗試獲取 canvas，若不存在則建立
        let canvas = document.getElementById('fireworks-canvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.id = 'fireworks-canvas';
            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.pointerEvents = 'none'; // 讓煙花不影響頁面點擊
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

        // 工具函數：隨機區間
        const random = (min, max) => Math.random() * (max - min) + min;

        class Rocket {
            constructor(targetX, targetY) {
                // 如果有傳入座標則朝向座標，否則隨機位置發射
                this.x = targetX || random(width * 0.1, width * 0.9);
                this.y = height;
                this.targetY = targetY || random(height * 0.1, height * 0.4);

                this.speed = random(8, 12);
                // 計算上升角度
                // 如果有點擊目標，計算角度；否則垂直向上稍微隨機偏轉
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
                this.vy += 0.1; // 微量重力影響上升弧度

                // 上升時產生微小的火花尾跡
                if (Math.random() > 0.4) {
                    particles.push(new Particle(this.x, this.y, this.hue, true));
                }

                // 到達目標高度或速度耗盡時爆炸
                // 判斷條件：垂直速度開始變正(下墜) 或 到達目標高度
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
                const count = Math.floor(random(60, 100));
                const style = Math.random(); // 隨機決定爆炸風格

                for (let i = 0; i < count; i++) {
                    const angle = (Math.PI * 2 / count) * i;
                    // 隨機速度產生不規則圓形，或固定速度產生完美圓形
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
                    // 上升尾跡粒子
                    this.vx = random(-0.8, 0.8);
                    this.vy = random(1, 3);
                    this.alpha = 0.5;
                    this.decay = random(0.02, 0.04);
                    this.size = random(0.5, 1.2);
                } else {
                    // 爆炸主體粒子
                    this.vx = Math.cos(angle) * speed;
                    this.vy = Math.sin(angle) * speed;
                    this.alpha = 1;
                    this.decay = random(0.01, 0.02);
                    this.size = random(1.5, 2.5);
                }

                this.friction = 0.95; // 空氣阻力
                this.gravity = 0.12;  // 重力
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
                ctx.globalCompositeOperation = 'lighter'; // 讓疊加處發亮
                ctx.globalAlpha = this.alpha;
                ctx.fillStyle = `hsl(${this.hue}, 100%, 70%)`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();

                // 爆炸粒子核心加強白光
                if (!this.isTrail && this.alpha > 0.6) {
                    ctx.fillStyle = '#fff';
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            }
        }

        // 監聽點擊發射煙花
        // 使用 mousedown 讓使用者點擊任意處發射
        window.addEventListener('mousedown', (e) => {
            rockets.push(new Rocket(e.clientX, e.clientY));
        });

        function loop() {
            // 使用 destination-out 讓舊畫面變透明，產生拖尾且不遮擋背景
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, width, height);
            ctx.globalCompositeOperation = 'source-over';

            // 隨機自動發射 (機率可調整)
            if (Math.random() < 0.020) {
                rockets.push(new Rocket());
            }

            // 更新火箭
            for (let i = rockets.length - 1; i >= 0; i--) {
                if (!rockets[i].update()) {
                    rockets.splice(i, 1);
                } else {
                    rockets[i].draw();
                }
            }

            // 更新粒子
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
let highestZ = 10;

class Paper {
    holdingPaper = false;

    prevX = 0;
    prevY = 0;

    curPaperX = 0;
    curPaperY = 0;

    init(paper) {
        const startDrag = (x, y) => {
            this.holdingPaper = true;
            paper.style.zIndex = highestZ++;
            this.prevX = x;
            this.prevY = y;
        };

        const movePaper = (x, y) => {
            if (!this.holdingPaper) return;
            const velocityX = x - this.prevX;
            const velocityY = y - this.prevY;

            this.curPaperX += velocityX;
            this.curPaperY += velocityY;

            this.prevX = x;
            this.prevY = y;

            paper.style.transform = `translate(${this.curPaperX}px, ${this.curPaperY}px)`;
        };

        const endDrag = () => (this.holdingPaper = false);

        // Mouse events
        paper.addEventListener('mousedown', (e) => {
            if (e.button === 0) {
                e.preventDefault();
                startDrag(e.clientX, e.clientY);
            }
        });

        document.addEventListener('mousemove', (e) => movePaper(e.clientX, e.clientY));
        window.addEventListener('mouseup', endDrag);

        // Touch events
        paper.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            startDrag(touch.clientX, touch.clientY);
        });

        document.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            if (touch) movePaper(touch.clientX, touch.clientY);
        });

        window.addEventListener('touchend', endDrag);
    }
}

const main = document.querySelector('.main');
const papers = Array.from(main.querySelectorAll('.paper'));

papers.forEach((paper) => {
    const p = new Paper();
    p.init(paper);
});

document.addEventListener('keydown', (e) => {
    if (e.shiftKey && e.metaKey && e.key === 'a') {
        const newPaper = document.createElement('div');
        newPaper.classList.add('paper');
        main.appendChild(newPaper);
        const p = new Paper();
        p.init(newPaper);
        papers.push(newPaper);
    }
});

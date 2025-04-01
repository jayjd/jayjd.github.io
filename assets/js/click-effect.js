document.addEventListener('DOMContentLoaded', () => {
    const words = ["富强", "民主", "文明", "和谐", "自由", "平等", "公正", "法治", "爱国", "敬业", "诚信", "友善"];
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB', '#E74C3C', '#2ECC71', '#F1C40F', '#1ABC9C'];
    let index = 0;

    document.addEventListener('click', (e) => {
        const word = document.createElement('span');
        word.className = 'click-word';
        word.style.left = (e.clientX + window.scrollX - 15) + 'px';
        word.style.top = (e.clientY + window.scrollY - 15) + 'px';
        word.textContent = words[index];
        
        // 随机选择两个颜色创建渐变效果
        const colorIndex1 = Math.floor(Math.random() * colors.length);
        const colorIndex2 = Math.floor(Math.random() * colors.length);
        word.style.background = `linear-gradient(45deg, ${colors[colorIndex1]}, ${colors[colorIndex2]})`;
        word.style.webkitBackgroundClip = 'text';
        word.style.backgroundClip = 'text';
        word.style.color = 'transparent';
        
        document.body.appendChild(word);
        index = (index + 1) % words.length;
        
        setTimeout(() => {
            word.remove();
        }, 1000);
    });
});
const video = document.getElementById('backgroundVideo');
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const content = document.querySelector('.content');

        // Function to calculate brightness
        function getAverageBrightness(frame) {
            const frameData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = frameData.data;
            let r = 0, g = 0, b = 0;
            let count = 0;

            for (let i = 0; i < data.length; i += 4) {
                r += data[i];
                g += data[i + 1];
                b += data[i + 2];
                count++;
            }

            r = Math.floor(r / count);
            g = Math.floor(g / count);
            b = Math.floor(b / count);

            return (r + g + b) / 3;
        }

        // Function to update text color based on video frame brightness
        function updateTextColor() {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const brightness = getAverageBrightness();
            
            if (brightness > 128) {
                content.classList.add('light-mode');
            } else {
                content.classList.remove('light-mode');
            }
        }

        // Check brightness every second
        video.addEventListener('play', () => {
            setInterval(updateTextColor, 1000); // Update every second
        });
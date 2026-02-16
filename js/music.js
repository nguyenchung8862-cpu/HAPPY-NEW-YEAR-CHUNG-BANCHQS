document.addEventListener("DOMContentLoaded", function () {
	const bgMusic = document.getElementById("bg-music");
	const soundBtn = document.querySelector(".sound-btn");

	if (!bgMusic) {
		console.log("Không tìm thấy audio");
		return;
	}

	let started = false;

	// Phát nhạc khi user click lần đầu (bắt buộc cho mobile)
	document.addEventListener("click", function initMusic() {
		if (!started) {
			bgMusic.volume = 0.5;
			bgMusic.play().then(() => {
				started = true;
				updateIcon(true);
			}).catch(err => {
				console.log("Autoplay bị chặn:", err);
			});
		}
	}, { once: true });

	// Bật / tắt bằng nút loa
	if (soundBtn) {
		soundBtn.addEventListener("click", function (e) {
			e.stopPropagation();

			if (bgMusic.paused) {
				bgMusic.play();
				updateIcon(true);
			} else {
				bgMusic.pause();
				updateIcon(false);
			}
		});
	}

	function updateIcon(isOn) {
		const useTag = soundBtn?.querySelector("use");
		if (!useTag) return;

		if (isOn) {
			useTag.setAttribute("href", "#icon-sound-on");
			useTag.setAttribute("xlink:href", "#icon-sound-on");
		} else {
			useTag.setAttribute("href", "#icon-sound-off");
			useTag.setAttribute("xlink:href", "#icon-sound-off");
		}
	}
});

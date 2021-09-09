const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const prevBtn = $('.btn-prev')
const nextBtn = $('.btn-next')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')


const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            name: 'Nếu ngày mai tôi không trở về',
            singer: 'The Cassette',
            path: './music/song1.mp3',
            image: './img/img1.jpg'
        },
        {
            name: 'Lạ lùng',
            singer: 'Vũ',
            path: './music/song2.mp3',
            image: './img/img2.jpg'
        },
        {
            name: 'Cho tôi lang thang',
            singer: 'Ngọt ft Đen',
            path: './music/song3.mp3',
            image: './img/img3.jpg'
        },
        {
            name: 'Lần cuối',
            singer: 'Ngọt',
            path: './music/song4.mp3',
            image: './img/img4.jpg'
        },
        {
            name: 'Chờ (điều tốt nhất)',
            singer: 'Cá hồi hoang',
            path: './music/song5.mp3',
            image: './img/img5.jpg'
        },
        {
            name: 'Stay',
            singer: 'The Kid LAROI, Justin Bieber',
            path: './music/song6.mp3',
            image: './img/img6.jpg'
        },
        {
            name: 'Ánh Đèn Phố ',
            singer: 'The Cassette',
            path: './music/song7.mp3',
            image: './img/img7.png'
        },
        {
            name: 'Và Thế Là Hết',
            singer: 'Chillies',
            path: './music/song8.mp3',
            image: './img/img8.jpg'
        },
        {
            name: 'GHÉ QUA',
            singer: 'Dick x PC x Tofu',
            path: './music/song9.mp3',
            image: './img/img9.jpg'
        },
        {
            name: 'Đưa Nhau Đi Trốn',
            singer: 'Đen ft Linh Cáo',
            path: './music/song10.mp3',
            image: './img/img10.jpg'
        },
    ],
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return`
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                <div class="thumb" style="background-image: url('${song.image}');  background-size: cover">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        } )
        playlist.innerHTML = htmls.join('');
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        })
    },
    handleEvents: function() {
        const _this = this;
        const cdWidth = cd.offsetWidth;

        // Xử lý quay CD
        const cdThumbAnimate = cdThumb.animate([
            {transform : 'rotate(360deg)'}
        ],
            {
                duration: 10000,
                iterations: Infinity
            }
        )
        cdThumbAnimate.pause();
        
        

        //Xử lý phóng to / thu nhỏ CD
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newWidth = cdWidth - scrollTop;
            cd.style.width = newWidth > 0 ? newWidth + 'px' : 0;
            cd.style.opacity = newWidth/cdWidth;
        }

        //Xử lý khi click play btn
        playBtn.onclick = function() {
            if(_this.isPlaying) {
                audio.pause();
            }
            else { 
                audio.play();  
            }

            // //Khi nhạc đang được play
            // audio.onplay = function() {
            //     _this.isPlaying = true;
            //     player.classList.add('playing')
            //     cdThumbAnimate.play();
            // }

            // //Khi nhạc đang pause
            // audio.onpause = function() {
            //     _this.isPlaying = false;
            //     player.classList.remove('playing') 
            //     cdThumbAnimate.pause();
            // }

            // // Tiến độ bài hát
            // audio.ontimeupdate = function() {
            //     if(audio.duration) {
            //         const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
            //         progress.value = progressPercent;
            //     }
            // }

            // // Tua 
            // progress.oninput = function(e) {
            //     const seekTime = Math.floor((e.target.value * audio.duration)/100);
            //     audio.currentTime = seekTime;
            // }

            // // next song
            // nextBtn.onclick = function() {
            //     if(_this.isRandom) {
            //         _this.randomSong()
            //     }
            //     else {
            //         _this.nextSong();
                    
            //     }
            //     audio.play();
            //     _this.scrollToActiveSong()
            // }

            // // prev song
            // prevBtn.onclick = function() {
            //     if(_this.isRandom) {
            //         _this.randomSong()
            //     }
            //     else {
            //         _this.prevSong();
            //     }
            //     audio.play();
            //     _this.scrollToActiveSong()
            // }

            // // Bật tắt random song
            // randomBtn.onclick = function () {
            //     _this.isRandom = !_this.isRandom;
            //     randomBtn.classList.toggle('active',_this.isRandom);
            // }

            // // Bật tắt repeat song
            // repeatBtn.onclick = function() {
            //     _this.isRepeat = !_this.isRepeat;
            //     repeatBtn.classList.toggle('active', _this.isRepeat);
            // }

            // Xử lý next song khi audio ended
            audio.onended = function() {
                if(_this.isRepeat) {
                    audio.play();
                } else {
                    nextBtn.click();
                }
            }

            // // Lắng nghe hành vi click vào playlist
            // playlist.onclick = function(e) {
            //     const songNode = e.target.closest('.song:not(.active)');
            //     if (!e.target.closest('.option')) {
            //       if (songNode) {
            //         _this.currentIndex = Number(songNode.dataset.index);
            //         _this.loadCurrentSong();
            //         audio.play();
            //       }
            //     }
            // }
        }

         //Khi nhạc đang được play
         audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing')
            cdThumbAnimate.play();
        }

        //Khi nhạc đang pause
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing') 
            cdThumbAnimate.pause();
        }

        // Tiến độ bài hát
        audio.ontimeupdate = function() {
            if(audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;
            }
        }

        // Tua 
        progress.oninput = function(e) {
            const seekTime = Math.floor((e.target.value * audio.duration)/100);
            audio.currentTime = seekTime;
        }
        
        // next song
        nextBtn.onclick = function() {
            if(_this.isRandom) {
                _this.randomSong()
            }
            else {
                _this.nextSong();
                
            }
            audio.play();
            _this.scrollToActiveSong()
        }

        // prev song
        prevBtn.onclick = function() {
            if(_this.isRandom) {
                _this.randomSong()
            }
            else {
                _this.prevSong();
            }
            audio.play();
            _this.scrollToActiveSong()
        }

        // Bật tắt random song
        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom;
            randomBtn.classList.toggle('active',_this.isRandom);
        }

        // Bật tắt repeat song
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat;
            repeatBtn.classList.toggle('active', _this.isRepeat);
        }

        // Lắng nghe hành vi click vào playlist
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)');
            if (!e.target.closest('.option')) {
              if (songNode) {
                _this.currentIndex = Number(songNode.dataset.index);
                _this.loadCurrentSong();
                audio.play();
              }
            }
        }
    },
    scrollToActiveSong: function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'end'
            })
        }, 100)
    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path;

        if ($('.song.active')) {
            $('.song.active').classList.remove('active');
          }
          const list = $$('.song');
          list.forEach((song, index) => {
            if (index == this.currentIndex) {
              song.classList.add('active');
            }
          });
    },
    nextSong: function() {
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function() {
        this.currentIndex--;
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    randomSong: function() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random()*this.songs.length);
        }
        while(newIndex === this.currentIndex)
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    start: function() {
        //Định nghĩa các thuộc tính cho Object 
        this.defineProperties();

        //Lắng nghe / xử lý các sự kiện(DOM events)
        this.handleEvents();   

        this.loadCurrentSong();

        //Render playlist
        this.render()
    },
}

app.start()
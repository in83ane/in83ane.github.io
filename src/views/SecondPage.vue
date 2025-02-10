<template>
    <div class="second-page">
      <audio autoplay loop ref="bgMusic">
        <source src="@/assets/background-music.mp3" type="audio/mpeg">
      </audio>
      
      <h2 class="letter-notice">เค้ามีจดหมายมาให้แหละ</h2> <!-- ข้อความด้านบน -->
      <div class="envelope-container">
        <div class="envelope" @click="openEnvelope">
          <div class="envelope-flap"></div>
          <div class="envelope-body"></div>
        </div>
      </div>
  
      <!-- Popup Envelope -->
      <div v-if="isEnvelopeOpen" class="popup-envelope">
        <div class="popup-envelope-body">
          <button class="close-button" @click="closeEnvelope">X</button>
  
          <div v-if="selectedPaperIndex === null">
            <h3>Select a letter</h3>
          </div>
          <div v-if="selectedPaperIndex !== null" class="paper-content">
            <p>{{ envelope.papers[selectedPaperIndex] }}</p>
          </div>
  
          <div class="paper-navigation">
            <button @click="changePaper('previous')" :disabled="selectedPaperIndex <= 0">&lt;</button>
            <button 
              @click="changePaper('next')" 
              :disabled="selectedPaperIndex >= envelope.papers.length - 1"
              :class="{ 'disabled-button': selectedPaperIndex >= envelope.papers.length - 1 }">
              &gt;
            </button>
          </div>
        </div>
      </div>
  
      <!-- ECG Animation -->
      <div class="ecg-container">
        <svg viewBox="0 0 200 20" class="ecg-line">
          <polyline :points="ecgPoints" stroke="white" fill="none" stroke-width="1" />
        </svg>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        envelope: {
          papers: [
            'เค้าภูมิใจในตัวเธอมากๆเลยนะพู่กัน มากกว่าที่พู่กันคิดแหละ แค่แบบบางทีเค้าอาจจะไม่ได้แสดงออกไป ขอโทษที่เค้าชอบทำให้เธอคิดมาก ขอโทษที่ไปดูแลเธอในวันที่เธอไม่สบายหรือในวันไหนที่เธอรู้สึกว่าโลกนี้ใจร้ายกับเธอไม่ได้นะ วันนี้เค้าอาจจะทำตัวไม่ดีหรือทำให้เธอเกลียดหรือว่าอะไร แต่ว่าเค้าไม่ได้ตั้งใจทำสิ่งไม่ดีกับเธอเลยนะ ถ้ามีโอกาสให้เค้าได้ปรับให้ เค้าได้เข้าใจเธอให้มากกว่านี้เค้าจะพยายามทำให้เราทั้งคู่มีความสุขมากๆเท่าที่คนคนนึงจะทำให้เธอได้นะ ที่เค้าชมเธอว่าน่ารักชมว่าเธอสวย คือเธอน่ารักจริงๆนะน่ารักในแบบที่ไม่มีใครเป็นได้เหมือนเธอ เค้าบอกได้เลยนะว่าเธอเป็นสิ่งมีชีวิตที่น่ารักมากๆๆๆๆ มากที่สุดในโลกเลยย เค้าให้แมวอยู่อันดับสองแล้ว แล้วเธอก็สวยแบบเป็นตัวของตัวเองเธอมอบรอยยิ้มให้เค้าได้ดีมากเธอรู้ไหม เค้าไม่เคยเจอใครแบบนี้มาก่อนเลยอ่ะจนเค้าได้เจอเธอนี่แหละ ยังไงเค้าก็ขอให้เธอมีความสุขมากๆล่ะ ยิ้มเยอะๆได้กินของอร่อยๆในทุกวันเลย และก็ขอให้เธอมีวันที่ดีในทุกๆวัน และก็ขอให้คนรอบตัวเธอไม่ทำร้ายเธออีกเลยนะ รักตัวเองให้มากๆล่ะคนเก่ง เค้าดีใจที่เค้าได้มารู้จักเธอนะครับ ตอนนี้เค้าก็ยังรู้สึกแบบนั้น ขอบคุณทุกอย่างที่ทำให้เราได้มาเจอกันนะครับ พู่กันรู้ไหมในสายตาของเค้าเธอเป็นคนที่เก่งมากๆเลยนะ ต่อให้จะมีใครมาว่าเธออะไรก็ตามเธอก็เก่งมากๆเสมอ เค้าภูมิใจในตัวเธอมากๆเลยนะครับ ขอให้เธอมีความสุขในทุกวันนะขอบคุณที่ยังอยู่กับเค้าจนถึงวันนี้ล่ะ',
            'เอาล่ะก็ ที่จริงเว็บนี้เค้าจะทำไว้ขอเธอเป็นแฟนนี่แหละสรุปกลายเป็นเว็บให้กำลังใจไปเลย ขอโทษนะครับ ขอโทษที่บางทีเค้ากดดันเธอเกินไปเค้าคิดว่าคงทำให้เธออึดอัดไปบ้างเค้าขอโทษนะครับ ที่เค้าทรีตแต่ละอย่างให้เธอที่คอยรายงานให้เธอเค้าไม่รู้มันทำให้เธอรำคาญไหม แต่สิ่งที่เค้าทำทุกอย่างเค้าไม่ได้ตั้งใจให้เธอต้องอึดอัดเลยนะ ยังไงเค้าก็ขอโทษด้วยนะเธอขอโทษที่เค้าอาจจะทรีตเธอมากไปอาจจะตอบเร็วบ่อย แต่เค้าอยากให้เวลาที่เค้าว่างช่วงนี้เค้าได้ทำให้เธอรู้สึกว่าเค้าจะไม่ไปไหนให้เธอเค้าขอโทษนะ เพราะหลังจากนี้เค้าจะไม่ค่อยว่างแล้วอ่ะ ขอโทษนะเธอ เค้าไม่รู้ว่าที่เธอหายไปเธอคิดมากหรือเกลียดเค้าไปแล้ว แต่เค้าอยากให้เธอให้โอกาสเค้าหน่อยได้ไหม เค้าอยากเป็นผู้ชายที่ทำให้เธอมีความสุข ถึงเค้าจะไม่ได้ดีมากมาย ถึงเค้าจะไม่ได้เก่งไม่ได้อะไร แต่แต่ละสิ่งที่เค้าทำให้เธอเค้าตั้งใจทำมากๆเลยนะ เหมือนเว็บนี้นี่แหละ เค้าสามารถปรับให้เธอได้หมดเลยนะเธอรู้ไหม หรือเธอต้องการให้เค้ารอเค้าสามารถรอได้',
            'สุดท้ายนี้ไม่ว่าเธอจะให้โอกาสเค้าไหม เค้าขอให้อย่าได้มีใครเข้ามาขโมยรอยยิ้มของพู่กันเลยนะ เธอเหมาะกับรอยยิ้มที่สุดแล้ว ขอบคุณที่เติบโตมาได้ดีขนาดนี้นะครับ',
          ],
          readStatus: [false, false, false],
        },
        isEnvelopeOpen: false,
        selectedPaperIndex: null,
        ecgPoints: "0,10 20,10 30,5 40,15 50,10 70,10 80,5 90,15 100,10 200,10", // ค่าเริ่มต้น
        audioContext: null,
        analyser: null,
        dataArray: null
      };
    },
    mounted() {
      this.fadeIn();
      this.setupAudioAnalyzer();
    },
    methods: {
      fadeIn() {
        const secondPage = document.querySelector('.second-page');
        secondPage.classList.add('fade-in');
      },
      openEnvelope() {
        this.isEnvelopeOpen = true;
        this.selectedPaperIndex = 0;
      },
      changePaper(direction) {
        if (direction === 'next' && this.selectedPaperIndex < this.envelope.papers.length - 1) {
          this.selectedPaperIndex++;
        } else if (direction === 'previous' && this.selectedPaperIndex > 0) {
          this.selectedPaperIndex--;
        } else if (direction === 'next') {
          this.closeEnvelope();
        }
        this.envelope.readStatus[this.selectedPaperIndex] = true;
      },
      closeEnvelope() {
        this.isEnvelopeOpen = false;
        this.selectedPaperIndex = null;
      },
      setupAudioAnalyzer() {
        const audio = this.$refs.bgMusic;
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = this.audioContext.createMediaElementSource(audio);
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 32; // FFT ขนาดเล็กเพราะไม่ต้องการรายละเอียดมาก
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
  
        source.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);
  
        this.updateECG(); // เริ่มอัปเดต ECG
      },
      updateECG() {
    requestAnimationFrame(this.updateECG);
  
    this.analyser.getByteFrequencyData(this.dataArray);
    let avgVolume = this.dataArray.reduce((a, b) => a + b, 0) / this.dataArray.length;
  
    // ปรับความสูงการสั่นสะเทือนตามค่าเฉลี่ยของเสียง
    const baseHeight = 10; // จุดกลางเส้น ECG
    const amplitude = avgVolume / 20; // ปรับขนาดการสั่น
  
    // สร้างค่าการเคลื่อนไหวที่เปลี่ยนแปลงตลอดเวลา
    let wavePoints = [];
    let time = Date.now() / 100; // ใช้เวลาจริงในการเปลี่ยนแปลงคลื่น
  
    // สร้างคลื่น ECG ที่เคลื่อนไหวไปเรื่อยๆ
    
    for (let i = 0; i < 200; i += 10) {
      let y = baseHeight + Math.sin(i / 10 + time) * amplitude; // คำนวณค่าคลื่นตามฟังก์ชัน sinusoidal
      wavePoints.push(`${i},${y}`);
    }
  
    this.ecgPoints = wavePoints.join(' '); // เปลี่ยนการวาดเป็นจุดๆ และแสดงผล
  }
  
  
      
    }
  };
  </script>
  
  <style scoped>
  .second-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #fcb4bc;
    opacity: 0;
    animation: fadeInPage 2s forwards;
    position: relative;
  }
  .envelope-container {
    display: flex;
    justify-content: center;
  }
  
  .envelope {
    width: 270px;
    height: 160px;
    background-image: url('@/assets/envelope.png');
    background-size: cover;
    cursor: pointer;
    transition: transform 0.3s;
    border-radius: 10px;
  }
  
  .envelope:hover {
    transform: scale(1.1);
  }
  
  .popup-envelope {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .popup-envelope-body {
    background-color: white;
    width: 700px;
    height: 400px;
    border-radius: 15px;
    padding: 20px;
    position: relative;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  }
  
  .letter-notice {
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .ecg-container {
    position: absolute;
    bottom: 10px;
    left: 0;
    width: 100%;
    height: 50px;
    overflow: hidden;
  }
  
  .ecg-line {
    width: 100%;
    height: 100%;
    animation: moveECG linear infinite;
  }
  
  @keyframes moveECG {
    from {
      transform: translateX(0%);
    }
    to {
      transform: translateX(-50%);
    }
  }
  
  .close-button {
    position: absolute;
    top: 5px;
    right: -5px;
    background-color: #a2a2a2;
    color: white;
    font-size: 10px;
    border: none;
    padding: 5px 7px;
    cursor: pointer;
    border-radius: 50%;
  }
  
  .close-button:hover {
    background-color: #fc7d7d;
  }
  
  .paper-navigation {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
  }
  
  button {
    font-size: 20px;
    padding: 5px 10px;
    cursor: pointer;
    margin: 0 10px;
    border: none;
    background-color: #d1a15d;
    color: white;
    border-radius: 5px;
  }
  
  button:disabled {
    background-color: #ccc;
  }
  
  button:hover {
    background-color: #b17b43;
  }
  
  .disabled-button {
    background-color: #ccc !important;
  }
  
  @keyframes fadeInPage {
    to {
      opacity: 1;
    }
  }
  </style>
  
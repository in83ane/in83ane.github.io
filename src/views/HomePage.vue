<template>
    <div id="app">
      <h5 class="valentine-text-date">14 FEB 2025</h5>
      <h1 class="valentine-text">HAPPY</h1>
      <h1 class="valentine-text-bold" ref="valentineText">VALENTINE'S</h1>
      <h1 class="valentine-text">DAY</h1>
      <div class="scroll-text" ref="scrollText" @click="goToNextPage">Click to Continue</div>
    </div>
  </template>
  
  <script>
  export default {
    name: "HomePage",
    mounted() {
      this.updateScrollTextPosition();
      window.addEventListener("resize", this.updateScrollTextPosition);
    },
    beforeUnmount() {
      window.removeEventListener("resize", this.updateScrollTextPosition);
    },
    methods: {
      updateScrollTextPosition() {
        const scrollText = this.$refs.scrollText;
        if (scrollText) {
          const centerPosition = window.innerWidth / 2;
          const scrollRect = scrollText.getBoundingClientRect();
          const scrollCenterOffset = scrollRect.width / 2;
          scrollText.style.left = `${centerPosition - scrollCenterOffset}px`;
          scrollText.style.bottom = '5%';
        }
      },
      goToNextPage() {
        this.$router.push({ name: 'second' });
      }
    }
  };
  </script>
  
  <style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    background-color: #fcb4bc; /* ตั้งค่าสีพื้นหลัง */
  }
  
  #app {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: white; /* กำหนดสีข้อความเป็นสีขาว */
    animation: fadeInPage 2s forwards; /* เพิ่ม animation ในการให้ข้อความ fade-in */
  }
  
  .valentine-text{
    font-family:  sans-serif;
    font-weight: 1;
    font-size: 70px;
    letter-spacing: px;
    text-align: center;
    color: white; /* สีขาว */
    opacity: 0; /* เริ่มต้นที่ไม่เห็น */
    animation: fadeInText 2s forwards; /* เพิ่ม animation */
  }
  .valentine-text-date{
    font-family:  sans-serif;
    font-weight: 1;
    font-size: 20px;
    letter-spacing: px;
    text-align: center;
    color: white; /* สีขาว */
    opacity: 0; /* เริ่มต้นที่ไม่เห็น */
    animation: fadeInText 2s forwards;
  }
  .valentine-text-bold {
    font-weight: 800;
    font-size: 120px;
    letter-spacing: 2px;
    opacity: 0;
    animation: fadeInText 2s forwards;
  }
  
  .scroll-text {
    position: absolute;
    text-align: center;
    font-size: 20px;
    animation: scrollUpDown 1s infinite;
    cursor: pointer; /* เพิ่ม cursor ให้เหมือนปุ่ม */
    color: white; /* สีขาว */
  }
  
  .scroll-text::after {
    content: ">";
    font-size: 20px;
    display: block;
    transform: rotate(90deg);
    animation: scrollArrow 5s infinite;
  }
  
  @keyframes fadeInPage {
    to {
      opacity: 1;
    }
  }
  
  @keyframes fadeInText {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
  
  @keyframes scrollUpDown {
    0% {
      transform: translateY(30px);
    }
    50% {
      transform: translateY(20px);
    }
    100% {
      transform: translateY(30px);
    }
  }
  </style>
  
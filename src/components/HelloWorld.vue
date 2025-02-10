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

h1 {
  text-align: center;
  margin: 0;
  padding: 0;
  opacity: 0;
  animation: fadeInUp 2s forwards;
  font-size: 80px;
}

h5 {
  text-align: center;
  margin: 0;
  padding: 0;
  opacity: 0;
  animation: fadeInUp 2s forwards;
  font-size: 18px; /* ขนาดเล็กลง */
}

.valentine-text {
  font-weight: 300;
  font-size: 80px;
  letter-spacing: -10px;
}

.valentine-text-bold {
  font-weight: 700;
  font-size: 120px;
  letter-spacing: -5px;
  display: flex;
  justify-content: center;
}

.scroll-text {
  position: absolute;
  text-align: center;
  font-size: 20px;
  animation: scrollUpDown 1s infinite;
  cursor: pointer; /* เพิ่ม cursor ให้เหมือนปุ่ม */
}

.scroll-text::after {
  content: ">";
  font-size: 20px;
  display: block;
  transform: rotate(90deg);
  animation: scrollArrow 5s infinite;
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

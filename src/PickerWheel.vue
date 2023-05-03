<script>
import { ref, computed, onMounted, watchEffect } from 'vue'

export default {
  props: {
    cell: Array,
    colors: Array
  },
  setup(props) {


    watchEffect(() => createRoulette() )

    let buttonDisabled = ref(false)
    let result = ref('')
    let resultClassName = ref('')
    let searchOptions = ref(['おすすめ', '安い', 'テイクアウト', '個室', '近く', 'ランチ'])
    let searchOptionsEnglish = ['recommended', 'cheap', 'takeout', 'private room', 'nearby', 'lunch']
    let searchArea = ref('')

    var isEnglish = computed(() => window.location.pathname.indexOf('/en/') == -1 ? false : true )

    onMounted(() => {
      createRoulette()

      if (isEnglish.value) {
        searchOptions.value = searchOptionsEnglish
      }
    })
    
    function run() {
      // パラメータを初期化
      result.value = ''
      resultClassName.value = ''
      // ボタンを非活性
      buttonDisabled.value = true

      const resultNumber = Math.floor(Math.random() * 9) + 1


      // ルーレット回転開始
      setTimeout(() => {
         resultClassName.value = 'number-' + resultNumber
      }, 500)
      
      // すぐに結果が表示されないように調整
      setTimeout(() => {
        result.value = resultNumber
        buttonDisabled.value = false
      }, 2500)

      // 検索エリア
      setTimeout(() => {
        searchArea.value = props.cell[result.value - 1]
      }, 3000)

      // Google TagManager
      dataLayer.push({ event: 'use-webapp' })
    }

    function createRoulette() {

      var width = 308

      // ピースの幅
      var piWidth = 100

      // 画面の幅が308より小さかったらルーレットのサイズを調整する
      if (document.body.offsetWidth < (308 + 84)) {
        width = document.body.offsetWidth - 84
      }

      var sheets = document.styleSheets
      // 一番最後のルールを取得
      var sheet = sheets[sheets.length - 1]

      sheet.insertRule(`#roulette-restaurant___app---roulette {
                          margin: auto;
                          margin-bottom: 20px;
                          position: relative;
                          animation-timing-function: cubic-bezier(0, 0.4, 0.4, 1.04);
                          animation-duration: 1.8s;
                          animation-fill-mode: forwards;
                          animation-iteration-count: 1;
                          width: ${width}px;
                          height: ${width}px;
                          border-radius: 50%;
                          overflow: hidden;
                          counter-reset: number;
                        }`, sheet.cssRules.length)

      sheet.insertRule(`#roulette-restaurant___app---roulette::after {
                          content: "";
                          display: block;
                          width: ${width / 7}px;
                          height: ${width / 7}px;
                          background-color: #fff;
                          border-radius: 50%;
                          margin: auto;
                          top: 0;
                          right: 0;
                          bottom: 0;
                          left: 0;
                          position: absolute;
                        }`, sheet.cssRules.length)

      sheet.insertRule(`#roulette-restaurant___app---roulette li {
                          top: 0;
                          right: 0;
                          left: 0;
                          margin: auto;
                          position: absolute;
                          display: block;
                          width: ${piWidth}px;
                          height: ${width / 2}px;
                          transform-origin: ${piWidth / 2}px ${width / 2}px;
                        }`, sheet.cssRules.length)

      sheet.insertRule(`#roulette-restaurant___app---roulette li::before {
                          top: 0;
                          left: 0;
                          position: absolute;
                          display: inline-block;
                          content: '';
                          width: 0;
                          height: 0;
                          border-style: solid;
                          border-width: ${width / 2}px ${piWidth / 2}px;
                          z-index: 0;
                        }`, sheet.cssRules.length)

      
      for (let step = 1; step <= 10; step++) {
        var contentNo = step - 1

        // ルーレットの文字を入れる
        sheet.insertRule(`#roulette-restaurant___app---roulette li:nth-of-type(${step}):after {
                            content: "${props.cell[contentNo]}";
                            writing-mode: vertical-lr;
                          }`, sheet.cssRules.length)

        sheet.insertRule(`#roulette-restaurant___app---roulette li:nth-of-type(${step}):before {
                            border-color: ${props.colors[contentNo]} transparent transparent;
                          }`, sheet.cssRules.length)


        var degree = 360 / 10
        sheet.insertRule(`#roulette-restaurant___app---roulette li:nth-of-type(${step}) {
                            transform: rotate(${degree * step}deg);
                          }`, sheet.cssRules.length)
      }
    }

    return { result, resultClassName, isEnglish, run, buttonDisabled, searchOptions, searchArea }
  }
}
</script>

<template>
  <div class="roulette-restaurant__container">
    <div v-show="result" class="confetti">
      <span></span><span></span><span></span><span></span><span></span>
      <span></span><span></span><span></span><span></span><span></span>
      <span></span><span></span><span></span><span></span><span></span>
      <span></span><span></span><span></span><span></span><span></span>
      <span></span><span></span><span></span><span></span><span></span>
      <span></span><span></span><span></span><span></span><span></span>
      <span></span><span></span><span></span><span></span><span></span>
      <span></span><span></span><span></span><span></span><span></span>
      <span></span><span></span><span></span><span></span><span></span>
      <span></span><span></span><span></span><span></span><span></span>
    </div>

    <p class="text-center text-h4">👇</p>

    <ul id="roulette-restaurant___app---roulette" v-bind:class="[resultClassName]">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
  <div class="ma-4" style="height: 40px;">
    <div v-if="result">
      <p class="text-center text-h4">{{ cell[result - 1] }}</p>
    </div>
  </div>
  <div class="text-center">
    <v-btn
      :disabled="buttonDisabled"
      color="primary"
      size="x-large"
      class="text-h5 font-weight-bold"
      rounded
      elevation="0"
      @click="run()"
    >
      {{ isEnglish ? 'Start' : 'スタート' }}
    </v-btn>
  </div>
</template>

<style>
#roulette-restaurant___app---roulette li::after {
  counter-increment: number;
  content: counter(number);
  z-index: 5;
  position: absolute;
  display: block;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  top: 5px;
  left: 30px;
}
#roulette-restaurant___app---roulette li:nth-of-type(1) {
  transform: rotate(36deg);
}
#roulette-restaurant___app---roulette li:nth-of-type(2) {
  transform: rotate(72deg);
}
#roulette-restaurant___app---roulette li:nth-of-type(3) {
  transform: rotate(108deg);
}
#roulette-restaurant___app---roulette li:nth-of-type(4) {
  transform: rotate(144deg);
}
#roulette-restaurant___app---roulette li:nth-of-type(5) {
  transform: rotate(180deg);
}
#roulette-restaurant___app---roulette li:nth-of-type(6) {
  transform: rotate(216deg);
}
#roulette-restaurant___app---roulette li:nth-of-type(7) {
  transform: rotate(252deg);
}
#roulette-restaurant___app---roulette li:nth-of-type(8) {
  transform: rotate(288deg);
}
#roulette-restaurant___app---roulette li:nth-of-type(9) {
  transform: rotate(324deg);
}
#roulette-restaurant___app---roulette li:nth-of-type(10) {
  transform: rotate(360deg);
}

#roulette-restaurant___app---roulette.number-1 {
  -webkit-animation-name: 'number-1';
}
#roulette-restaurant___app---roulette.number-2 {
  -webkit-animation-name: 'number-2';
}
#roulette-restaurant___app---roulette.number-3 {
  -webkit-animation-name: 'number-3';
}
#roulette-restaurant___app---roulette.number-4 {
  -webkit-animation-name: 'number-4';
}
#roulette-restaurant___app---roulette.number-5 {
  -webkit-animation-name: 'number-5';
}
#roulette-restaurant___app---roulette.number-6 {
  -webkit-animation-name: 'number-6';
}
#roulette-restaurant___app---roulette.number-7 {
  -webkit-animation-name: 'number-7';
}
#roulette-restaurant___app---roulette.number-8 {
  -webkit-animation-name: 'number-8';
}
#roulette-restaurant___app---roulette.number-9 {
  -webkit-animation-name: 'number-9';
}
#roulette-restaurant___app---roulette.number-10 {
  -webkit-animation-name: 'number-10';
}

@-webkit-keyframes number-1 {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(3204deg);
  }
}
@keyframes number-1 {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(3204deg);
  }
}
@-webkit-keyframes number-2 {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(3168deg);
  }
}
@keyframes number-2 {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(3168deg);
  }
}
@-webkit-keyframes number-3 {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(3132deg);
  }
}
@keyframes number-3 {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(3132deg);
  }
}
@-webkit-keyframes number-4 {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(3096deg);
  }
}
@keyframes number-4 {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(3096deg);
  }
}
@-webkit-keyframes number-5 {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(3060deg);
  }
}
@keyframes number-5 {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(3060deg);
  }
}
@-webkit-keyframes number-6 {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(3024deg);
  }
}
@keyframes number-6 {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(3024deg);
  }
}
@-webkit-keyframes number-7 {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(2988deg);
  }
}
@keyframes number-7 {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(2988deg);
  }
}
@-webkit-keyframes number-8 {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(2952deg);
  }
}
@keyframes number-8 {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(2952deg);
  }
}
@-webkit-keyframes number-9 {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(2916deg);
  }
}
@keyframes number-9 {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(2916deg);
  }
}
@-webkit-keyframes number-10 {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(2880deg);
  }
}
@keyframes number-10 {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(2880deg);
  }
}

/* 紙吹雪 */

/* positionを上にずらした初期の紙吹雪を overflow: hidden で隠す */
.roulette-restaurant__container {
  position: relative;
  overflow: hidden;
}

.confetti {
  position: absolute;
  width: 100%;
  height: 100%;
}

.confetti span {
  position: absolute;
  top: -10%;
  left: 0;
  width: 1.5vw;
  height: 1.5vw;
  background: #FFF;
}

.confetti span:nth-child(2n+1) {
  animation: confetti-anim-1 10s 0s linear infinite;
}

.confetti span:nth-child(2n+2) {
  animation: confetti-anim-1 10s 0s linear infinite;
}

.confetti span:nth-child(1) {
  left: 0%;
}
.confetti span:nth-child(2) {
  left: 2%;
}
.confetti span:nth-child(3) {
  left: 4%;
}
.confetti span:nth-child(4) {
  left: 6%;
}
.confetti span:nth-child(5) {
  left: 8%;
}
.confetti span:nth-child(6) {
  left: 10%;
}
.confetti span:nth-child(7) {
  left: 12%;
}
.confetti span:nth-child(8) {
  left: 14%;
}
.confetti span:nth-child(9) {
  left: 16%;
}
.confetti span:nth-child(10) {
  left: 18%;
}
.confetti span:nth-child(11) {
  left: 20%;
}
.confetti span:nth-child(12) {
  left: 22%;
}
.confetti span:nth-child(13) {
  left: 24%;
}
.confetti span:nth-child(14) {
  left: 26%;
}
.confetti span:nth-child(15) {
  left: 28%;
}
.confetti span:nth-child(16) {
  left: 30%;
}
.confetti span:nth-child(17) {
  left: 32%;
}
.confetti span:nth-child(18) {
  left: 34%;
}
.confetti span:nth-child(19) {
  left: 36%;
}
.confetti span:nth-child(20) {
  left: 38%;
}
.confetti span:nth-child(21) {
  left: 40%;
}
.confetti span:nth-child(22) {
  left: 42%;
}
.confetti span:nth-child(23) {
  left: 44%;
}
.confetti span:nth-child(24) {
  left: 46%;
}
.confetti span:nth-child(25) {
  left: 48%;
}
.confetti span:nth-child(26) {
  left: 50%;
}
.confetti span:nth-child(27) {
  left: 52%;
}
.confetti span:nth-child(28) {
  left: 54%;
}
.confetti span:nth-child(29) {
  left: 56%;
}
.confetti span:nth-child(30) {
  left: 58%;
}
.confetti span:nth-child(31) {
  left: 60%;
}
.confetti span:nth-child(32) {
  left: 62%;
}
.confetti span:nth-child(33) {
  left: 64%;
}
.confetti span:nth-child(34) {
  left: 66%;
}
.confetti span:nth-child(35) {
  left: 68%;
}
.confetti span:nth-child(36) {
  left: 70%;
}
.confetti span:nth-child(37) {
  left: 72%;
}
.confetti span:nth-child(38) {
  left: 74%;
}
.confetti span:nth-child(39) {
  left: 76%;
}
.confetti span:nth-child(40) {
  left: 78%;
}
.confetti span:nth-child(41) {
  left: 80%;
}
.confetti span:nth-child(42) {
  left: 82%;
}
.confetti span:nth-child(43) {
  left: 84%;
}
.confetti span:nth-child(44) {
  left: 86%;
}
.confetti span:nth-child(45) {
  left: 88%;
}
.confetti span:nth-child(46) {
  left: 90%;
}
.confetti span:nth-child(47) {
  left: 92%;
}
.confetti span:nth-child(48) {
  left: 94%;
}
.confetti span:nth-child(49) {
  left: 96%;
}
.confetti span:nth-child(50) {
  left: 98%;
}

.confetti span:nth-child(5n+1) {
  background: red;
}
.confetti span:nth-child(5n+2) {
  background: blue;
}
.confetti span:nth-child(5n+3) {
  background: green;
}
.confetti span:nth-child(5n+4) {
  background: pink;
}
.confetti span:nth-child(5n+5) {
  background: yellow;
}

.confetti span:nth-child(4n+1) {
  animation-duration: 5s;
}
.confetti span:nth-child(4n+2) {
  animation-duration: 12s;
}
.confetti span:nth-child(4n+3) {
  animation-duration: 8s;
}
.confetti span:nth-child(4n+4) {
  animation-duration: 6s;
}

.confetti span:nth-child(11n+1) {
  animation-delay: 0s;
}
.confetti span:nth-child(11n+2) {
  animation-delay: 9s;
}
.confetti span:nth-child(11n+3) {
  animation-delay: 2s;
}
.confetti span:nth-child(11n+4) {
  animation-delay: 5s;
}
.confetti span:nth-child(11n+5) {
  animation-delay: 6s;
}
.confetti span:nth-child(11n+6) {
  animation-delay: 7s;
}
.confetti span:nth-child(11n+7) {
  animation-delay: 3s;
}
.confetti span:nth-child(11n+8) {
  animation-delay: 1s;
}
.confetti span:nth-child(11n+9) {
  animation-delay: 2s;
}
.confetti span:nth-child(11n+10) {
  animation-delay: 11s;
}
.confetti span:nth-child(11n+11) {
  animation-delay: 10s;
}

@keyframes confetti-anim-1 {
  0% {
    top: -10%;
    transform: translateX(0) rotateX(0) rotateY(0);
  }
  100% {
    top: 100%;
    transform: translateX(20vw) rotateX(180deg) rotateY(360deg);
  }
}
@keyframes confetti-anim-1 {
  0% {
    top: -10%;
    transform: translateX(0) rotateX(0) rotateY(0);
  }
  100% {
    top: 100%;
    transform: translateX(-20vw) rotateX(180deg) rotateY(360deg);
  }
}
</style>
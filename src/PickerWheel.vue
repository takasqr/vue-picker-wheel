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

    // この関数は、配列を引数として受け取り、要素数が4以下の場合、
    // 配列に空の要素を追加して、要素数が4になるようにします。
    function padArrayToFour(arr) {
      if (Array.isArray(arr) && arr.length < 4) {
        const padCount = 4 - arr.length;
        for (let i = 0; i < padCount; i++) {
          arr.push("");
        }
      }
      return arr;
    }

    // この関数は、配列を引数として受け取り、要素数が10以上の場合、
    // 配列から要素を削除して要素数が10になるようにします。
    function trimArrayToTen(arr) {
      if (Array.isArray(arr) && arr.length >= 10) {
        arr.length = 10;
      }
      return arr;
    }
    
    function run() {
      // パラメータを初期化
      result.value = ''
      resultClassName.value = ''
      // ボタンを非活性
      buttonDisabled.value = true

      // 要素数の調整
      var cell = padArrayToFour(props.cell)
      cell = trimArrayToTen(cell)

      const resultNumber = Math.floor(Math.random() * (cell.length - 1)) + 1


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
        searchArea.value = cell[result.value - 1]
      }, 3000)

      // Google TagManager
      dataLayer.push({ event: 'use-webapp' })
    }

    function getPiWidth(piCount) {
      if (piCount === 1) {
        return 100
      } else if (piCount === 2) {
        return 100
      } else if (piCount === 3) {
        return 100
      } else if (piCount === 4) {
        return 308
      } else if (piCount === 5) {
        return 224
      } else if (piCount === 6) {
        return 179
      } else if (piCount === 7) {
        return 150
      } else if (piCount === 8) {
        return 128
      } else if (piCount === 9) {
        return 112
      } else if (piCount === 10) {
        return 100
      } else {
        return 100
      }

    }
    function createRoulette() {
      // 要素数の調整
      var cell = padArrayToFour(props.cell)
      cell = trimArrayToTen(cell)

      var width = 308

      // ピースの幅
      var piWidth = getPiWidth(cell.length)

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

      // ルーレットの文字を表示する
      sheet.insertRule(`#roulette-restaurant___app---roulette li::after {
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
                          left: ${(piWidth - 40) / 2}px;
                        }`, sheet.cssRules.length)

      
      for (let step = 1; step <= cell.length; step++) {
        var contentNo = step - 1

        // ルーレットの文字を入れる
        sheet.insertRule(`#roulette-restaurant___app---roulette li:nth-of-type(${step}):after {
                            content: "${cell[contentNo]}";
                            writing-mode: vertical-lr;
                          }`, sheet.cssRules.length)

        sheet.insertRule(`#roulette-restaurant___app---roulette li:nth-of-type(${step}):before {
                            border-color: ${props.colors[contentNo]} transparent transparent;
                          }`, sheet.cssRules.length)


        var degree = 360 / cell.length

        sheet.insertRule(`#roulette-restaurant___app---roulette li:nth-of-type(${step}) {
                            transform: rotate(${degree * step}deg);
                          }`, sheet.cssRules.length)

        // ルーレットの動き
        sheet.insertRule(`#roulette-restaurant___app---roulette li:nth-of-type(${step}) {
                            transform: rotate(${degree * step}deg);
                          }`, sheet.cssRules.length)

        sheet.insertRule(`#roulette-restaurant___app---roulette.number-${step} {
                            -webkit-animation-name: 'number-${step}';
                          }`, sheet.cssRules.length)

        sheet.insertRule(`@-webkit-keyframes number-${step} {
                            from {
                              transform: rotate(0);
                            }
                            to {
                              transform: rotate(${3240 - (degree * step)}deg);
                            }
                          }`, sheet.cssRules.length)

        sheet.insertRule(`@keyframes number-${step} {
                            from {
                              transform: rotate(0);
                            }
                            to {
                              transform: rotate(${3240 - (degree * step)}deg);
                            }
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
      <li v-for="value in cell"></li>
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
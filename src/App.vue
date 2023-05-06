<script>
import { ref, computed, onMounted } from 'vue'
import PickerWheel from './PickerWheel.vue'

export default {
  components: {
    PickerWheel
  },
  setup() {
    onMounted(() => {
      // 英語ページだったらデータを入れ替える
      if (isEnglish.value) {
      }

      // 初期データをルーレットに反映
      for (let i = 0; i < 10; i++) {
        textAreaValue.value += restaurants.value[i]

        if (i < 9) {
          textAreaValue.value += '\n'
        }
      }
    })

    let colors = ['#E53935', '#D81B60', '#8E24AA', '#5E35B1', '#3949AB', '#1E88E5', '#039BE5', '#00ACC1', '#00897B', '#43A047', '#7CB342', '#C0CA33', '#FDD835', '#FFB300', '#FB8C00', '#F4511E']
    let restaurants = ref(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])

    let textAreaValue = ref('')
    const isEnglish = computed(() => window.location.pathname.indexOf('/en/') == -1 ? false : true )

    function inputEvent(e) {
      // 入力内容をテキストエリアに再反映
      textAreaValue.value = e.target.value
      
      const inputArray = e.target.value.split('\n')

      // 入力内容をルーレットに反映
      restaurants.value = []
      for (let i = 0; i < inputArray.length; i++) {
        restaurants.value[i] = inputArray[i] ? inputArray[i] : ''
      }
    }

    return { restaurants, colors, inputEvent, textAreaValue }
  }
}
</script>

<template>
  <PickerWheel :cell="restaurants" :colors="colors" />
  <div class="mt-6">
    <v-textarea
      rows="10"
      variant="outlined"
      @input="inputEvent"
      :value="textAreaValue"
    ></v-textarea>
  </div>
</template>

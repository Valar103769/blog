<template>
  <div>
    <input type="text" v-model="value" />
    <button @click="onClick">ok</button>

    <p v-if="show">
      玩偶, 巧克力, 玫瑰花 想法, 安排,行动 地位低, 再有想法,哪怕是对的, 也不能说
      越没本事,越会在情绪上计较;
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      show: false,
    };
  },
  methods: {
    onClick() {
      if (this.value === "shangyawen") {
        this.show = true;
      }
    },
  },
};
</script>

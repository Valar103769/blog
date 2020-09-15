<template>
  <div>
    <input type="text" v-model="value" />
    <button @click="onClick">ok</button>

    <p v-if="show">
      <b>戒急用忍</b>

      孟子曰：“吾善养吾浩然之气, 
      不要在情绪上计较, 只在做事上认真 玩偶, 巧克力,
      玫瑰花 想法, 安排,行动 地位低, 再有想法,哪怕是对的, 也不能说
      越没本事,越会在情绪上计较;
      用心判断合不合适, 
      前期一定要特别注意, 在心上用工
      关注爱好, 什么时候有时间点, 什么时候有空, 何时有空回复, 确认内容不反感,  
      如何让自己变成有想法? 多行动, 不行动就会积累情绪,多行少想,
      敢想敢做, 少一点固化思维,人活在观念之中

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

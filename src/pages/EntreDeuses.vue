<template>

    <div class="q-pa-md mt-28 flex flex-col items-center gap-20">
      <q-img src="~assets/logo.png" class="w-28 m-2" />
       <div class="flip-count-wrap">
          <div v-for="item in times" :key="item.label" :id="item.label" class="item">
            <!-- top -->
            <span class="top">
              <div class="content">{{ formatTime(item.current) }}</div>
            </span>
            <!-- bottom -->
            <span class="bottom">
              <div class="content">{{ formatTime(item.previous) }}</div>
            </span>

            <!-- flip current -->
            <span class="flip-bottom">
              <div class="content">{{ formatTime(item.current) }}</div>
            </span>
            <!-- filp previous -->
            <span class="flip-top">
              <div class="content">{{ formatTime(item.previous) }}</div>
            </span>

            <!-- <div class="line"></div> -->
            <!-- <div class="label">
              {{ item.label }}
            </div> -->
          </div>
        </div>
      <q-img src="~assets/logoed.png" class="w-full m-2" />
    </div>
  <q-img
      src="~/assets/bg-ed.png"
      class="absolute-full"
      style="z-index: -1"
      fit="cover"
    />
</template>

<script setup >
import { ref, computed, reactive, onBeforeMount, onUnmounted } from "vue";

// @note: config
const deadlineString = "2025-09-15T00:00:00";

const now = ref(Math.trunc(Date.now() / 1000));
const deadline = ref(Math.trunc(new Date(deadlineString).getTime() / 1000));
const duration = ref(0);

const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);

let timer;
onBeforeMount(() => {
  timer = setInterval(() => {
    const _now = Math.trunc(Date.now() / 1000);
    const _duration = Math.max(0, deadline.value - _now);

    days.value = Math.trunc(_duration / 60 / 60 / 24);
    hours.value = Math.trunc(_duration / 60 / 60) % 24;
    minutes.value = Math.trunc(_duration / 60) % 60;
    seconds.value = _duration % 60;

    if (_duration >= 0) {
      tickTimes();
    }
  }, 1000);
});
onUnmounted(() => timer && clearInterval(timer));

const formatTime = (val) => String(val).padStart(2, "0");
const times = reactive({
  days: { current: 0, previous: 0, label: "Dias" },
  hours: { current: 0, previous: 0, label: "Horas" },
  minutes: { current: 0, previous: 0, label: "min" },
  seconds: { current: 0, previous: 0, label: "seg" }
});

const tickTime = (type, val) => {
  if (!times[type] || val === times[type].current) return;

  const _time = times[type];
  const el = document.querySelector(`#${_time.label}`);
  if (el) {
    el.classList.remove("animate");
    console.log(el.clientWidth);
    el.classList.add("animate");
  }
  _time.previous = _time.current;
  _time.current = val;
};
const tickTimes = () => {
  tickTime("days", days.value);
  tickTime("hours", hours.value);
  tickTime("minutes", minutes.value);
  tickTime("seconds", seconds.value);
};
</script>

<style lang="scss" scoped>
.flip-count-wrap {
  // Mobile (default)
  --width: 60px;
  --height: 30px;
  --font: 32px;
  --radius: 6px;

  // Tablet
  @media (min-width: 768px) {
    --width: 75px;
    --height: 35px;
    --font: 40px;
    --radius: 7px;
  }

  // Desktop
  @media (min-width: 1024px) {
    --width: 88px;
    --height: 40px;
    --font: 48px;
    --radius: 8px;
  }

  // Large Desktop
  @media (min-width: 1440px) {
    --width: 100px;
    --height: 45px;
    --font: 54px;
    --radius: 10px;
  }

  display: flex;
  align-items: center;
  gap: 12px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;

  .item {
    padding-bottom: 0.5rem;
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: rgb(255, 255, 255);
    color: rgb(156, 81, 10);
    border: 3px solid rgb(156, 81, 10);

    .label {
      text-align: center;
      font-size: 14px;
      line-height: 20px;
      text-transform: capitalize;
    }

    .top,
    .bottom,
    .flip-bottom,
    .flip-top {
      width: var(--width);
      height: var(--height);
      font-size: var(--font);
      line-height: 1;
      text-align: center;
      overflow: hidden;
    }

    .top,
    .flip-top {
      border-top-left-radius: var(--radius);
      border-top-right-radius: var(--radius);

      .content {
        padding-top: calc(var(--height) - var(--font) / 2);
      }
    }
    .bottom,
    .flip-bottom {
      border-bottom-left-radius: var(--radius);
      border-bottom-right-radius: var(--radius);

      .content {
        margin-top: calc(var(--font) / 2 * -1);
      }
    }

    .flip-top,
    .flip-bottom {
      position: absolute;
      background-color: inherit;
    }
    .flip-top {
      top: 0;
    }
    .flip-bottom {
      top: var(--height);
    }
  }
  .animate {
    .flip-top {
      z-index: 1;
      transform-origin: center bottom;
      animation: flipTop 0.3s cubic-bezier(0.37, 0.01, 0.94, 0.35);
      animation-fill-mode: both;
    }
    .flip-bottom {
      transform-origin: center top;
      animation-fill-mode: both;
      animation: flipBottom 0.6s cubic-bezier(0.15, 0.45, 0.28, 1);
    }
  }
}

@keyframes flipTop {
  0% {
    transform: rotateX(0deg);
    z-index: 2;
  }
  0%,
  99% {
    opacity: 1;
  }
  100% {
    transform: rotateX(-90deg);
    opacity: 0;
  }
}
@keyframes flipBottom {
  0%,
  50% {
    z-index: -1;
    transform: rotateX(90deg);
    opacity: 0;
  }
  51% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: rotateX(0deg);
    z-index: 5;
  }
}

// Ajuste do gap entre os números
.flip-clock {
  gap: 10px;
  
  @media (min-width: 768px) {
    gap: 15px;
  }
  
  @media (min-width: 1024px) {
    gap: 20px;
  }

  &__slot {
    font-size: 0.8rem;
    
    @media (min-width: 768px) {
      font-size: 0.9rem;
    }
    
    @media (min-width: 1024px) {
      font-size: 1rem;
    }
  }
}
</style>

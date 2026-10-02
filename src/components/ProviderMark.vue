<template>
  <!-- The official marks (Apple's guidelines require their own logo on a
    Sign in with Apple button), shared by every sign-in surface. -->
  <svg
    v-if="provider === 'apple'"
    class="provider-mark provider-mark--apple"
    :width="size"
    :height="size"
    :style="boxStyle"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      d="M16.365 1.43c0 1.14-.42 2.2-1.25 3.05-.99 1.02-2.09 1.61-3.28 1.52-.02-.13-.03-.27-.03-.41 0-1.09.46-2.26 1.28-3.08.41-.42.93-.77 1.56-1.05.63-.28 1.22-.43 1.78-.46.01.14.02.29.02.43zm4.335 15.7c-.32.74-.7 1.42-1.14 2.05-.6.86-1.09 1.45-1.47 1.78-.59.54-1.22.82-1.9.84-.49 0-1.07-.14-1.76-.42-.69-.28-1.32-.42-1.9-.42-.61 0-1.26.14-1.95.42-.69.28-1.25.43-1.67.45-.65.03-1.3-.26-1.94-.86-.41-.36-.92-.97-1.53-1.83-.65-.92-1.19-1.98-1.61-3.19-.45-1.31-.68-2.57-.68-3.79 0-1.4.3-2.6.91-3.61.48-.81 1.11-1.45 1.91-1.92.79-.47 1.65-.71 2.58-.73.52 0 1.19.16 2.03.48.84.32 1.38.48 1.61.48.18 0 .78-.19 1.8-.56.96-.35 1.77-.49 2.44-.44 1.8.15 3.16.86 4.06 2.15-1.61.98-2.41 2.35-2.4 4.11.01 1.37.51 2.51 1.49 3.41.44.42.94.75 1.49.98-.12.35-.25.68-.38 1z"
    ></path>
  </svg>

  <svg
    v-else-if="provider === 'google'"
    class="provider-mark provider-mark--google"
    :width="size"
    :height="size"
    :style="boxStyle"
    viewBox="0 0 18 18"
    aria-hidden="true"
  >
    <path
      fill="#4285F4"
      d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z"
    ></path>
    <path
      fill="#34A853"
      d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.344 0-4.3282-1.5831-5.036-3.7104H.9573v2.3318C2.4382 15.9832 5.4818 18 9 18z"
    ></path>
    <path
      fill="#FBBC05"
      d="M3.964 10.71c-.18-.54-.2823-1.1168-.2823-1.71s.1023-1.17.2823-1.71V4.9582H.9573A8.9965 8.9965 0 0 0 0 9c0 1.4523.3477 2.8268.9573 4.0418L3.964 10.71z"
    ></path>
    <path
      fill="#EA4335"
      d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.426 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.964 7.29C4.6718 5.1627 6.656 3.5795 9 3.5795z"
    ></path>
  </svg>

  <mail-icon
    v-else-if="provider === 'email'"
    class="provider-mark"
    :size="size"
    :style="boxStyle"
  ></mail-icon>
</template>

<script>
import { Mail } from '@lucide/vue';

export default {
  components: { MailIcon: Mail },
  props: {
    provider: { type: String, required: true },
    size: { type: [Number, String], default: 18 },
  },
  computed: {
    // Inline size: icon rules inside small kit buttons would otherwise win.
    boxStyle() {
      const size = typeof this.size === 'number' ? `${this.size}px` : this.size;
      return { width: size, height: size };
    },
  },
};
</script>

<style scoped>
.provider-mark {
  display: block;
  flex-shrink: 0;
}
/* Apple's glyph sits low in its artboard; lift it to centre on the label. */
.provider-mark--apple {
  transform: translateY(-1px);
}
</style>

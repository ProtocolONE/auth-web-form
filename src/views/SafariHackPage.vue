<script>
export default {
  name: 'SafariHackPage',
  mounted() {
    document.cookie = 'safari_cookie_fix=fixed; path=/';
    if (window.location.href.indexOf('verbose') > -1) {
      alert('safari fix has been applied');
      setTimeout(window.location.replace(document.referrer), 2000);
    } else {
      window.location.replace(document.referrer) // >> leave this line ONLY <<
    }
  },
};
</script>

<template>
<div class="app view-safari-hack-page">
</div>
</template>

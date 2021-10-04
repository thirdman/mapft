<template>
  
    <svg  
    :class="`${fillClass} ${size} ${classes}`" 
    style="width:30px;height:24px enable-background:new 0 0 24 24;" 
    viewBox="0 0 24 30"
     xml:space="preserve">    
    <path fill="currentColor" d="M22.498,1.345c-0.157-0.105-0.357-0.125-0.532-0.051l-6.572,2.738L8.823,1.294c-0.139-0.058-0.296-0.058-0.435,0  L1.598,4.123C1.387,4.211,1.25,4.416,1.25,4.645v17.539c0,0.189,0.094,0.366,0.252,0.471c0.094,0.063,0.204,0.095,0.314,0.095  c0.074,0,0.148-0.014,0.218-0.044l6.572-2.738l6.572,2.738c0.139,0.058,0.296,0.058,0.435,0l6.789-2.829  c0.211-0.088,0.348-0.294,0.348-0.522V1.816C22.75,1.627,22.656,1.45,22.498,1.345z M8.039,18.978l-5.658,2.357V5.022l5.658-2.357  V18.978z M14.829,21.336l-5.658-2.357V2.665l5.658,2.357V21.336z M21.618,18.978l-5.658,2.357V5.022l5.658-2.357V18.978z"/>
</svg>
</template>

<style>
.logo {
  stroke: transparent;
}
.logo g {
  fill: var(--ui-color, #eee);
}
.logo.light g {
  fill: var(--background-color, #eee);
}
.logo.dark g {
  fill: var(--ui-color, #111);
}
.logo.brand g {
  fill: var(--fill-color, #ccc);
}
.logo.small {
  width: 24px;
  height: 24px;
}
.logo.large {
  width: 32px;
  height: 32px;
}
.logo.hero {
  width: 120px;
  height: 120px;
}
</style>
<script>
export default {
  props: ['fillClass', 'size', 'classes'],
}
</script>

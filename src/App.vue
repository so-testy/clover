<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

* {
  box-sizing: border-box;
}

body {
  background: white;
  margin: 0;
}

a {
  text-decoration-line: underline;
  color: #7e84ff;
}

#app {
  font-size: 16px;
  font-family: Gilroy, Roboto, Arial, sans-serif;
  letter-spacing: 0.03em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
}

button {
  background: #4b6199;
  border-radius: 5px;
  border: none;
  font-family: Gilroy;
  font-weight: 500;
  padding: 7px 12px;
  font-size: 14px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  color: #ffffff;
  transition: all 0.23s ease-in-out;

  &:hover {
    background: #445581;
  }
}
</style>

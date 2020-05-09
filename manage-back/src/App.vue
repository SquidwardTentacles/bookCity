<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
body,
html,
#app {
  padding: 0;
  margin: 0;
  height: 100%;
}
.flexbox {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.flexbox.between {
  justify-content: space-between;
}
.flexbox.a-start {
  align-items: flex-start;
}
.flexbox.j-end {
  justify-content: flex-end;
}
.flexbox.j-start {
  justify-content: flex-start;
}
.flexbox.j-center {
  justify-content: center;
}
.flexbox.a-start {
  align-items: start;
}
.flexbox.a-center {
  align-items: center;
}
a {
  text-decoration: none;
}
p,
h1,
h2,
h3 {
  margin: 0;
  padding: 0;
}
input {
  border: none;
  outline: none;
}
li {
  margin-bottom: 0;
  list-style: none;
}
ul {
  padding: 0;
  margin: 0;
}
</style>

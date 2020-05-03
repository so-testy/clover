<template>
  <header>
    <div class="header-wrapper">
      <div class="logo"><img src="../assets/logo.svg" /></div>
      <div class="profile">
        <div class="name">Иванов Иван Иванович</div>
        <div class="avatar"></div>
      </div>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.1);

  .header-wrapper {
    max-width: 980px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
  }

  .logo {
    img {
      height: 30px;
      margin-top: 4px;
    }
  }

  .profile {
    display: flex;
    align-items: center;
    font-size: 16px;

    .name {
      margin-right: 15px;
    }

    .avatar {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.1) url(https://avatars.dicebear.com/v2/male/.svg);
    }
  }
}
</style>

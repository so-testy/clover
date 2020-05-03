<template>
  <div class="room">
    <main-header></main-header>
    <main>
      <div class="sidebar">
        <div class="active">
          <div class="title">Сдающий</div>
          <div class="list">
            <div class="list__item">Александ Пушкин</div>
            <div class="list__item">Александра Пушкина</div>
          </div>
        </div>
        <div class="ready">
          <div class="title">Готовы к сдаче</div>
          <div class="list">
            <div class="list__item">Александ Пушкин</div>
          </div>
        </div>
        <div class="queue">
          <div class="title">Очередь</div>
          <div class="list">
            <div class="list__item">Александ Пушкин</div>
          </div>
        </div>
        <div class="action">
          <div class="start">
            <button>Начать экзамен</button>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="video"></div>
        <div class="ticket">
          <div class="title">Билет сдающего</div>
          <div class="content"></div>
        </div>
      </div>
      <div class="chat">
        <div class="title">Общий чат</div>
        <div class="messages"></div>
        <div class="send">
          <input type="text" placeholder="Введите сообщение" />
          <button>></button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";

export default {
  name: "Room",
  components: {
    MainHeader
  },
  data() {
    return {
      isConnected: false,
      socketMessage: ""
    };
  },

  sockets: {
    connect: function() {
      console.log("socket connected");
    },
    customEmit: function(data) {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)'
      );
    }
  },
  methods: {
    clickButton: function(data) {
      // $socket is socket.io-client instance
      this.$socket.emit("emit_method", data);
    }
  }
};
</script>

<style lang="scss">
.room {
  header {
    height: 70px;
    width: 100%;
  }

  main {
    text-align: left;
    display: grid;
    grid-template-columns: 240px auto 240px;
    max-width: 960px;
    margin: 0px auto;

    .sidebar {
      position: relative;
      padding: 20px;

      .active,
      .ready,
      .queue {
        .title {
          font-size: 1.4em;
          font-weight: 600;
        }

        .list {
          margin-top: 20px;
          margin-bottom: 30px;

          .list__item {
            padding: 15px 5px;
            font-size: 1.1em;
            color: #4b6199;
          }
        }
      }

      .action {
        position: absolute;
        font-size: 1.1em;
        bottom: 40px;
      }
    }

    .main {
      .video {
        height: 340px;
        margin: 15px;
        background: #999;
        border-radius: 15px;
      }

      .ticket {
        .title {
          margin-left: 15px;
        }

        .content {
          height: 200px;
          margin: 15px;
          border: 1px solid #999;
          border-radius: 7px;
        }
      }
    }

    .chat {
      position: relative;
      background: #e5e5e5;
      margin: 15px 0px;
      border: 1px solid #999;
      border-radius: 10px;

      .title {
        position: absolute;
        top: 15px;
        left: 15px;
        font-size: 19px;
        font-weight: 600;
      }

      .send {
        position: absolute;
        bottom: 0px;

        input {
          border: 1px solid #999;
          border-radius: 0px 0px 0px 5px;
          width: 200px;
          height: 40px;
          padding: 5px 10px;
        }

        button {
          height: 39px;
          border-radius: 0px 0px 6px 0px;
          width: 38px;
        }
      }
    }
  }
}
</style>


<template>
  <div class="room">
    <header></header>
    <main>
        <div class="sidebar">
            <div class="active">
                <div class="title">
                    Сдающий
                </div>
                <div class="list">
                    <div class="list__item">
                        Александ Пушкин
                    </div>
                    <div class="list__item">
                        Александра Пушкина
                    </div>
                </div>
            </div>
            <div class="ready">
                <div class="title">
                    Готовы к сдаче
                </div>
                <div class="list">
                    <div class="list__item">
                        Александ Пушкин
                    </div>
                </div>            
            </div>
            <div class="queue">
                <div class="title">
                    Очередь
                </div>
                <div class="list">
                    <div class="list__item">
                        Александ Пушкин
                    </div>
                </div>            
            </div>
            <div class="action">
                <div class="start">
                    <button>
                        Начать экзамен
                    </button>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="video">
            </div>
            <div class="ticket">
            </div>
        </div>
        <div class="chat">
        </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "Room",

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
        grid-template-columns: 300px auto 300px;

        .sidebar {
            padding: 30px;

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
                        color: #4B6199;
                    }                    
                }
            }
        }

        .main {

        }

        .chat {

        }
    }
}
</style>


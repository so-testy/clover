<template>
  <div class="room">
    <main-header></main-header>
    <main
      :class="{
        videoMode: exam.studentId !== null && (exam.studentId === currUser.id || currUser.type === 'teacher'),
        workingMode: exam.queue && exam.queue.working.findIndex((u) => u.id === currUser.id) !== -1,
      }"
    >
      <div v-if="exam.started && exam.studentId === currUser.id && currUser.type === 'student'">
        <div class="video student"></div>

        <div class="questions">
          <div class="title">Билет №10 "12345678901234567890"</div>
          <div class="question">
            <div>Вопрос №1</div>
            Почему у мухи три слона?
          </div>
          <div class="question">
            <div>Вопрос №2</div>
            Почему у слона три мухи?
          </div>
        </div>
      </div>

      <div v-else-if="exam.started && exam.studentId !== null && currUser.type === 'teacher'">
        <div class="video teacher">
          <button @click="$socket.emit('examPassed', exam.studentId)">Подтвердить сдачу</button>
        </div>

        <div class="questions">
          <div class="title">Билет №10 "12345678901234567890"</div>
          <div class="question">
            <div>Вопрос №1</div>
            Почему у мухи три слона?
          </div>
          <div class="question">
            <div>Вопрос №2</div>
            Почему у слона три мухи?
          </div>
        </div>
      </div>

      <div v-else-if="exam.started && exam.queue.working.findIndex((u) => u.id === currUser.id) !== -1 && currUser.type === 'student'">
        <div class="questions">
          <div class="title">Билет №10 "12345678901234567890"</div>
          <div class="question">
            <div>Вопрос №1</div>
            Почему у мухи три слона?
          </div>
          <div class="question">
            <div>Вопрос №2</div>
            Почему у слона три мухи?
          </div>
        </div>

        ОСТАЛОСЬ 12 СЕКУНД

        <button @click="$socket.emit('userReady')">Я ГОТОВ</button>
      </div>
      <template v-else>
        <div class="sidebar">
          <div class="active">
            <div class="title">Готовы к сдаче</div>
            <div class="list" v-if="users.ready.length">
              <div class="list__item" v-for="user in users.ready" :key="user.id">
                {{ user.name }}
                <button v-if="currUser.type === 'teacher'" @click="$socket.emit('startStudentExam', { id: user.id })">Начать защиту</button>
              </div>
            </div>
            <div class="list" v-else>
              Пока тут никого нет
            </div>
          </div>
          <div class="ready">
            <div class="title">Готовятся</div>
            <div class="list" v-if="users.working.length">
              <div class="list__item" v-for="user in users.working" :key="user.id" @click="$socket.emit('userReady')">
                {{ user.name }}
              </div>
            </div>
            <div class="list" v-else>
              Пока тут никого нет
            </div>
          </div>
          <div class="queue">
            <div class="title">Очередь</div>
            <div class="list" v-if="users.waiting.length">
              <div class="list__item" v-for="user in users.waiting" :key="user.id">
                {{ user.name }}
              </div>
            </div>
            <div class="list" v-else>
              Пока тут никого нет
            </div>
          </div>
          <button v-if="currUser.type === 'teacher' && !exam.started" @click="$socket.emit('startExam')" style="width: 100%;">
            Начать экзамен
          </button>
        </div>
        <div class="chat">
          <div class="title">Общий чат</div>

          <Chat
            v-if="visible"
            :participants="participants"
            :myself="currUser"
            :messages="messages"
            :chat-title="chatTitle"
            :placeholder="placeholder"
            :colors="colors"
            :border-style="borderStyle"
            :submit-icon-size="submitIconSize"
            :async-mode="asyncMode"
            :scroll-bottom="scrollBottom"
            :display-header="false"
            :send-images="false"
            :profile-picture-config="profilePictureConfig"
            @onMessageSubmit="onMessageSubmit"
          />
        </div>
      </template>
    </main>
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader.vue';
import { Chat } from 'vue-quick-chat';
import 'vue-quick-chat/dist/vue-quick-chat.css';

export default {
  name: 'Room',
  components: {
    MainHeader,
    Chat,
  },
  props: {
    type: String,
  },
  data() {
    return {
      profilePictureConfig: {
        others: false,
        myself: false,
      },
      isConnected: false,
      socketMessage: '',
      visible: true,
      participants: [],
      chatTitle: 'ОБЩИЙ ЧАТ',
      placeholder: 'Отправьте сообщение',
      colors: {
        message: {
          myself: {
            bg: '#fff',
            text: '#777',
          },
          others: {
            bg: '#d4e7fa',
            text: '#777',
          },
          messagesDisplay: {
            bg: '#f7f3f3',
          },
        },
      },
      borderStyle: {
        topLeft: '10px',
        topRight: '10px',
        bottomLeft: '10px',
        bottomRight: '10px',
      },
      hideCloseButton: true,
      submitIconSize: 0,
      asyncMode: false,
      scrollBottom: {
        messageSent: true,
        messageReceived: false,
      },
      displayHeader: true,
      messages: [],
      users: {
        ready: [],
        working: [],
        waiting: [],
      },
      exam: {},
      participants: [],
      currUser: {},
    };
  },
  created() {
    this.sockets.listener.subscribe('userData', (user) => {
      this.currUser = user;
    });

    this.sockets.listener.subscribe('examData', (exam) => {
      this.exam = exam;
      this.users = exam.queue;
    });

    this.sockets.listener.subscribe('users', ({ users, participants }) => {
      this.users = users;
      this.participants = participants;
    });

    this.sockets.listener.subscribe('messages', (messages) => {
      this.messages = messages.map((message) => ({ ...message, myself: message.participantId === this.currUser.id }));
    });

    console.log(this.type);

    this.$socket.emit('createUser', { type: this.type });
  },
  methods: {
    onMessageSubmit: function(message) {
      if (/начать/imu.test(message.content)) this.$socket.emit('startExam');
      this.$socket.emit('message', message);
    },
  },
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
    grid-template-columns: 260px auto;
    max-width: 980px;
    margin: 0px auto;

    .sidebar {
      position: relative;
      padding: 20px;

      .active,
      .ready,
      .queue {
        .title {
          font-size: 1.2em;
          font-weight: 600;
        }

        .list {
          margin-top: 10px;
          margin-bottom: 30px;

          .list__item {
            padding: 6px 0;
            font-size: 1em;
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
      margin-top: 20px;
      width: 100%;
      height: 500px;
      padding-right: 20px;

      .title {
        font-size: 1.2em;
        font-weight: 600;
      }

      .container-message-display .myself-message-body .message-content,
      .container-message-display .other-message-body .message-content {
        width: 100%;
      }

      .quick-chat-container {
        margin-top: 16px;
        border-radius: 5px !important;

        .container-message-manager {
          border: 1px solid #e0e0e0;
          border-top: none;
          border-radius: 0 0 5px 5px;
        }
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

.video {
  margin: 20px auto;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: calc(100% - 60px);
  height: 400px;
  background: rgba(0, 0, 0, 0.6);
  position: relative;
  background-size: cover;
  background-position-y: 62%;

  &.teacher {
    background: url(../assets/student.png);
    background-size: cover;
    background-position-y: 62%;
  }

  &.student {
    background: url(../assets/teacher.png);
    background-size: cover;
    background-position-y: 62%;
  }

  button {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    background: #ccc;
    color: black;
  }
}

.questions {
  margin: 20px auto;
  border-radius: 10px;

  // padding: 20px;
  // border: 1px solid #fafafa;
  width: calc(100% - 60px);

  .title {
    font-weight: 600;
    font-size: 1.2em;
    margin-bottom: 14px;
  }

  .question {
    margin-bottom: 14px;
    div {
      font-weight: 600;
      margin-bottom: 10px;
    }
  }
}

.videoMode,
.workingMode {
  grid-template-columns: 1fr !important;
}
</style>

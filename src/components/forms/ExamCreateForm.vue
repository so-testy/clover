<template>
  <div>
    <modal name="hello-world" class="add-question" height="auto">
      <div class="form-field">
        <label>Название</label>
        <input type="text" v-model="modal.addq.title" />
      </div>
      <div class="form-field">
        <label>Вопросы</label>
        <textarea v-model="modal.addq.value" />
      </div>
      <div class="form-field">
        <button @click="addQuestion()">Сохранить</button>
      </div>
    </modal>
    <div class="tabs">
      <div :class="{ tab: 'tab', active: activeTab === 'general' }" @click="activeTab = 'general'">Основное</div>
      <div :class="{ tab: 'tab', active: activeTab === 'questions' }" @click="activeTab = 'questions'">Билеты</div>
      <div :class="{ tab: 'tab', active: activeTab === 'members' }" @click="activeTab = 'members'">Участники</div>
    </div>

    <div class="general-settings" v-show="activeTab === 'general'">
      <div class="form-fields">
        <div class="form-field">
          <label>Название</label>
          <input type="text" />
        </div>
        <div class="form-field">
          <label>Дата проведения</label>
          <input type="date" />
        </div>
      </div>
      <div class="form-fields">
        <div class="form-field">
          <label>Время подготовки к ответу</label>
          <vue-slider
            class="form-slider"
            :min="10"
            :max="120"
            v-model="answerTime"
            tooltip="always"
            :tooltip-formatter="minutesFormatter"
          />
        </div>
        <div class="form-field">
          <label>Число одновременных подготовок</label>
          <vue-slider
            class="form-slider"
            :min="1"
            :max="20"
            v-model="maxPeopleInQueue"
            tooltip="always"
            :tooltip-formatter="peopleFormatter"
          />
        </div>
      </div>
    </div>

    <div class="questions" v-show="activeTab === 'questions'">
      <div :class="{ question: 'question', opened: q.opened }" v-for="q in questions" :key="q.id" @click="openQuestion(q.id)">
        <div class="question-title">
          <span>
            Билет №{{ q.id }} <b>"{{ q.title }}"</b>
          </span>
          <span class="controls">
            <img src="../../assets/editblack.svg" />
            <img src="../../assets/arrowdown.svg" :style="{ transform: `rotateX(${q.opened ? '180deg' : '0deg'})` }" />
          </span>
        </div>
        <div class="value" v-if="q.opened">
          {{ q.value }}
        </div>
        <div class="files" v-if="q.opened && q.files">
          <button v-for="file in q.files" :key="file.title">{{ file.title }}</button>
        </div>
      </div>
      <button class="add-question" @click="show()">Добавить билет</button>
    </div>

    <div class="members" v-show="activeTab === 'members'">
      Генерация пользователей
    </div>

    <button class="create-exam">Сохранить</button>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component';

export default {
  components: {
    VueSlider,
  },
  data: () => ({
    activeTab: 'general',
    answerTime: 30,
    maxPeopleInQueue: 5,
    minutesFormatter: '{value} минут',
    peopleFormatter: '{value} человек',
    questions: [
      { id: 1, title: 'Комбинаторика', value: 'Содержимое билета', files: [{ title: 'File 1' }, { title: 'File 2' }], opened: false },
      { id: 2, title: 'Комбинаторика', value: 'Содержимое билета', files: [{ title: 'File 2' }], opened: false },
      { id: 3, title: 'Комбинаторика', value: 'Содержимое билета', files: [{ title: 'File 1' }], opened: false },
      { id: 4, title: 'Комбинаторика', value: 'Содержимое билета', files: [{ title: 'File 1' }, { title: 'File 2' }], opened: false },
    ],
    modal: {
      addq: {
        title: '',
        value: '',
      },
    },
  }),
  methods: {
    addQuestion() {
      this.questions.push({ id: this.questions.length + 1, title: this.modal.addq.title, value: this.modal.addq.value });
      this.modal.addq = { title: '', value: '' };
      this.hide();
    },
    openQuestion(id) {
      this.questions = this.questions.map((q) => ((q.opened = q.id === id ? !q.opened : false), q));
    },
    show() {
      this.$modal.show('hello-world');
    },
    hide() {
      this.$modal.hide('hello-world');
    },
  },
};
</script>

<style lang="scss">
.vm--container.add-question {
  z-index: 1000;

  .vm--modal {
    padding: 20px;
  }

  .form-field {
    width: 100%;

    &:not(:last-child) {
      margin-bottom: 10px;
    }

    textarea {
      height: 200px;
    }
  }
}

.questions {
  .add-question {
    margin-top: 10px;
    margin-bottom: 10px;
    background: #efefef;
    color: black;

    &:hover {
      background: #eaeaea;
    }
  }

  .question {
    padding: 10px;
    border: 1px solid #e7e6ef;
    border-radius: 5px;
    cursor: pointer;
    margin: 0 -10px;
    margin-bottom: 5px;
    border: 1px solid transparent;

    .question-title {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .controls {
        display: flex;

        img {
          margin-left: 6px;
        }
      }
    }

    .value {
      margin-top: 10px;
    }

    .files {
      margin-top: 10px;
      button {
        margin-right: 10px;
        background: #efefef;
        color: black;
      }
    }

    &:hover {
      background: #fafafa;
    }

    &.opened {
      background: #fff;

      border: 1px solid #e7e6ef;
    }
  }
}

.create-exam {
  margin: 0 auto;
  display: block;
  margin-top: 20px;
}

.tabs {
  display: flex;
  margin-bottom: 16px;
  .tab {
    font-size: 18px;
    margin-right: 20px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }

    &.active {
      font-weight: bold;
    }
  }
}

.form-fields {
  display: flex;
  margin-bottom: 20px;

  .form-field:not(:last-child) {
    margin-right: 20px;
  }
}

.form-field {
  width: 50%;
  display: flex;
  flex-direction: column;
  // margin-top: 10px;

  label {
    color: #9796ab;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 3px;
  }
}

.form-slider {
  margin-top: 17px;
}

.vue-slider-rail {
  background: #4b6199;
  border-radius: 2px;
}

.vue-slider-dot {
  border-radius: 50%;
  background: #a9b9e0;
  cursor: pointer;
}

.vue-slider-dot-tooltip-top {
  top: 0;
}

.vue-slider-dot-tooltip-text {
  white-space: nowrap;
}
</style>

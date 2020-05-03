<template>
  <main-layout title="Экзамены">
    <template #createButton>
      <router-link is="button" :to="{ name: 'exams.new' }">Создать</router-link>
    </template>
    <template #filters>
      <div class="filter">
        <div class="title">Дата</div>
        <div class="dropdown">2 фев - 9 фев</div>
      </div>
      <div class="filter">
        <div class="title">Статус</div>
        <div class="dropdown">Проведённые</div>
      </div>
    </template>
    <table>
      <thead>
        <tr>
          <th v-for="{ name, title } in fields" :key="name">{{ title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="exam in exams" :key="exam.id">
          <td>
            <b>{{ exam.name }}</b>
          </td>
          <td>
            <a :href="`http://localhost:8080/#/exams/${exam.link}`" target="_blank">{{ exam.link }}</a>
          </td>
          <td>
            {{ new Date(exam.date).toLocaleDateString('ru', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }}
          </td>
          <td class="status">{{ exam.status === 'done' ? 'Проведён' : 'Активен' }}</td>
          <td>
            <router-link :to="{ name: 'exams.update' }" is="button" class="edit-exam"><img src="../assets/edit.svg"/></router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </main-layout>
</template>

<script>
import MainLayout from '@/components/layouts/MainLayout.vue';
import Vuetable from 'vuetable-2/src/components/Vuetable';

export default {
  components: {
    MainLayout,
    Vuetable,
  },
  data: () => ({
    fields: [
      {
        name: 'name',
        title: 'Название предмета',
      },
      {
        name: 'link',
        title: 'Ссылка на экзамен',
      },
      {
        name: 'date',
        title: 'Дата проведения',
      },
      {
        name: 'status',
        title: 'Статус',
      },
      {
        name: 'actions',
        title: '',
      },
    ],
    exams: [],
  }),
  created() {
    this.getExams();
  },
  methods: {
    getExams() {
      fetch('http://localhost:3000/exems')
        .then((data) => data.json())
        .then((data) => (this.exams = data));
    },
  },
};
</script>

<style lang="scss">
table {
  width: 100%;

  thead {
    th {
      text-align: left;
      font-weight: 500;
      font-size: 16px;
      letter-spacing: 0.06em;
      color: #a3a3a3;
    }
  }

  tbody {
    tr {
      height: 55px;
      padding: 0;

      .edit-exam {
        width: 30px;
        height: 30px;
        padding: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: auto;

        img {
          width: 15px;
          height: 15px;
        }
      }

      .status {
        color: #4b6199;
      }
    }
  }
}

.filter {
  margin-left: 20px;

  .title {
    font-size: 12px;
    color: #9796ab;
    margin-bottom: 4px;
  }

  .dropdown {
    font-size: 14px;
    cursor: pointer;

    &:after {
      content: '';
      background: url('../assets/arrowdown.svg');
      width: 12px;
      height: 8px;
      display: inline-block;
      margin-left: 5px;
    }
  }
}
</style>

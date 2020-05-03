<template>
  <main-layout backButton title="Создание экзамена">
    <exam-create-form />
  </main-layout>
</template>

<script>
import MainLayout from '@/components/layouts/MainLayout.vue';
import ExamCreateForm from '@/components/forms/ExamCreateForm.vue';

export default {
  components: {
    MainLayout,
    ExamCreateForm,
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
  }),
};
</script>

<style lang="scss"></style>

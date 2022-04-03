<template>

  <v-data-table
    :headers="headers"
    :items="logs"
    :items-per-page="10"
    class="elevation-1"
  ></v-data-table>
</template>

<script>
  export default {
    async mounted()
    {
       const response = await this.$axios.$get('http://localhost:8080/monitor/grouped/last')
       this.logs = response.data;

    },
    data () {
      return {
        headers: [
          { text: 'Date/Time', value: 'date_with_hour_minutes' },
          { text: '(AVG) Total Memory used', value: 'avg_memory_used' },
          { text: 'Total memory', value: 'avg_memorytotal' },

        ],
        logs: [
        ],
      }
    },
  }
</script>
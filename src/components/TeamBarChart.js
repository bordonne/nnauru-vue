import VueCharts from '@pledgecamp/vue3-chartjs'

export default {
	name: 'TeamBarChart',
	extends: VueCharts.Bar,
	props: ['chartdata'],
	data() {
		return {
			chartData: this.chartdata
		}
	},
	async mounted(){

		let options = {
			responsive: true,
			aspectRatio: 1,
			lineTension: 1,
			tooltips: {
				enabled: false
			},
			legend: {
				position: "bottom",
				labels: {
					boxWidth: 15,
					fontSize: 15,
					fontColor: "#000",
				}
			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true,
						padding: 0,
					}
				}],
				xAxes: [{
					display: true,
					ticks: {
						beginAtZero: false
					}
				}],
			}
		}

		this.renderChart({
			labels: [this.$t('team.points')],
			datasets: this.chartData,
		}, options)
  }
}

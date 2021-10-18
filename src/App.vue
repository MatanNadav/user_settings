<template>
  <div id="app" class="container">
	  <div class="row text-center">
		  <p class="font-22 text-center font-600 my-3 py-2">User Settings</p>
		  <p class="font-22 text-center font-600 my-3 py-2">Notifications Selected: {{getNotifications}}</p>
		  <div class="col-12" v-if="data.settingsData.length">
				<div class="w-50 mx-auto">
					<div class="row d-flex justify-content-center" v-for="setting in data.settingsData" :key="setting.id">
						<div class="col-4 p-2">{{setting.id}}</div>
						<div class="col-4 p-2 ">{{setting.name}}</div>
						<div v-if="!state.isEditMode" class="col-4 p-2">
							{{setting.value}}
						</div>
						<div v-else class="col-4">
							<input type="text" v-model="setting.value" placeholder="Any input or none">
						</div>
					</div>
				</div>
		  </div>
		  	<div v-else class="col-12 w-50 mx-auto">
				<Spinner></Spinner>
			</div>
		  <b-button v-if="!state.isEditMode" class="mx-auto" @click="toggleEdit()">Edit</b-button>
		  <div class="col-12 mt-4" v-else>
			  <b-button class="mx-2" @click="save()">save</b-button>
			  <b-button class="mx-2" @click="cancel()">cancel</b-button>
		  </div>
	  </div>
	  
  </div>
</template>

<script>
import Spinner from "./components/spinner/index.vue";
export default {
  name: 'App',
  components: {
    Spinner,
  },
  props:{
	  store: Object,
  },
  data(){
	  return {
		  data: {
			  settingsData:[],
			  initialData:[],
			  changedSettings: [],
		  },
		  state: {
			  isEditMode: false,
			  isSettingsChanged: false
		  },
	  }
  },
  computed:{
	getNotifications(){
		let notifications = 0
		this.data.settingsData.forEach(setting => setting.value ? notifications++ : null)
		return notifications
	},
  },
  methods: {
	  toggleEdit(){
		  this.state.isEditMode = !this.state.isEditMode
	  },
	  save(){
		  // for convention reasons:
		  this.data.settingsData = this.data.settingsData.reduce((data, setting) => {
			  if(setting.value){
				  return [...data, {...setting, value: 'V'}]
			  } else {
				  return [...data, {...setting}]
			  }
		  }, [])
		  // saving the data to store + remote db
		  this.store.saveSettingsData(this.data.settingsData)
		  this.state.isEditMode = false
	  },
	  cancel(){
		  // reseting the app state and data
		  this.data.settingsData = this.data.initialData
		  this.state.isEditMode = false
		  this.state.isSettingsChanged = false
	  },
  },
  async mounted(){
	  	const data = await this.store.getUserSettings()
		// formatting to have a more readable data:
		this.data.settingsData = data.reduce((data, setting) => {
			return [...data, {id: setting.id, name: setting.name, value: setting.default ? 'V' : ''}]
		}, [])
		this.data.initialData = JSON.parse(JSON.stringify(this.data.settingsData)) // deep cloning the data
  },
}
</script>

<style lang="scss">
	* {
		box-sizing: border-box	;
	}

	.font-600 {
		font-weight: 600;
	}
	.font-22 {
		font-size: 22px;
	}
</style>

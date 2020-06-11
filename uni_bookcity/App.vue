<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	.flexbox {
	  display: flex;
	  justify-content: space-around;
	  align-items: center;
	}
	.flexbox.between {
	  justify-content: space-between;
	}
	.flexbox.a-start {
	  align-items: flex-start;
	}
	.flexbox.j-end {
	  justify-content: flex-end;
	}
	.flexbox.j-start {
	  justify-content: flex-start;
	}
	.flexbox.j-center {
	  justify-content: center;
	}
	.flexbox.a-start {
	  align-items: start;
	}
	.flexbox.a-center {
	  align-items: center;
	}
	.flexbox.f-column {
	  flex-direction: column;
	}
</style>

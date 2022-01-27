new Vue({
    el: '#mrtz',
    data: {
     posts:[],
    },
    mounted() {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", "mUrtAzA11mUnIrA22");

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("https://mrtz.deta.dev/posts", requestOptions)
        .then(response => response.text())
        .then(result => {
          const data = JSON.parse(result);
          this.posts= data.items;
          
        })
        .catch(error => console.log('error', error));
    },
  })
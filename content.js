new Vue({
    el: '#mrtz',
    data: {
      post: {}
    },
    mounted() {
      const url_string = window.location.href
      const url = new URL(url_string);
      const key = url.searchParams.get("title");
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", "mUrtAzA11mUnIrA22");

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("https://api.mundrawala.ml/post/"+key, requestOptions)
        .then(response => response.text())
        .then(result => {
          this.post = JSON.parse(result)
        })
        .catch(error => console.log('error', error));

    },

  })
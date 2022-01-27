new Vue({
    el: '#mrtz',
    data: {
      post: {},
      all:[],
      tags:[]
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

      fetch("https://mrtz.deta.dev/post/"+key, requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result);
          this.post = JSON.parse(result)
          const t = this.post.tags.split(',');
          this.tags = t;
        })
        .catch(error => console.log('error', error));

        const myHeaders1 = new Headers();
      myHeaders1.append("Content-Type", "application/json");
      myHeaders1.append("token", "mUrtAzA11mUnIrA22");

      const requestOptions1 = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("https://mrtz.deta.dev/posts", requestOptions1)
        .then(response => response.text())
        .then(result => {
          const data = JSON.parse(result);
          this.all= data.items;
          
        })
        .catch(error => console.log('error', error));

    },

  })
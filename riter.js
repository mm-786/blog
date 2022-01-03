new Vue({
  el: '#mrtz',
  data: {
    message: "",
    title: '',
    tags: '',
    auth: false,
    load: false,
  },
  mounted() {
    if (window.localStorage.getItem('mrtz') == 'munira') {
      this.auth = true;
    }
    $('#summernote').summernote({
      tabsize: 4,
      height: 500,
      toolbar: [
        ['style', ['style', 'undo', 'redo']],
        ['font', ['fontname', 'fontsize', 'bold', 'underline', 'clear', 'italic', 'strikethrough', 'superscript', 'subscript']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['height', ['height']],
        ['insert', ['link', 'picture', 'video', 'table']],
        ['view', ['fullscreen', 'codeview', 'help']],

      ]
    });
  },
  methods: {
    getCode() {
      const cont = $('#summernote')
      this.message = encodeURIComponent(cont.summernote('code'));

    },
    submitPost() {
      this.load = true;
      this.getCode();
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", "mUrtAzA11mUnIrA22");

      const raw = JSON.stringify({
        "title": this.title,
        "content": this.message,
        "tags":this.tags
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      if (this.auth) {
        fetch("https://api.mundrawala.ml/post", requestOptions)
          .then(response => response.text())
          .then(result => {
            this.load = false
            location.reload();
            console.log(result)
          })
          .catch(error => {
            this.load = false
            console.log('error', error)
          });
      }

    }
  }
})
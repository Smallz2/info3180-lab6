/* Add your Application JavaScript */
const NewsList = {
  name: 'NewsList',
  template: 
    `
    <div class="news py-5">
      <h2 class="mb-5 text-center font-weight-bold">News</h2>
      <div class="form-inline d-flex justify-content-center mb-5">
        <div class="form-group mx-sm-3 mb-2">
          <label class="sr-only" for="search">Search</label>
          <input type="search" name="search" v-model="searchTerm"
          id="search" class="form-control mb-2 mr-sm-2" placeholder="Enter
          search term here" />
          <button class="btn btn-primary mb-2" @click="searchNews">Search</button>
        </div>
      </div>

      <ul class="row row-cols-1 row-cols-md-3 news__list list-unstyled justify-content-center">
        <li v-for="article in articles" class="p-2">
          <div class="card h-100 shadow-sm news__item" style="width: 18rem;">
            <h5 class="p-2 card-title font-weight-bold">{{ article.title }}</h5>
            <img :src="article.urlToImage" alt="Card image cap">
            <div class="card-body">
              <p class="card-text">{{ article.description }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    `, 
    created() {
      let self = this;
      fetch('https://newsapi.org/v2/top-headlines?country=us', {
        headers: {
          'Authorization': 'Bearer <add api key here>'
        }
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        self.articles = data.articles
      });
    },
    data() {
      return {
        articles: [],
        searchTerm: ''
      }
    },
    methods: {
      searchNews() {
        let self = this;
        fetch('https://newsapi.org/v2/everything?q='+ self.searchTerm + '&language=en', { 
          headers: {
            'Authorization': 'Bearer <add api key here>'
          }
        })
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          console.log(data);
          self.articles = data.articles;
        });
      }
    }
 };

const Home = {
  name: 'Home',
  template: `
    <div class="home">
      <img src="/static/images/logo.png" alt="VueJS Logo">
      <h1>{{ welcome }}</h1>
    </div>
  `,
  data() {
    return {
      welcome: 'Hello World! Welcome to VueJS'
    }
  }
};

const app = Vue.createApp({
  data() {
    return {
      welcome: 'Hello World! Welcome to VueJS'
    }
  },
  components: {
    'home': Home,
    'news-list': NewsList
  }
});

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
    routes: [
      { path: '/', component: Home },
      { path: '/news', component: NewsList }
  ]
});

app.component('app-header', {
  name: 'AppHeader',
  template: `
      <header>
          <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
            <a class="navbar-brand" href="#">VueJS App</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <router-link to="/" class="nav-link">Home</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/news" class="nav-link">News</router-link>
                </li>
              </ul>
            </div>
          </nav>
      </header>    
  `,
  data: function() {
    return {};
  }
});

app.component('app-footer', {
  name: 'AppFooter',
  template: `
      <footer>
          <div class="container">
              <p>Copyright &copy {{ year }} Flask Inc.</p>
          </div>
      </footer>
  `,
  data: function() {
      return {
          year: (new Date).getFullYear()
      }
  }
})

app.use(router)
app.mount('#app');
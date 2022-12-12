<template>
  <b-row class="">
    <b-col>
      <b-card>
        <b-card-body>
          <b-card-text>

            <b-row class="mb-5">
              <b-col>
                <h1 class="tittle">
                  <b>Добро пожаловать !</b>
                </h1>
                <h4 class="tittle">
                  Научись работать с базами данных уже сегодня
                </h4>
              </b-col>
            </b-row>

            <hr>

            <b-row class="mt-5">
              <b-col >
                <b-img center src="img/img_for_dashboard/db_img.png" class="col-md-9 col-sm-12" rounded alt="Center image" width="450" height="400"></b-img>
              </b-col>
              <b-col class="my-5 col-md-6 col-sm-12 col-xs mr-2">
                <h4 class="blocks1"><strong>Наш ресурс предоставляет большое количество различных тренировочных баз данных</strong></h4>
              </b-col>
            </b-row>

            <hr>

            <b-row class="mt-5">
              <b-col class="my-5 col-md-4 col-sm-12 col-xs-4 ml-2">
                <h4 class="blocks2">Задания можно решать прямо на сайте</h4>
              </b-col>
              <b-col>
                <b-img  src="img/img_for_dashboard/sql-window.png" class="col-md-auto col-sm-12" rounded alt="Right image" width="700" height="400"></b-img>
              </b-col>
            </b-row>

            <hr>

            <b-row class="mt-5">
              <b-col>
                <b-img left src="img/img_for_dashboard/sql-teoretical.png" class="col-md-auto col-sm-12" rounded alt="Center image" width="504" height="400"></b-img>
              </b-col>
              <b-col class="my-5 col-md-4 col-sm-12 mr-2" >
                <h4 class="blocks1"><strong>{{ $t('welcome-page.material') }}</strong></h4>
              </b-col>
            </b-row>

            <hr>

            <b-row class="mt-5">
              <b-col class="my-5 col-md-12 col-sm-12 mr-2" >
                <router-link to="/authorization"><b-button size="lg" variant="outline-primary">{{ $t('welcome-page.start-education') }}</b-button></router-link>
              </b-col>
            </b-row>

          </b-card-text>

        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "UnauthorizedUserDashboard"
}
</script>

<style scoped>
.tittle {
  font-size: 2.5rem;
  font-weight: 300;
  line-height: 1.2;
}
.blocks1 {
  font-size: 2.2rem;
  font-weight: 100;
  line-height: 1.4;

}
.blocks2 {
  font-size: 2.2rem;
  font-weight: 200;
  line-height: 1.4;
  font-family: "Bauhaus 93";
}
</style>
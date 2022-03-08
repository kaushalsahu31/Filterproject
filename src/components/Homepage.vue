<template>
  <div class="container">
    <div class="filter">
      <div class="filterList">
        <button class="accordion2">Filter</button>
      </div>
      <div v-for="(val, index) in filters" :key="{ index }" class="filterList">
        <button v-on:click="accordion(index)" class="accordion">
          {{ val.filter_lable }}
        </button>
        <div class="panel">
          <span v-for="val2 in val.options" :key="{ val2 }">
              <input type="checkbox" name="check" v-on:click="oncheck(val2.code,val2.value)" :value=val2.value>
            <label> {{ val2.value }}</label><br>
            </span>
        </div>
      </div>
    </div>
    <div class="product">
      <lazy-component
        v-for="(val, i) in products"
        :key="{ i }"
        class="productList"
      >
        <img :src="val.image" alt="" class="productimg" />
        <div class="productdetails">
          <p>{{ val.name }}</p>
          <p>Rs: {{ val.price }}</p>
          <div class="show">
            Size-
            <span v-for="(val3, index) in val.size.split(',')" :key="{ index }">
              {{ val3.replace("[", " ").replace("]", " ") }}
            </span>
          </div>
        </div>
      </lazy-component>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      filters: {},
      products: {},
      count: 10,
      choose:[]
    };
  },
  created() {
    this.getData();
  },
  mounted() {},
  methods: {
    getData() {
      axios
        .get(
          "https://pim.wforwoman.com/pim/pimresponse.php/?service=category&store=1&url_key=top-wear-kurtas&page=1&count=100&sort_by=&sort_dir=desc&filter="
        )
        .then((res) => {
          this.filters = res.data.result.filters;
          this.products = res.data.result.products;
          console.log(this.filters);
        });
    },
    checkfilter() {
        let f= this.choose
        let c =""
        for (let i = 0; i < f.length; i++) {
             c=c+ f[i]+",";       
        }
        c=c.substring(0, c.length - 1);
      axios
        .get(
          "https://pim.wforwoman.com/pim/pimresponse.php/?service=category&store=1&url_key=top-wear-kurtas&page=1&count=100&sort_by=&sort_dir=desc&filter="+c
        )
        .then((res) => {
          this.products = res.data.result.products;
        });
    },
    accordion(id) {
      let acc = document.getElementsByClassName("accordion");
      acc[id].classList.toggle("active");
      var panel = acc[id].nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    },
    oncheck(code,filter){
        let checks=code+"-"+filter
        if (this.choose.includes(checks)){
            let index=this.choose.indexOf(checks)
            this.choose.splice(index, 1);

        }else{
            this.choose.push(checks)
        }
        console.log(this.choose);
        this.checkfilter()

    }
  },
};
</script>

<style scoped>
.container {
  display: grid;
  width: 100%;
  grid-template-columns: 22fr 78fr;
  column-gap: 2rem;
}
.accordion {
  background-color: white;
  color: #444;
  cursor: pointer;
  padding: 20px;
  width: 100%;
  text-align: left;
  border: 1px solid #ededed;
  outline: none;
  transition: 0.4s;
  font-size: 18px;
}

.panel {
  padding: 0 18px;
  background-color: white;
  display: none;
  overflow: hidden;
  border: 1px solid #ededed;
}
.panel p {
  font-size: 18px;
}
.product {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 2rem;
}
.productList {
  /* padding: 5px; */
  margin: 5px;
}

.productList:hover {
  border: 1px solid gray;
  margin: 5px;
}
.productList .show {
  color: white;
}
.productList:hover .show {
  color: black;
}
.productimg {
  width: 100%;
}
.filter {
  padding: 20px;
}
.accordion2 {
  background-color: white;
  padding: 20px;
  width: 100%;
  text-align: left;
  border: 1px solid #ededed;
  outline: none;
  font-size: 16px;
  text-transform: uppercase;
  color: #000;
  margin: 0;
}
.accordion:after {
  content: "\25BC"; /* Unicode character for "plus" sign (+) */
  font-size: 13px;
  color: #777;
  float: right;
  margin-left: 5px;
}

.active:after {
  content: "\25B2"; /* Unicode character for "minus" sign (-) */
}
</style>
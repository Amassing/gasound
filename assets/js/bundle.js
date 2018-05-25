'use strict';

// ---- FILTERS
var Capitalize = function Capitalize(value) {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
};
var Uppercase = function Uppercase(value) {
  if (!value) return '';
  value = value.toString();
  return value.toUpperCase();
};

// ---- MIXINS
var mixinBadge = {
  props: {
    title: { type: String, required: true }
  },
  methods: {
    isSelected: function isSelected() {
      this.selected = this.selected ? false : true;
      this.$emit('is-selected', { title: this.title, isSelected: this.selected });
    }
  },
  data: function data() {
    return { selected: false };
  }
};

// ---- COMPONENTS
var BadgePrimary = {
  template: '\n    <div class="card shadow-lg mr-2 mr-sm-5 mb-2 p-3" :title=\'title\' @click=\'isSelected\'>\n      <div class="card-title text-center font-weight-bold mb-1">{{ title }}</div>\n      <img src="./assets/img/factory.png" alt="Card image cap">\n    </div>',
  mixins: [mixinBadge]
};

var Badge = {
  template: '\n    <div class="mr-2 mr-sm-5 mb-2" :title=\'title\' @click=\'isSelected\'>\n      <div class="card-title text-center font-weight-bold mb-1">{{ title }}</div>\n      <div class="card p-3" :class="{ \'border-primary\' : selected }">\n        <img class="w-100" src="./assets/img/boy.png"\n            alt="Card image cap" >\n        <slot></slot>\n      </div>\n    </div>',
  mixins: [mixinBadge]

  // ---- ROOT APP application
};var vm = new Vue({

  el: '#app',
  data: {
    information: '',
    wordsNegatif: false,
    wordsMax: 123,
    target: null,
    businessTarget: [{ title: 'entreprises' }, { title: 'associations' }, { title: 'publics' }, { title: 'autres' }],
    clientTarget: [{ title: 'homme' }, { title: 'femme' }, { title: 'autre' }],
    targetList: []
  },

  methods: {
    changeCible: function changeCible(emit) {
      this.target = emit.title.toLowerCase();
    },
    updateTargetList: function updateTargetList(emit) {
      if (!this.targetList.includes(emit.title) && emit.isSelected) {
        this.targetList.push(emit.title);
      } else if (this.targetList.includes(emit.title) && !emit.isSelected) {
        this.targetList.splice(this.targetList.indexOf(emit.title), 1);
      }
    }
  },

  computed: {
    wordsTotal: function wordsTotal() {
      var wordsDiff = this.wordsMax - this.information.split('').length;
      this.wordsNegatif = wordsDiff < 0 ? true : false;
      return wordsDiff + (wordsDiff <= 1 && wordsDiff >= -1 ? ' mot' : ' mots');
    }
  },
  components: {
    Badge: Badge,
    BadgePrimary: BadgePrimary
  },
  filters: {
    Capitalize: Capitalize,
    Uppercase: Uppercase
  }

});
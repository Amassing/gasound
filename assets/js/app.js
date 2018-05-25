// ---- FILTERS
const Capitalize = function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
}
const Uppercase = function (value) {
  if (!value) return ''
  value = value.toString()
  return value.toUpperCase()
}

// ---- MIXINS
const mixinBadge = {
  props: {
    title: { type: String, required: true }
  },
  methods: {
    isSelected () {
      this.selected = this.selected ? false : true
      this.$emit('is-selected', {title: this.title, isSelected: this.selected})
    }
  },
  data () { return { selected: false } }
}

// ---- COMPONENTS
const BadgePrimary = {
  template: `
    <div class="card shadow-lg mr-2 mr-sm-5 mb-2 p-3" :title='title' @click='isSelected'>
      <div class="card-title text-center font-weight-bold mb-1">{{ title }}</div>
      <img src="./assets/img/factory.png" alt="Card image cap">
    </div>`,
  mixins: [mixinBadge]
}

const Badge = {
  template: `
    <div class="mr-2 mr-sm-5 mb-2" :title='title' @click='isSelected'>
      <div class="card-title text-center font-weight-bold mb-1">{{ title }}</div>
      <div class="card p-3" :class="{ 'border-primary' : selected }">
        <img class="w-100" src="./assets/img/boy.png"
            alt="Card image cap" >
        <slot></slot>
      </div>
    </div>`,
  mixins: [mixinBadge]
}

    // ---- ROOT APP application
const vm = new Vue({

  el: '#app',
  data: {
    information: '',
    wordsNegatif: false,
    wordsMax: 123,
    target: null,
    businessTarget: [
      { title: 'entreprises' },
      { title: 'associations' },
      { title: 'publics' },
      { title: 'autres' }
    ],
    clientTarget: [
      { title: 'homme' },
      { title: 'femme' },
      { title: 'autre' }
    ],
    targetList: []
  },

  methods: {
    changeCible (emit) {
      this.target = emit.title.toLowerCase()
    },
    updateTargetList (emit) {
      if (!this.targetList.includes(emit.title) && emit.isSelected) {
        this.targetList.push(emit.title)
      } else if (this.targetList.includes(emit.title) && !emit.isSelected) {
        this.targetList.splice(this.targetList.indexOf(emit.title), 1)
      }
    }
  },

  computed: {
    wordsTotal () {
      let wordsDiff = this.wordsMax - this.information.split('').length
      this.wordsNegatif = wordsDiff < 0 ? true : false
      return wordsDiff + ((wordsDiff <= 1 && wordsDiff >= -1) ? ' mot' : ' mots')
    }
  },
  components: {
    Badge,
    BadgePrimary
  },
  filters: {
    Capitalize,
    Uppercase
  }

})
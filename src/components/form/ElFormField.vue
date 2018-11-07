<script>
import emitter from 'element-ui/src/mixins/emitter';
import ElPair from './ElPair';
import ElAutoput from './ElAutoput';
import ElVerify from './ElVerify';

export default {
  render(createElement) {
    const self = this;
    // props
    const props = this.item || {};
    props.value = this.value;
    props.disabled = this.disabled;
    // children
    let children;
    let holder = this.item.holder || 'input';
    console.log(holder)
    switch (holder) {

      case 'text':
        holder = 'input';
        break;
      case 'textare':
        holder = 'input';
        props.type = 'textarea';
        break;
      case 'time-range':
        holder = 'time-picker';
        // props.isRange = true;
        break;
      case 'date-range':
        holder = 'date-picker';
        break;
      case 'date-time-range':
        holder = 'date-picker';
        break;
      case 'radio-group':
        children = [];
        this.item.items.forEach(element => children.push(createElement('el-radio', {
          props: {
            label: element
          },
        }, [element.label])));
        break;
      case 'checkbox-group':
        children = [];
        this.item.items.forEach(element => children.push(createElement('el-checkbox', {
          props: {
            label: element
          },
        }, [element.label])));
        break;
      case 'select':
        children = [];
        this.item.items.forEach(element => children.push(createElement('el-option', {
          props: {
            label: element,
            value: element
          },
        })));
        break;
      default:
    }
    return createElement(`el-${holder}`, {
      props,
      on: {
        input: self.input.bind(self),
      },
    }, children);
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    value: {
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ElPair,
    ElAutoput,
    ElVerify,
  },
  methods: {
    input(value) {
      this.$emit('input', this.item.name, value);
    },
  },
  mixins: [emitter],
};
</script>

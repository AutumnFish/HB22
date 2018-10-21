// 导入Vue
import Vue from 'vue'
// 导入element-ui
// import ElementUI from 'element-ui';
// 按需引入 element-ui
import {
    Carousel,
    CarouselItem,
    InputNumber,
    Switch,
    Message,
    MessageBox,
    Form,
    FormItem,
    Input,
    Radio,
    Pagination
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);
// use一下
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(InputNumber)
Vue.use(Switch)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Radio)
Vue.use(Pagination)
// Vue.use(Message)

// 通过js控制的 需要挂到 Vue的原型中即可
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

// 导入iView
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
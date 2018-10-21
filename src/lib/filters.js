// 导入Vue
import Vue from 'vue';
// 导入 moment.js
import moment from "moment";
// 全局过滤器 在所有的组件中都可以使用
// value 就是你要过滤的值
// 参数1 是过滤的那个值，后面才是你要的参数
Vue.filter('beautifyTime', function (value, str, str2, str3) {
  //   console.log(str);
  //   console.log(str2);
  //   console.log(str3);
  // 处理value
  //   console.log(value);
  // 返回处理之后的value
  //   return '🐷🐷🐷🐷';
  // 格式化日期 使用moment.js来格式化
  return moment(value).format(`YYYY${str}MM${str2}DD${str3}`);
})
// 过滤器2 格式化日期
Vue.filter('beautifyTimePro', function (value, formatStr) {
  // 格式化字符串
  // 格式化日期 使用moment.js来格式化
  return moment(value).format(formatStr);
})

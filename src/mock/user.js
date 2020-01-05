import Mock from 'mockjs'

Mock.mock('http://localhost:8080/login', {
  'name': '@name', // 自动生成姓名
  'email': '@email', // 自动生成email
  'age|1-30': 18, // age 1-30之间的随机年龄
  'birthday': '@date("yyyy-MM-dd")',
  'city': '@city(true)', // 中国城市
  'color': '@color', // 16进制颜色
  'token': '930204', // 自动生成token
  'role|1-10': [{ // 自动生产1到10个随机角色
    'role': '@name'
  }]
})

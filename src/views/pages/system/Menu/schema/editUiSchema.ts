import icon from '../../../../../conf/iconConf';
import util from '../../../../../util/util';

// const treeData = util.treeData;
const { iconTreeData, accessMenuTree } = util;
// console.log('图标树', iconTreeData(icon));
const menus = JSON.parse(localStorage.getItem('accessMenu'));
menus.push({});

export default {
  title: {
    'ui:widget': 'input',
    'ui:options': {
      type: 'text',
      options: { title: 'songtisnen' },
      placeholder: '',
    },
    'ui:rules': [
      { required: true, message: '请输入角色编码' },

      { pattern: /^\S(.*)\S$/, message: '开头与结尾不能有空格' },

      { max: 100, message: '最多输入100字符' },
    ], // 校验规则
    'ui:title': '菜单title',
    'ui:description': '',
    'ui:formItemConfig': {
      hasFeedback: true,
      // "extra":"121212",//未设置取ui:description
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    }, // Form.Item 配置
  },
  name: {
    'ui:widget': 'input',
    'ui:options': {
      type: 'text',
      placeholder: '',
      // onBlur: (e) => {
      //   const value = e.target.value;
      //   // console.log(value);
      // },
    },
    'ui:rules': [
      { required: true, message: '请输入角色名称' },

      { pattern: /^\S(.*)\S$/, message: '开头与结尾不能有空格' },

      { max: 100, message: '最多输入100字符' },
    ], // 校验规则
    'ui:title': '菜单名称',
    'ui:description': '',
    'ui:formItemConfig': {
      hasFeedback: true,
      // "extra":"121212",//未设置取ui:description
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    }, // Form.Item 配置
    // 'ui:onBlur': (e) => {
    //   const value = e.target.value;
    //   // console.log(value);
    // },
  },
  functionCode: {
    'ui:widget': 'input',
    'ui:options': {
      type: 'text',
      placeholder: '',
    },
    'ui:rules': [
      { required: true, message: '请输入角色编码' },
      { whitespace: true, message: 'no space' },
      { pattern: /^\S(.*)\S$/, message: '开头与结尾不能有空格' },

      { max: 100, message: '最多输入100字符' },
    ], // 校验规则
    'ui:title': '菜单编码',
    'ui:description': '',
    'ui:formItemConfig': {
      hasFeedback: true,
      // "extra":"121212",//未设置取ui:description
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    }, // Form.Item 配置
  },
  path: {
    'ui:widget': 'input',
    'ui:options': {
      type: 'text',
      placeholder: '',
    },
    'ui:rules': [
      { required: true, message: '请输入角色编码' },
      { whitespace: true, message: 'no space' },
      { pattern: /\S$/, message: '开头与结尾不能有空格' },

      { max: 100, message: '最多输入100字符' },
    ], // 校验规则
    'ui:title': '菜单路径',
    'ui:description': '',
    'ui:formItemConfig': {
      hasFeedback: true,
      // "extra":"121212",//未设置取ui:description
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    }, // Form.Item 配置
  },
  leftMenu: {
    'ui:widget': 'radio',
    'ui:options': {
      // initialValue: true,
      options: [
        { label: '是', value: '1' },
        { label: '否', value: '0' },
      ],
    },
    'ui:rules': [{ required: true, message: '请选择' }], // 校验规则
    'ui:title': '左侧',
    'ui:description': '',
    'ui:formItemConfig': {
      // hasFeedback: true,
      // "extra":"121212",//未设置取ui:description
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    }, // Form.Item 配置
  },
  isLock: {
    'ui:widget': 'radio',
    'ui:options': {
      // initialValue: false,
      options: [
        { label: '是', value: '1' },
        { label: '否', value: '0' },
      ],
    },
    'ui:rules': [{ required: true, message: '请选择' }], // 校验规则
    'ui:title': '锁定',
    'ui:description': '',
    'ui:formItemConfig': {
      // hasFeedback: true,
      // "extra":"121212",//未设置取ui:description
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    }, // Form.Item 配置
  },
  sort: {
    'ui:widget': 'input',
    'ui:options': {
      type: 'text',
      placeholder: '请输入数字',
      // onBlur: (e) => {
      //   const value = e.target.value;
      //   // console.log(value);
      // },
    },
    'ui:rules': [
      { required: true, message: '输入数字' },
      { pattern: /[1-9]$/, message: '输入数字' },

      { max: 100, message: '最多输入100字符' },
    ], // 校验规则
    'ui:title': '排序',
    'ui:description': '',
    'ui:formItemConfig': {
      hasFeedback: true,
      // "extra":"121212",//未设置取ui:description
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    }, // Form.Item 配置
    // 'ui:onBlur': (e) => {
    //   const value = e.target.value;
    //   // console.log(value);
    // },
  },
  parentId: {
    'ui:widget': 'treeSelect', // 级联
    'ui:options': {
      // fieldNames: { title: 'name', value: 'id', key: 'id' },
      // treeData: treeData(menus),
      disabled: false,
    },
    'ui:rules': [{ required: true, message: '请选择模块!' }], // 校验规则
    'ui:title': '所属菜单', // 未设置取schema 中定义的title
    'ui:description': '请选择模块',
    'ui:formItemConfig': {
      hasFeedback: true,
      // "extra":"121212",//未设置取ui:description
      // label: '角色', // 未设置取ui:title,
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    }, // Form.Item 配置
    'ui:remoteConfig': {
      apiKey: 'getAllMenu',
      hand: (data) => {
        // eslint-disable-next-line no-underscore-dangle
        const _rootNode = [
          {
            value: '0',
            key: '0',
            title: '根',
            id: '0',
          },
        ];
        const listData = accessMenuTree(data.allList);
        const listDatas = [..._rootNode, ...listData];
        return listDatas;
      }, // 数据处理函数
    },
  },
  icon: {
    'ui:widget': 'treeSelect', // 级联
    'ui:options': {
      // fieldNames: { title: 'name', value: 'id', key: 'id' },
      treeData: iconTreeData(icon),
    },
    'ui:rules': [{ required: true, message: '请选择模块!' }], // 校验规则
    'ui:title': '图标', // 未设置取schema 中定义的title
    'ui:description': '请选择图标',
    'ui:formItemConfig': {
      hasFeedback: true,
      // "extra":"121212",//未设置取ui:description
      // label: '角色', // 未设置取ui:title,
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    },
  },
};

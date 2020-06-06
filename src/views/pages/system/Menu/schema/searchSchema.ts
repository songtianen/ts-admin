const searchSchema = {
  $id: 'menu-search-schema',
  title: 'menu-search-schema',
  description: 'menu-search-schema.',
  type: 'object',
  required: [],
  properties: {
    title: {
      type: 'string',
      title: '菜单名称',
    },
  },
  formLayout: {
    layout: 'inline',
    labelCol: { span: 4 },
    wrapperCol: { span: 10 },
  },
};
export default searchSchema;

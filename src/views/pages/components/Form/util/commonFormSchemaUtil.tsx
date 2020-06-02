/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {
  Form,
  Input,
  DatePicker,
  InputNumber,
  Checkbox,
  Radio,
  Select,
  Switch,
  Cascader,
  Upload,
  TreeSelect,
} from 'antd';
import { TreeSelectProps } from 'antd/lib/tree-select';
import * as api from '../../../../../api';
import remoteDataUtil from './FormRemoteDataUtil';
import { IEditSchemaProps, IUIEditSchemaProps } from './type';

const myapi: { [index: string]: any } = api;

const FormItem = Form.Item;

// 缓存的解析parse函数的步骤
const JsxGeneratorMap = new Map();

interface IParseFormProp {
  formItems: React.ReactElement[];
  formLayout?: any;
  formData: any;
}

function betweenFormItemWrapper(
  beginItem: () => React.ReactElement,
  endItem: () => React.ReactElement,
  field: IUIEditSchemaProps,
) {
  return (
    <FormItem key={field.key} name={field.key} {...field['ui:formItemConfig']}>
      <FormItem
        key={`begin${field.key}`}
        name={`begin${field.key}`}
        {...field['ui:beginFormItemConfig']}
        // initialValue={
        //   formData[`${field.key}Begin`] || field['ui:defaultBeginValue']
        // }
        rules={field['ui:rules'] || field['ui:beginFormItemConfig'].rules}
      >
        {beginItem()}
      </FormItem>
      <FormItem
        key={`end${field.key}`}
        name={`end${field.key}`}
        {...field['ui:endFormItemConfig']}
        // initialValue={
        //   formData[`${field.key}End`] || field['ui:defaultEndValue']
        // }
        rules={field['ui:rules'] || field['ui:endFormItemConfig'].rules}
      >
        {endItem()}
      </FormItem>
    </FormItem>
  );
}

const formItemWrapper = (
  formItem: () => React.ReactElement,
  field: IUIEditSchemaProps,
) => {
  // return (formData: any) => (
  //   <FormItem
  //     key={field.key}
  //     name={field.key}
  //     {...field['ui:formItemConfig']}
  //     rules={field['ui:rules'] || field['ui:formItemConfig'].rules}
  //     // 设置了name属性不应在设置initialValue
  //     // initialValue={formData[field.key] || field['ui:defaultValue']}
  //   >
  //     {formItem()}
  //   </FormItem>
  // );
  return (
    <FormItem
      key={field.key}
      name={field.key}
      {...field['ui:formItemConfig']}
      rules={field['ui:rules'] || field['ui:formItemConfig'].rules}
      // 设置了name属性不应在设置initialValue
      // initialValue={formData[field.key] || field['ui:defaultValue']}
    >
      {formItem()}
    </FormItem>
  );
};

// parse 相关函数

const transformInput = (field: IUIEditSchemaProps, schemaProperty?: any) => {
  return formItemWrapper(() => <Input {...field['ui:options']} />, field);
};
const transformInputNumber = (
  field: IUIEditSchemaProps,
  schemaProperty?: any,
) => {
  return formItemWrapper(() => <InputNumber {...field['ui:options']} />, field);
};
const transformCheckbox = (field: IUIEditSchemaProps, schemaProperty?: any) => {
  return formItemWrapper(
    () => <Checkbox.Group {...field['ui:options']} />,
    field,
  );
};
const transformDatetime = (field: IUIEditSchemaProps, schemaProperty?: any) => {
  return formItemWrapper(() => <DatePicker {...field['ui:options']} />, field);
};
const transformRadio = (field: IUIEditSchemaProps, schemaProperty?: any) => {
  return formItemWrapper(() => <Radio.Group {...field['ui:options']} />, field);
};
const transformSelect = (field: IUIEditSchemaProps, schemaProperty?: any) => {
  const dataOptions = field['ui:dataOptions'] || [];
  const options: any[] = [];
  dataOptions.forEach((o: any) => {
    options.push(
      <Select.Option key={o.value} value={o.value} disabled={o.disabled}>
        {o.title}
      </Select.Option>,
    );
  });

  return formItemWrapper(
    () => <Select {...field['ui:options']}>{options}</Select>,
    field,
  );
};
const transformSwitch = (field: IUIEditSchemaProps, schemaProperty?: any) => {
  return formItemWrapper(() => <Switch {...field['ui:options']} />, field);
};
const transformBetween = (field: IUIEditSchemaProps, schemaProperty?: any) => {
  let begin;
  let end;
  switch (field['ui:type']) {
    case 'number':
      begin = () => <InputNumber {...field['ui:options']} />;
      end = () => <InputNumber {...field['ui:options']} />;
      return betweenFormItemWrapper(begin, end, field);
    default:
      begin = () => <DatePicker {...field['ui:options']} />;
      end = () => <DatePicker {...field['ui:options']} />;
      return betweenFormItemWrapper(begin, end, field);
  }
};
const transformCascader = (field: IUIEditSchemaProps, schemaProperty?: any) => {
  return formItemWrapper(
    () => <Cascader {...field['ui:options']} />, // 函数作为参数传递
    field,
  );
};
const transformUpload = (field: IUIEditSchemaProps, schemaProperty?: any) => {
  switch (field['ui:type']) {
    case 'dragger':
      return formItemWrapper(
        () => (
          <Upload.Dragger {...field['ui:options']}>
            {field['ui:children']}
          </Upload.Dragger>
        ),
        field,
      );
    default:
      return formItemWrapper(
        () => <Upload {...field['ui:options']}>{field['ui:children']}</Upload>,
        field,
      );
  }
};
const transformNormal = (field: IUIEditSchemaProps, schemaProperty?: any) => {
  switch (field['ui:widget']) {
    case 'input.textarea':
      return formItemWrapper(
        () => <Input.TextArea {...field['ui:options']} />,
        field,
      );
    default:
      // 默认就是普通的输入框
      return formItemWrapper(() => <Input {...field['ui:options']} />, field);
  }
};

const transformTreeSelect = (
  field: IUIEditSchemaProps,
  schemaProperty?: any,
) => {
  console.log('treeselect', field);
  const schemaOptions: TreeSelectProps<any> = field['ui:options'];

  return formItemWrapper(() => <TreeSelect {...schemaOptions} />, field);
};
// -------
const mergeSchema = (schema: IEditSchemaProps, uiSchema: any) => {
  Object.keys(uiSchema).forEach((key) => {
    const schemaProperty = schema.properties[key];
    const uiSchemaProperty = uiSchema[key];
    uiSchemaProperty.key = key; // 添加一个key属性，以便缓存一些数据
    if (uiSchemaProperty['ui:rules'] === undefined) {
      uiSchemaProperty['ui:rules'] = [];
    }
    if (uiSchemaProperty['ui:formItemConfig'] === undefined) {
      uiSchemaProperty['ui:formItemConfig'] = undefined;
    }
    // merge description
    // 合并 description ['ui:formItemConfig']['extra'] 额外的描述（如input框中额外的表述字样）
    if (uiSchemaProperty['ui:formItemConfig'].extra === undefined) {
      // 优先合并uiSchemaProperty['ui:description']描述
      uiSchemaProperty['ui:formItemConfig'].extra =
        uiSchemaProperty['ui:description'];
    }
    // 合并 title 综上
    if (uiSchemaProperty['ui:formItemConfig'].label === undefined) {
      uiSchemaProperty['ui:formItemConfig'].label =
        uiSchemaProperty['ui:title'];
    }
    if (uiSchemaProperty['ui:formItemConfig'].label === undefined) {
      uiSchemaProperty['ui:formItemConfig'].label = schemaProperty.title;
    }
    // config labelCol label 标签布局
    if (uiSchemaProperty['ui:formItemConfig'].labelCol === undefined) {
      uiSchemaProperty['ui:formItemConfig'].labelCol = { span: 8 };
    }
    // config wrapperCol 输入控件设置布局样式 如 input 组件
    if (uiSchemaProperty['ui:formItemConfig'].wrapperCol === undefined) {
      uiSchemaProperty['ui:formItemConfig'].wrapperCol = { span: 16 };
    }
  });
};
// getRemoteData相关函数 antd 连级组件 数据获取并缓存
const getCascaderRemoteData = (id: string, field: IUIEditSchemaProps) => {
  // 获取请求接口
  const { apiKey } = field['ui:remoteConfig'];
  return new Promise((resolve) => {
    myapi[apiKey]().then((res: any) => {
      let { data } = res;
      // 返回经过 uiSchema 配置文件处理的数据
      data = field['ui:remoteConfig'].hand(data);
      // 给配置文件添加此数据
      field['ui:options'].options = data;
      // 缓存数据
      remoteDataUtil.addData(`${id}_${field.key}`, data);
      resolve(data);
    });
  });
};
// treeData 远程数据
const getTreeSelectRemoteData = (id: string, field: IUIEditSchemaProps) => {
  // console.log('field.keyfield.keyfield.key', field);
  // 获取请求接口
  const { apiKey } = field['ui:remoteConfig'];
  return new Promise((resolve) => {
    myapi[apiKey]().then((res: any) => {
      let { data } = res;
      // 返回经过 uiSchema 配置文件处理的数据
      data = field['ui:remoteConfig'].hand(data);
      // 给配置文件添加此数据
      field['ui:options'].treeData = data;
      // 缓存数据
      remoteDataUtil.addData(`${id}_${field.key}`, data);
      resolve(data);
    });
  });
};

// 部件的数据远程获取
const getRemoteData = async (id: string, uiSchema: any) => {
  console.log('getRemoteData');
  const calls: any[] = [];
  Object.keys(uiSchema).forEach((key) => {
    const field = uiSchema[key];
    if (field['ui:remoteConfig']) {
      switch (field['ui:widget']) {
        case 'select':
          calls.push(getCascaderRemoteData(id, field));
          break;
        case 'radio':
          calls.push(getCascaderRemoteData(id, field));
          break;
        case 'checkbox':
          calls.push(getCascaderRemoteData(id, field));
          break;
        case 'multiSelect':
          calls.push(getCascaderRemoteData(id, field));
          break;
        case 'between':
          calls.push(getCascaderRemoteData(id, field));
          break;
        case 'cascader':
          calls.push(getCascaderRemoteData(id, field));
          break;
        case 'treeSelect':
          calls.push(getTreeSelectRemoteData(id, field));
          break;
        default:
          calls.push(getCascaderRemoteData(id, field));
      }
    }
  });
  if (calls.length > 0) {
    await Promise.all([...calls]);
  }
};
const parse = (id: string, schema: IEditSchemaProps, uiSchema: any) => {
  const items: any[] = [];
  const schemaProperties = schema.properties;
  Object.keys(uiSchema).forEach((key) => {
    const field = uiSchema[key];
    const schemaProperty = schemaProperties[key];
    switch (field['ui:widget']) {
      case 'input':
        items.push(transformInput(field, schemaProperty));
        break;
      case 'inputNumber':
        items.push(transformInputNumber(field, schemaProperty));
        break;
      case 'checkbox':
        items.push(transformCheckbox(field, schemaProperty));
        break;
      case 'datetime':
        items.push(transformDatetime(field, schemaProperty));
        break;
      case 'radio':
        items.push(transformRadio(field, schemaProperty));
        break;
      case 'select':
        items.push(transformSelect(field, schemaProperty));
        break;
      case 'switch':
        items.push(transformSwitch(field, schemaProperty));
        break;
      case 'cascader':
        items.push(transformCascader(field, schemaProperty));
        break;
      case 'between':
        items.push(transformBetween(field, schemaProperty));
        break;
      case 'upload':
        items.push(transformUpload(field, schemaProperty));
        break;
      case 'treeSelect':
        console.log('uiSchema--parse', field);

        items.push(transformTreeSelect(field, schemaProperty));
        break;
      default:
        items.push(transformNormal(field, schemaProperty));
    }
  });
  const formItems: any[] = [];
  // 遍历 parse 函数集 返回的函数
  items.forEach((item) => {
    formItems.push(item);
  });
  return formItems;
};
// const createForm2 = ({
//   id,
//   schema,
//   uiSchema,
//   formData,
// }: {
//   id: string;
//   schema: IEditSchemaProps;
//   uiSchema: any;
//   formData?: any;
// }) => {
//   let generateJsx: (formData: any) => React.ReactElement;
//   if (JsxGeneratorMap.has(id)) {
//     console.log('JsxGeneratorMap--有');
//     generateJsx = JsxGeneratorMap.get(id);
//     return generateJsx(formData);
//   }
//   getRemoteData(id, uiSchema);
//   mergeSchema(schema, uiSchema);
//   console.log('uiSchema--', uiSchema);
//   generateJsx = parse(id, schema, uiSchema);
//   JsxGeneratorMap.set(id, generateJsx);
//   return generateJsx(formData);
// };

const createForm3 = ({
  id,
  schema,
  uiSchema,
}: {
  id: string;
  schema: IEditSchemaProps;
  uiSchema: any;
  formData?: any;
}) => {
  class Enhanceform extends React.PureComponent {
    generateJsx: React.ReactElement[] | undefined;

    constructor(props: any) {
      super(props);
      if (JsxGeneratorMap.has(id)) {
        console.log('JsxGeneratorMap--有');
        this.generateJsx = JsxGeneratorMap.get(id);
      }
      this.state = {
        // eslint-disable-next-line react/no-unused-state
        inited: false,
      };
    }

    async componentDidMount() {
      mergeSchema(schema, uiSchema);
      await getRemoteData(id, uiSchema);
      const genjsx = parse(id, schema, uiSchema);
      JsxGeneratorMap.set(id, genjsx);

      this.generateJsx = genjsx;
      this.setState({
        // eslint-disable-next-line react/no-unused-state
        inited: true,
      });
    }

    render() {
      return this.generateJsx ? this.generateJsx : null;
    }
  }
  return Enhanceform;
};

const getForm = ({
  schema,
  uiSchema,
  formData,
}: {
  schema: IEditSchemaProps;
  uiSchema: any;
  formData?: any;
}) => {
  const id = schema.$id;
  // if (FormMap.has(id)) {
  //   return FormMap.get(id);
  // }
  const newForm = createForm3({ id, schema, uiSchema, formData });
  // FormMap.set(id, newForm);
  return newForm;
};
export default getForm;

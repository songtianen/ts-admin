export interface IUIEditSchemaProps {
  'ui:widget'?: any;
  'ui:options'?: any;
  'ui:rules'?: any[]; // 校验规则
  'ui:title'?: string | any;
  'ui:description'?: string | any;
  'ui:formItemConfig'?: any;
  'ui:onBlur'?: any;
  formItemConfig?: any;
  'ui:remoteConfig'?: any;
  key?: any;
  'ui:type'?: any;
  'ui:children'?: any;
  'ui:getValueFromEvent'?: any;
  'ui:defaultValue'?: any;
  'ui:beginFormItemConfig'?: any;
  'ui:endFormItemConfig'?: any;
  'ui:defaultBeginValue'?: any;
  'ui:defaultEndValue'?: any;
  'ui:dataOptions'?: any;
}

export interface IEditSchemaProps {
  $id: string;
  title?: string;
  description?: string;
  type?: string;
  required?: any[]; //  required: [], // 可传给后端判断，暂时不使用此处配置检验前端表单,前端表单校验规则配置在uiSchema
  properties?: any;
  formLayout?: any;
}

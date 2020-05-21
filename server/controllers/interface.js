const interfaceService = require('../services/interfaceService');

const { success, businessError } = require('../lib/responseTemplate');

const getInterfacePagedList = ({ req, res }) => {
  const { pageIndex } = req.query;
  const { pageSize } = req.query;
  const { sortBy } = req.query;
  const { descending } = req.query;
  const filter = JSON.parse(req.query.filter);

  // console.log('接口列表。。。。', req.query);

  interfaceService
    .InterfacePagedList(pageIndex, pageSize, sortBy, descending, filter)
    .then((doc) => {
      return success({ res, data: doc, msg: '查询成功' });
    })
    .catch(() => {
      return businessError({ res, msg: '查询功能列表失败' });
    });
};
// 删除多条
const delInterface = ({ req, res }) => {
  const { ids } = req.body;
  // let ids = JSON.parse(req.query.ids);
  interfaceService
    .delInterface(ids)
    .then((doc) => {
      if (doc.success) {
        return success({ res, msg: '删除功能成功' });
      }
    })
    .catch((e) => {
      return businessError({ res, msg: e.message });
    });
};

const addInterface = ({ req, res }) => {
  const data = req.body;
  console.log('请求添加接口', data);
  if (data.name === '') {
    return businessError({ res, msg: '名称不能为空!' });
  }
  if (data.path === '') {
    return businessError({ res, msg: '路径不能为空!' });
  }
  if (!data.method) {
    return businessError({ res, msg: '方法不能为空!' });
  }
  interfaceService
    .addInterface(data)
    .then((result) => {
      if (!result.success) {
        return businessError({ res, msg: result.msg });
      }
      return success({ res, msg: result.msg });
    })
    .catch((err) => {
      return businessError({ res, msg: err.message });
    });
};
const editInterface = ({ req, res }) => {
  const info = req.body;
  console.log('编辑功能', info);
  interfaceService
    .editInterface(info)
    .then((doc) => {
      if (doc.success) {
        return success({ res, msg: doc.msg });
      }
      return businessError({ res, msg: doc.msg });
    })
    // eslint-disable-next-line no-unused-vars
    .catch((e) => {
      return businessError({ res, msg: '编辑失败' });
    });
};

module.exports = {
  getInterfacePagedList,
  delInterface,
  addInterface,
  editInterface,
};

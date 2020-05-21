/* eslint-disable camelcase */
const Mock = require('mockjs');
const { IntetfaceModel } = require('../model/model');
const { businessError, success } = require('../lib/responseTemplate');

const findInterFace = async (_path) => {
  const result = await IntetfaceModel.findOne({ path: _path });
  return result;
};
const updateInterface = async (_path, _mock) => {
  await IntetfaceModel.updateOne({ path: _path }, { $set: { mock: _mock } });
};

const findInter = (req, res) => {
  const { method, body, query } = req;
  // console.log('method--', method);
  // console.log('body.setup', body);
  // console.log('query.setup', query);

  const reqPath = req.path;
  const interfaceData = findInterFace(reqPath);
  interfaceData
    .then((rs) => {
      if (!rs) {
        return businessError({ res, msg: '路径不存在' });
      }
      const { path } = rs;
      const mock = rs.mock || {};
      const isEmptyObjMock = Object.keys(mock).length === 0;
      const isObjBody = Object.keys(body).length > 0;
      const isObjQuery = Object.keys(query).length > 0;

      const dbMethod = rs.method.toUpperCase();
      if (dbMethod !== method) {
        return businessError({ res, msg: `${method}方法错误` });
      }

      if (body.setup) {
        updateInterface(path, body.setup);
        return success({ res, data: '', msg: '更新默认返回值成功' });
      }
      if (query.setup) {
        updateInterface(path, JSON.parse(query.setup));
        return success({ res, data: '', msg: '更新默认返回值成功' });
      }

      if (method !== 'GET') {
        if (isObjBody && isEmptyObjMock) {
          // 如果body不是一个空对象，更新数据库mock
          updateInterface(path, body.mock || body);
          const res_post_Data = Mock.mock(body.mock || body);
          return success({ res, data: res_post_Data });
        }
        if (!isObjBody && !isEmptyObjMock) {
          // 如果body是一个空对象，更新数据库mock
          const res_post_Data = Mock.mock(mock);
          return success({ res, data: res_post_Data });
        }
        const res_post_Data = Mock.mock(body.mock || body);
        return success({ res, data: res_post_Data });
      }
      if (method === 'GET') {
        if (isObjQuery && isEmptyObjMock) {
          // 如果query不是一个空对象，更新数据库mock
          updateInterface(path, query.mock || query);
          const res_get_Data = Mock.mock(query.mock || query);
          return success({ res, data: res_get_Data });
        }
        if (!isObjQuery && !isEmptyObjMock) {
          // 如果query不是一个空对象，更新数据库mock
          const res_get_Data = Mock.mock(mock);
          return success({ res, data: res_get_Data });
        }
        const res_get_Data = Mock.mock(query.mock || query);
        return success({ res, data: res_get_Data });
      }
    })
    .catch((e) => {
      return businessError({ res, msg: e.message });
    });
};

module.exports = findInter;

/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
const uuidv4 = require('uuid/v4');
const _ = require('lodash');
const { IntetfaceModel } = require('../model/model');
const dbSchema = require('../db/dbSchema');

// 查询功能列表
module.exports = {
  InterfacePagedList: async (
    pageIndex,
    pageSize,
    sortBy,
    descending,
    filter,
  ) => {
    let resultList = await IntetfaceModel.find({});
    // console.log('接口列表。。。。', resultList);

    resultList = JSON.parse(JSON.stringify(resultList));
    if (filter.method) {
      resultList = _.filter(
        resultList,
        (o) => o.method.indexOf(filter.method) > -1,
      );
    }
    if (filter.name) {
      resultList = _.filter(
        resultList,
        (o) => o.name.indexOf(filter.name) > -1,
      );
    }
    if (filter.path) {
      resultList = _.filter(
        resultList,
        (o) => o.path.indexOf(filter.path) > -1,
      );
    }
    const totalCount = resultList.length;
    if (sortBy) {
      resultList = _.sortBy(resultList, [sortBy]);
      if (descending === 'true') {
        resultList = resultList.reverse();
      }
    } else {
      resultList = _.sortBy(resultList, ['method', 'name']);
      if (descending === 'true') {
        resultList = resultList.reverse();
      }
    }
    const start = (pageIndex - 1) * pageSize;
    const end = pageIndex * pageSize;
    resultList = _.slice(resultList, start, end);
    return {
      totalCount,
      rows: resultList,
    };
  },

  addInterface: async (data) => {
    if (data) {
      if (data.path) {
        const info = await IntetfaceModel.findOne({ path: data.path });
        if (info) {
          return {
            success: false,
            msg: `${info.code}已存在`,
          };
        }
      }
      await IntetfaceModel.create({
        ...dbSchema.Interface,
        ...data,
        id: uuidv4(),
      });
      return {
        success: true,
        msg: '数据库保存成功',
      };
    }

    return {
      success: false,
      msg: '数据库保存失败',
    };
  },
  delInterface: async (ids) => {
    if (ids) {
      await IntetfaceModel.deleteMany({ id: ids });
      return {
        success: true,
        msg: '删除成功！',
      };
    }
    return {
      success: false,
      msg: '参数错误',
    };
  },
  // eslint-disable-next-line consistent-return
  editInterface: async (data) => {
    // 查询一条
    const funcCode = await IntetfaceModel.findOne({ path: data.path });
    if (funcCode && funcCode.id !== data.id) {
      return {
        success: false,
        msg: '路径已经存在',
      };
    }
    if (data.id) {
      const d = await IntetfaceModel.where({ id: data.id }).updateOne({
        $set: { ...data },
      });
      const { ok } = d;
      console.log('保存的数据', typeof d.ok);
      if (ok) {
        return {
          success: true,
          msg: '数据更新成功！',
        };
      }
    }
    return {
      success: false,
      msg: '编辑接口失败',
    };
  },
};

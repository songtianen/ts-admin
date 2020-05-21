const express = require('express');
const {
  getInterfacePagedList,
  addInterface,
  delInterface,
  editInterface,
} = require('../controllers/interface');
const { PermissionCheck } = require('../middleware/PermissionCheck');

const router = express.Router();
router.get(
  '/pagedlist',
  // PermissionCheck({ permission: ['function_view'] }),
  (req, res) => {
    getInterfacePagedList({ req, res });
  },
);
router.post(
  '/add',
  // PermissionCheck({ permission: ['function_add'] }),
  (req, res) => {
    addInterface({ req, res });
  },
);
router.post(
  '/edit',
  PermissionCheck({ permission: ['function_edit'] }),
  (req, res) => {
    editInterface({ req, res });
  },
);
router.post(
  '/del',
  PermissionCheck({ permission: ['function_del'] }),
  (req, res) => {
    delInterface({ req, res });
  },
);
module.exports = router;

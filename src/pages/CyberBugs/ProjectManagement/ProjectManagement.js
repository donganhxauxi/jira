import React, { useState, useEffect } from 'react';
import {
  AutoComplete, Button, Popover, Space, Table, Tag, Avatar,
  Popconfirm, message,
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { NavLink } from 'react-router-dom';
import FormEditProject from '../../../components/Forms/FormEditProject/FromEditProject';

// const data =  [
//     {
//       "members": [
//         {
//           "userId": 1867,
//           "name": "Thien Nguyen",
//           "avatar": "https://ui-avatars.com/api/?name=Thien Nguyen"
//         },
//         {
//           "userId": 1882,
//           "name": "minhthien",
//           "avatar": "https://ui-avatars.com/api/?name=minhthien"
//         },
//         {
//           "userId": 1881,
//           "name": "minhthien",
//           "avatar": "https://ui-avatars.com/api/?name=minhthien"
//         },
//         {
//           "userId": 1896,
//           "name": "ThienHacker",
//           "avatar": "https://ui-avatars.com/api/?name=ThienHacker"
//         },
//         {
//           "userId": 1861,
//           "name": "Khoa",
//           "avatar": "https://ui-avatars.com/api/?name=Khoa"
//         },
//         {
//           "userId": 1027,
//           "name": "thanh",
//           "avatar": "https://ui-avatars.com/api/?name=thanh"
//         },
//         {
//           "userId": 1191,
//           "name": "khai 123",
//           "avatar": "https://ui-avatars.com/api/?name=khai 123"
//         }
//       ],
//       "creator": {
//         "id": 1861,
//         "name": "Khoa"
//       },
//       "id": 4891,
//       "projectName": "Thor Love and Thunder",
//       "description": "<p><br></p>",
//       "categoryId": 1,
//       "categoryName": "Dự án web",
//       "alias": "thor-love-and-thunder",
//       "deleted": false
//     },
//     {
//       "members": [
//         {
//           "userId": 1777,
//           "name": "hung",
//           "avatar": "https://ui-avatars.com/api/?name=hung"
//         },
//         {
//           "userId": 850,
//           "name": "thangedit2adsadsa",
//           "avatar": "https://ui-avatars.com/api/?name=thangedit2adsadsa"
//         },
//         {
//           "userId": 862,
//           "name": "Test ",
//           "avatar": "https://ui-avatars.com/api/?name=Test "
//         },
//         {
//           "userId": 1024,
//           "name": "zoro112212",
//           "avatar": "https://ui-avatars.com/api/?name=zoro112212"
//         },
//         {
//           "userId": 1027,
//           "name": "thanh",
//           "avatar": "https://ui-avatars.com/api/?name=thanh"
//         },
//         {
//           "userId": 1191,
//           "name": "khai 123",
//           "avatar": "https://ui-avatars.com/api/?name=khai 123"
//         }
//       ],
//       "creator": {
//         "id": 1777,
//         "name": "hung"
//       },
//       "id": 4894,
//       "projectName": "My project",
//       "description": "<h1><span style=\"background-color: rgb(224, 62, 45);\"><strong>Hung's Project</strong></span></h1>",
//       "categoryId": 1,
//       "categoryName": "Dự án web",
//       "alias": "my-project",
//       "deleted": false
//     },
//     {
//       "members": [
//         {
//           "userId": 827,
//           "name": "Ca map con",
//           "avatar": "https://ui-avatars.com/api/?name=Ca map con"
//         }
//       ],
//       "creator": {
//         "id": 1866,
//         "name": "khải"
//       },
//       "id": 4913,
//       "projectName": "KiemDinh",
//       "description": "<p>KiemDinh</p>",
//       "categoryId": 1,
//       "categoryName": "Dự án web",
//       "alias": "kiemdinh",
//       "deleted": false
//     },
//     {
//       "members": [
//         {
//           "userId": 1861,
//           "name": "Khoa",
//           "avatar": "https://ui-avatars.com/api/?name=Khoa"
//         },
//         {
//           "userId": 862,
//           "name": "Test ",
//           "avatar": "https://ui-avatars.com/api/?name=Test "
//         },
//         {
//           "userId": 984,
//           "name": "Change Name",
//           "avatar": "https://ui-avatars.com/api/?name=Change Name"
//         },
//         {
//           "userId": 850,
//           "name": "thangedit2adsadsa",
//           "avatar": "https://ui-avatars.com/api/?name=thangedit2adsadsa"
//         },
//         {
//           "userId": 1537,
//           "name": "Ngọc Long",
//           "avatar": "https://ui-avatars.com/api/?name=Ngọc Long"
//         }
//       ],
//       "creator": {
//         "id": 1834,
//         "name": "James Nguyen"
//       },
//       "id": 4925,
//       "projectName": "AAAAAAAAAAAAAAAAAAAAAAAsa2123",
//       "description": "<p>AAAAAAAAAAAAAAAAAAAAAAAsa2123</p>",
//       "categoryId": 2,
//       "categoryName": "Dự án phần mềm",
//       "alias": "aaaaaaaaaaaaaaaaaaaaaaasa2123",
//       "deleted": false
//     },
//     {
//       "members": [
//         {
//           "userId": 1834,
//           "name": "James Nguyen",
//           "avatar": "https://ui-avatars.com/api/?name=James Nguyen"
//         },
//         {
//           "userId": 1807,
//           "name": "Nguyễn Hà Hiệp",
//           "avatar": "https://ui-avatars.com/api/?name=Nguyễn Hà Hiệp"
//         }
//       ],
//       "creator": {
//         "id": 1807,
//         "name": "Nguyễn Hà Hiệp"
//       },
//       "id": 4932,
//       "projectName": "get go",
//       "description": "<ul style=\"list-style-type: circle;\">\n<li style=\"text-align: center;\">\n<h1><span style=\"background-color: #000000;\"><strong><em>aloooo</em></strong></span></h1>\n</li>\n</ul>",
//       "categoryId": 2,
//       "categoryName": "Dự án phần mềm",
//       "alias": "get-go",
//       "deleted": false
//     },
//     {
//       "members": [
//         {
//           "userId": 1869,
//           "name": "23123123",
//           "avatar": "https://ui-avatars.com/api/?name=23123123"
//         }
//       ],
//       "creator": {
//         "id": 1900,
//         "name": "nguyenthai"
//       },
//       "id": 4933,
//       "projectName": "Nguyen Thai",
//       "description": "<p>sadfasdf</p>",
//       "categoryId": 1,
//       "categoryName": "Dự án web",
//       "alias": "nguyen-thai",
//       "deleted": false
//     },
//     {
//       "members": [
//         {
//           "userId": 1861,
//           "name": "Khoa",
//           "avatar": "https://ui-avatars.com/api/?name=Khoa"
//         },
//         {
//           "userId": 1191,
//           "name": "khai 123",
//           "avatar": "https://ui-avatars.com/api/?name=khai 123"
//         },
//         {
//           "userId": 1792,
//           "name": "hoang khiem3k",
//           "avatar": "https://ui-avatars.com/api/?name=hoang khiem3k"
//         },
//         {
//           "userId": 1896,
//           "name": "ThienHacker",
//           "avatar": "https://ui-avatars.com/api/?name=ThienHacker"
//         }
//       ],
//       "creator": {
//         "id": 1834,
//         "name": "James Nguyen"
//       },
//       "id": 4936,
//       "projectName": "AAAAa123123",
//       "description": "<p>AAAA don't edit this project, please</p>",
//       "categoryId": 1,
//       "categoryName": "Dự án web",
//       "alias": "aaaaa123123",
//       "deleted": false
//     },
//     {
//       "members": [
//         {
//           "userId": 1906,
//           "name": "luan",
//           "avatar": "https://ui-avatars.com/api/?name=luan"
//         }
//       ],
//       "creator": {
//         "id": 1906,
//         "name": "luan"
//       },
//       "id": 4937,
//       "projectName": "luan create project test",
//       "description": "<p>tesst project</p>",
//       "categoryId": 1,
//       "categoryName": "Dự án web",
//       "alias": "luan-create-project-test",
//       "deleted": false
//     },
//     {
//       "members": [
//         {
//           "userId": 1874,
//           "name": "ThanhCong",
//           "avatar": "https://ui-avatars.com/api/?name=ThanhCong"
//         }
//       ],
//       "creator": {
//         "id": 1807,
//         "name": "Nguyễn Hà Hiệp"
//       },
//       "id": 4938,
//       "projectName": "web develop",
//       "description": "<p>sadsadsa</p>",
//       "categoryId": 1,
//       "categoryName": "Dự án web",
//       "alias": "web-develop",
//       "deleted": false
//     },
//     {
//       "members": [
//         {
//           "userId": 827,
//           "name": "Ca map con",
//           "avatar": "https://ui-avatars.com/api/?name=Ca map con"
//         },
//         {
//           "userId": 862,
//           "name": "Test ",
//           "avatar": "https://ui-avatars.com/api/?name=Test "
//         }
//       ],
//       "creator": {
//         "id": 1866,
//         "name": "khải"
//       },
//       "id": 4940,
//       "projectName": "vu1",
//       "description": "<p>vu1</p>",
//       "categoryId": 1,
//       "categoryName": "Dự án web",
//       "alias": "vu1",
//       "deleted": false
//     },
//     {
//       "members": [
//         {
//           "userId": 1902,
//           "name": "Tiến",
//           "avatar": "https://ui-avatars.com/api/?name=Tiến"
//         }
//       ],
//       "creator": {
//         "id": 1902,
//         "name": "Tiến"
//       },
//       "id": 4941,
//       "projectName": "Project Jira",
//       "description": "<p>project</p>",
//       "categoryId": 1,
//       "categoryName": "Dự án web",
//       "alias": "project-jira",
//       "deleted": false
//     },
//     {
//       "members": [
//         {
//           "userId": 1859,
//           "name": "khiem 000",
//           "avatar": "https://ui-avatars.com/api/?name=khiem 000"
//         }
//       ],
//       "creator": {
//         "id": 1807,
//         "name": "Nguyễn Hà Hiệp"
//       },
//       "id": 4943,
//       "projectName": "dsadsa",
//       "description": "<p>sadsa</p>",
//       "categoryId": 1,
//       "categoryName": "Dự án web",
//       "alias": "dsadsa",
//       "deleted": false
//     },
//     {
//       "members": [
//         {
//           "userId": 1807,
//           "name": "Nguyễn Hà Hiệp",
//           "avatar": "https://ui-avatars.com/api/?name=Nguyễn Hà Hiệp"
//         }
//       ],
//       "creator": {
//         "id": 1910,
//         "name": "hiep04"
//       },
//       "id": 4945,
//       "projectName": "test ",
//       "description": "<p>ha hiep</p>",
//       "categoryId": 1,
//       "categoryName": "Dự án web",
//       "alias": "test",
//       "deleted": false
//     },
//     {
//       "members": [],
//       "creator": {
//         "id": 827,
//         "name": "Ca map con"
//       },
//       "id": 4946,
//       "projectName": "string",
//       "description": "string",
//       "categoryId": 1,
//       "categoryName": "Dự án web",
//       "alias": "string",
//       "deleted": false
//     },
//     {
//       "members": [],
//       "creator": {
//         "id": 1911,
//         "name": "Sally"
//       },
//       "id": 4947,
//       "projectName": "HUONGLE",
//       "description": "<p><span style=\"background-color: rgb(241, 196, 15);\"><strong>TEST THU THUI A</strong></span></p>",
//       "categoryId": 1,
//       "categoryName": "Dự án web",
//       "alias": "huongle",
//       "deleted": false
//     },
//     {
//       "members": [],
//       "creator": {
//         "id": 1911,
//         "name": "Sally"
//       },
//       "id": 4948,
//       "projectName": "NONONONO",
//       "description": "<p>dg</p>",
//       "categoryId": 1,
//       "categoryName": "Dự án web",
//       "alias": "nononono",
//       "deleted": false
//     },
//     {
//       "members": [],
//       "creator": {
//         "id": 827,
//         "name": "Ca map con"
//       },
//       "id": 4949,
//       "projectName": "create database",
//       "description": "no hope",
//       "categoryId": 1,
//       "categoryName": "Dự án web",
//       "alias": "create-database",
//       "deleted": false
//     },
//     {
//       "members": [],
//       "creator": {
//         "id": 1899,
//         "name": "Cyber"
//       },
//       "id": 4950,
//       "projectName": "Test 10",
//       "description": "Test",
//       "categoryId": 1,
//       "categoryName": "Dự án web",
//       "alias": "test-10",
//       "deleted": false
//     },
//     {
//       "members": [],
//       "creator": {
//         "id": 1899,
//         "name": "Cyber"
//       },
//       "id": 4951,
//       "projectName": "ProjectNameTest",
//       "description": "<p>ProjectNameTest</p>",
//       "categoryId": 2,
//       "categoryName": "Dự án phần mềm",
//       "alias": "projectnametest",
//       "deleted": false
//     },
//     {
//       "members": [],
//       "creator": {
//         "id": 1912,
//         "name": "string"
//       },
//       "id": 4952,
//       "projectName": "project m",
//       "description": "string",
//       "categoryId": 1,
//       "categoryName": "Dự án web",
//       "alias": "project-m",
//       "deleted": false
//     }
//   ]

export default function ProjectManagement(props) {
  // Lấy dữ liệu từ reducer về component
  const projectList = useSelector(
    (state) => state.ProjectCyberBugsReducer.projectList,
  );

  const { userSearch } = useSelector(
    (state) => state.UserLoginCyberBugsReducer,
  );

  const [value, setValue] = useState('');

  // Sử dụng useDispatch để gọi action
  const dispatch = useDispatch();

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  useEffect(() => {
    dispatch({ type: 'GET_LIST_PROJECT_SAGA' });
  }, []);

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setAgeSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'age',
    });
  };

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      sorter: (item2, item1) => item2.id - item1.id,
      sortDirections: ['descend'],
    },
    {
      title: 'projectName',
      dataIndex: 'projectName',
      key: 'projectName',
      render: (text, record, index) => (
        <NavLink to={`/projectdetail/${record.id}`}>
          {' '}
          {text}
        </NavLink>
      ),
      sorter: (item2, item1) => {
        const projectName1 = item1.projectName?.trim().toLowerCase();
        const projectName2 = item2.projectName?.trim().toLowerCase();
        if (projectName2 < projectName1) {
          return -1;
        }
        return 1;
      },
    },

    {
      title: 'category',
      dataIndex: 'categoryName',
      key: 'categoryName',
      sorter: (item2, item1) => {
        const categoryName1 = item1.categoryName?.trim().toLowerCase();
        const categoryName2 = item2.categoryName?.trim().toLowerCase();
        if (categoryName2 < categoryName1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: 'creator',

      key: 'creator',
      render: (text, record, index) => <Tag color="green">{record.creator?.name}</Tag>,
      sorter: (item2, item1) => {
        const creator1 = item1.creator?.name.trim().toLowerCase();
        const creator2 = item2.creator?.name.trim().toLowerCase();
        if (creator2 < creator1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: 'members',
      key: 'members',
      render: (text, record, index) => (
        <div>
          {record.members?.slice(0, 3).map((member, index) => (
            <Popover
              key={index}
              placement="top"
              title="members"
              content={() => (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>avatar</th>
                      <th>name</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {record.members?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.userId}</td>
                        <td>
                          <img
                            src={item.avatar}
                            width="30"
                            height="30"
                            style={{ borderRadius: '15px' }}
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>
                          <button
                            onClick={() => {
                              dispatch({
                                type: 'REMOVE_USER_PROJECT_API',
                                userProject: {
                                  userId: item.userId,
                                  projectId: record.id,
                                },
                              });
                            }}
                            className="btn btn-danger"
                            style={{ borderRadius: '50%' }}
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            >
              <Avatar key={index} src={member.avatar} />
            </Popover>
          ))}

          {record.members?.length > 3 ? <Avatar>...</Avatar> : ''}

          <Popover
            placement="rightBottom"
            title="Add user"
            content={() => (
              <AutoComplete
                options={userSearch?.map((user, index) => ({
                  label: user.name,
                  value: user.userId.toString(),
                }))}
                value={value} // value label mỗi lần setState cập nhập lại
                onChange={(text) => {
                  setValue(text);
                }}
                // value người dùng chọn
                onSelect={(valueSelect, option) => {
                  // set giá trị của hộp thọai = option.label
                  setValue(option.label);
                  // Gọi api gửi về backend
                  dispatch({
                    type: 'ADD_USER_PROJECT_API',
                    userProject: {
                      // giá trị ứng với backend
                      projectId: record.id,
                      userId: valueSelect,
                    },
                  });
                }}
                style={{ width: '100%' }}
                onSearch={(value) => {
                  dispatch({
                    type: 'GET_USER_API',
                    keyWord: value,
                  });
                }}
              />
            )}
            trigger="click"
          >
            <Button style={{ borderRadius: '50%' }}>+</Button>
          </Popover>
        </div>
      ),
    },

    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (text, record, index) =>
        //   <Space size="middle">
        //     <a><EditOutlined /></a>
        //     <a><DeleteOutlined /></a>
        //   </Space>
        // ),
        (
          <div>
            <button
              className="btn mr-1 btn-primary"
              style={{ fontSize: 5 }}
              onClick={() => {
                const action = {
                  type: 'OPEN_FORM_EDIT_PROJECT',
                  title: 'Edit Project',
                  Component: <FormEditProject />,
                };

                // dispatch lên reducer nội dung drawer
                dispatch(action);
                // dispatch dữ liệu dòng hiện tai lên reducer
                const actionEditProject = {
                  type: 'EDIT_PROJECT',
                  projectEditModel: record,
                };
                dispatch(actionEditProject);
              }}
            >
              <EditOutlined style={{ fontSize: 13 }} />
            </button>
            <Popconfirm
              title="Are you sure to delete this project?"
              onConfirm={() => {
                dispatch({
                  type: 'DELETE_PROJECT_SAGA',
                  idProject: record.id,
                });
              }}
              okText="Yes"
              cancelText="No"
            >
              <button className="btn btn-danger" style={{ fontSize: 5 }}>
                <DeleteOutlined style={{ fontSize: 13 }} />
              </button>
            </Popconfirm>
            ,
          </div>
        ),
    },
  ];
  return (
    <div className="container-fluid mt-5">
      <h3>Project Management</h3>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        columns={columns}
        rowKey="id"
        dataSource={projectList}
        onChange={handleChange}
      />
    </div>
  );
}

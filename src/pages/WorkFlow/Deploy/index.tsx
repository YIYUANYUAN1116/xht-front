import { ACTIVITI_URL } from '@/services/workflow/deploy/api';
import { GET_TOKEN } from '@/utils/tokenUtil';
import { InboxOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { Modal, UploadProps } from 'antd/lib';
import Dragger from 'antd/lib/upload/Dragger';
import { useState } from 'react';

export type TableListItem = {
  procdefId: number; //流程定义ID
  deployId_: string; //流程部署ID
  procdefKey_: string; //流程定义key
  procdefName_: string; //流程名称
  resourceName_: string; //流程资源
  deployTime_: number;
  version_: string;
};

export default () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tableListDataSource: TableListItem[] = [];
  const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];
 
  for (let i = 1; i <= 5; i += 1) {
    tableListDataSource.push({
      procdefId: i,
      deployId_: 'AppName' + i,
      procdefKey_: 'AppName' + i,
      procdefName_: creators[Math.floor(Math.random() * creators.length)],
      resourceName_: '' + i,
      deployTime_: Date.now() - Math.floor(Math.random() * 2000),
      version_: '' + i,
    });
  }

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '排序',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },

    {
      title: '流程定义ID',
      dataIndex: 'procdefId',
      width: 120,
      fixed: true,
    },

    {
      title: '流程部署ID',
      dataIndex: 'deployId_',
      width: 120,
      fixed: true,
    },

    {
      title: '流程定义ID',
      dataIndex: 'procdefKey_',
      search: false,
      width: 120,
    },

    {
      title: '流程名称',
      dataIndex: 'procdefName_',
      width: 120,
    },

    {
      title: '流程资源',
      dataIndex: 'resourceName_',
      search: false,
      width: 120,
    },

    {
      title: '创建者',
      dataIndex: 'creator',
      valueEnum: {
        all: { text: '全部' },
        付小小: { text: '付小小' },
        曲丽丽: { text: '曲丽丽' },
        林东东: { text: '林东东' },
        陈帅帅: { text: '陈帅帅' },
        兼某某: { text: '兼某某' },
      },
      width: 120,
    },
    {
      title: '版本',
      dataIndex: 'version',
      width: 120,
      search: false,
    },
    {
      title: '分类',
      dataIndex: 'category',
      width: 120,
      search: false,
    },

    {
      title: '创建时间',
      dataIndex: 'deployTime_',
      width: 120,
      valueType: 'dateTime',
    },
    {
      title: '操作',
      width: 180,
      key: 'option',
      valueType: 'option',
      render: () => [<a key="link">查看</a>, <a key="link2">下载</a>, <a key="link3">删除</a>],
    },
  ];
  let token = GET_TOKEN();
  if(!token){
    token=''
  }
  const props: UploadProps = {
    name: 'file',
    multiple: false,
    action: ACTIVITI_URL.DEPLOY_URL,
    headers: {
      "authorization": token
      },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <PageContainer>
      <ProTable<TableListItem>
        columns={columns}
        request={(params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log(params, sorter, filter);
          return Promise.resolve({
            data: tableListDataSource,
            success: true,
          });
        }}
        rowKey="key"
        pagination={{
          showQuickJumper: true,
        }}
        search={{
          layout: 'vertical',
          defaultCollapsed: false,
        }}
        dateFormatter="string"
        toolbar={{
          title: '工作流部署',
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="deploy"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            部署
          </Button>,
        ]}
      />

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
          
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Please select the zip file containing .bpmn20.xml and the corresponding PNG
          </p>
        </Dragger>
      </Modal>
    </PageContainer>
  );
};

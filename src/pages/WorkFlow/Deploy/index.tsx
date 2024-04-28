
import { deployList } from '@/services/workflow/deploy/api';
import { GET_TOKEN } from '@/utils/tokenUtil';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { Modal, UploadProps } from 'antd/lib';
import Dragger from 'antd/lib/upload/Dragger';
import { useState } from 'react';

export type TableListItem = {
  deployName: number; //流程定义ID
  procDefId: number; //流程定义ID
  deployId: string; //流程部署ID
  procDefName: string; //流程名称
  resourceName: string; //流程资源
  deployTime: number;
  version: string;
};

export default () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tableListDataSource: TableListItem[] = [];

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '排序',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
      fixed: true,
      search:false
    
    },
    {
      title: '流程名称',
      dataIndex: 'procDefName',
      width: 120,
    },


    {
      title: '流程名称',
      dataIndex: 'deployName',
      width: 120,
      search:false,
      fixed: true,
    },

    {
      title: '流程定义ID',
      dataIndex: 'procDefId',
      width: 120,
      fixed: true,
      search:false
    },

    {
      title: '流程部署ID',
      dataIndex: 'deployId',
      width: 120,
      search:false
    },

    {
      title: '流程资源',
      dataIndex: 'resourceName',
      search: false,
      width: 120,
    },

    {
      title: '创建者',
      dataIndex: 'creator',
      width: 120,
      search:false
    },
    {
      title: '版本',
      dataIndex: 'version',
      width: 120,
      search: false,
    },
    

    {
      title: '创建时间',
      dataIndex: 'deployTime',
      width: 120,
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '操作',
      width: 180,
      key: 'option',
      valueType: 'option',
      fixed: 'right',
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
    action: '/activiti/deploy',
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
      <ProTable
        columns={columns}
        request={async (params, sorter, filter) => {
           const res =  await deployList({
            'current': params.current?params.current:0,
            'pageSize': params.pageSize?params.pageSize:5,
            "procDefName": params.procDefName
          })

           return {data: res.data,success:res.success}
        }}
        scroll={{ x: 'max-content' }} // 使用max-content根据内容自动设置滚动区域的宽度
        rowKey="procDefId"
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

import { EllipsisOutlined, SearchOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Input } from 'antd';
import search from 'antd/lib/transfer/search';

const valueEnum = {
    0: 'close',
    1: 'running',
    2: 'online',
    3: 'error',
};

export type TableListItem = {
    id: number;
    name: string;
    creator: string
    category: number;
    version: string;
    description: string;
    lastUpdateTime: number;
    key: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 5; i += 1) {
    tableListDataSource.push({
        id: i,
        name: 'AppName',
        category: i,
        version: '1',
        creator:'张三'+i,
        description: ''+i+i+i,
        lastUpdateTime: Date.now(),
        key:''+i
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
        title: '模型名称',
        dataIndex: 'name',
        ellipsis: true,
        render: (_) => <a>{_}</a>,
    },

    {
        title: '模型Key',
        dataIndex: 'key',
        ellipsis: true,
        search: false
    },

    {
        title: '模型版本',
        dataIndex: 'version',
        ellipsis: true,
        search: false
    },

    {
        title: '创建者',
        dataIndex: 'creator',
        ellipsis: true,
    },

    {
        title: '描述',
        dataIndex: 'description',
        ellipsis: true,
        search: false
    },

    {
        title: '上次更新时间',
        dataIndex: 'lastUpdateTime',
        ellipsis: true,
        valueType: 'dateTime',
    },

    {
        title: '操作',
        width: 180,
        key: 'option',
        valueType: 'option',
        render: () => [
            <a key="link">设计</a>,
            <a key="link2">导出</a>,
            <a key="link3">删除</a>,
        ],
    },
];

export default () => {
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
    

                toolBarRender={() => [
                  
                    <Button type="primary" key="primary">
                        新建模型
                    </Button>

                ]}
            />
        </PageContainer>

    );
};
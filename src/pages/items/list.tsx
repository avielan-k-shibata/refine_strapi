import {
    useExport,
} from "@pankod/refine-core";

import {
    List,
    // TextField,
    TagField,
    DateField,
    Table,
    useTable,
    getDefaultSortOrder,
    Space,
    EditButton,
    DeleteButton,
    useSelect,
    FilterDropdown,
    Select,
    ExportButton,
    useImport,
    ImportButton,
} from "@pankod/refine-antd";

import { IItem, IItemFile } from "interfaces";

export const ItemList: React.FC = () => {
    const { tableProps, sorter } = useTable<IItem>({
        metaData: {
            fields: ["id", "name", "status"],
            populate: ["category"],
        },
    });

    const { selectProps } = useSelect({
        resource: "categories",
        optionLabel: "name",
        optionValue: "name",
    });

    const { triggerExport, isLoading } = useExport<IItem>();
    const importProps = useImport<IItemFile>();
    return (
        <List
        pageHeaderProps={{
            extra: (
                <>
                <ImportButton {...importProps} />
                <ExportButton onClick={triggerExport} loading={isLoading} />
                </>
            ),
        }}
        >
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="id"
                    title="ID"
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                    sorter={{ multiple: 3 }}
                />
                <Table.Column dataIndex="name" title="名前" />
                <Table.Column
                    dataIndex="status"
                    title="status"
                    render={(value) => <TagField value={value} />}
                />
                <Table.Column
                    dataIndex="createdAt"
                    title="createdAt"
                    render={(value) => <DateField format="LLL" value={value} />}
                />
                <Table.Column
                    dataIndex={["category", "name"]}
                    title="Category"
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                style={{ minWidth: 200 }}
                                mode="multiple"
                                placeholder="Select Category"
                                {...selectProps}
                            />
                        </FilterDropdown>
                    )}
                />
                <Table.Column<{ id: string }>
                    title="Actions"
                    render={(_, record) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <DeleteButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
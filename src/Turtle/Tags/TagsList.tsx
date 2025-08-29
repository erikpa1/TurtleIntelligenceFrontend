import React from 'react';
import {
    Button,
    Card,
    Modal,
    Input,
    Typography,
    Space,
    Row,
    Col,
    Empty,
    Tooltip,
    message, Flex
} from 'antd';

import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    SearchOutlined,
    TagOutlined
} from '@ant-design/icons';
import ColorConstants from "@Turtle/Constants/ColorConstants";
import {HierarchyDeleteButton} from "@Turtle/Components/HierarchyComponents";

const {Title, Text} = Typography;
const {Search} = Input;

interface Tag {
    id: string;
    name: string;
    color: string;
    documentCount: number;
}

const TAG_COLORS = [
    "#722ed1", // purple
    "#1890ff", // blue
    "#52c41a", // green
    "#faad14", // orange
    "#f5222d", // red
    "#8c8c8c", // gray
    "#eb2f96", // magenta
    "#13c2c2", // cyan
];

const ColorPicker = ({value, onChange, colors}) => (
    <Space wrap>
        {colors.map((color) => (
            <div
                key={color}
                onClick={() => onChange(color)}
                style={{
                    width: 32,
                    height: 32,
                    backgroundColor: color,
                    borderRadius: '50%',
                    cursor: 'pointer',
                    border: value === color ? '3px solid #1890ff' : '2px solid #d9d9d9',
                    transition: 'all 0.2s',
                }}
            />
        ))}
    </Space>
);


interface TagsListProps {
    type: string
}

export default function TagsList({type}: TagsListProps) {

    const [tags, setTags] = React.useState([
        {id: "1", name: "Important", color: ColorConstants.RED, documentCount: 12},
        {id: "2", name: "Work", color: ColorConstants.AZURE_BLUE, documentCount: 8},
        {id: "3", name: "Personal", color: ColorConstants.GREEN, documentCount: 5},
        {id: "4", name: "Archive", color: ColorConstants.GRAY, documentCount: 23},
    ]);

    const [searchQuery, setSearchQuery] = React.useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [editingTag, setEditingTag] = React.useState(null);
    const [createForm, setCreateForm] = React.useState({color: TAG_COLORS[0]});
    const [editForm, setEditForm] = React.useState({});

    const filteredTags = tags.filter((tag) =>
        tag.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCreateTagSubmit = () => {
        if (!createForm.name?.trim()) {
            message.error('Please enter a tag name!');
            return;
        }

        const newTag = {
            id: Date.now().toString(),
            name: createForm.name.trim(),
            color: createForm.color || TAG_COLORS[0],
            documentCount: 0,
        };
        setTags([...tags, newTag]);
        setIsCreateModalOpen(false);
        setCreateForm({color: TAG_COLORS[0]});
        message.success('Tag created successfully!');
    };

    const handleEditTagSubmit = () => {
        if (!editForm.name?.trim()) {
            message.error('Please enter a tag name!');
            return;
        }

        setTags(
            tags.map((tag) =>
                tag.id === editingTag.id
                    ? {...tag, name: editForm.name.trim(), color: editForm.color}
                    : tag
            )
        );
        setEditingTag(null);
        setIsEditModalOpen(false);
        setEditForm({});
        message.success('Tag updated successfully!');
    };

    const handleDeleteTag = (tagId, tagName) => {
        Modal.confirm({
            title: 'Delete Tag',
            content: `Are you sure you want to delete the tag "${tagName}"?`,
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: () => {
                setTags(tags.filter((tag) => tag.id !== tagId));
                message.success('Tag deleted successfully!');
            },
        });
    };

    const openEditModal = (tag) => {
        setEditingTag(tag);
        setEditForm({
            name: tag.name,
            color: tag.color,
        });
        setIsEditModalOpen(true);
    };

    const openCreateModal = () => {
        setCreateForm({color: TAG_COLORS[0]});
        setIsCreateModalOpen(true);
    };

    return (
        <div style={{width: 800, margin: '0 auto', padding: '24px'}}>


            <Flex justify={"center"} style={{marginBottom: 24}}>
                <Search
                    defaultValue={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                    }}
                    variant="borderless"
                    style={{
                        width: '200px',
                        flex: 'none',
                        borderBottom: '1px solid #d9d9d9',
                        borderRadius: 0
                    }}
                />
            </Flex>


            {/* Tags Grid */}
            {filteredTags.length > 0 ? (
                <Row gutter={[16, 16]}>
                    {filteredTags.map((tag) => (
                        <Col xs={24} sm={12} lg={8} key={tag.id}>
                            <Card
                                size="small"
                                hoverable
                                actions={[
                                    <Tooltip title="Edit tag">
                                        <EditOutlined
                                            onClick={() => openEditModal(tag)}
                                            style={{color: '#1890ff'}}
                                        />
                                    </Tooltip>,
                                    <HierarchyDeleteButton
                                        onClick={handleDeleteTag}
                                    />
                                ]}
                            >
                                <Card.Meta
                                    avatar={
                                        <div
                                            style={{
                                                width: 16,
                                                height: 16,
                                                backgroundColor: tag.color,
                                                borderRadius: '50%',
                                                marginTop: 4
                                            }}
                                        />
                                    }
                                    title={
                                        <Text strong style={{fontSize: 16}}>
                                            {tag.name}
                                        </Text>
                                    }
                                    description={
                                        <Space>
                                            <TagOutlined style={{fontSize: 12}}/>
                                            <Text type="secondary" style={{fontSize: 12}}>
                                                {tag.documentCount} documents
                                            </Text>
                                        </Space>
                                    }
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <Empty
                    image={<TagOutlined style={{fontSize: 48, color: '#d9d9d9'}}/>}
                    description={
                        <div>
                            <Text type="secondary" style={{fontSize: 16, display: 'block', marginBottom: 8}}>
                                No tags found
                            </Text>
                            <Text type="secondary">
                                {searchQuery
                                    ? "Try adjusting your search"
                                    : "Create your first tag to get started"
                                }
                            </Text>
                        </div>
                    }
                >
                    {!searchQuery && (
                        <Button
                            type="primary"
                            icon={<PlusOutlined/>}
                            onClick={openCreateModal}
                        >
                            Create Tag
                        </Button>
                    )}
                </Empty>
            )}

            {/* Create Tag Modal */}
            <Modal
                title="Create New Tag"
                open={isCreateModalOpen}
                onCancel={() => {
                    setIsCreateModalOpen(false);
                    setCreateForm({color: TAG_COLORS[0]});
                }}
                footer={null}
                destroyOnClose
            >
                <div style={{padding: '16px 0'}}>
                    <div style={{marginBottom: 16}}>
                        <label style={{display: 'block', marginBottom: 8, fontWeight: 500}}>
                            Tag Name
                        </label>
                        <Input
                            placeholder="Enter tag name..."
                            size="large"
                            value={createForm.name || ''}
                            onChange={(e) => setCreateForm({...createForm, name: e.target.value})}
                            onPressEnter={handleCreateTagSubmit}
                        />
                    </div>

                    <div style={{marginBottom: 24}}>
                        <label style={{display: 'block', marginBottom: 8, fontWeight: 500}}>
                            Color
                        </label>
                        <ColorPicker
                            colors={TAG_COLORS}
                            value={createForm.color || TAG_COLORS[0]}
                            onChange={(color) => setCreateForm({...createForm, color})}
                        />
                    </div>

                    <Space style={{width: '100%'}}>
                        <Button
                            type="primary"
                            onClick={handleCreateTagSubmit}
                            size="small"
                        >
                            Create Tag
                        </Button>
                        <Button
                            onClick={() => {
                                setIsCreateModalOpen(false);
                                setCreateForm({});
                            }}
                            style={{flex: 1, width: '48%'}}
                            size="large"
                        >
                            Cancel
                        </Button>
                    </Space>
                </div>
            </Modal>

            {/* Edit Tag Modal */}
            <Modal
                title="Edit Tag"
                open={isEditModalOpen}
                onCancel={() => {
                    setIsEditModalOpen(false);
                    setEditingTag(null);
                    setEditForm({});
                }}
                footer={null}
                destroyOnClose
            >
                <div style={{padding: '16px 0'}}>
                    <div style={{marginBottom: 16}}>
                        <label style={{display: 'block', marginBottom: 8, fontWeight: 500}}>
                            Tag Name
                        </label>
                        <Input
                            placeholder="Enter tag name..."
                            size="large"
                            value={editForm.name || ''}
                            onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                            onPressEnter={handleEditTagSubmit}
                        />
                    </div>

                    <div style={{marginBottom: 24}}>
                        <label style={{display: 'block', marginBottom: 8, fontWeight: 500}}>
                            Color
                        </label>
                        <ColorPicker
                            colors={TAG_COLORS}
                            value={editForm.color || TAG_COLORS[0]}
                            onChange={(color) => setEditForm({...editForm, color})}
                        />
                    </div>

                    <Space style={{width: '100%'}}>
                        <Button
                            type="primary"
                            onClick={handleEditTagSubmit}
                            style={{flex: 1, width: '48%'}}
                            size="large"
                        >
                            Save Changes
                        </Button>
                        <Button
                            onClick={() => {
                                setIsEditModalOpen(false);
                                setEditingTag(null);
                                setEditForm({});
                            }}
                            style={{flex: 1, width: '48%'}}
                            size="large"
                        >
                            Cancel
                        </Button>
                    </Space>
                </div>
            </Modal>
        </div>
    );
}
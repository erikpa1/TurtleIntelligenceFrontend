import {Flex, Form, FormItemProps, Input, Space, Button, Select} from "antd";
import {useTranslation} from "react-i18next";
import {PlusOutlined, DeleteOutlined, ArrowUpOutlined, ArrowDownOutlined} from '@ant-design/icons';
import {useState} from 'react';
import {TABLE_TYPE_OPTIONS} from "@Turtle/Tables/Table";

interface TableConfigEditorProps {
    entity: any
    headersAttribute?: string
    valueTypesAttribute?: string
    defaultValuesAttribute?: string
    label?: string
    behindLabel?: any
    onChange?: any
    itemProps?: FormItemProps
}

function getDefaultValueForType(type: string): any {
    switch (type) {
        case 'string':
            return '';
        case 'int32':
        case 'int64':
        case 'float':
        case 'double':
            return 0;
        case 'boolean':
            return false;
        case 'date':
        case 'datetime':
            return '';
        default:
            return '';
    }
}

export default function TableConfigEditor({
                                              entity,
                                              headersAttribute = 'headers',
                                              valueTypesAttribute = 'valueTypes',
                                              defaultValuesAttribute = 'defaultValues',
                                              label,
                                              behindLabel,
                                              onChange,
                                              itemProps
                                          }: TableConfigEditorProps) {
    const [t] = useTranslation();
    const [, forceUpdate] = useState({});
    const [keyCounter, setKeyCounter] = useState(0);

    // Initialize arrays if they don't exist
    if (!Array.isArray(entity[headersAttribute])) {
        entity[headersAttribute] = [];
    }
    if (!Array.isArray(entity[valueTypesAttribute])) {
        entity[valueTypesAttribute] = [];
    }
    if (!Array.isArray(entity[defaultValuesAttribute])) {
        entity[defaultValuesAttribute] = [];
    }

    function handleAdd() {
        entity[headersAttribute].push('');
        entity[valueTypesAttribute].push('string');
        entity[defaultValuesAttribute].push('');
        setKeyCounter(prev => prev + 1);
        forceUpdate({});
        onChange && onChange();
    }

    function handleRemove(index: number) {
        entity[headersAttribute].splice(index, 1);
        entity[valueTypesAttribute].splice(index, 1);
        entity[defaultValuesAttribute].splice(index, 1);
        setKeyCounter(prev => prev + 1);
        forceUpdate({});
        onChange && onChange();
    }

    function handleMoveUp(index: number) {
        if (index === 0) return;

        [entity[headersAttribute][index], entity[headersAttribute][index - 1]] =
            [entity[headersAttribute][index - 1], entity[headersAttribute][index]];

        [entity[valueTypesAttribute][index], entity[valueTypesAttribute][index - 1]] =
            [entity[valueTypesAttribute][index - 1], entity[valueTypesAttribute][index]];

        [entity[defaultValuesAttribute][index], entity[defaultValuesAttribute][index - 1]] =
            [entity[defaultValuesAttribute][index - 1], entity[defaultValuesAttribute][index]];

        setKeyCounter(prev => prev + 1);
        forceUpdate({});
        onChange && onChange();
    }

    function handleMoveDown(index: number) {
        if (index === entity[headersAttribute].length - 1) return;

        [entity[headersAttribute][index], entity[headersAttribute][index + 1]] =
            [entity[headersAttribute][index + 1], entity[headersAttribute][index]];

        [entity[valueTypesAttribute][index], entity[valueTypesAttribute][index + 1]] =
            [entity[valueTypesAttribute][index + 1], entity[valueTypesAttribute][index]];

        [entity[defaultValuesAttribute][index], entity[defaultValuesAttribute][index + 1]] =
            [entity[defaultValuesAttribute][index + 1], entity[defaultValuesAttribute][index]];

        setKeyCounter(prev => prev + 1);
        forceUpdate({});
        onChange && onChange();
    }

    function handleHeaderChange(index: number, value: string) {
        entity[headersAttribute][index] = value;
        forceUpdate({});
        onChange && onChange();
    }

    function handleTypeChange(index: number, value: string) {
        entity[valueTypesAttribute][index] = value;
        entity[defaultValuesAttribute][index] = getDefaultValueForType(value);
        forceUpdate({});
        onChange && onChange();
    }

    function handleDefaultValueChange(index: number, value: string) {
        const type = entity[valueTypesAttribute][index];

        let convertedValue: any = value;
        if (type === 'int32' || type === 'int64') {
            convertedValue = value === '' ? 0 : parseInt(value, 10);
            if (isNaN(convertedValue)) convertedValue = 0;
        } else if (type === 'float' || type === 'double') {
            convertedValue = value === '' ? 0 : parseFloat(value);
            if (isNaN(convertedValue)) convertedValue = 0;
        } else if (type === 'boolean') {
            convertedValue = value === 'true';
        }

        entity[defaultValuesAttribute][index] = convertedValue;
        forceUpdate({});
        onChange && onChange();
    }

    return (
        <Form.Item
            label={`${t(label ?? 'Table Configuration')}:`}
            {...itemProps}
        >
            <Flex vertical gap="small">
                <Space direction="vertical" style={{width: '100%'}}>
                    {entity[headersAttribute].map((header: string, index: number) => {
                        const type = entity[valueTypesAttribute][index] || 'string';
                        const defaultValue = entity[defaultValuesAttribute][index] ?? '';
                        const isFirst = index === 0;
                        const isLast = index === entity[headersAttribute].length - 1;

                        return (
                            <Flex key={`${index}-${keyCounter}`} align="center" gap="small" style={{width: '100%'}}>
                                <Flex vertical gap={4}>
                                    <Button
                                        type="text"
                                        size="small"
                                        icon={<ArrowUpOutlined/>}
                                        onClick={() => handleMoveUp(index)}
                                        disabled={isFirst}
                                        style={{padding: '0 4px', height: 20}}
                                    />
                                    <Button
                                        type="text"
                                        size="small"
                                        icon={<ArrowDownOutlined/>}
                                        onClick={() => handleMoveDown(index)}
                                        disabled={isLast}
                                        style={{padding: '0 4px', height: 20}}
                                    />
                                </Flex>

                                <Input
                                    placeholder="Header Name"
                                    value={header}
                                    onChange={(e) => handleHeaderChange(index, e.target.value)}
                                    style={{width: 200}}
                                />

                                <Select
                                    placeholder="Type"
                                    value={type}
                                    onChange={(value) => handleTypeChange(index, value)}
                                    options={TABLE_TYPE_OPTIONS}
                                    style={{width: 150}}
                                />

                                {type === 'boolean' ? (
                                    <Select
                                        placeholder="Default Value"
                                        value={String(defaultValue)}
                                        onChange={(val) => handleDefaultValueChange(index, val)}
                                        options={[
                                            {label: 'True', value: 'true'},
                                            {label: 'False', value: 'false'}
                                        ]}
                                        style={{width: 150}}
                                    />
                                ) : (
                                    <Input
                                        placeholder="Default Value"
                                        value={String(defaultValue)}
                                        type={type.includes('int') || type.includes('float') || type.includes('double') ? 'number' : 'text'}
                                        onChange={(e) => handleDefaultValueChange(index, e.target.value)}
                                        style={{width: 150}}
                                    />
                                )}

                                <Button
                                    type="text"
                                    danger
                                    icon={<DeleteOutlined/>}
                                    onClick={() => handleRemove(index)}
                                />
                            </Flex>
                        );
                    })}
                </Space>

                <Button
                    type="primary"
                    icon={<PlusOutlined/>}
                    onClick={handleAdd}
                    block
                >
                    {t('Add Column')}
                </Button>

                {behindLabel && <div>{behindLabel}</div>}
            </Flex>
        </Form.Item>
    );
}
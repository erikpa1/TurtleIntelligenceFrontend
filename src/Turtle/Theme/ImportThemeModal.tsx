import React, {useState} from "react";
import {Upload, message, Modal} from "antd";
import {InboxOutlined} from "@ant-design/icons";
import {TurtleTheme} from "@Turtle/Theme/theme";
import TurtleApp from "@TurtleApp/TurtleApp";
import ThemeApi from "@Turtle/Theme/ThemeApi";

const {Dragger} = Upload;

interface ImportThemeModalProps {
    onFinish?: () => void;
}

export default function ImportThemeModal({onFinish}: ImportThemeModalProps) {
    const [fileList, setFileList] = useState([]);


    async function jsonParsed(data: any) {
        TurtleApp.Lock()

        const theme = new TurtleTheme()
        theme.FromJson(data)
        await ThemeApi.Import(theme)

        console.log(theme)

        TurtleApp.Unlock()

        onFinish?.()
    }


    function handleBeforeUpload(file) {
        // Check file extension

        console.log(file.name)

        const isValidExtension = file.name.endsWith('.turtletheme');

        if (!isValidExtension) {
            message.error('Please upload a file with .turtletheme extension');
            return Upload.LIST_IGNORE;
        }

        // Read and parse the file
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const jsonContent = JSON.parse((e.target as any).result);

                // Call onFinish with the parsed JSON object
                jsonParsed(jsonContent)


                message.success(`${file.name} file uploaded and parsed successfully`);
            } catch (error) {
                message.error('Invalid JSON format in the file');
                console.error('JSON parse error:', error);
            }
        };

        reader.onerror = () => {
            message.error('Failed to read file');
        };

        reader.readAsText(file);

        // Prevent automatic upload
        return false;
    };

    function handleChange(info) {
        let newFileList = [...info.fileList];

        // Limit to only one file
        newFileList = newFileList.slice(-1);

        setFileList(newFileList as any)
    };

    const handleRemove = () => {
        setFileList([]);
    };

    return (
        <div style={{padding: '20px'}}>
            <Dragger
                name="file"
                multiple={false}
                fileList={fileList}
                beforeUpload={handleBeforeUpload}
                onChange={handleChange}
                onRemove={handleRemove}
                accept=".turtletheme"
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined/>
                </p>
                <p className="ant-upload-text">
                    Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                    Only .turtletheme files are supported
                </p>
            </Dragger>
        </div>
    );
}
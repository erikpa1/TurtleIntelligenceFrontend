//Created on https://v0.dev/chat/2q29thzdYOd
import React from "react"
import {Button, Card, Flex, Progress, Spin, Tag, Typography} from "antd";
import Search from "antd/es/input/Search";
import DocumentsApi, {VSearchResult} from "@Turtle/DocInt/Api/DocumentsApi";
import {FileDocument} from "@Turtle/DocInt/Data/Document";
import {DownloadOutlined, EyeOutlined, FileTextOutlined} from "@ant-design/icons";


export default function VSearchView() {


    const timeOutGuard: { current: any } = React.useMemo(() => ({
        current: null
    }), [])

    const [handler] = React.useState(new AbortController())

    const [isSearchTyping, setIsSearchTyping] = React.useState(false)
    const [isSearching, setIsSearching] = React.useState(false)

    const [searchText, setSearchText] = React.useState("")

    const [searchResults, setSearchResults] = React.useState<Array<VSearchResult>>([])


    async function search() {
        setIsSearchTyping(false)
        setIsSearching(true)
        const response = await DocumentsApi.VSearch(handler, searchText)
        setSearchResults(response)
        setIsSearching(false)

    }


    function searchTyping(text: string) {
        setSearchText(text)


        if (isSearching) {
            handler.abort()
        }

        if (timeOutGuard.current) {
            clearTimeout(timeOutGuard.current)
        }

        setIsSearchTyping(true)

        timeOutGuard.current = setTimeout(() => search(), 500)

    }

    React.useEffect(() => {
        return () => {
            if (isSearching) {
                handler.abort()
                clearTimeout(timeOutGuard.current)
            }
        }
    }, [])


    return (
        <Flex
            vertical
            gap={15}
        >

            <Search
                defaultValue={searchText}
                onChange={(e) => {
                    searchTyping(e.target.value)
                }}

            />

            {
                (isSearchTyping || isSearching) && (
                    <Spin/>
                )
            }

            {
                searchResults.map((searchResult) => {
                    return (
                        <DocSimmilarityCard
                            doc={searchResult.doc}
                            similarity={searchResult.similarity}
                        />
                    )
                })
            }
        </Flex>
    )
}

interface DocSimmilarityCardProps {
    similarity: number
    doc: FileDocument
}

export function DocSimmilarityCard({doc, similarity}: DocSimmilarityCardProps) {
    return (
        <Card
            hoverable
            className="mb-4"
            styles={{
                body: {padding: '16px'}
            }}
        >
            <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                    <div className="flex-shrink-0 mt-1">
                        <FileTextOutlined style={{fontSize: '20px', color: '#f5222d'}}/>
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                            <Typography.Title level={5} className="!mb-0 truncate" style={{fontSize: '14px'}}>
                                {doc.name}
                            </Typography.Title>
                            <Tag>
                                {doc.ext}
                            </Tag>
                            <Typography.Text type="secondary" style={{fontSize: '12px'}}>
                                {doc.ext}
                            </Typography.Text>
                        </div>

                        <Typography.Paragraph
                            type="secondary"
                            style={{fontSize: '14px', marginBottom: '12px'}}
                            ellipsis={{rows: 2}}
                        >
                            {doc.description}
                        </Typography.Paragraph>

                        <div className="flex items-center space-x-4">

                            <div className="flex items-center space-x-2">
                                <Typography.Text type="secondary" style={{fontSize: '12px'}}>
                                    Similarity:
                                </Typography.Text>
                                <Tag
                                    color={getSimilarityColor(0)}
                                >
                                    {similarity}%
                                </Tag>
                            </div>

                            <Progress
                                percent={similarity}
                                size="small"
                                style={{width: '80px'}}
                                showInfo={false}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                    <Button
                        type="text"
                        size="small"
                        icon={<EyeOutlined/>}
                        style={{width: '32px', height: '32px'}}
                    />
                    <Button
                        type="text"
                        size="small"
                        icon={<DownloadOutlined/>}
                        style={{width: '32px', height: '32px'}}
                    />
                </div>
            </div>
        </Card>
    )
}

// Helper function for similarity colors
const getSimilarityColor = (similarity) => {
    if (similarity >= 80) return 'green';
    if (similarity >= 60) return 'orange';
    return 'red';
};
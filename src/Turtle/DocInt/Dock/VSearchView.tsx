//Created on https://v0.dev/chat/2q29thzdYOd
import React from "react"
import {Button, Card, Flex, Progress, Spin, Tag, Typography} from "antd";
import Search from "antd/es/input/Search";
import DocumentsApi, {VSearchResult} from "@Turtle/DocInt/Api/DocumentsApi";
import {FileDocument} from "@Turtle/DocInt/Data/Document";
import {DownloadOutlined, EyeOutlined, FileTextOutlined} from "@ant-design/icons";
import {DownloadDocumentIconBtn, OpenDocumentIconBtn} from "@Turtle/DocInt/Components/DocManipulation";
import {HierarchyRightFlex} from "@Turtle/Components/HierarchyComponents";


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

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Search
                    defaultValue={searchText}
                    onChange={(e) => {
                        searchTyping(e.target.value)
                    }}
                    variant="borderless"
                    style={{
                        width: '200px',
                        flex: 'none',
                        borderBottom: '1px solid #d9d9d9',
                        borderRadius: 0
                    }}
                />
            </div>

            {
                (isSearchTyping || isSearching) && (
                    <Spin/>
                )
            }

            {
                searchResults.map((searchResult) => {
                    return (
                        <DocSimmilarityCard
                            key={searchResult.doc.uid}
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
                body: {
                    padding: '16px'
                }
            }}
        >
            <Flex vertical>
                <Flex gap={15}>

                    <div>
                        <FileTextOutlined style={{fontSize: '20px', color: '#f5222d'}}/>
                    </div>

                    <Flex vertical>

                        <Flex>
                            <Typography.Title level={5}>
                                {doc.name}
                            </Typography.Title>

                            <HierarchyRightFlex>
                                <OpenDocumentIconBtn doc={doc}/>
                                <DownloadDocumentIconBtn doc={doc}/>
                            </HierarchyRightFlex>

                        </Flex>

                        <Tag>
                            {doc.ext}
                        </Tag>

                        <Typography.Text type="secondary" style={{fontSize: '12px'}}>
                            {doc.ext}
                        </Typography.Text>

                        <Typography.Paragraph
                            type="secondary"
                            style={{fontSize: '14px', marginBottom: '12px'}}
                            ellipsis={{rows: 2}}
                        >
                            {doc.description}
                        </Typography.Paragraph>

                        <Flex vertical>

                            <Flex gap={15}>
                                <Typography.Text type="secondary" style={{fontSize: '12px'}}>
                                    Similarity:
                                </Typography.Text>

                                <Tag
                                    color={getSimilarityColor(0)}
                                >
                                    {similarity}%
                                </Tag>

                                <Progress
                                    percent={similarity}
                                    size="small"
                                    style={{width: '80px'}}
                                    showInfo={false}
                                />

                            </Flex>


                        </Flex>
                    </Flex>


                </Flex>
            </Flex>
        </Card>
    )
}

// Helper function for similarity colors
const getSimilarityColor = (similarity) => {
    if (similarity >= 80) return 'green';
    if (similarity >= 60) return 'orange';
    return 'red';
};